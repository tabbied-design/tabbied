'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import GalleryLink from './GalleryLink';
import BrowserBar from './MockBrowser';
import type { MakeItYoursView } from './homeShowcase';
import t from './HomePage.module.css';
import styles from './MakeItYours.module.css';

// "Make any template your own.": a real template, and a toolbar along its
// foot that recolors it and swaps its pattern, the two things the customizer
// changes, done the way the customizer does them. The page in the window is
// the template's download (/downloads/<slug>/), drawn by the customizer's
// same-origin runtime and edited by the same engine (lib/studioPreview.ts,
// tabbied-templates), so a palette here is the palette Download would ship.
//
// It costs nothing until it is near the screen: until then, and wherever the
// package cannot be fetched (a dev server that has not run `npm run build`),
// the window shows the template's screenshot, and the toolbar's choices wait
// for the page to arrive.

/** The template's own palette and patterns are the first option in each row. */
const OWN = 0;

const keyOf = (palette: number, design: number) => `${palette}:${design}`;

/** The width the page is laid out at before it is scaled into the window. */
const pageWidth = (box: number) => (box < 640 ? 800 : 1280);

type Live = {
  /** The preview document, built from the package with the choices made so far. */
  html: string;
  /** Which choices those were, as `palette:design`. */
  built: string;
  /** Plan the choices against the page in the frame and redraw its patterns. */
  apply: (frame: HTMLIFrameElement, palette: number, design: number) => void;
};

type FrameWindow = Window & { __tabbied?: { rehydrate: () => void } };

