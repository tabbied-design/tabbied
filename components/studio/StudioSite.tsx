'use client';

// The customizer: a site's latest revision on its template, and the two things
// a person changes about it in this release, its colors and its patterns.
//
// Every change is planned and applied by the edits engine against the
// iframe's document, live, and the runtime inside is then asked to draw its
// patterns again, since a rewritten attribute is not a re-render. Saving posts
// the whole document as the next revision; the download rebuilds the packaged
// zip with that document in it.
//
// Words and pictures are not edited here yet (the Worker keeps the routes, and
// the rail's Content tab says so). Below 768px the rail is hidden and the page
// is the site alone, to preview and download.
//
// A site started from a template is a draft until its first Save, so a look at
// a template leaves nothing in the account: /studio/customize/ renders this
// with `template`, and the first Save makes the site with the draft as
// revision 1 and moves the address to /studio/site/?id= with replaceState, so
// the canvas and the rail stay as they are.
//
// A draft needs no account: anyone can change its colors and patterns and
// download it. Saving does, so a signed-out Save opens the save gate, which
// stashes the draft (lib/pendingSave.ts) on its way to the account forms. When
// the customizer opens on that template again the stash is put back on the
// canvas, and saved at once if there is a session by then.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import {
  applyPlan,
  emptyEdits,
  isPatternSlot,
  planEdits,
  resolvePaletteRoles,
  selectorForSlot,
  type EditsDocument,
  type PatternEdit,
  type PatternSlot,
  type Problem,
  type TemplateSpec,
} from 'tabbied-templates';
import type { DesignChoice } from 'lib/designCatalog';
import type { SiteDocument } from 'lib/studioDocument';
import { apiFetch, ApiError } from 'lib/apiFetch';
import { useSessionUser } from 'lib/authClient';
import { track } from 'lib/events';
import { clearPendingSave, readPendingSave, stashPendingSave } from 'lib/pendingSave';
import { refreshSavedTemplates } from 'lib/savedTemplates';
import {
  archiveNameFor,
  buildCustomisedArchive,
  buildCustomisedReactArchive,
  saveArchive,
} from 'lib/studioDownload';
import { designOn, patternChanged, patternsChanged, pickDesign, shuffleDesigns } from 'lib/studioPatterns';
import {
  buildPreviewDocument,
  packagedTemplateUrl,
  templateSpecUrl,
} from 'lib/studioPreview';
import Toaster, { toaster } from 'components/Toaster';
import CustomizerBar from './CustomizerBar';
import { PreviewNotices } from './PreviewFrame';
import SaveGate from './SaveGate';
import SiteRail, { type SaveState } from './SiteRail';
import styles from './SiteWorkspace.module.css';

type Loaded = {
  site: SiteDocument;
  spec: TemplateSpec;
  /** The packaged page as fetched, so the canvas can be rebuilt without a round trip. */
  packaged: string;
  html: string;
  problems: Problem[];
};

type State = { status: 'loading' } | { status: 'error'; message: string } | ({ status: 'ready' } & Loaded);

type Frame = HTMLIFrameElement & {
  contentWindow: (Window & { __tabbied?: { rehydrate: () => void } }) | null;
};

/** How long the canvas dims while a shuffle draws, so the change reads as one. */
const SHUFFLE_BEAT_MS = 700;

/**
 * The height of whatever the page keeps pinned at its top (a sticky or fixed
 * header, or a nav), which would cover a field scrolled to the very top. Not
 * one that holds the field itself: a pattern in the header is shown at 0.
 */
function pinnedTop(doc: Document, view: Window, field: Element): number {
  let height = 0;

  for (const element of doc.querySelectorAll('header, nav')) {
    if (element.contains(field)) continue;

    const style = view.getComputedStyle(element);
    if (style.position !== 'sticky' && style.position !== 'fixed') continue;
    if (Number.parseFloat(style.top) > 1) continue;

    const box = element.getBoundingClientRect();
    if (box.height > 0 && box.height < view.innerHeight / 2) height = Math.max(height, box.bottom);
  }

  return height;
}

