'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dialog } from '@base-ui-components/react/dialog';
import {
  Check,
  ImagePlus,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  TriangleAlert,
  X,
  Search,
} from 'lucide-react';
import useMediaQuery from 'lib/useMediaQuery';
import type { Pattern, PatternOption } from 'lib/pattern';
import {
  type AspectRatioId,
  type OptionValue,
  ASPECT_RATIOS,
  ASPECT_RATIO_IDS,
  DEFAULT_ASPECT_RATIO,
  GRID_OPTION_ID,
  densityFromGrid,
  densityToCellPx,
  deriveGridForBox,
  isAspectRatioId,
  randomSeed,
  snapCellToBox,
  supportsSvgExport,
} from 'tabbied';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import EditPatternHeader from 'components/edit-pattern-page/EditPatternHeader';
import Toaster, { toaster } from 'components/Toaster';
import ValueSlider from 'components/ValueSlider';
import ToggleSwitch from 'components/ToggleSwitch';
import ColorSwatch from 'components/ColorSwatch';
import PaletteEditorDialog from 'components/palette/PaletteEditorDialog';
import PaletteBrowser from 'components/palette/PaletteBrowser';
import PaletteListRow from 'components/palette/PaletteListRow';
import { usePaletteReveal } from 'components/palette/usePaletteReveal';
import { usePaletteEditor } from 'components/palette/usePaletteEditor';
import { PALETTE_LIBRARY, type LibraryPalette } from 'lib/paletteLibrary';
import { mergePalettes } from 'lib/paletteList';
import { fitToColorBounds } from 'lib/randomPalettes';
import { isTransparentHex, toColorInputValue, toOpaqueHex } from 'lib/color';
import {
  deletePalette,
  isValidPaletteColor,
  resolveActivePalette,
  setActivePalette,
  useBrandPalettes,
  useDraftPreview,
  type BrandPalette,
} from 'lib/brandPalettes';
import { revealPressed } from 'components/palette/revealPressed';
import styles from './EditPattern.module.css';

// The density a design opens at when its authored grid says nothing usable
// (a single number, or no grid at all): the 60px cell most designs open at.
const DEFAULT_DENSITY = 0.5;

// Longest edge of the little aspect-ratio glyph rectangle, in pixels.
const RATIO_GLYPH_SIZE = 12;

// Fraction of the preview area the pattern fills, leaving a margin around it.
const PREVIEW_FIT_MARGIN = 0.9;

// How many palettes the phone's strip shows before "View all" takes over: a
// single horizontal row, so it has to stay swipeable.
const STRIP_LIMIT = 30;

// The paletteSource marker for "the pattern's own colors" / a freely-edited
// palette - neither highlights any chip.
type PaletteSource = 'pattern' | 'custom' | string;

// Largest width/height for `ratio` that fits inside a maxW x maxH box.
const fitToBox = (ratio: AspectRatioId, maxW: number, maxH: number) => {
  const [rw, rh] = ASPECT_RATIOS[ratio];
  const scale = Math.min(maxW / rw, maxH / rh);

  return { width: Math.round(rw * scale), height: Math.round(rh * scale) };
};

const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`could not load ${url}`));
    image.src = url;
  });

/**
 * The pattern's PNG cut to `width x height` from its top-left corner, over
 * the picture (cover-fitted) when there is one. css-doodle exports the whole
 * canvas, and the plate's canvas is larger than the plate: the plate snapped
 * to whole cells, with the frame clipping the rest (see `canvas` in the
 * editor). The file is the plate as the stage showed it.
 */
const cropExport = async (
  patternPng: Blob,
  width: number,
  height: number,
  imageUrl: string | null
): Promise<Blob> => {
  const patternUrl = URL.createObjectURL(patternPng);

  try {
    const [patternImage, photo] = await Promise.all([
      loadImage(patternUrl),
      imageUrl ? loadImage(imageUrl) : null,
    ]);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('no 2d context');

    if (photo) {
      const cover = Math.max(width / photo.naturalWidth, height / photo.naturalHeight);
      const photoWidth = photo.naturalWidth * cover;
      const photoHeight = photo.naturalHeight * cover;

      context.drawImage(photo, (width - photoWidth) / 2, (height - photoHeight) / 2, photoWidth, photoHeight);
    }

    // At its own size, so what lands on the canvas is the pattern's top-left
    // corner: the part of it the frame showed.
    context.drawImage(patternImage, 0, 0);

    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png')
    );
  } finally {
    URL.revokeObjectURL(patternUrl);
  }
};

const toDataUrl = async (url: string): Promise<string> => {
  const blob = await (await fetch(url)).blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('could not read the image'));
    reader.readAsDataURL(blob);
  });
};

/**
 * The picture as the root's first child, cover-fitted to the viewBox, so the
 * exported SVG shows what the stage showed. Everything the converter drew
 * follows it and paints over it exactly as the pattern paints over the stage.
 */
const embedImageInSvg = (svg: string, dataUrl: string): string => {
  const match = /<svg\b[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"[^>]*>/.exec(svg);

  if (!match) throw new Error('the SVG has no viewBox');

  const image = `<image href="${dataUrl}" x="0" y="0" width="${match[1]}" height="${match[2]}" preserveAspectRatio="xMidYMid slice"/>`;

  return svg.replace(match[0], `${match[0]}${image}`);
};

const saveBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.download = name;
  anchor.href = url;
  anchor.click();
  // Revoking synchronously can abort the just-started download.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
};

