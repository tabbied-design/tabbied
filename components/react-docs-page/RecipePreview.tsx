'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import type { PatternDefinition } from 'tabbied';
import { ortho, quilt, radius, vitrail } from 'tabbied/patterns';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { RECIPE_PREVIEWS, type RecipePreviewSpec } from './examples/recipes/previews';
import styles from './ReactDocs.module.css';

// The live result above a recipe's file: what that file draws, drawn by the
// package, with its controls working. One preview per recipe id serves every
// setup's page, since each setup's recipe of an id draws the same thing; the
// designs, seeds, palettes and boxes come from examples/recipes/previews.ts,
// which the tests hold to every recipe's code. Each pattern is built only as
// it nears the viewport, and its box is drawn before, so nothing shifts.

const DESIGNS: Record<string, PatternDefinition> = { radius, quilt, vitrail, ortho };

const MOUNT_MARGIN = '400px';

/** True once `ref`'s element has come within MOUNT_MARGIN of the viewport. */
function useNear(ref: { current: Element | null }) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return near;
}

type LiveProps = {
  pattern: PatternDefinition;
  seed?: string;
  palette?: string[];
  options?: Record<string, number>;
  density?: number;
  redrawInterval?: number;
  paused?: boolean;
  ariaLabel?: string;
  /** The box, as the recipe sizes it. */
  style?: CSSProperties;
  className?: string;
  /** Painted until the pattern mounts, and behind a transparent ground. */
  ground?: string;
  onReady?: () => void;
  handle?: Ref<TabbiedPatternHandle>;
};

/** A pattern in its box, built once the box is near. */
function Live({ pattern, style, className, ground, handle, ariaLabel, ...config }: LiveProps) {
  const frame = useRef<HTMLDivElement>(null);
  const near = useNear(frame);
  const background = ground ?? config.palette?.[0] ?? pattern.palette[0];

  return (
    <div
      ref={frame}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', width: '100%', backgroundColor: background, ...style }}
    >
      {near ? (
        <TabbiedPattern
          ref={handle}
          pattern={pattern}
          {...config}
          decorative={!ariaLabel}
          ariaLabel={ariaLabel}
          style={{ position: 'absolute', inset: 0 }}
        />
      ) : null}
    </div>
  );
}

const box = (spec: RecipePreviewSpec): CSSProperties => ({
  ...(spec.height ? { height: spec.height } : {}),
  ...(spec.width ? { maxWidth: spec.width } : {}),
  ...(spec.aspectRatio ? { aspectRatio: spec.aspectRatio } : {}),
});

const design = (spec: RecipePreviewSpec, index = 0) => DESIGNS[spec.designs[index]];

