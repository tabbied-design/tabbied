// tabbied/react recipes for /docs/react: whole components, not fragments, so
// each one can be pasted into an app as it is. lib/docsExamples.test.mjs
// type-checks every one against the package. No runtime imports.
import type { Recipe } from './types';

export const REACT_RECIPES: Recipe[] = [
  {
    id: 'hero',
    group: 'layout',
    title: 'A hero behind a headline',
    says: 'The pattern is taken out of the flow with `position: absolute; inset: 0`, so the section is as tall as its copy and the pattern covers all of it. `isolation: isolate` keeps the pattern\'s `zIndex: -1` inside the section.',
    file: 'Hero.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Hero() {
  return (
    <section style={{ position: 'relative', isolation: 'isolate', padding: '96px 24px', color: '#fff' }}>
      <TabbiedPattern
        pattern={radius}
        seed="launch"
        palette={['#0B1020', '#1D3A8A', '#3E8BFF', '#3FFFB2']}
        density={0.3}
        style={{ position: 'absolute', inset: 0, zIndex: -1 }}
      />
      <h1>Patterns for every page</h1>
      <p>The section is as tall as this copy; the pattern fills it.</p>
    </section>
  );
}`,
  },
  {
    id: 'cards',
    group: 'layout',
    title: 'One design, a different card each',
    says: 'A seed picks the arrangement, so seeding each card with its id gives every card its own picture, the same one on every visit and on the server.',
    file: 'PostGrid.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { quilt } from 'tabbied/patterns';

type Post = { id: string; title: string };

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {posts.map((post) => (
        <article key={post.id}>
          <TabbiedPattern pattern={quilt} seed={post.id} aspectRatio="16 / 9" />
          <h3>{post.title}</h3>
        </article>
      ))}
    </div>
  );
}`,
  },
  {
    id: 'divider',
    group: 'layout',
    title: 'A section divider',
    says: 'A full-width strip: only a `height`, so the width fills the parent. A higher `density` keeps the cells small at a short height.',
    file: 'Divider.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { ortho } from 'tabbied/patterns';

export function Divider() {
  return <TabbiedPattern pattern={ortho} seed="divider" height={48} density={0.9} />;
}`,
  },
  {
    id: 'photo',
    group: 'layout',
    title: 'Over a photograph',
    says: 'A palette whose first color is `transparent` leaves the ground clear, so whatever is behind the pattern shows through, here the parent\'s background image. A lower `frequency` leaves more of it showing.',
    file: 'PhotoBanner.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function PhotoBanner() {
  return (
    <div style={{ background: 'url(/images/harbor.jpg) center / cover' }}>
      <TabbiedPattern
        pattern={radius}
        palette={['transparent', '#FFFFFF', '#3FFFB2']}
        options={{ frequency: 0.4 }}
        aspectRatio="21 / 9"
      />
    </div>
  );
}`,
  },
  {
    id: 'brand',
    group: 'layout',
    title: 'One palette across several designs',
    says: 'A palette is just an array, so a brand\'s colors can dress any design: background first, then the inks.',
    file: 'BrandTiles.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { ortho, quilt, radius, vitrail } from 'tabbied/patterns';

const BRAND = ['#0B1020', '#3E8BFF', '#3FFFB2', '#FF3D8B'];

export function BrandTiles() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {[radius, quilt, vitrail, ortho].map((design) => (
        <TabbiedPattern key={design.slug} pattern={design} palette={BRAND} seed="brand" aspectRatio="1" />
      ))}
    </div>
  );
}`,
  },
  {
    id: 'classes',
    group: 'layout',
    title: 'Sized by class names',
    says: '`fill={false}` writes no size inline, so the classes decide, breakpoints included. Without it, the inline `width: 100%; height: 100%` would beat a class.',
    file: 'Banner.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

// Tailwind here, but any stylesheet works the same way.
export function Banner() {
  return <TabbiedPattern pattern={radius} fill={false} className="h-40 w-full rounded-xl md:h-72" />;
}`,
  },
  {
    id: 'labelled',
    group: 'layout',
    title: 'A pattern that means something',
    says: 'Patterns are decorative by default, hidden from assistive technology. Where one is content, say an illustration in an article, `decorative={false}` makes it an image with a label.',
    file: 'Figure.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Figure() {
  return (
    <figure>
      <TabbiedPattern
        pattern={radius}
        seed="k9Pz"
        aspectRatio="1"
        decorative={false}
        ariaLabel="Quarter circles in blue and green, packed edge to edge"
      />
      <figcaption>Radius, seed k9Pz.</figcaption>
    </figure>
  );
}`,
  },
  {
    id: 'theme',
    group: 'state',
    title: 'Recolor with a theme switch',
    says: 'A new `palette` redraws the pattern already on the page, through the design\'s own transition; nothing is remounted.',
    file: 'ThemedBanner.tsx',
    lang: 'tsx',
    code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

const PALETTES = {
  light: ['#FFF4E6', '#E8590C', '#1C1C1C'],
  dark: ['#0B1020', '#3E8BFF', '#3FFFB2'],
};

export function ThemedBanner() {
  const [theme, setTheme] = useState<keyof typeof PALETTES>('dark');

  return (
    <>
      <TabbiedPattern pattern={radius} seed="k9Pz" palette={PALETTES[theme]} height={240} />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Switch theme</button>
    </>
  );
}`,
  },
  {
    id: 'system-theme',
    group: 'state',
    title: 'Follow the system color scheme',
    says: 'Read `prefers-color-scheme` after mount and listen for changes; the server render and the first paint use the light palette.',
    file: 'SchemeBanner.tsx',
    lang: 'tsx',
    code: `import { useEffect, useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

const LIGHT = ['#FFF4E6', '#E8590C', '#1C1C1C'];
const DARK = ['#0B1020', '#3E8BFF', '#3FFFB2'];

export function SchemeBanner() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setDark(query.matches);

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return <TabbiedPattern pattern={radius} seed="k9Pz" palette={dark ? DARK : LIGHT} aspectRatio="3 / 1" />;
}`,
  },
  {
    id: 'shuffle',
    group: 'state',
    title: 'A shuffle button',
    says: 'Keep the seed in state to shuffle and to remember the result, say to save it with a post. The handle\'s `redraw()` does the same without state, when the seed need not be kept.',
    file: 'Shuffle.tsx',
    lang: 'tsx',
    code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

const newSeed = () => Math.random().toString(36).slice(2, 8);

export function Shuffle() {
  const [seed, setSeed] = useState('k9Pz');

  return (
    <>
      <TabbiedPattern pattern={radius} seed={seed} aspectRatio="3 / 2" />
      <button onClick={() => setSeed(newSeed())}>Shuffle</button>
      <p>Seed: {seed}</p>
    </>
  );
}`,
  },
  {
    id: 'picker',
    group: 'state',
    title: 'Let people pick the design',
    says: 'Swapping `pattern` replaces the design in place. Import the designs on offer, so the bundle carries those and no others.',
    file: 'DesignPicker.tsx',
    lang: 'tsx',
    code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { quilt, radius, vitrail } from 'tabbied/patterns';

const DESIGNS = { radius, quilt, vitrail };
type Slug = keyof typeof DESIGNS;

export function DesignPicker() {
  const [slug, setSlug] = useState<Slug>('radius');

  return (
    <>
      <select value={slug} onChange={(event) => setSlug(event.target.value as Slug)}>
        {Object.entries(DESIGNS).map(([key, design]) => (
          <option key={key} value={key}>
            {design.name}
          </option>
        ))}
      </select>
      <TabbiedPattern pattern={DESIGNS[slug]} seed="k9Pz" aspectRatio="3 / 2" />
    </>
  );
}`,
  },
  {
    id: 'controls',
    group: 'state',
    title: 'Sliders for an option and the density',
    says: 'Option ids come from the design (`radius` has `frequency`, 0.2 to 1); `density` is the cell size, 0 coarse to 1 fine. Each change redraws in place.',
    file: 'Controls.tsx',
    lang: 'tsx',
    code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Controls() {
  const [frequency, setFrequency] = useState(0.8);
  const [density, setDensity] = useState(0.5);

  return (
    <>
      <TabbiedPattern pattern={radius} seed="k9Pz" options={{ frequency }} density={density} height={280} />
      <label>
        Frequency
        <input type="range" min={0.2} max={1} step={0.1} value={frequency}
          onChange={(event) => setFrequency(Number(event.target.value))} />
      </label>
      <label>
        Density
        <input type="range" min={0} max={1} step={0.05} value={density}
          onChange={(event) => setDensity(Number(event.target.value))} />
      </label>
    </>
  );
}`,
  },
  {
    id: 'ambient',
    group: 'state',
    title: 'Slow motion that pauses on hover',
    says: 'Leave `seed` out and set `redrawInterval`: the pattern reseeds on a timer and morphs between arrangements. `paused` holds it; it also stops on its own off screen, in a hidden tab, and for anyone who asks for reduced motion.',
    file: 'Ambient.tsx',
    lang: 'tsx',
    code: `import { useState } from 'react';
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Ambient() {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <TabbiedPattern pattern={radius} redrawInterval={4000} paused={hovered} height={240} />
    </div>
  );
}`,
  },
  {
    id: 'export',
    group: 'state',
    title: 'Download buttons',
    says: 'The ref\'s `exportImage()` saves a PNG at any scale and `exportSvg()` a vector file. Enable them from `onReady`, once there is a drawing to export, and check `supportsSvgExport()`: a few designs have no vector form.',
    file: 'Downloads.tsx',
    lang: 'tsx',
    code: `import { useRef, useState } from 'react';