export default function MakeItYours({ template, palettes, designs }: MakeItYoursView) {
  const [paletteIndex, setPaletteIndex] = useState(OWN);
  const [designIndex, setDesignIndex] = useState(OWN);
  const [wanted, setWanted] = useState(false);
  const [live, setLive] = useState<Live | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [fit, setFit] = useState<{ width: number; height: number; scale: number } | null>(null);
  const paletteLabel = useId();
  const patternLabel = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // What the loader builds its first document from, read when it gets there.
  const choices = useRef({ palette: OWN, design: OWN });

  useEffect(() => {
    choices.current = { palette: paletteIndex, design: designIndex };
  }, [paletteIndex, designIndex]);

  const paletteOptions = [{ name: `${template.name}'s own`, colors: template.colors }, ...palettes];
  const designOptions = [{ name: `${template.name}'s own`, preview: template.strip }, ...designs];
  const shownAs = `${paletteIndex === OWN ? 'its own palette' : `the ${paletteOptions[paletteIndex].name} palette`} and ${
    designIndex === OWN ? 'its own patterns' : `the ${designOptions[designIndex].name} pattern`
  }`;

  // Wanted once the section is within a screen or so of the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setWanted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // The page is laid out at a desktop (or, in a narrow window, a tablet)
  // width and scaled to the window, so it reads as that site in miniature.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      const width = pageWidth(box.clientWidth);
      const scale = box.clientWidth / width;
      setFit({ width, height: box.clientHeight / scale, scale });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);

    return () => observer.disconnect();
  }, []);

  // The engine, the runtime's shell and the package, fetched once, when wanted.
  useEffect(() => {
    if (!wanted) return;

    let current = true;

    (async () => {
      const [engine, preview, fitting] = await Promise.all([
        import('tabbied-templates'),
        import('lib/studioPreview'),
        import('lib/studioPalettes'),
      ]);
      const [specResponse, htmlResponse] = await Promise.all([
        fetch(preview.templateSpecUrl(template.slug)),
        fetch(`${preview.packagedTemplateUrl(template.slug)}index.html`),
      ]);

      if (!specResponse.ok || !htmlResponse.ok) return;

      const spec = (await specResponse.json()) as import('tabbied-templates').TemplateSpec;
      const packaged = await htmlResponse.text();
      const slots = spec.slots.filter(engine.isPatternSlot);
      const authored = spec.palette.colors;
      const fitted = [authored, ...palettes.map((palette) => fitPaletteTo(fitting.fitPalette, palette.colors, authored))];

      // The whole document every time, as the customizer plans it: the
      // palette (the template's own row writes its own colors back), and a
      // design on every field unless the template's own are wanted.
      const documentFor = (palette: number, design: number) => {
        const doc = engine.emptyEdits(spec);
        doc.edits.palette = [...fitted[palette]];
        if (design !== OWN) {
          doc.edits.patterns = Object.fromEntries(
            slots.map((slot, i) => [slot.id, { slug: designs[design - 1].slug, seed: `home${i}` }])
          );
        }
        return doc;
      };

      // A plan cannot swap a field back: the design it removed took its
      // authored seed and options with it, and only the package still has
      // them (the customizer rebuilds its frame for this). So each field is
      // put back from the package as it shipped, and the palette's plan,
      // run after, recolors it; the frame is not reloaded.
      const restoreFields = (doc: Document) => {
        const shipped = new DOMParser().parseFromString(packaged, 'text/html');

        for (const slot of slots) {
          const selector = engine.selectorForSlot(slot);
          const fresh = shipped.querySelectorAll(selector);

          doc.querySelectorAll(selector).forEach((field, i) => {
            if (fresh[i]) field.replaceWith(doc.importNode(fresh[i], true));
          });
        }
      };

      const { palette, design } = choices.current;
      // Whether the page in the frame wears designs of ours, which a return
      // to the template's own has to undo.
      let swapped = design !== OWN;
      const built = preview.buildPreviewDocument({
        html: packaged,
        spec,
        edits: palette === OWN && design === OWN ? engine.emptyEdits(spec) : documentFor(palette, design),
        slug: template.slug,
      });

      if (!current) return;

      setLive({
        html: built.html,
        built: keyOf(palette, design),
        apply: (frame, palette, design) => {
          const doc = frame.contentDocument;
          const runtime = (frame.contentWindow as FrameWindow | null)?.__tabbied;
          if (!doc || !runtime) return;

          if (design === OWN && swapped) restoreFields(doc);
          swapped = design !== OWN;

          engine.applyPlan(doc, engine.planEdits(spec, documentFor(palette, design)));
          runtime.rehydrate();
        },
      });
    })().catch(() => {
      // No package (an unbuilt dev server) or no network: the screenshot stays.
    });

    return () => {
      current = false;
    };
  }, [wanted, template.slug, palettes, designs]);

  // The choices the page in the frame shows. One made before the page was
  // built is in its document; one made after is planned against it live,
  // once it has drawn.
  const applied = useRef<string | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!live || !drawn || !frame) return;

    const key = keyOf(paletteIndex, designIndex);
    if (applied.current === key) return;
    applied.current = key;

    live.apply(frame, paletteIndex, designIndex);
  }, [live, drawn, paletteIndex, designIndex]);

  const onFrameLoad = () => {
    applied.current = live?.built ?? null;
    // The runtime mounts the patterns as a module, after `load`: a beat
    // before showing the page keeps the screenshot up until they have drawn.
    window.setTimeout(() => setDrawn(true), 700);
  };

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="make-it-yours-title">
      <div className={styles.inner}>
        <h2 id="make-it-yours-title" className={t.title}>
          Make any template your own.
        </h2>
        <p className={`${t.lede} ${styles.lede}`}>
          Change the palette. Swap the pattern. Download it as HTML/CSS or React.
        </p>

        <div className={styles.site}>
          <BrowserBar domain={`tabbied.com/templates/${template.slug}`} className={styles.bar} />
          <div ref={boxRef} className={styles.canvas} style={{ backgroundColor: template.colors[0] }}>
            <img
              className={styles.shot}
              src={template.shot}
              width={960}
              height={720}
              alt=""
              loading="lazy"
              decoding="async"
            />
            {live && fit ? (
              <iframe
                ref={frameRef}
                className={styles.frame}
                data-drawn={drawn ? '' : undefined}
                title={`${template.name}, recolored live`}
                srcDoc={live.html}
                onLoad={onFrameLoad}
                // A picture of the page: it takes no focus and no pointer, so
                // the link over it is what a click or a tab reaches.
                tabIndex={-1}
                aria-hidden="true"
                inert
                // `allow-same-origin` so the same-origin runtime can load, as in
                // the customizer (components/studio/PreviewFrame.tsx).
                sandbox="allow-scripts allow-same-origin"
                style={
                  {
                    width: fit.width,
                    height: fit.height,
                    transform: `scale(${fit.scale})`,
                  } as CSSProperties
                }
              />
            ) : null}
          </div>
          {/* Over the window rather than around it: a link may not hold an iframe. */}
          <Link
            href={template.href}
            prefetch={false}
            className={styles.siteLink}
            aria-label={`Preview ${template.name}, ${template.kind} template, shown here in ${shownAs}`}
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.group}>
            <span className={styles.label} id={paletteLabel}>
              Palette
            </span>
            <div className={styles.options} role="group" aria-labelledby={paletteLabel}>
              {paletteOptions.map((option, k) => (
                <button
                  key={option.name}
                  type="button"
                  className={styles.swatch}
                  style={{ '--a': option.colors[0], '--b': option.colors[1] ?? option.colors[0] } as CSSProperties}
                  aria-label={option.name}
                  title={option.name}
                  aria-pressed={k === paletteIndex}
                  onClick={() => {
                    setWanted(true);
                    setPaletteIndex(k);
                  }}
                />
              ))}
            </div>
          </div>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.group}>
            <span className={styles.label} id={patternLabel}>
              Pattern
            </span>
            <div className={styles.options} role="group" aria-labelledby={patternLabel}>
              {designOptions.map((option, k) => (
                <button
                  key={option.name}
                  type="button"
                  className={styles.thumb}
                  aria-label={option.name}
                  title={option.name}
                  aria-pressed={k === designIndex}
                  onClick={() => {
                    setWanted(true);
                    setDesignIndex(k);
                  }}
                >
                  <img src={option.preview} width={80} height={64} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
          <GalleryLink href="/templates" className={styles.start}>
            Start with your own template
          </GalleryLink>
        </div>
      </div>
    </section>
  );
}

/** A library palette fitted to the template's roles, as the customizer's rail fits it. */
function fitPaletteTo(
  fitPalette: (source: readonly string[], authored: readonly string[]) => string[],
  source: readonly string[],
  authored: readonly string[]
): string[] {
  const fitted = fitPalette(source, authored);
  return authored.map((color, index) => fitted[index] ?? color);
}