function Button({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className={styles.demoBtn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className={styles.previewRow}>{children}</div>;
}

// ---- the kinds of preview

function Hero({ spec }: { spec: RecipePreviewSpec }) {
  return (
    <div className={styles.previewHero}>
      <Live
        pattern={design(spec)}
        seed={spec.seeds?.[0]}
        palette={spec.palettes?.[0]}
        density={spec.density}
        style={{ position: 'absolute', inset: 0, zIndex: -1, width: 'auto' }}
      />
      <p className={styles.previewHeadline}>Patterns for every page</p>
      <p>The section is as tall as this copy; the pattern fills it.</p>
    </div>
  );
}

function Cards({ spec, seeds, label }: { spec: RecipePreviewSpec; seeds: string[]; label: (i: number) => string }) {
  return (
    <div className={styles.previewCards}>
      {seeds.map((seed, i) => (
        <div key={seed}>
          <Live pattern={design(spec)} seed={seed} style={box(spec)} />
          <p className={styles.previewCardTitle}>{label(i)}</p>
        </div>
      ))}
    </div>
  );
}

const ORDINALS = ['First', 'Second', 'Third'];

function Theme({ spec }: { spec: RecipePreviewSpec }) {
  const [dark, setDark] = useState(true);
  const [darkPalette, lightPalette] = spec.palettes!;

  return (
    <>
      <Live pattern={design(spec)} seed={spec.seeds?.[0]} palette={dark ? darkPalette : lightPalette} style={box(spec)} />
      <Row>
        <Button onClick={() => setDark((d) => !d)}>Switch theme</Button>
        <span className={styles.previewNote}>{dark ? 'Dark' : 'Light'}</span>
      </Row>
    </>
  );
}

function SystemTheme({ spec }: { spec: RecipePreviewSpec }) {
  const [dark, setDark] = useState(false);
  const [darkPalette, lightPalette] = spec.palettes!;

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setDark(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <>
      <Live pattern={design(spec)} seed={spec.seeds?.[0]} palette={dark ? darkPalette : lightPalette} style={box(spec)} />
      <Row>
        <span className={styles.previewNote}>
          Your system is set to {dark ? 'dark' : 'light'}; change it and this follows.
        </span>
      </Row>
    </>
  );
}

function Shuffle({ spec }: { spec: RecipePreviewSpec }) {
  const handle = useRef<TabbiedPatternHandle>(null);

  return (
    <>
      <Live pattern={design(spec)} style={box(spec)} handle={handle} />
      <Row>
        <Button onClick={() => handle.current?.redraw()}>Shuffle</Button>
      </Row>
    </>
  );
}

function Picker({ spec }: { spec: RecipePreviewSpec }) {
  const [slug, setSlug] = useState(spec.designs[0]);

  return (
    <>
      <Row>
        <label className={styles.previewField}>
          Design
          <select value={slug} onChange={(event) => setSlug(event.target.value)} className={styles.previewSelect}>
            {spec.designs.map((name) => (
              <option key={name} value={name}>
                {DESIGNS[name].name}
              </option>
            ))}
          </select>
        </label>
      </Row>
      <Live pattern={DESIGNS[slug]} seed={spec.seeds?.[0]} style={box(spec)} ground={spec.ground} />
    </>
  );
}

function Controls({ spec }: { spec: RecipePreviewSpec }) {
  const [frequency, setFrequency] = useState(spec.options?.frequency ?? 0.8);
  const [density, setDensity] = useState(spec.density ?? 0.5);

  return (
    <>
      <Live
        pattern={design(spec)}
        seed={spec.seeds?.[0]}
        options={{ frequency }}
        density={density}
        style={box(spec)}
      />
      <Row>
        <label className={styles.previewField}>
          Frequency
          <input
            type="range"
            min="0.2"
            max="1"
            step="0.1"
            value={frequency}
            onChange={(event) => setFrequency(Number(event.target.value))}
          />
        </label>
        <label className={styles.previewField}>
          Density
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={density}
            onChange={(event) => setDensity(Number(event.target.value))}
          />
        </label>
      </Row>
    </>
  );
}

function Ambient({ spec }: { spec: RecipePreviewSpec }) {
  const [paused, setPaused] = useState(false);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Live pattern={design(spec)} redrawInterval={spec.redrawInterval} paused={paused} style={box(spec)} />
      <Row>
        <span className={styles.previewNote}>
          {paused ? 'Paused while the pointer is over it.' : `A new seed every ${spec.redrawInterval! / 1000} seconds.`}
        </span>
      </Row>
    </div>
  );
}

function Export({ spec }: { spec: RecipePreviewSpec }) {
  const handle = useRef<TabbiedPatternHandle>(null);
  const [ready, setReady] = useState(false);

  return (
    <>
      <Live pattern={design(spec)} seed={spec.seeds?.[0]} style={box(spec)} handle={handle} onReady={() => setReady(true)} />
      <Row>
        <Button disabled={!ready} onClick={() => handle.current?.exportImage({ scale: 2, download: true, name: 'banner' })}>
          Download PNG
        </Button>
        <Button disabled={!ready} onClick={() => handle.current?.exportSvg({ download: true, name: 'banner' })}>
          Download SVG
        </Button>
      </Row>
    </>
  );
}

function Upload({ spec }: { spec: RecipePreviewSpec }) {
  const handle = useRef<TabbiedPatternHandle>(null);
  const [sent, setSent] = useState<string | null>(null);

  const save = async () => {
    const result = await handle.current?.exportSvg();
    if (result) setSent(`${(new Blob([result.svg]).size / 1024).toFixed(1)} KB`);
  };

  return (
    <>
      <Live pattern={design(spec)} seed={spec.seeds?.[0]} style={box(spec)} handle={handle} />
      <Row>
        <Button onClick={save}>Save artwork</Button>
        <span className={styles.previewNote}>
          {sent
            ? `${sent} of SVG, ready to POST to /api/artwork (this preview keeps it).`
            : 'Exports the SVG your server would receive.'}
        </span>
      </Row>
    </>
  );
}

function Spa({ spec }: { spec: RecipePreviewSpec }) {
  const [view, setView] = useState<'home' | 'about'>('home');

  return (
    <>
      <Row>
        <Button onClick={() => setView('home')}>Home</Button>
        <Button onClick={() => setView('about')}>About</Button>
      </Row>
      {view === 'home' ? (
        <Live pattern={design(spec)} redrawInterval={spec.redrawInterval} style={box(spec)} />
      ) : (
        <div className={styles.previewEmpty} style={box(spec)}>
          The home view unmounted; its pattern and its timer went with it.
        </div>
      )}
    </>
  );
}

function Later({ spec }: { spec: RecipePreviewSpec }) {
  const [pages, setPages] = useState(0);

  return (
    <>
      <div className={styles.previewStack}>
        {Array.from({ length: pages }, (_, i) => (
          <Live key={i} pattern={design(spec)} seed={`page-${i + 1}`} style={box(spec)} />
        ))}
      </div>
      <Row>
        <Button onClick={() => setPages((n) => n + 1)}>Load more</Button>
        <span className={styles.previewNote}>{pages ? `${pages} loaded` : 'Nothing loaded yet.'}</span>
      </Row>
    </>
  );
}

function Preview({ spec }: { spec: RecipePreviewSpec }) {
  const live = (index = 0, extra: Partial<LiveProps> = {}) => (
    <Live
      pattern={design(spec, index)}
      seed={spec.seeds?.[0]}
      palette={spec.palettes?.[0]}
      options={spec.options}
      density={spec.density}
      redrawInterval={spec.redrawInterval}
      ground={spec.ground}
      style={box(spec)}
      {...extra}
    />
  );

  switch (spec.kind) {
    case 'hero':
      return <Hero spec={spec} />;
    case 'cards':
      return <Cards spec={spec} seeds={spec.seeds!} label={(i) => `${ORDINALS[i]} post`} />;
    case 'divider':
      return (
        <>
          <p className={styles.previewText}>The end of one section.</p>
          {live()}
          <p className={styles.previewText}>The start of the next.</p>
        </>
      );
    case 'photo':
      return <div className={styles.previewPhoto}>{live(0, { ground: 'transparent' })}</div>;
    case 'brand':
      return (
        <div className={styles.previewBrand}>
          {spec.designs.map((slug, i) => (
            <div key={slug}>{live(i)}</div>
          ))}
        </div>
      );
    case 'classes':
      return live(0, { className: styles.previewBanner, style: {} });
    case 'labelled':
      return (
        <figure className={styles.previewFigure}>
          {live(0, { ariaLabel: 'Quarter circles in blue and green, packed edge to edge' })}
          <figcaption>Radius, seed k9Pz.</figcaption>
        </figure>
      );
    case 'theme':
      return <Theme spec={spec} />;
    case 'system-theme':
      return <SystemTheme spec={spec} />;
    case 'shuffle':
      return <Shuffle spec={spec} />;
    case 'picker':
    case 'lazy':
      return <Picker spec={spec} />;
    case 'controls':
      return <Controls spec={spec} />;
    case 'ambient':
      return <Ambient spec={spec} />;
    case 'export':
      return <Export spec={spec} />;
    case 'upload':
      return <Upload spec={spec} />;
    case 'spa':
      return <Spa spec={spec} />;
    case 'later':
      return <Later spec={spec} />;
    case 'pair':
      return <div className={styles.previewStack}>{spec.designs.map((slug, i) => <div key={slug}>{live(i)}</div>)}</div>;
    default:
      return live();
  }
}

/** Layouts span the card as they span a page; a single pattern and its controls are capped. */
const WIDE: ReadonlySet<RecipePreviewSpec['kind']> = new Set(['hero', 'cards', 'divider', 'photo', 'brand', 'classes']);

/** The live result of the recipe `id`, or nothing for a recipe with no preview. */
export default function RecipePreview({ id }: { id: string }) {
  const spec = RECIPE_PREVIEWS[id];
  if (!spec) return null;

  return (
    <div className={styles.recipePreview}>
      <span className={styles.previewLabel}>Live result</span>
      <div className={WIDE.has(spec.kind) ? styles.previewBody : `${styles.previewBody} ${styles.previewNarrow}`}>
        <Preview spec={spec} />
      </div>
    </div>
  );
}