import { supportsSvgExport } from 'tabbied';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Downloads() {
  const pattern = useRef<TabbiedPatternHandle>(null);
  const [ready, setReady] = useState(false);

  return (
    <>
      <TabbiedPattern ref={pattern} pattern={radius} seed="k9Pz" aspectRatio="3 / 2" onReady={() => setReady(true)} />
      <button disabled={!ready} onClick={() => pattern.current?.exportImage({ scale: 2, download: true, name: 'banner' })}>
        Download PNG
      </button>
      <button
        disabled={!ready || !supportsSvgExport(radius)}
        onClick={() => pattern.current?.exportSvg({ download: true, name: 'banner' })}
      >
        Download SVG
      </button>
    </>
  );
}`,
  },
  {
    id: 'upload',
    group: 'state',
    title: 'Send the SVG to your server',
    says: 'Without `download`, `exportSvg()` resolves to the markup and its size, to store or post anywhere.',
    file: 'SaveArtwork.tsx',
    lang: 'tsx',
    code: `import { useRef } from 'react';
import { TabbiedPattern, type TabbiedPatternHandle } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function SaveArtwork() {
  const pattern = useRef<TabbiedPatternHandle>(null);

  const save = async () => {
    const result = await pattern.current?.exportSvg();
    if (!result) return;

    await fetch('/api/artwork', {
      method: 'POST',
      headers: { 'Content-Type': 'image/svg+xml' },
      body: result.svg,
    });
  };

  return (
    <>
      <TabbiedPattern ref={pattern} pattern={radius} seed="k9Pz" width={600} height={400} />
      <button onClick={save}>Save artwork</button>
    </>
  );
}`,
  },
  {
    id: 'lazy-designs',
    group: 'integration',
    title: 'Designs chosen at runtime, loaded on demand',
    says: 'When the slug comes from data (a CMS, a database), load each design when it is needed: every one is a module of its own at `tabbied/patterns/<slug>`. List the ones you offer so the bundler can split them.',
    file: 'CmsPattern.tsx',
    lang: 'tsx',
    code: `import { useEffect, useState } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern } from 'tabbied/react';