/**
 * A pattern field as the canvas draws it. The slot id may sit on several
 * elements (a field drawn in two places, or one a phone layout hides): the
 * first that is laid out is the one meant.
 */
function fieldOnCanvas(frame: HTMLIFrameElement | null, slot: PatternSlot) {
  const doc = frame?.contentDocument;
  const view = frame?.contentWindow;
  if (!doc || !view) return null;

  const field = [...doc.querySelectorAll(selectorForSlot(slot))].find((host) => {
    const box = host.getBoundingClientRect();
    return box.width > 0 && box.height > 0;
  });

  return field ? { doc, view, field } : null;
}

/** A computed color with no alpha left in it: what `transparent` computes to. */
const CLEAR = /^transparent$|^rgba\(.*,\s*0\)$|\/\s*0\)$/;

/**
 * The color a field is drawn over: its own, or the first ancestor's that
 * paints one. A field whose ground is transparent shows the section behind
 * it, which need not be the page's ground (a panel, a band).
 */
function groundOf(frame: HTMLIFrameElement | null, slot: PatternSlot): string | null {
  const found = fieldOnCanvas(frame, slot);
  if (!found) return null;

  for (let element: Element | null = found.field; element; element = element.parentElement) {
    const color = found.view.getComputedStyle(element).backgroundColor;
    if (color && !CLEAR.test(color.trim())) return color;
  }

  return null;
}

/** Scroll the canvas so a pattern field's top is at the top of the frame. */
function scrollToField(frame: HTMLIFrameElement | null, slot: PatternSlot, smooth: boolean): void {
  const found = fieldOnCanvas(frame, slot);
  if (!found) return;

  const { doc, view, field } = found;

  const top = field.getBoundingClientRect().top + view.scrollY - pinnedTop(doc, view, field);
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  view.scrollTo({ top: Math.max(0, Math.round(top)), behavior: smooth && !still ? 'smooth' : 'auto' });
}

/** "Raku and Soft Bubbles": the designs a shuffle drew, three named at most. */
function drawnNames(
  slots: readonly PatternSlot[],
  patterns: Record<string, PatternEdit> | undefined,
  designs: readonly DesignChoice[]
): string {
  const names = slots.map((slot) => {
    const slug = designOn(slot, patterns?.[slot.id]);

    return designs.find((design) => design.slug === slug)?.name ?? slug;
  });
  const shown = names.length > 3 ? [...names.slice(0, 2), `${names.length - 2} more`] : names;

  return shown.length > 1 ? `${shown.slice(0, -1).join(', ')} and ${shown[shown.length - 1]}` : shown.join('');
}

/**
 * A site that does not exist yet: the template as it ships, owned by the
 * person looking at it, with no id until the first Save gives it one.
 */
function draftDocument(spec: TemplateSpec): SiteDocument {
  const now = new Date().toISOString();

  return {
    id: '',
    slug: spec.site.slug,
    templateName: spec.site.name,
    title: spec.site.name,
    stance: '',
    palette: spec.palette.colors,
    revisions: 0,
    createdAt: now,
    updatedAt: now,
    mine: true,
    generationId: null,
    directionIndex: null,
    description: null,
    specVersion: spec.specVersion,
    templateChanged: false,
    latest: {
      n: 0,
      edits: emptyEdits(spec),
      instruction: null,
      source: 'manual',
      model: 'none',
      createdAt: now,
    },
  };
}

