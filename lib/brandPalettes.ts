// Custom palettes (named `brandPalettes` for storage-key stability), persisted
// in localStorage and applied to the /patterns gallery previews. The whole
// state lives under one key so cross-tab sync is a single `storage` event.
'use client';

import { useSyncExternalStore } from 'react';
import {
  DEFAULT_PALETTE_ID,
  findLibraryPalette,
  isLibraryPaletteId,
  type LibraryPalette,
} from './paletteLibrary';

export type BrandPalette = {
  id: string;
  name: string;
  /** Colors, background (color0) first, then the inks. */
  colors: string[];
  /**
   * Render with a transparent background: the stored background color is kept
   * (so the toggle is reversible) but color0 resolves to transparent wherever
   * the palette is applied.
   */
  transparentBackground?: boolean;
};

export type BrandPaletteState = {
  palettes: BrandPalette[];
  /**
   * The palette previewed across the gallery: a saved or library palette's
   * id, RANDOM_PALETTE_ID for one random library palette per pattern, or
   * `null`, which is not "each pattern's own colors" - a null id resolves to
   * DEFAULT_PALETTE_ID (see resolveActivePalette).
   */
  activePaletteId: string | null;
};

const STORAGE_KEY = 'tabbied.brandPalettes.v1';

/**
 * The gallery's "Random per pattern" option, kept in the same slot as a
 * palette id because it is chosen from the same list. It names no colors of
 * its own: the gallery draws one library palette per card, and the editor
 * opens a pattern with whatever palette its card was wearing (carried in the
 * link), or with the pattern's own colors on a bare visit.
 */
export const RANDOM_PALETTE_ID = 'random';

const isRandomPaletteId = (id: string | null | undefined): boolean =>
  id === RANDOM_PALETTE_ID;

/** Palette size bounds: a background plus at least one ink. */
const MIN_PALETTE_COLORS = 2;
const MAX_PALETTE_COLORS = 12;

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

// A first visit is the random spread: each card in a different palette.
const DEFAULT_STATE: BrandPaletteState = {
  palettes: [],
  activePaletteId: RANDOM_PALETTE_ID,
};

export const isValidPaletteColor = (value: unknown): value is string =>
  typeof value === 'string' && HEX_COLOR.test(value.trim());

const isValidPalette = (value: unknown): value is BrandPalette => {
  if (typeof value !== 'object' || value === null) return false;

  const palette = value as Partial<BrandPalette>;

  return (
    typeof palette.id === 'string' &&
    palette.id.length > 0 &&
    // An empty name is valid (the palette shows as just its colors).
    typeof palette.name === 'string' &&
    Array.isArray(palette.colors) &&
    palette.colors.length >= MIN_PALETTE_COLORS &&
    palette.colors.length <= MAX_PALETTE_COLORS &&
    palette.colors.every(isValidPaletteColor)
  );
};

const normalizePalette = (palette: BrandPalette): BrandPalette => ({
  id: palette.id,
  name: palette.name.trim(),
  colors: palette.colors.map((color) => color.trim().toLowerCase()),
  transparentBackground: palette.transparentBackground === true,
});