const LOADERS: Record<string, () => Promise<{ default: PatternDefinition }>> = {
  radius: () => import('tabbied/patterns/radius'),
  quilt: () => import('tabbied/patterns/quilt'),
  vitrail: () => import('tabbied/patterns/vitrail'),
};

export function CmsPattern({ slug }: { slug: string }) {
  const [design, setDesign] = useState<PatternDefinition | null>(null);

  useEffect(() => {
    let current = true;
    LOADERS[slug]?.().then((module) => current && setDesign(module.default));
    return () => {
      current = false;
    };
  }, [slug]);

  // The same box while it loads, so nothing shifts.
  return design ? (
    <TabbiedPattern pattern={design} aspectRatio="3 / 2" />
  ) : (
    <div style={{ aspectRatio: '3 / 2', background: '#0B1020' }} />
  );
}`,
  },
  {
    id: 'next',
    group: 'integration',
    title: 'Next.js App Router',
    says: '`TabbiedPattern` is a Client Component already, so a Server Component page can render it directly, with no `use client` of your own. The server HTML is the sized box in the ground color.',
    file: 'app/page.tsx',
    lang: 'tsx',
    code: `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export default function Page() {
  return (
    <main>
      <TabbiedPattern pattern={radius} seed="k9Pz" aspectRatio="16 / 9" maxWidth={1200} />
    </main>
  );
}`,
  },
];