export default function StudioSite({
  designs,
  template,
}: {
  designs: readonly DesignChoice[];
  /** A template slug to open as an unsaved draft, when there is no site id. */
  template?: string;
}) {
  const searchParams = useSearchParams();
  const siteId = searchParams.get('id');
  // The id a draft was saved as. Its first Save rewrites the address to
  // ?id=, which is a change of `siteId`; the site is already loaded, so that
  // change is not a reason to load it again.
  const adopted = useRef<string | null>(null);

  const [state, setState] = useState<State>({ status: 'loading' });
  const [draft, setDraft] = useState<EditsDocument | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('clean');
  const [downloading, setDownloading] = useState(false);
  // The draft a person last downloaded, while it is still the draft: a
  // download of a site never saved is that person's copy of it.
  const [downloadedDraft, setDownloadedDraft] = useState<EditsDocument | null>(null);
  const [shuffling, setShuffling] = useState(false);
  // Bumped to remount the iframe. React diffs `srcDoc` against its last prop,
  // not the live document, so a rebuilt page identical to the first load (the
  // template's own patterns, put back after a shuffle) would otherwise keep
  // the attributes the live edits wrote into it.
  const [canvasKey, setCanvasKey] = useState(0);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const shuffleTimer = useRef<number | null>(null);
  // The blob: address the last "Open in new tab" made, let go when another
  // is made or the page goes.
  const openedUrl = useRef<string | null>(null);
  // The pattern field last brought into view from the rail. A rebuilt canvas
  // (a field put back on its own design, a reset) loads at its top, and is
  // scrolled back to this field, which is what the person was looking at.
  const shownField = useRef<PatternSlot | null>(null);
  const { user, isPending: sessionPending } = useSessionUser();
  const [gateOpen, setGateOpen] = useState(false);
  // The stash is looked at once per draft, after the session has answered.
  const restored = useRef(false);
  // The latest render's save, for the restore effect below, which is
  // declared before the early returns that `save` is written after.
  const saveRef = useRef<((document: EditsDocument, title?: string, fromGate?: boolean) => Promise<void>) | null>(null);

  useEffect(
    () => () => {
      if (shuffleTimer.current !== null) window.clearTimeout(shuffleTimer.current);
      if (openedUrl.current) URL.revokeObjectURL(openedUrl.current);
    },
    []
  );

  useEffect(() => {
    if (siteId && siteId === adopted.current) return;

    let live = true;

    setState({ status: 'loading' });

    (async (): Promise<State> => {
      if (!siteId && !template) {
        return { status: 'error', message: 'That site link is incomplete.' };
      }

      const stored = siteId
        ? await apiFetch<SiteDocument>(`/api/studio/sites/${encodeURIComponent(siteId)}`)
        : null;
      const slug = stored?.slug ?? template!;

      const [specResponse, htmlResponse] = await Promise.all([
        fetch(templateSpecUrl(slug)),
        fetch(`${packagedTemplateUrl(slug)}index.html`),
      ]);

      if (!specResponse.ok || !htmlResponse.ok) {
        return {
          status: 'error',
          message: stored
            ? `The ${stored.templateName} template is no longer available.`
            : 'That template is not available.',
        };
      }

      const spec = (await specResponse.json()) as TemplateSpec;
      const site = stored ?? draftDocument(spec);
      const packaged = await htmlResponse.text();
      const { html, problems } = buildPreviewDocument({
        html: packaged,
        spec,
        edits: site.latest.edits,
        slug: site.slug,
      });

      return { status: 'ready', site, spec, packaged, html, problems };
    })()
      .then((next) => {
        if (!live) return;

        setState(next);

        if (next.status === 'ready') {
          setDraft(next.site.latest.edits);
          setSaveState('clean');
        }
      })
      .catch((cause) => {
        if (!live) return;

        setState({
          status: 'error',
          message:
            cause instanceof ApiError && cause.status === 404
              ? 'That site does not exist or was removed.'
              : 'Could not load this site.',
        });
      });

    return () => {
      live = false;
    };
  }, [siteId, template]);

  // Unsaved changes are asked about before the page goes: a draft has
  // nowhere else to be kept, and a saved site's latest changes are not in
  // it until Save. A draft just downloaded is not asked about (the guest
  // audit of 2026-10-15 met the prompt right after a download): those
  // changes are in the zip, and the next change asks again. A saved site
  // still asks, since its account copy is behind until Save.
  const keptByDownload = downloadedDraft !== null && downloadedDraft === draft && state.status === 'ready' && state.site.id === '';

  useEffect(() => {
    if (saveState !== 'dirty' || keptByDownload) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', warn);

    return () => window.removeEventListener('beforeunload', warn);
  }, [saveState, keptByDownload]);

  const ready = state.status === 'ready' ? state : null;
  const spec = ready?.spec ?? null;

  const patternSlots = useMemo<PatternSlot[]>(() => spec?.slots.filter(isPatternSlot) ?? [], [spec]);

  /**
   * Rebuild the canvas from the package with a document, and remount it: for
   * a change a live plan cannot express (a reset, which puts authored options
   * back) or a frame not loaded yet.
   */
  const rebuild = useCallback(
    (next: EditsDocument) => {
      setState((prev) => {
        if (prev.status !== 'ready') return prev;

        const built = buildPreviewDocument({ html: prev.packaged, spec: prev.spec, edits: next, slug: prev.site.slug });

        return { ...prev, html: built.html, problems: built.problems };
      });
      setCanvasKey((key) => key + 1);
    },
    []
  );

  /**
   * Run a document against the live page: plan it whole, apply the plan to
   * the iframe's document, and ask the runtime inside to redraw. Whole, not
   * the changed part: a field's own palette beats the brand palette only when
   * both are in the planned document, so a partial plan would disagree with
   * what Save stores and Download builds; text operations are idempotent, so
   * replanning them costs nothing. What the engine could not place joins the
   * page's notices. Before the frame has loaded there is nothing to plan
   * against, so the canvas is rebuilt.
   */
  const applyDocument = useCallback(
    (next: EditsDocument) => {
      if (!spec) return;

      const frame = frameRef.current as Frame | null;
      const doc = frame?.contentDocument;
      const runtime = frame?.contentWindow?.__tabbied;

      if (!doc || !runtime) {
        rebuild(next);
        return;
      }

      const { problems } = applyPlan(doc, planEdits(spec, next));

      runtime.rehydrate();
      setState((prev) => (prev.status === 'ready' ? { ...prev, problems } : prev));
    },
    [spec, rebuild]
  );

  // Edits stashed at the save gate come back to the canvas when the
  // customizer opens on their template again, and are saved at once when a
  // session exists. Signed out still, they wait on the canvas, unsaved.
  const draftSlug = ready && ready.site.id === '' ? ready.site.slug : null;

  useEffect(() => {
    if (!draftSlug || restored.current || sessionPending) return;
    restored.current = true;

    const pending = readPendingSave(draftSlug);

    if (!pending) return;

    setDraft(pending.edits);
    setSaveState('dirty');
    rebuild(pending.edits);
    setState((prev) =>
      prev.status === 'ready' ? { ...prev, site: { ...prev.site, title: pending.title || prev.site.title } } : prev
    );

    if (!user) return;

    clearPendingSave();
    void saveRef.current?.(pending.edits, pending.title, true);
  }, [draftSlug, sessionPending, user, rebuild]);

  const touch = (next: EditsDocument) => {
    setDraft(next);
    setSaveState('dirty');
  };

  if (state.status === 'error') {
    return (
      <p className={styles.notice} role="alert">
        {state.message}{' '}
        {/* A draft came from the gallery; a saved site from the account. */}
        {template ? (
          <Link href="/templates/" className={styles.back} prefetch={false}>
            All templates
          </Link>
        ) : (
          <Link href="/account/" className={styles.back} prefetch={false}>
            Your templates
          </Link>
        )}
        .
      </p>
    );
  }

  if (!ready || !draft || !spec) {
    return (
      <div className={`${styles.stage} ${styles.stageLoading}`}>
        <div className={styles.frame}>
          <div className={styles.skeleton} aria-hidden="true" />
          <p className={styles.loading}>Loading your site...</p>
        </div>
      </div>
    );
  }

  const { site } = ready;
  const unsaved = site.id === '';
  const palette = draft.edits.palette ?? spec.palette.colors;
  const fieldsChanged = patternsChanged(patternSlots, draft.edits.patterns);

  // A whole palette at a time, from a rail row or the dialog's Save, fitted to
  // the spec's role count (the shape the page reads). The template's own row
  // is the way back: it writes the class rule's own values inline.
  const setPalette = (colors: string[]) => {
    const next = spec.palette.colors.map((authored, index) => colors[index] ?? authored);
    const document = { ...draft, edits: { ...draft.edits, palette: next } };
    touch(document);
    applyDocument(document);
  };

  const shuffle = () => {
    if (shuffling) return;

    const patterns = shuffleDesigns(patternSlots, draft.edits.patterns, designs);
    const document = { ...draft, edits: { ...draft.edits, patterns } };

    setShuffling(true);
    touch(document);
    applyDocument(document);

    shuffleTimer.current = window.setTimeout(() => {
      toaster.add({ title: `New patterns: ${drawnNames(patternSlots, patterns, designs)}.` });
      setShuffling(false);
    }, SHUFFLE_BEAT_MS);
  };

  const resetPatterns = () => {
    const { patterns: _dropped, ...rest } = draft.edits;
    const next = { ...draft, edits: rest };

    touch(next);
    // A swap removed the field's authored options and seed, which a plan
    // cannot put back, so the canvas is rebuilt from the package.
    rebuild(next);
    toaster.add({ title: `Back to ${site.templateName}'s own patterns.` });
  };

  // One field at a time: a pick applies live, and putting the field back to
  // the template's own design rebuilds, since only the package still holds
  // the authored seed and options.
  const setFieldDesign = (slot: PatternSlot, slug: string) => {
    const patterns = pickDesign(patternSlots, draft.edits.patterns, slot.id, slug);
    const { patterns: _dropped, ...rest } = draft.edits;
    const document = { ...draft, edits: patterns ? { ...rest, patterns } : rest };

    touch(document);

    if (slug === slot.config.slug) {
      rebuild(document);
      return;
    }

    applyDocument(document);
  };

  const resetFieldDesign = (slot: PatternSlot) => setFieldDesign(slot, slot.config.slug);

  // From the rail: a field's row, or its pencil on the way to the library.
  const showField = (slot: PatternSlot) => {
    shownField.current = slot;
    scrollToField(frameRef.current, slot, true);
  };

  // The handlers below update state functionally: the rail stays live while a
  // request is out, and spreading this render's stale `ready` back in would
  // undo a change made meanwhile (a reset during a rename, say).
  const save = async (saving: EditsDocument = draft, title: string = site.title, fromGate = false) => {
    // Only saving asks for an account; a draft is anyone's until then.
    if (unsaved && !user) {
      setGateOpen(true);
      track('save-gate', site.slug);
      return;
    }

    setSaveState('saving');

    try {
      // A draft's first Save is the site's making, with this document as
      // revision 1; after it, the page is the site's own, at its own address.
      const { revision, id } = unsaved
        ? await apiFetch<{ id: string; revision: number }>('/api/studio/sites', {
            method: 'POST',
            body: JSON.stringify({ slug: site.slug, edits: saving, title }),
          })
        : {
            id: site.id,
            ...(await apiFetch<{ revision: number }>(
              `/api/studio/sites/${encodeURIComponent(site.id)}/revisions`,
              { method: 'POST', body: JSON.stringify({ edits: saving }) }
            )),
          };

      if (unsaved) {
        adopted.current = id;
        window.history.replaceState(null, '', `/studio/site/?id=${encodeURIComponent(id)}`);
      }

      setState((prev) =>
        prev.status !== 'ready'
          ? prev
          : {
              ...prev,
              site: {
                ...prev.site,
                id,
                revisions: revision,
                palette: saving.edits.palette ?? prev.spec.palette.colors,
                latest: {
                  ...prev.site.latest,
                  n: revision,
                  edits: saving,
                  source: 'manual',
                  instruction: null,
                  createdAt: new Date().toISOString(),
                },
              },
            }
      );
      // "Saved" only if nothing changed while the request was out; a change
      // in flight has already marked the draft dirty.
      setSaveState((current) => (current === 'saving' ? 'saved' : current));
      void refreshSavedTemplates();

      if (fromGate) {
        track('gate-save', site.slug);
        toaster.add({ title: 'Saved to your account. Find it under Your templates.' });
      } else {
        toaster.add({ title: `Saved. Your customized ${site.templateName} now uses these edits.` });
      }
    } catch (cause) {
      setSaveState('dirty');
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not save.' });
    }
  };

  saveRef.current = save;

  const rename = async (title: string) => {
    // A draft keeps its name until the Save that makes it, and naming it is
    // a change worth saving.
    if (unsaved) {
      setState((prev) => (prev.status === 'ready' ? { ...prev, site: { ...prev.site, title } } : prev));
      setSaveState('dirty');
      return;
    }

    try {
      await apiFetch<{ title: string }>(`/api/studio/sites/${encodeURIComponent(site.id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ title }),
      });
      setState((prev) => (prev.status === 'ready' ? { ...prev, site: { ...prev.site, title } } : prev));
      toaster.add({ title: 'Site name saved.' });
    } catch (cause) {
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not rename the site.' });
    }
  };

  const downloadHtml = async () => {
    setDownloading(true);

    try {
      const { bytes, problems } = await buildCustomisedArchive({ slug: site.slug, spec, edits: draft });
      const shell = problems.some((problem) => problem.level === 'error' && problem.path === 'runtime');

      saveArchive(bytes, `${archiveNameFor(site.title)}-html.zip`);
      setDownloadedDraft(draft);
      toaster.add({
        title: shell
          ? 'Downloaded, but the package has changed shape and its patterns may not draw.'
          : `Downloaded ${site.title} as static HTML and CSS`,
      });
    } catch (cause) {
      toaster.add({ title: cause instanceof Error ? cause.message : 'Could not build the download.' });
    } finally {
      setDownloading(false);
    }
  };

  const downloadReact = async () => {
    setDownloading(true);

    try {
      const { bytes, problems } = await buildCustomisedReactArchive({ slug: site.slug, spec, edits: draft });
      const leftOut = problems.some((problem) => problem.path === 'text' || problem.path === 'images');

      saveArchive(bytes, `${archiveNameFor(site.title)}-react.zip`);
      setDownloadedDraft(draft);
      toaster.add({
        title: leftOut
          ? `Downloaded ${site.title} as a React project, with your colors and patterns (its README says what else).`
          : `Downloaded ${site.title} as a React project`,
      });
    } catch (cause) {
      toaster.add({ title: cause instanceof Error ? cause.message : 'Could not build the download.' });
    } finally {
      setDownloading(false);
    }
  };

  const patternEdit = (slot: PatternSlot): PatternEdit | undefined => draft.edits.patterns?.[slot.id];

  // The site as it stands, unsaved edits and all, alone in a tab of its own:
  // the same document the canvas draws, at a blob: address, so its <base>
  // carries the origin (lib/studioPreview.ts). Opened from the click itself,
  // or a popup blocker takes it. The address lives as long as this page does,
  // which is what lets the new tab be reloaded.
  const openInNewTab = () => {
    const { html } = buildPreviewDocument({
      html: ready.packaged,
      spec,
      edits: draft,
      slug: site.slug,
      origin: window.location.origin,
    });
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));

    if (openedUrl.current) URL.revokeObjectURL(openedUrl.current);
    openedUrl.current = url;
    window.open(url, '_blank');
  };

  // The phone's own share sheet (mail, messages, notes), or the clipboard
  // where there is none. The address opens this template, or this saved
  // site, in the customizer on a computer.
  const sendLink = async () => {
    const url = window.location.href;

    if (typeof navigator.share === 'function') {
      // A dismissed sheet rejects; that is the person's answer, not an error.
      await navigator.share({ title: `${site.title} on Tabbied`, url }).catch(() => undefined);
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toaster.add({ title: 'Link copied. Open it on a computer to customize.' });
    } catch {
      toaster.add({ title: `Open ${url} on a computer to customize.` });
    }
  };

  return (
    <>
      {/* Two notices this page owns, distinct from the engine's: a fallback
          revision is only the three-string rebrand, and drift is the pinned
          template no longer matching the packaged one. */}
      {site.latest.source === 'fallback' ? (
        <p className={styles.notice} role="status">
          The model didn&apos;t return a usable page, so only the brand name,
          headline and tagline have been applied.
        </p>
      ) : null}
      {site.templateChanged ? (
        <p className={styles.notice} role="status">
          The {site.templateName} template has been updated since this site was
          made.{' '}
          {/* The list is PreviewNotices', just below, and it only exists when
              the engine refused part of the document. */}
          {ready.problems.some((problem) => problem.level === 'error' || problem.path === 'runtime')
            ? 'What no longer fits is listed below.'
            : 'Everything you changed still applies to it.'}
        </p>
      ) : null}
      <PreviewNotices problems={ready.problems} />

      <div className={site.mine ? styles.shell : styles.shellWide}>
        {site.mine ? (
          <div className={styles.rail}>
            <SiteRail
              title={site.title}
              onRename={(title) => void rename(title)}
              spec={spec}
              designs={designs}
              templateName={site.templateName}
              palette={palette}
              onPalette={setPalette}
              patternSlots={patternSlots}
              designOn={(slot) => designOn(slot, patternEdit(slot))}
              fieldPalette={(slot) =>
                // The planner's own precedence (tabbied-templates plan.ts): an
                // explicit override, else the page's palette through the
                // field's roles, else what the template authored.
                patternEdit(slot)?.palette ??
                (slot.paletteRoles ? resolvePaletteRoles(slot.paletteRoles, palette) : slot.config.palette)
              }
              fieldSeed={(slot) => patternEdit(slot)?.seed ?? slot.config.seed}
              fieldChanged={(slot) => patternChanged(slot, patternEdit(slot))}
              onFieldDesign={setFieldDesign}
              onResetField={resetFieldDesign}
              onShowField={showField}
              fieldGround={(slot) => groundOf(frameRef.current, slot)}
              patternsChanged={fieldsChanged}
              shuffling={shuffling}
              onShuffle={shuffle}
              onResetPatterns={resetPatterns}
              saveState={saveState}
              onSave={() => void save()}
            />
          </div>
        ) : null}

        {/* Shown only where the rail is not (see SiteWorkspace.module.css). */}
        {site.mine ? (
          <div className={styles.smallNotice} role="status">
            <span className={styles.smallNoticeIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8" />
                <path d="M12 16v4" />
              </svg>
            </span>
            <span className={styles.smallNoticeText}>
              Customizing works on a larger screen. From here you can preview and download.
            </span>
            {/* Most visitors on a phone came from a link; this is how they
                take the template to a computer without hunting for it. */}
            <button type="button" className={styles.smallNoticeShare} onClick={() => void sendLink()}>
              Send yourself the link
            </button>
          </div>
        ) : null}

        <div className={styles.stage}>
          <CustomizerBar
            mine={site.mine}
            template={unsaved ? site.slug : undefined}
            downloading={downloading}
            onDownloadHtml={() => void downloadHtml()}
            onDownloadReact={() => void downloadReact()}
            slug={site.slug}
            templateName={site.templateName}
            colors={palette}
            unsaved={saveState === 'dirty' || saveState === 'saving'}
            editedAt={unsaved ? null : site.latest.createdAt}
            onOpenInNewTab={openInNewTab}
          />
          <div className={styles.frame}>
            <div className={styles.chrome}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.pill}>
                {/* The template is named only when the site is called something else. */}
                {site.title === site.templateName ? site.title : `${site.title} on ${site.templateName}`}
                {site.latest.n > 1 ? ` (revision ${site.latest.n})` : ''}
              </span>
              <button
                type="button"
                className={styles.openTab}
                title="Open in new tab"
                aria-label="Open in new tab"
                onClick={openInNewTab}
              >
                <ExternalLink size={15} strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.canvas}>
              <iframe
                key={canvasKey}
                ref={frameRef}
                className={styles.iframe}
                title={`${site.title} - built on the ${site.templateName} template`}
                srcDoc={ready.html}
                onLoad={(event) => {
                  if (shownField.current) scrollToField(event.currentTarget, shownField.current, false);
                }}
                // `allow-same-origin` is required: with an opaque origin the
                // same-origin runtime import is blocked and every pattern is
                // missing. See PreviewFrame for what stays denied, which holds
                // until user-supplied markup or images enter this document.
                sandbox="allow-scripts allow-same-origin"
              />
              {shuffling ? (
                <div className={styles.veil} role="status">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                  Generating patterns...
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <SaveGate
        open={gateOpen}
        onOpenChange={setGateOpen}
        templateName={site.templateName}
        next={`/studio/customize/?slug=${site.slug}`}
        onLeave={() => stashPendingSave({ slug: site.slug, title: site.title, edits: draft })}
      />
      <Toaster />
    </>
  );
}
