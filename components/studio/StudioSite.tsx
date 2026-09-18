'use client';

// The customizer: a site's latest revision on its template, and the two things
// a person changes about it in this release - its colours and its patterns.
//
// Everything a person does here is planned and applied by the edits engine
// against the iframe's document, live, the same engine the canvas was drawn
// with. A colour change plans the properties and the pattern-host rewrites,
// then asks the runtime inside the iframe to draw its patterns again, since a
// rewritten attribute is not a re-render. A shuffle swaps every field's design
// the same way. Saving posts the whole document as the next revision, and the
// download rebuilds the packaged zip with that document in it.
//
// What is deliberately not here: editing words and pictures. The Worker still
// holds the routes for both (revise, images), and the document still carries
// whatever text Studio wrote for a generated site; the rail's Content tab says
// they are not edited here yet, which is the first release's scope.
//
// Nor is the editor offered on a phone. Below 768px the rail is hidden, a
// notice says customizing wants a larger screen, and the page is the site
// alone, full bleed, to preview and download.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  applyPlan,
  isPatternSlot,
  planEdits,
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
import { designOn, patternsChanged, shuffleDesigns } from 'lib/studioPatterns';
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

export default function StudioSite({ designs }: { designs: readonly DesignChoice[] }) {
  const searchParams = useSearchParams();
  const siteId = searchParams.get('id');

  const [state, setState] = useState<State>({ status: 'loading' });
  const [draft, setDraft] = useState<EditsDocument | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('clean');
  const [downloading, setDownloading] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Bumped to remount the iframe. React diffs `srcDoc` against the prop it
  // last rendered, not against the live document: a rebuilt page that is
  // byte-for-byte the one first loaded (the template's own patterns, put back
  // after a shuffle) would otherwise be no change at all, and the frame would
  // keep the attributes the live edits wrote into it.
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
    let live = true;

    setState({ status: 'loading' });

    (async (): Promise<State> => {
      if (!siteId) {
        return { status: 'error', message: 'That site link is incomplete.' };
      }

      const site = await apiFetch<SiteDocument>(`/api/studio/sites/${encodeURIComponent(siteId)}`);

      const [specResponse, htmlResponse] = await Promise.all([
        fetch(templateSpecUrl(site.slug)),
        fetch(`${packagedTemplateUrl(site.slug)}index.html`),
      ]);

      if (!specResponse.ok || !htmlResponse.ok) {
        return { status: 'error', message: `The ${site.templateName} template is no longer available.` };
      }

      const spec = (await specResponse.json()) as TemplateSpec;
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
  }, [siteId]);

  const ready = state.status === 'ready' ? state : null;
  const spec = ready?.spec ?? null;

  const patternSlots = useMemo<PatternSlot[]>(() => spec?.slots.filter(isPatternSlot) ?? [], [spec]);

  /**
   * Rebuild the canvas from the package with a document, and remount it. The
   * way back when a live plan cannot express the change (a reset, which has
   * to put authored options back) or has nowhere to run yet.
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
   * the iframe's document, and ask the runtime inside to draw its patterns
   * again. Whole, not the changed part: the planner gives a field's own
   * palette precedence over the brand palette only when both are in the
   * document it plans, so a palette change planned alone re-coloured a field
   * the saved document leaves alone, and the canvas disagreed with what Save
   * would store and Download would build. Text operations are idempotent, so
   * planning them again costs nothing. What the engine could not place is
   * reported with the page's other notices rather than dropped; before the
   * frame has loaded its document and runtime there is nothing to plan
   * against, so the canvas is rebuilt instead.
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
        <Link href="/account/sites/" className={styles.back} prefetch={false}>
          Custom sites
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
  const palette = draft.edits.palette ?? spec.palette.colors;
  const fieldsChanged = patternsChanged(patternSlots, draft.edits.patterns);

  // A whole palette at a time: a row in the rail, or the dialog's Save. The
  // spec's role count is the shape the page reads, so a shorter or longer
  // array never reaches the document. The template's own row is the way back
  // to its colours: they are written as inline properties, the same values
  // the class rule holds, so the page reads as it did.
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

    shuffleTimer.current = window.setTimeout(() => setShuffling(false), SHUFFLE_BEAT_MS);
  };

  const resetPatterns = () => {
    const { patterns: _dropped, ...rest } = draft.edits;
    const next = { ...draft, edits: rest };

    touch(next);
    // A swap removed the field's authored options and seed, which a plan of
    // the document without them cannot put back; the canvas is rebuilt from
    // the package instead, and remounted, since the rebuilt page may equal
    // the one already loaded.
    rebuild(next);
    toaster.add({ title: `Back to ${site.templateName}'s own patterns` });
  };

  // The handlers below update state functionally. Each closes over the render
  // it was created in, and the rail stays live while its request is out: a
  // palette click during a save, or a reset during a rename, used to be
  // overwritten by the stale `ready` the response then spread back in, which
  // put the shuffled patterns back on a canvas the person had just reset.
  const save = async () => {
    const saving = draft;

    setSaveState('saving');

    try {
      const { revision } = await apiFetch<{ revision: number }>(
        `/api/studio/sites/${encodeURIComponent(site.id)}/revisions`,
        { method: 'POST', body: JSON.stringify({ edits: saving }) }
      );

      setState((prev) =>
        prev.status !== 'ready'
          ? prev
          : {
              ...prev,
              site: {
                ...prev.site,
                revisions: revision,
                palette: saving.edits.palette ?? prev.spec.palette.colors,
                latest: {
                  ...prev.site.latest,
                  n: revision,
                  edits: saving,
                  source: 'manual',
                  instruction: null,
                },
              },
            }
      );
      // "Saved" only if nothing changed while the request was out: a change
      // in flight has already marked the draft dirty, and the button saying
      // "Saved to your custom sites" over unsaved changes was a lie.
      setSaveState((current) => (current === 'saving' ? 'saved' : current));
      toaster.add({ title: 'Saved. Find it under Custom sites.' });
    } catch (cause) {
      setSaveState('dirty');
      toaster.add({ title: cause instanceof ApiError ? cause.message : 'Could not save.' });
    }
  };

  const rename = async (title: string) => {
    try {
      await apiFetch<{ title: string }>(`/api/studio/sites/${encodeURIComponent(site.id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ title }),
      });
      setState((prev) => (prev.status === 'ready' ? { ...prev, site: { ...prev.site, title } } : prev));
      toaster.add({ title: 'Site name saved' });
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
        downloading={downloading}
        onDownloadHtml={() => void downloadHtml()}
        reactHref={`/downloads/${site.slug}-react.zip`}
      />

      {/* Two notices this page owns, distinct from the engine's. A fallback
          revision is the three-string rebrand, said out loud rather than passed
          off as the full document. Drift is the pinned template no longer
          matching the packaged one - the document still applies, but a person
          should hear it here, not from a missing headline. */}
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
              patternsChanged={fieldsChanged}
              shuffling={shuffling}
              onShuffle={shuffle}
              onResetPatterns={resetPatterns}
              saveState={saveState}
              onSave={() => void save()}
            />
          </div>
        ) : null}

        {/* Shown only where the rail is not (see SiteWorkspace.module.css):
            on a phone the editor is a larger screen's, and this is the page
            to preview and download from. */}
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
                {site.title} on {site.templateName}
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
                // `allow-same-origin` is required, not lazy: without it the
                // document gets an opaque origin and the same-origin runtime
                // import is blocked as cross-origin, so the page renders with
                // every pattern missing. What stays denied is what this page
                // actually has: the packaged template's `<form action="#">`
                // and its `<a href="#">` links cannot navigate the top frame,
                // submit, or open a popup. See PreviewFrame for the whole
                // reasoning, which holds until user-supplied markup or images
                // enter this document.
                sandbox="allow-scripts allow-same-origin"
              />
              {shuffling ? (
                <div className={styles.veil} role="status">
                  Drawing new patterns...
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