export const createPaletteId = (): string =>
  `bp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

const listeners = new Set<() => void>();

// The parsed snapshot is cached so getSnapshot returns a stable reference
// between writes (useSyncExternalStore compares by identity).
let cache: BrandPaletteState | null = null;

const readState = (): BrandPaletteState => {
  if (typeof window === 'undefined') return DEFAULT_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as Partial<BrandPaletteState>;
    const palettes = Array.isArray(parsed.palettes)
      ? parsed.palettes.filter(isValidPalette).map(normalizePalette)
      : [];
    // An active id that names nothing any more (deleted in another tab, a
    // retired library id) is the first-visit random spread, not `null`, which
    // the editor would resolve to the shared default palette.
    const activePaletteId =
      typeof parsed.activePaletteId === 'string' &&
      (palettes.some((palette) => palette.id === parsed.activePaletteId) ||
        isLibraryPaletteId(parsed.activePaletteId) ||
        isRandomPaletteId(parsed.activePaletteId))
        ? parsed.activePaletteId
        : RANDOM_PALETTE_ID;

    return { palettes, activePaletteId };
  } catch {
    // Corrupt storage falls back to defaults rather than breaking the gallery.
    return DEFAULT_STATE;
  }
};

const emit = () => {
  cache = null;

  for (const listener of listeners) listener();
};

const writeState = (next: BrandPaletteState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private-mode / quota failures: the in-memory snapshot still updates so
    // the UI works for the session.
    cache = next;
    for (const listener of listeners) listener();
    return;
  }

  emit();
};

export const getBrandPaletteState = (): BrandPaletteState =>
  cache ?? (cache = readState());

const getServerSnapshot = (): BrandPaletteState => DEFAULT_STATE;

const subscribeBrandPalettes = (listener: () => void): (() => void) => {
  listeners.add(listener);

  // Cross-tab updates arrive as `storage` events (which never fire in the tab
  // that wrote; same-tab writes go through emit()).
  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === null || event.key === STORAGE_KEY) emit();
};

/** React hook: the current brand-palette state, live across components/tabs. */
export function useBrandPalettes(): BrandPaletteState {
  return useSyncExternalStore(
    subscribeBrandPalettes,
    getBrandPaletteState,
    getServerSnapshot
  );
}

// ---------------------------------------------------------------------------
// Live draft preview (transient, never persisted)
// ---------------------------------------------------------------------------
// While the palette editor is open the page's patterns recolor to the palette
// being edited, broadcast on its own channel apart from the persisted store.
// `null` means no draft is open.
let draftPreview: string[] | null = null;
const draftPreviewListeners = new Set<() => void>();

export const setDraftPreview = (colors: string[] | null) => {
  draftPreview = colors;
  for (const listener of draftPreviewListeners) listener();
};

const subscribeDraftPreview = (listener: () => void): (() => void) => {
  draftPreviewListeners.add(listener);
  return () => draftPreviewListeners.delete(listener);
};

const getDraftPreview = (): string[] | null => draftPreview;
const getDraftPreviewServerSnapshot = (): string[] | null => null;

/** React hook: the live draft-preview colors, or null when no editor is open. */
export function useDraftPreview(): string[] | null {
  return useSyncExternalStore(
    subscribeDraftPreview,
    getDraftPreview,
    getDraftPreviewServerSnapshot
  );
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const upsertPalette = (palette: BrandPalette) => {
  const state = getBrandPaletteState();
  const normalized = normalizePalette(palette);

  if (!isValidPalette(normalized)) {
    throw new Error('Invalid palette: 2-12 hex colors are required.');
  }

  const existing = state.palettes.findIndex((p) => p.id === normalized.id);
  const palettes =
    existing >= 0
      ? state.palettes.map((p, i) => (i === existing ? normalized : p))
      : [...state.palettes, normalized];

  writeState({ ...state, palettes });
};

export const deletePalette = (id: string) => {
  const state = getBrandPaletteState();

  writeState({
    ...state,
    palettes: state.palettes.filter((palette) => palette.id !== id),
    // Deleting the active palette reverts to the random spread, the default.
    activePaletteId:
      state.activePaletteId === id ? RANDOM_PALETTE_ID : state.activePaletteId,
  });
};

export const setActivePalette = (id: string | null) => {
  const state = getBrandPaletteState();

  writeState({
    ...state,
    activePaletteId:
      id !== null &&
      (state.palettes.some((palette) => palette.id === id) ||
        isLibraryPaletteId(id) ||
        isRandomPaletteId(id))
        ? id
        : null,
  });
};

// A curated library palette adapted to the BrandPalette shape (library palettes
// never carry a transparent background) so the same resolvers/renderers apply.
const libraryAsBrand = (library: LibraryPalette): BrandPalette => ({
  id: library.id,
  name: library.name,
  colors: [...library.colors],
});

/**
 * The active palette from the saved palettes first, then the library. A null
 * or unknown id falls back to the default library palette. Null when the
 * random spread is active (no one palette to hand out, so a consumer shows the
 * pattern's own colors).
 */
export const resolveActivePalette = (
  state: BrandPaletteState
): BrandPalette | null => {
  if (isRandomPaletteId(state.activePaletteId)) return null;

  const activeId = state.activePaletteId ?? DEFAULT_PALETTE_ID;

  const saved = state.palettes.find((palette) => palette.id === activeId);

  if (saved) return saved;

  const library =
    findLibraryPalette(activeId) ?? findLibraryPalette(DEFAULT_PALETTE_ID);

  return library ? libraryAsBrand(library) : null;
};

// ---------------------------------------------------------------------------
// Applying a brand palette to a pattern
// ---------------------------------------------------------------------------

/** The palette's colors with color0 resolved for rendering. */
const resolvePaletteColors = (palette: BrandPalette): string[] =>
  palette.transparentBackground
    ? ['transparent', ...palette.colors.slice(1)]
    : [...palette.colors];

/**
 * The palette to hand to <TabbiedPattern> for a gallery preview: the active
 * brand palette's colors, or undefined when the pattern defaults apply.
 */
export const previewPalette = (
  state: BrandPaletteState
): string[] | undefined => {
  const active = resolveActivePalette(state);

  return active ? resolvePaletteColors(active) : undefined;
};