export default function EditPattern({ pattern }: { pattern: Pattern }) {
  const defaultAspectRatio = pattern.defaultAspectRatio ?? DEFAULT_ASPECT_RATIO;

  const paletteDefaults = pattern.palette ?? [];
  const minColors = pattern.colors?.min ?? paletteDefaults.length;
  const maxColors = pattern.colors?.max ?? paletteDefaults.length;
  const defaultColors = pattern.colors?.default ?? paletteDefaults.length;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const brandState = useBrandPalettes();
  const brandPalettes = brandState.palettes;
  // The active palette shared with the gallery - a saved palette or a curated
  // library palette (opening a pattern picks up whatever the gallery previews).
  // Memoized on the store snapshot: the resolver builds a fresh object, and an
  // effect keyed on it re-ran every render.
  const activeCustomPalette = useMemo(
    () => resolveActivePalette(brandState),
    [brandState]
  );

  const draftPreview = useDraftPreview();

  // The palette a link carries, when it carries a usable one: a color count
  // the pattern can take, every entry a color. `?palette=red`, or a stray
  // `}`, used to reach css-doodle's source (which painted nothing, silently)
  // and the copied React snippet verbatim.
  const linkedPaletteFromQuery = (): string[] | null => {
    const queryPalette = searchParams.getAll('palette');

    return queryPalette.length >= minColors &&
      queryPalette.length <= maxColors &&
      queryPalette.every(
        (color) => color === 'transparent' || isValidPaletteColor(color)
      )
      ? queryPalette
      : null;
  };

  // What the link carried at mount, lower-cased for matching, read once: the
  // URL is rewritten from state after the first render.
  const linkedAtMount = useRef<string[] | null | undefined>(undefined);

  if (linkedAtMount.current === undefined) {
    linkedAtMount.current =
      linkedPaletteFromQuery()?.map((color) => color.toLowerCase()) ?? null;
  }

  const urlHadPaletteAtMount = useRef(linkedAtMount.current !== null);

  // Which palette (if any) the editor's swatches currently reflect, driving the
  // chip outline. 'pattern'/'custom' highlight no chip; a palette id highlights
  // that chip. Any manual swatch edit switches this to 'custom'. A link's
  // colors start as 'custom' and the lookup below names them if it can.
  const [paletteSource, setPaletteSource] = useState<PaletteSource>(() =>
    urlHadPaletteAtMount.current ? 'custom' : 'pattern'
  );
  const [paletteQuery, setPaletteQuery] = useState('');
  // The phone's "View all": every palette in a fullscreen sheet, since the
  // strip under the swatches shows only the first STRIP_LIMIT.
  const [browserOpen, setBrowserOpen] = useState(false);

  const customPaletteColors = (custom: BrandPalette): string[] =>
    custom.colors.map((color, index) =>
      // Normalize first: appending an alpha byte to a 3- or 8-digit hex would
      // produce an invalid color (the stored palette allows both forms).
      index === 0 && custom.transparentBackground
        ? `${toOpaqueHex(color)}00`
        : color
    );

  const customPaletteToEditor = (
    custom: BrandPalette
  ): { palette: string[]; count: number } => {
    const colors = customPaletteColors(custom);
    const next = [...paletteDefaults];
    const limit = Math.min(colors.length, next.length);

    for (let i = 0; i < limit; i += 1) next[i] = colors[i];

    return {
      palette: next,
      count: Math.min(maxColors, Math.max(minColors, colors.length)),
    };
  };

  const initialCustomApplied = useRef(false);

  const optionFromQuery = (option: PatternOption): OptionValue => {
    const queryVal = searchParams.get(option.id);

    if (queryVal === null) {
      return option.default;
    }

    if (typeof option.default === 'number') {
      const numericVal = queryVal.trim() === '' ? NaN : Number(queryVal);

      if (Number.isNaN(numericVal)) {
        return option.default;
      }

      return Math.min(
        Math.max(numericVal, option.min ?? -Infinity),
        option.max ?? Infinity
      );
    }

    if (typeof option.default === 'boolean') {
      return queryVal === 'true';
    }

    if (option.type === 'ButtonSelectGroup') {
      // The grid option's slot is inert: the grid is derived from the plate
      // at the density (below), never read from here or from a link. A
      // legacy `grid=` link is read by densityFromQuery instead.
      if (option.id === GRID_OPTION_ID) return option.default;

      return option.options?.includes(queryVal) ? queryVal : option.default;
    }

    return queryVal;
  };

  const paletteStateFromQuery = (): { palette: string[]; count: number } => {
    const queryPalette = linkedPaletteFromQuery();

    if (queryPalette) {
      return {
        palette: [
          ...queryPalette,
          ...paletteDefaults.slice(queryPalette.length),
        ],
        count: queryPalette.length,
      };
    }

    if (activeCustomPalette && paletteDefaults.length > 0) {
      return customPaletteToEditor(activeCustomPalette);
    }

    return { palette: paletteDefaults, count: defaultColors };
  };

  const aspectRatioFromQuery = (): AspectRatioId => {
    const queryRatio = searchParams.get('aspectRatio');

    return queryRatio && isAspectRatioId(queryRatio)
      ? queryRatio
      : defaultAspectRatio;
  };

  const gridIndex = pattern.options.findIndex((option) => option.id === GRID_OPTION_ID);
  const hasGrid = gridIndex >= 0;

  // The density a link carries, 0 (coarse) to 1 (fine): `density` when it
  // parses in range, else a legacy `grid=CxR` read as the density whose
  // cell that grid had on the original plate (links written before density
  // existed, and llms.txt told agents to write them), else the design's
  // authored default. Two decimals, the precision the link is written at.
  const densityFromQuery = (): number => {
    const raw = searchParams.get('density');
    const parsed = raw === null || raw.trim() === '' ? NaN : Number(raw);

    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
      return Math.round(parsed * 100) / 100;
    }

    const legacyGrid = searchParams.get('grid');
    const legacy = legacyGrid === null ? null : densityFromGrid(legacyGrid);

    if (legacy !== null) return legacy;

    return (
      (hasGrid ? densityFromGrid(String(pattern.options[gridIndex].default)) : null) ??
      DEFAULT_DENSITY
    );
  };

  const [palette, setPalette] = useState<string[]>(
    () => paletteStateFromQuery().palette
  );
  const [colorCount, setColorCount] = useState<number>(
    () => paletteStateFromQuery().count
  );
  const [optionValues, setOptionValues] = useState<OptionValue[]>(() =>
    pattern.options.map((option) => optionFromQuery(option))
  );
  const [aspectRatio, setAspectRatio] =
    useState<AspectRatioId>(aspectRatioFromQuery);
  const [density, setDensity] = useState<number>(densityFromQuery);
  const [seed, setSeed] = useState(() => searchParams.get('seed') ?? '0000');
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewSize, setPreviewSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const doodleRef = useRef<TabbiedPatternHandle>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  // The grid held while the plate is expanded, so expanding scales the
  // arrangement rather than re-rolling it at the larger plate's cell count.
  const pinnedGrid = useRef<{ cols: number; rows: number } | null>(null);

  // A picture behind the pattern instead of a color. It is a local object
  // URL and nothing else: it goes in no query string, no saved palette and no
  // shared link, which the share action says out loud. Choosing one makes the
  // ground transparent so the picture shows through wherever the design
  // paints nothing, and clearing it puts the color back if there was one.
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const bgWasOpaque = useRef(false);

  const selfWrites = useRef<Set<string>>(new Set());
  // Below the two-column breakpoint the editor uses the compact 7d layout: a
  // fixed preview with an icon-button header and inline shuffle/export panels.
  const isMobile = useMediaQuery('(max-width: 991.98px)');

  // The preview is a bounded box in every layout now (a flex-filled pane on
  // desktop, a fixed band on mobile), so the pattern simply fits the measured
  // box. The caption under the plate is hidden on the band, so nothing is
  // taken off before the fit there; the desktop pane is tall enough that the
  // fit margin covers it. The pattern is drawn only once the box has been
  // measured (see the stage): drawn first at a guessed size and again at the
  // real one a frame later, every visit paid for a whole extra generation.
  // Until then these numbers stand in for the handlers that read them.
  const { width, height } = previewSize
    ? fitToBox(
        aspectRatio,
        previewSize.width * PREVIEW_FIT_MARGIN,
        previewSize.height * PREVIEW_FIT_MARGIN
      )
    : fitToBox(aspectRatio, 360, 540);

  // The grid is derived from the plate at the density's target cell, the way
  // fit="grid" derives it from a container: the slider sets how big a cell
  // is, and how many fit follows from the plate. So a wider stage shows more
  // cells at the same density, which is what an embed under the default fit
  // then draws from the copied snippet. The design's own cell bounds apply as
  // they do everywhere else.
  const grid = hasGrid
    ? pinnedGrid.current ??
      deriveGridForBox(width, height, densityToCellPx(density), pattern.sizing)
    : null;

  // The plate is the ratio's box; the canvas drawn in it is that box snapped
  // to whole, square cells (`snapCellToBox`, the arithmetic `fit="grid"` runs
  // on a container) and the frame clips the sub-cell overflow, up to a cell
  // or so at the right and bottom edges. Drawn at the box's own size the
  // cells are `width / cols` wide, which a plate of any ratio but the grid's
  // makes fractional and oblong: a 3:2 plate at 15x10 had 58.2px tracks and
  // a hairline seam down every column, while 1:1 happened to land on 60. A
  // design with no grid option has no cell count to snap to and is drawn at
  // the box.
  const cell = grid
    ? snapCellToBox(width, height, grid.cols, grid.rows, pattern.sizing?.cellMultiple)
    : null;
  const canvas =
    grid && cell ? { width: grid.cols * cell, height: grid.rows * cell } : { width, height };

  // Sync component state FROM the URL search params when they change externally.
  useEffect(() => {
    const currentParams = searchParams.toString();

    if (selfWrites.current.has(currentParams)) {
      selfWrites.current.delete(currentParams);
      return;
    }

    const queryPaletteState = paletteStateFromQuery();

    if (
      colorCount !== queryPaletteState.count ||
      !arraysEqual(
        palette.slice(0, colorCount),
        queryPaletteState.palette.slice(0, queryPaletteState.count)
      )
    ) {
      setPalette(queryPaletteState.palette);
      setColorCount(queryPaletteState.count);
    }

    pattern.options.forEach((option, optionIndex) => {
      if (option.id === GRID_OPTION_ID) return;

      const queryVal = optionFromQuery(option);

      if (queryVal !== optionValues[optionIndex]) {
        setOptionByIndex(optionIndex, queryVal);
      }
    });

    if (hasGrid) {
      const queryDensity = densityFromQuery();

      if (queryDensity !== density) {
        pinnedGrid.current = null;
        setDensity(queryDensity);
      }
    }

    const querySeed = searchParams.get('seed') ?? '0000';

    if (seed !== querySeed) {
      setSeed(querySeed);
    }

    const queryAspectRatio = aspectRatioFromQuery();

    if (queryAspectRatio !== aspectRatio) {
      setAspectRatio(queryAspectRatio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Apply the gallery's selected palette on first load, once, and mark it as the
  // active chip. A shared link that carries its own palette wins: it is
  // applied by the state initializers, and named (or not) by the lookup below.
  useEffect(() => {
    if (initialCustomApplied.current) return;

    if (urlHadPaletteAtMount.current || paletteDefaults.length === 0) {
      initialCustomApplied.current = true;
      return;
    }

    if (!activeCustomPalette) return;

    initialCustomApplied.current = true;
    const { palette: nextPalette, count } =
      customPaletteToEditor(activeCustomPalette);
    setPalette(nextPalette);
    setColorCount(count);
    setPaletteSource(activeCustomPalette.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCustomPalette]);

  // A link's colors are looked up in the list, so a link from the gallery's
  // random spread (or one shared from a named palette) lights that palette's
  // row; anything else stays "custom". Two things about the lookup. The
  // gallery fits a palette to the pattern before putting it in the link
  // (fitToColorBounds: cut to the most inks the design takes, padded to the
  // fewest), so the list is compared fitted the same way - compared whole, a
  // five-ink palette on a four-ink design never matched. And it runs again
  // when the saved palettes arrive: useSyncExternalStore renders the
  // hydration pass with the server snapshot, which has none, and only then
  // with the stored ones, so a lookup made once on mount could name a library
  // palette and never a saved one. It stops the moment the swatches stop
  // matching what the link carried.
  useEffect(() => {
    const linked = linkedAtMount.current;

    if (!linked || paletteSource !== 'custom') return;

    const current = palette
      .slice(0, colorCount)
      .map((color) => color.toLowerCase());

    if (!arraysEqual(current, linked)) return;

    const named = mergePalettes(brandPalettes, PALETTE_LIBRARY).find(
      ({ palette: p }) =>
        arraysEqual(
          fitToColorBounds(p.colors, pattern.colors?.min, pattern.colors?.max).map(
            (color) => color.toLowerCase()
          ),
          linked
        )
    );

    if (named) setPaletteSource(named.palette.id);
  }, [brandPalettes, palette, colorCount, paletteSource, pattern.colors]);

  // Expanding pins the grid the plate shows now, and collapsing releases it;
  // the grid is otherwise the plate's, at whatever size the stage is.
  //
  // It also takes the screen where the browser allows it. Hiding the panel
  // frees width only, and a 1:1 or 2:3 plate is bound by the stage's height,
  // so on its own Expand hid the controls and drew the same plate. Where
  // there is no fullscreen (an iPhone), it is the wider stage, as before.
  const expand = () => {
    pinnedGrid.current = grid;
    setIsExpanded(true);

    const stage = previewRef.current;

    if (stage && document.fullscreenEnabled && !document.fullscreenElement) {
      stage.requestFullscreen().catch(() => {
        // Refused (no gesture, a policy): the wider stage still stands.
      });
    }
  };

  const collapse = () => {
    pinnedGrid.current = null;
    setIsExpanded(false);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // The browser takes Escape for itself in fullscreen, and leaving
  // fullscreen any way at all is collapsing.
  useEffect(() => {
    if (!isExpanded) return;

    const onChange = () => {
      if (!document.fullscreenElement) collapse();
    };

    document.addEventListener('fullscreenchange', onChange);

    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [isExpanded]);

  // Escape came free with the dialog; expanding in place has to bind it.
  useEffect(() => {
    if (!isExpanded) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') collapse();
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  // The object URL holds the file's bytes until it is revoked.
  useEffect(
    () => () => {
      if (backgroundImage) URL.revokeObjectURL(backgroundImage);
    },
    [backgroundImage]
  );

  useEffect(() => {
    const element = previewRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;

      setPreviewSize((prev) => {
        const next = { width: Math.round(w), height: Math.round(h) };

        return prev && prev.width === next.width && prev.height === next.height
          ? prev
          : next;
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Serialized state as of mount, so the sync effect can tell "still the
  // state the URL already implies" apart from a real edit.
  const initialSerializedState = useRef<string | null>(null);

  // Sync the URL search params FROM component state if necessary. A clean
  // `/patterns/<slug>/` visit keeps its bare URL while the state still matches
  // what that URL implies - but only that long: once anything changes the URL
  // must follow, even when it started without params, or "Copy shareable
  // link" copies a link that doesn't reproduce the edits.
  useEffect(() => {
    const newParams = new URLSearchParams();

    palette
      .slice(0, colorCount)
      .forEach((color) => newParams.append('palette', color));
    newParams.set('seed', seed);
    newParams.set('aspectRatio', aspectRatio);
    // The grid is not in a link: it is derived from the viewer's plate, and
    // the density is what reproduces it there.
    if (hasGrid) newParams.set('density', String(density));
    pattern.options.forEach((option, index) => {
      if (option.id === GRID_OPTION_ID) return;

      newParams.set(option.id, String(optionValues[index]));
    });

    const nextParams = newParams.toString();

    if (initialSerializedState.current === null) {
      initialSerializedState.current = nextParams;
    }

    if (
      searchParams.toString() === '' &&
      nextParams === initialSerializedState.current
    ) {
      return;
    }

    if (nextParams !== searchParams.toString()) {
      if (selfWrites.current.size > 32) selfWrites.current.clear();
      selfWrites.current.add(nextParams);

      window.history.replaceState(null, '', `${pathname}?${nextParams}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, palette, colorCount, optionValues, aspectRatio, density]);

  const setOptionByIndex = (index: number, value: OptionValue) => {
    setOptionValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;

      return newValues;
    });
  };

  // Shuffle draws the layout again and nothing else. It used to be a menu of
  // three scopes (layout, colors, both); the colors are chosen from the
  // list under the swatches, and a control that could also reroll them read
  // as noise beside it.
  const randomizeSeed = () => {
    setSeed(randomSeed(4));
  };

  const changeColorCount = (delta: number) => {
    setColorCount((prev) =>
      Math.min(maxColors, Math.max(minColors, prev + delta))
    );
    setPaletteSource('custom');
  };

  // Apply a saved / library palette to the editor's swatches. With a picture
  // behind the pattern the ground stays transparent, or the palette's own
  // ground would cover the picture the moment a chip was clicked.
  const applyBrandPalette = (brand: BrandPalette) => {
    const colors = customPaletteColors(brand);

    setPalette((prev) => {
      const next = [...prev];
      const limit = Math.min(colors.length, next.length);

      for (let i = 0; i < limit; i += 1) {
        next[i] = colors[i];
      }

      if (backgroundImage && next[0] && !isTransparentHex(next[0])) {
        next[0] = `${toOpaqueHex(next[0])}00`;
      }

      return next;
    });
    setColorCount(Math.min(maxColors, Math.max(minColors, colors.length)));
  };

  const editor = usePaletteEditor({
    onSaved: (saved) => {
      applyBrandPalette(saved);
      setActivePalette(saved.id);
      setPaletteSource(saved.id);
    },
  });

  // Delete a custom palette on the first click of its delete mark (no confirm step).
  const removePalette = (id: string) => {
    deletePalette(id);
    if (paletteSource === id) setPaletteSource('custom');
  };

  // Apply a saved (custom) palette to the editor's swatches + share it with the
  // gallery. Clicking the already-active custom chip opens it for editing.
  const applyCustomPalette = (saved: BrandPalette) => {
    applyBrandPalette(saved);
    setActivePalette(saved.id);
    setPaletteSource(saved.id);
  };

  const onSelectCustomChip = (saved: BrandPalette) => {
    if (paletteSource === saved.id) {
      editor.openEditor(saved);
      return;
    }

    applyCustomPalette(saved);
  };

  // Apply a library palette. Clicking the already-active one opens it as a copy
  // (a new custom palette - editing never mutates the library).
  const applyLibraryPalette = (library: LibraryPalette) => {
    applyBrandPalette({ id: library.id, name: library.name, colors: library.colors });
    setActivePalette(library.id);
    setPaletteSource(library.id);
  };

  const onSelectLibraryChip = (library: LibraryPalette) => {
    if (paletteSource === library.id) {
      editor.openEditorAsCopy(library);
      return;
    }

    applyLibraryPalette(library);
  };

  // The "View all" sheet applies by id (resolving to a custom or library palette).
  const onBrowserApply = (id: string) => {
    const saved = brandPalettes.find((p) => p.id === id);

    if (saved) {
      applyCustomPalette(saved);
      return;
    }

    const library = PALETTE_LIBRARY.find((p) => p.id === id);
    if (library) applyLibraryPalette(library);
  };

  const setTransparentBackground = (transparent: boolean) => {
    setPalette((prev) => {
      const next = [...prev];
      const opaque = toOpaqueHex(next[0] ?? '#f8f9fa');

      next[0] = transparent ? `${opaque}00` : opaque;

      return next;
    });
    // Like every other swatch edit: the colors no longer match the applied
    // chip, so stop highlighting it.
    setPaletteSource('custom');
  };

  const chooseBackgroundImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toaster.add({ title: 'Choose an image file' });
      return;
    }

    // Remember whether there was a color to come back to, once, when the
    // first picture goes in; swapping one picture for another keeps it.
    if (!backgroundImage) {
      bgWasOpaque.current = !isTransparentHex(palette[0] ?? '');
      if (bgWasOpaque.current) setTransparentBackground(true);
    }

    setBackgroundImage(URL.createObjectURL(file));
  };

  const clearBackgroundImage = () => {
    setBackgroundImage(null);
    if (bgWasOpaque.current) setTransparentBackground(false);
    bgWasOpaque.current = false;
  };

  // The grid follows the plate, so a new ratio re-derives it at the same
  // density and the cells stay the size they were.
  const changeAspectRatio = (nextRatio: AspectRatioId) => {
    pinnedGrid.current = null;
    setAspectRatio(nextRatio);
  };

  // Two decimals: the slider steps by 0.05, and a float sum of those is not
  // always the round number the link and the snippet should carry.
  const changeDensity = (next: number) => {
    pinnedGrid.current = null;
    setDensity(Math.round(next * 100) / 100);
  };

  // One export at a time: a second click while the first is rendering, or a
  // picture removed mid-export (which revokes the object URL being read),
  // otherwise ended in the generic failure toast.
  const exporting = useRef(false);

  const runExport = async (run: () => Promise<void>) => {
    if (exporting.current) return;

    exporting.current = true;

    try {
      await run();
    } finally {
      exporting.current = false;
    }
  };

  const exportPattern = () => runExport(async () => {
    const scale = Math.ceil(3000 / Math.max(width, height));

    try {
      // css-doodle's export draws the whole canvas, the pattern alone with
      // the ground it was given. The file is cut to the plate (the canvas
      // overflows it; see `canvas`), over the picture when there is one,
      // cover-fitted the way the stage shows it.
      const result = (await doodleRef.current?.exportImage({ scale, detail: true })) as
        | { blob: Blob }
        | undefined;

      if (!result) throw new Error('nothing to export');

      const png = await cropExport(result.blob, width * scale, height * scale, backgroundImage);
      saveBlob(png, `${pattern.slug}.png`);
      toaster.add({
        title: backgroundImage ? 'PNG downloaded, with the background image' : 'PNG downloaded',
      });
    } catch {
      toaster.add({ title: 'Could not export the PNG' });
    }
  });

  const svgExportEnabled = supportsSvgExport(pattern);

  // Limitations worth confirming before an SVG download: the design's own
  // note (filter-based effects, documented sub-pixel deviations) plus notes
  // from any enabled toggle options (e.g. shadows that export as filters).
  const svgExportNotes = [
    ...(pattern.svgExportNote ? [pattern.svgExportNote] : []),
    ...pattern.options.flatMap((option, index) =>
      option.svgExportNote && optionValues[index] === true
        ? [option.svgExportNote]
        : []
    ),
  ];

  const [svgConfirmOpen, setSvgConfirmOpen] = useState(false);

  const downloadSvg = () => runExport(async () => {
    // The canvas overflows the plate (see `canvas`); the export is clipped to
    // the plate, so the file shows what the stage showed.
    const clip = { width, height };

    try {
      if (!backgroundImage) {
        await doodleRef.current?.exportSvg({ download: true, clip });
        toaster.add({ title: 'SVG downloaded' });
        return;
      }

      // The picture goes in as the first child of the root, embedded rather
      // than linked: a file that points at an object URL is broken the moment
      // the tab closes.
      const result = await doodleRef.current?.exportSvg({ clip });

      if (!result) throw new Error('nothing to export');

      const svg = embedImageInSvg(result.svg, await toDataUrl(backgroundImage));
      saveBlob(new Blob([svg], { type: 'image/svg+xml' }), `${pattern.slug}.svg`);
      toaster.add({ title: 'SVG downloaded, with the background image' });
    } catch {
      toaster.add({ title: 'Could not export the SVG' });
    }
  });

  const exportSvgPattern = async () => {
    if (!svgExportEnabled) return;

    if (svgExportNotes.length > 0) {
      setSvgConfirmOpen(true);
      return;
    }

    await downloadSvg();
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toaster.add(
        backgroundImage
          ? {
              title: 'Link copied to clipboard',
              description:
                'The background image stays on this device; the link opens with a transparent background.',
            }
          : { title: 'Link copied to clipboard' }
      );
    } catch {
      toaster.add({ title: 'Could not copy the link' });
    }
  };

  const copyReactComponent = async () => {
    const activePalette = palette.slice(0, colorCount);
    const paletteLiteral = activePalette.map((color) => `'${color}'`).join(', ');
    // The grid stays out of the snippet: under the default fit the package
    // derives it from the box, and `density` is what carries the cell size
    // the plate showed.
    const optionEntries = pattern.options.flatMap((option, index) =>
      option.id === GRID_OPTION_ID ? [] : [[option.id, optionValues[index]] as const]
    );
    const optionsLiteral = optionEntries
      .map(([id, value]) =>
        typeof value === 'string' ? `${id}: '${value}'` : `${id}: ${value}`
      )
      .join(', ');

    const lines = [
      `import { TabbiedPattern } from 'tabbied/react';`,
      `import { ${pattern.slug} } from 'tabbied/patterns';`,
      ``,
      `// Fills its parent by default - add height, maxWidth or aspectRatio to bound it.`,
      `<TabbiedPattern`,
      `  pattern={${pattern.slug}}`,
      `  seed="${seed}"`,
      ...(hasGrid ? [`  density={${density}}`] : []),
      `  palette={[${paletteLiteral}]}`,
      ...(optionEntries.length ? [`  options={{ ${optionsLiteral} }}`] : []),
      `/>`,
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      toaster.add({ title: 'React component copied' });
    } catch {
      toaster.add({ title: 'Could not copy the component' });
    }
  };

  const overlayPreviewColors = (colors: string[]): string[] => {
    const next = [...paletteDefaults];
    const limit = Math.min(colors.length, next.length);

    for (let i = 0; i < limit; i += 1) next[i] = colors[i];

    const count = Math.min(maxColors, Math.max(minColors, colors.length));

    return next.slice(0, count);
  };

  const displayPalette = draftPreview
    ? overlayPreviewColors(draftPreview)
    : palette.slice(0, colorCount);

  // fit="fixed" substitutes the grid option straight into `@grid`, so the
  // derived grid goes in as the option's value.
  const patternProps = {
    pattern,
    seed,
    palette: displayPalette,
    options: Object.fromEntries(
      pattern.options.map((option, index) => [
        option.id,
        option.id === GRID_OPTION_ID && grid ? `${grid.cols}x${grid.rows}` : optionValues[index],
      ])
    ),
  } as const;

  const previewBackground =
    displayPalette.length > 0 ? displayPalette[0] : 'transparent';

  const previewIsTransparent =
    !backgroundImage &&
    (previewBackground === 'transparent' || isTransparentHex(previewBackground));

  // The picture, cover-fitted to the pattern's box. On the frame rather than
  // the pattern host: the ground is painted inside the doodle, so only a
  // transparent ground lets this show, which choosing a picture guarantees.
  const imageStyle = backgroundImage
    ? {
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  const bgIsTransparent = isTransparentHex(palette[0] ?? '');

  // ---- Grouped inspector controls ----

  // One merged chip list: custom palettes first, then the read-only library.
  // Memoized on the saved palettes: every slider tick and color-picker drag
  // re-renders the editor, and merging, filtering and searching 437 palettes
  // on each of them was the bulk of that render.
  const mergedChips = useMemo(
    () => mergePalettes(brandPalettes, PALETTE_LIBRARY),
    [brandPalettes]
  );
  // The rail lists every palette, custom first, filtered by the search above
  // it and revealed in batches as it scrolls (the same list the gallery's
  // rail shows, so the two read as one control).
  const listedPalettes = useMemo(
    () => mergePalettes(brandPalettes, PALETTE_LIBRARY, paletteQuery),
    [brandPalettes, paletteQuery]
  );
  const paletteList = usePaletteReveal(listedPalettes, 24);
  // The phone's strip is a single horizontal row, so it shows the first few
  // and the one in use, and "View all" reaches the rest.
  const stripPalettes = useMemo(() => {
    const head = mergedChips.slice(0, STRIP_LIMIT);
    const inUse = mergedChips.find(({ palette: p }) => p.id === paletteSource);

    if (inUse && !head.includes(inUse)) head.unshift(inUse);

    return head;
  }, [mergedChips, paletteSource]);
  const listedRows = isMobile ? stripPalettes : paletteList.shown;

  // On a phone the palettes are one swipeable row, and the one in use could
  // sit well off its right edge: scroll it into the row.
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobile && stripRef.current) revealPressed(stripRef.current);
  }, [isMobile, paletteSource]);

  // The plate's caption names what it is: the palette it wears (when it wears
  // a named one), its grid and its ratio - the three things the rail changes.
  const captionParts = [
    mergedChips.find(({ palette: p }) => p.id === paletteSource)?.palette.name,
    grid ? `${grid.cols}\u00D7${grid.rows} grid` : null,
    aspectRatio,
  ].filter(Boolean);

  const hasEffects = pattern.options.some(
    (option) => option.type === 'ToggleSwitch'
  );

  const renderRatioTile = (id: AspectRatioId) => {
    const [rw, rh] = ASPECT_RATIOS[id];
    const scale = RATIO_GLYPH_SIZE / Math.max(rw, rh);
    const selected = id === aspectRatio;

    return (
      <button
        key={id}
        type="button"
        title={id}
        aria-label={id}
        aria-pressed={selected}
        className={
          selected ? `${styles.ratioTile} ${styles.ratioTileActive}` : styles.ratioTile
        }
        onClick={() => changeAspectRatio(id)}
      >
        <span
          className={styles.ratioGlyph}
          style={{ width: `${rw * scale}px`, height: `${rh * scale}px` }}
        />
      </button>
    );
  };

  const renderLayoutOption = (option: PatternOption, index: number) => {
    const value = optionValues[index];
    const onChange = (next: OptionValue) => setOptionByIndex(index, next);

    if (option.type === 'ButtonSelectGroup') {
      // The grid is a density slider, 0 coarse to 1 fine, read out as that
      // number the way the frequency slider beside it is; the grid the plate
      // resolves to at that cell size is named in the plate's caption. The
      // other select groups stay chips.
      if (option.id === GRID_OPTION_ID) {
        if (!grid) return null;

        return (
          <div key={option.id} className={styles.sliderBlock}>
            <div className={styles.layoutRow}>
              <span className={styles.layoutLabel}>Grid density</span>
              <span className={styles.layoutValue}>{density.toFixed(2)}</span>
            </div>
            <ValueSlider
              min={0}
              max={1}
              step={0.05}
              value={density}
              onChange={changeDensity}
              label="Grid density"
              hideValue
            />
          </div>
        );
      }

      const options = option.options;

      if (!options || options.length === 0) return null;

      const label = option.displayName;

      return (
        <div className={styles.layoutField} key={option.id}>
          <span className={styles.layoutLabel}>{label}</span>
          <div className={styles.chipRow} role="group" aria-label={label}>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                aria-pressed={opt === value}
                className={
                  opt === value ? `${styles.chip} ${styles.chipActive}` : styles.chip
                }
                onClick={() => onChange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (option.type === 'Slider') {
      const step = option.step ?? 1;
      const decimals = (String(step).split('.')[1] ?? '').length;
      const formatted = decimals ? Number(value).toFixed(decimals) : String(value);

      return (
        <div key={option.id} className={styles.sliderBlock}>
          <div className={styles.layoutRow}>
            <span className={styles.layoutLabel}>{option.displayName}</span>
            <span className={styles.layoutValue}>{formatted}</span>
          </div>
          <ValueSlider
            min={option.min!}
            max={option.max!}
            step={option.step!}
            value={value as number}
            onChange={onChange}
            label={option.displayName}
            hideValue
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.pageWrapper}>
      <EditPatternHeader
        patternName={pattern.name}
        onShuffle={randomizeSeed}
        onExportPng={exportPattern}
        onExportSvg={exportSvgPattern}
        svgExportDisabled={!svgExportEnabled}
        svgExportWarning={svgExportEnabled && svgExportNotes.length > 0}
        onCopyLink={copyShareLink}
        onCopyReactComponent={copyReactComponent}
        hasBackgroundImage={backgroundImage !== null}
        mobile={isMobile}
      />

      {/* The phone's "View all": every palette, in a sheet over the editor
          rather than a panel in the rail, so the list has the whole screen
          and the way back is one tap. The desktop rail lists them all. */}
      <Dialog.Root open={browserOpen} onOpenChange={setBrowserOpen}>
        <Dialog.Portal>
          <Dialog.Popup className={styles.allPalettesSheet} aria-label="All palettes">
            <PaletteBrowser
              variant="panel"
              palettes={brandPalettes}
              library={PALETTE_LIBRARY}
              activeId={paletteSource}
              onApply={(id) => {
                onBrowserApply(id);
                setBrowserOpen(false);
              }}
              onEditCustom={(p) => {
                setBrowserOpen(false);
                editor.openEditor(p);
              }}
              onEditLibrary={(p) => {
                setBrowserOpen(false);
                editor.openEditorAsCopy(p);
              }}
              onDelete={removePalette}
              onClose={() => setBrowserOpen(false)}
            />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Confirmation before downloading an SVG with known limitations
          (filter-based effects or documented sub-pixel deviations). A plain
          Dialog rather than AlertDialog so clicking outside dismisses it. */}
      <Dialog.Root open={svgConfirmOpen} onOpenChange={setSvgConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.svgConfirmBackdrop} />
          <Dialog.Popup className={styles.svgConfirmPopup}>
            <Dialog.Title className={styles.svgConfirmTitle}>
              <TriangleAlert
                className={styles.svgConfirmTitleIcon}
                size={17}
                aria-hidden="true"
              />
              About this SVG export
            </Dialog.Title>
            <Dialog.Description
              className={styles.svgConfirmIntro}
              render={<div />}
            >
              <p>
                {pattern.name} exports with{' '}
                {svgExportNotes.length > 1
                  ? 'a few limitations'
                  : 'a limitation'}
                :
              </p>
              <ul className={styles.svgConfirmList}>
                {svgExportNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Dialog.Description>
            <div className={styles.svgConfirmActions}>
              <Dialog.Close className={styles.svgConfirmCancel}>
                Cancel
              </Dialog.Close>
              <button
                type="button"
                className={styles.svgConfirmDownload}
                onClick={() => {
                  setSvgConfirmOpen(false);
                  void downloadSvg();
                }}
              >
                Download SVG
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <main
        className={
          isExpanded
            ? `${styles.editPatternSection} ${styles.editPatternSectionExpanded}`
            : styles.editPatternSection
        }
      >
        <div
          ref={previewRef}
          className={
            previewIsTransparent
              ? `${styles.previewWrapper} ${styles.previewTransparent}`
              : styles.previewWrapper
          }
          // Expanded, the stage is the whole editor, so anywhere that is not
          // the plate is "outside" and dismisses it - the affordance a backdrop
          // used to provide. Guarded on the target being this element so a
          // click on the plate, the caption or the toggle does not close it.
          onClick={
            isExpanded
              ? (event) => {
                  if (event.target === event.currentTarget) collapse();
                }
              : undefined
          }
        >
          <button
            type="button"
            className={styles.expandButton}
            onClick={isExpanded ? collapse : expand}
            aria-pressed={isExpanded}
            aria-label={isExpanded ? 'Collapse pattern' : 'Expand pattern'}
            title={isExpanded ? 'Collapse pattern' : 'Expand pattern'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <figure className={styles.stage}>
            {/* The frame is the plate, at the ratio's size. The canvas in it
                is snapped to whole cells and overflows it (see `canvas`); the
                frame's overflow: hidden clips the rest. Sized only once the
                stage is measured, like the pattern it holds. */}
            <div
              className={styles.doodleFrame}
              style={previewSize ? { ...imageStyle, width, height } : imageStyle}
            >
              {previewSize && (
                <TabbiedPattern
                  ref={doodleRef}
                  {...patternProps}
                  fit="fixed"
                  width={canvas.width}
                  height={canvas.height}
                  decorative={false}
                />
              )}
            </div>

            {/* The pattern is named under it rather than in a header bar, so
                the stage reads as a plate with its caption. On a phone the
                caption is hidden and the band is all plate. */}
            <figcaption className={styles.stageCaption}>
              <span className={styles.stageName}>{pattern.name}</span>
              <span className={styles.stageMeta}>
                {captionParts.join(', ')}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelScroll}>
          {palette.length > 0 && (
            <section className={styles.group}>
              {/* The design hangs the swatch count off the title rather than
                  off the end of the ink row, which is what keeps the inks on
                  one line however many there are. */}
              <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>Colors</h2>
                {minColors < maxColors && (
                  <div
                    className={styles.countGroup}
                    role="group"
                    aria-label="Number of colors"
                  >
                    <button
                      type="button"
                      className={styles.countButton}
                      onClick={() => changeColorCount(-1)}
                      disabled={colorCount <= minColors}
                      aria-label="Remove color"
                      title="Remove color"
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.countButton}
                      onClick={() => changeColorCount(1)}
                      disabled={colorCount >= maxColors}
                      aria-label="Add color"
                      title="Add color"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.colorsRow}>
                <div className={styles.bgGroup}>
                  <div
                    className={styles.bgSwatchBox}
                    role="group"
                    aria-label="Background"
                  >
                    {!backgroundImage && (
                    <span
                      className={styles.bgSwatch}
                      title="Background color"
                    >
                      <input
                        type="color"
                        className={styles.bgInput}
                        aria-label="Background color"
                        value={toColorInputValue(palette[0])}
                        style={{ opacity: bgIsTransparent ? 0.3 : 1 }}
                        onClick={(event) => {
                          // While transparent, clicking the dimmed swatch just
                          // switches back to the opaque color (no picker).
                          if (bgIsTransparent) {
                            event.preventDefault();
                            setTransparentBackground(false);
                          }
                        }}
                        onChange={(event) => {
                          const hex = event.target.value;
                          setPalette((prev) => {
                            const next = [...prev];
                            next[0] = hex;

                            return next;
                          });
                          setPaletteSource('custom');
                        }}
                      />
                      <span className={styles.bgStrip} aria-hidden="true" />
                    </span>
                    )}
                    {!backgroundImage && (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={bgIsTransparent}
                      title="Transparent background"
                      className={
                        bgIsTransparent
                          ? `${styles.transButton} ${styles.transButtonActive}`
                          : styles.transButton
                      }
                      onClick={() => setTransparentBackground(!bgIsTransparent)}
                    >
                      {bgIsTransparent && <Check size={15} />}
                    </button>
                    )}
                    {/* A picture instead of a color. While one is set it
                        stands in for both the swatch and the transparent
                        toggle, showing the picture; choosing again replaces
                        it, and the link under the caption clears it. */}
                    <label
                      className={
                        backgroundImage
                          ? `${styles.bgImageButton} ${styles.bgImageButtonActive}`
                          : styles.bgImageButton
                      }
                      style={imageStyle}
                      title={backgroundImage ? 'Replace the background image' : 'Upload a background image'}
                    >
                      {!backgroundImage && <ImagePlus size={15} aria-hidden="true" />}
                      <input
                        type="file"
                        accept="image/*"
                        className={styles.bgImageInput}
                        aria-label="Background image"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) chooseBackgroundImage(file);
                          event.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                  <span className={styles.bgCaptionRow}>
                    <span className={styles.groupCaption}>background</span>
                    {backgroundImage && (
                      <button
                        type="button"
                        className={styles.bgRemove}
                        onClick={clearBackgroundImage}
                        title="Remove the background image"
                        aria-label="Remove the background image"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    )}
                  </span>
                </div>

                <div className={styles.inksGroup}>
                  <div className={styles.inksWrap}>
                    {palette.slice(1, colorCount).map((hex, inkIndex) => {
                      const index = inkIndex + 1;

                      return (
                        <ColorSwatch
                          key={`color${index}`}
                          className={styles.inkSwatch}
                          ariaLabel={`Color ${index + 1}`}
                          color={hex}
                          onChange={(newHex) => {
                            setPalette((prev) => {
                              const next = [...prev];
                              next[index] = newHex;

                              return next;
                            });
                            setPaletteSource('custom');
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className={styles.groupCaption}>inks</span>
                </div>
              </div>

              <div className={styles.chipsSection}>
                {isMobile ? (
                  // No search on the phone: a label for the strip, and the
                  // way to the rest of the list.
                  <div className={styles.stripHead}>
                    <span>Select a palette</span>
                    <button
                      type="button"
                      className={styles.viewAll}
                      onClick={() => setBrowserOpen(true)}
                    >
                      View all
                    </button>
                  </div>
                ) : (
                  <label className={styles.paletteSearch}>
                    <input
                      type="text"
                      placeholder={`Search ${mergedChips.length} palettes`}
                      value={paletteQuery}
                      onChange={(event) => {
                        setPaletteQuery(event.target.value);
                        paletteList.reset();
                      }}
                      aria-label="Search palettes"
                    />
                    <Search size={15} aria-hidden="true" />
                  </label>
                )}

                {/* The reveal hook measures its list to keep filling until it
                    overflows. The strip is one row that never overflows
                    vertically, so given the strip it filled all the way to
                    the end of the library - some twenty full re-renders of
                    the editor on every phone visit - for a slice it never
                    showed. It gets the desktop list only. */}
                <div
                  ref={isMobile ? stripRef : paletteList.listRef}
                  className={isMobile ? `${styles.paletteList} ${styles.paletteStrip}` : styles.paletteList}
                  onScroll={isMobile ? undefined : paletteList.onScroll}
                >
                  {listedRows.map(({ kind, palette: p }) => (
                    <PaletteListRow
                      key={p.id}
                      name={p.name || 'Untitled'}
                      colors={p.colors}
                      active={paletteSource === p.id}
                      editLabel={`Edit ${p.name || 'palette'}${
                        kind === 'library' ? ' (saves as a copy)' : ''
                      }`}
                      editTitle={
                        kind === 'library'
                          ? 'Edit palette (saves as a copy)'
                          : 'Edit palette'
                      }
                      deleteLabel={`Delete ${p.name || 'palette'}`}
                      onClick={() =>
                        kind === 'library'
                          ? onSelectLibraryChip(p)
                          : onSelectCustomChip(p)
                      }
                      onEdit={() =>
                        kind === 'library'
                          ? editor.openEditorAsCopy(p)
                          : editor.openEditor(p)
                      }
                      onDelete={
                        kind === 'custom' ? () => removePalette(p.id) : undefined
                      }
                    />
                  ))}
                  {listedRows.length === 0 && (
                    <p className={styles.paletteEmpty}>
                      No palettes match your search.
                    </p>
                  )}
                </div>

                {/* The rail lists every palette from the start, so there is
                    no "browse all" to reach; only the way to a new one. */}
                {!isMobile && (
                  <div className={styles.chipsActions}>
                    <button
                      type="button"
                      className={styles.chipsAction}
                      onClick={() => editor.openEditor()}
                      title="Create a new palette"
                    >
                      <Plus size={13} /> New Palette
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className={styles.group}>
            <h2 className={styles.groupTitle}>Layout</h2>

            <div className={styles.layoutField}>
              <span id="aspect-ratio-label" className={styles.layoutLabel}>
                Aspect ratio
              </span>
              <div className={styles.ratioTiles} role="group" aria-labelledby="aspect-ratio-label">
                {ASPECT_RATIO_IDS.map((id) => renderRatioTile(id))}
              </div>
            </div>

            {pattern.options.map((option, index) =>
              renderLayoutOption(option, index)
            )}
          </section>

          {hasEffects && (
            <section className={styles.group}>
              <h2 className={styles.groupTitle}>Effects</h2>
              {pattern.options.map((option, index) =>
                option.type === 'ToggleSwitch' ? (
                  <label key={option.id} className={styles.effectsRow}>
                    {option.displayName}
                    <ToggleSwitch
                      small
                      isChecked={optionValues[index] as boolean}
                      onChange={(value) => setOptionByIndex(index, value)}
                    />
                  </label>
                ) : null
              )}
            </section>
          )}
          </div>
        </div>
      </main>

      <PaletteEditorDialog
        draft={editor.draft}
        setDraft={editor.setDraft}
        draftError={editor.draftError}
        onClose={editor.closeEditor}
        onSave={editor.saveDraft}
        onDelete={editor.removeDraftPalette}
        onRandomize={editor.randomizeDraft}
        setDraftColor={editor.setDraftColor}
      />

      <Toaster />
    </div>
  );
}
