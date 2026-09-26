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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  applyPlan,
  emptyEdits,
  isPatternSlot,
  planEdits,
  resolvePaletteRoles,
  type EditsDocument,
  type PatternEdit,
  type PatternSlot,
  type Problem,
  type TemplateSpec,
} from 'tabbied-templates';
import type { DesignChoice } from 'lib/designCatalog';
import type { SiteDocument } from 'lib/studioDocument';
import { apiFetch, ApiError } from 'lib/apiFetch';
import { archiveNameFor, buildCustomisedArchive, saveArchive } from 'lib/studioDownload';
import { designOn, patternChanged, patternsChanged, pickDesign, shuffleDesigns } from 'lib/studioPatterns';
import {
  buildPreviewDocument,
  packagedTemplateUrl,
  templateSpecUrl,
} from 'lib/studioPreview';
import Toaster, { toaster } from 'components/Toaster';
import CustomizerBar from './CustomizerBar';
import { PreviewNotices } from './PreviewFrame';
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
  const [shuffling, setShuffling] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Bumped to remount the iframe. React diffs `srcDoc` against its last prop,
  // not the live document, so a rebuilt page identical to the first load (the
  // template's own patterns, put back after a shuffle) would otherwise keep
  // the attributes the live edits wrote into it.
  const [canvasKey, setCanvasKey] = useState(0);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const shuffleTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (shuffleTimer.current !== null) window.clearTimeout(shuffleTimer.current);
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
  // it until Save.
  useEffect(() => {
    if (saveState !== 'dirty') return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', warn);

    return () => window.removeEventListener('beforeunload', warn);
  }, [saveState]);

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

  const touch = (next: EditsDocument) => {
    setDraft(next);
    setSaveState('dirty');
  };

  if (state.status === 'error') {
    return (
      <p className={styles.notice} role="alert">
        {state.message}{' '}
        <Link href="/account/" className={styles.back} prefetch={false}>
          Your templates
        </Link>
        .
      </p>
    );
  }

  if (!ready || !draft || !spec) {
    return (
      <div className={styles.stage}>
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
      setShuffling(false);
      toaster.add({ title: `New patterns: ${drawnNames(patternSlots, patterns, designs)}.` });
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

  // The handlers below update state functionally: the rail stays live while a
  // request is out, and spreading this render's stale `ready` back in would
  // undo a change made meanwhile (a reset during a rename, say).
  const save = async () => {
    const saving = draft;

    setSaveState('saving');

    try {
      // A draft's first Save is the site's making, with this document as
      // revision 1; after it, the page is the site's own, at its own address.
      const { revision, id } = unsaved
        ? await apiFetch<{ id: string; revision: number }>('/api/studio/sites', {
            method: 'POST',
            body: JSON.stringify({ slug: site.slug, edits: saving, title: site.title }),
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
      toaster.add({ title: `Saved. Your customized ${site.templateName} now uses these edits.` });
    } catch (cause) {
      setSaveState('dirty');
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not save.' });
    }
  };

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

  const patternEdit = (slot: PatternSlot): PatternEdit | undefined => draft.edits.patterns?.[slot.id];

  return (
    <>
      <CustomizerBar
        mine={site.mine}
        template={unsaved ? site.slug : undefined}
        downloading={downloading}
        onDownloadHtml={() => void downloadHtml()}
        slug={site.slug}
        templateName={site.templateName}
        colors={palette}
        unsaved={saveState === 'dirty' || saveState === 'saving'}
        editedAt={unsaved ? null : site.latest.createdAt}
      />

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
          made. Anything that no longer fits is listed below.
        </p>
      ) : null}
      <PreviewNotices problems={ready.problems} />

      <div className={site.mine && !expanded ? styles.shell : styles.shellWide}>
        {site.mine && !expanded ? (
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
            <span>Customizing works on a larger screen. From here you can preview and download.</span>
          </div>
        ) : null}

        <div className={styles.stage}>
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
              {site.mine ? (
                <button
                  type="button"
                  className={styles.expand}
                  title={expanded ? 'Collapse view' : 'Expand view'}
                  aria-label={expanded ? 'Collapse view' : 'Expand view'}
                  aria-pressed={expanded}
                  onClick={() => setExpanded((value) => !value)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {expanded ? (
                      <>
                        <path d="M20 10h-6V4" />
                        <path d="M13.5 10.5 21 3" />
                        <path d="M4 14h6v6" />
                        <path d="M10.5 13.5 3 21" />
                      </>
                    ) : (
                      <>
                        <path d="M14 4h6v6" />
                        <path d="M20 4l-7.5 7.5" />
                        <path d="M10 20H4v-6" />
                        <path d="M4 20l7.5-7.5" />
                      </>
                    )}
                  </svg>
                </button>
              ) : null}
            </div>

            <div className={styles.canvas}>
              <iframe
                key={canvasKey}
                ref={frameRef}
                className={styles.iframe}
                title={`${site.title} - built on the ${site.templateName} template`}
                srcDoc={ready.html}
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

      <Toaster />
    </>
  );
}
