import { useId, type CSSProperties, type ReactNode } from 'react';
import artworkManifest from 'lib/generated/artwork';

/**
 * Artwork whose color the page's palette supplies (docs/image-pipeline.md,
 * "Recolorable artwork"). The committed file holds only what a palette
 * cannot - shape, or tone - and every color is a CSS value the page passes
 * in `inks`, normally `var(--ink)` and friends. A re-color rewrites those
 * custom properties on the page root, so the picture moves with the page and
 * nothing here needs to know it happened.
 *
 * Each ink is written as an inline custom property on the element
 * (`--art-1`, `--art-2`, or `--art-<layer>`), the one kind of write the edits engine makes,
 * so a later edit can reassign a picture's roles without a new mechanism.
 *
 * What renders depends on the artwork's kind and, for a photograph, `mode`:
 *
 *   mono              one ink painted through the picture as a CSS mask
 *   layers (vector)   inline SVG, one path per key color, each filled with an ink
 *   layers (masks)    one masked layer per key color, stacked
 *   tone, duotone     an SVG filter maps shadows to the darker of the two
 *                     inks and light to the lighter, whichever order they
 *                     come in, so a re-color to a dark palette is no negative
 *   tone, tint        the same mapping in CSS: the darker ink through the
 *                     picture's alpha, the lighter through its luminance. Blend modes were
 *                     tried first and dropped: multiply-then-lighten only
 *                     works while inks[0] is the darker, and a re-color to a
 *                     dark palette flips that and paints a flat box.
 *   tone, fill        the silhouette cut out of `children` (a TabbiedPattern),
 *                     the photograph's own shading multiplied back over it
 *
 * Masks are the one fetch a browser makes in CORS mode, which a page opened
 * from disk (the HTML download) is refused; the packager inlines
 * `--artwork-mask` URLs as data URIs for that reason.
 */

type Layer = { name: string; key: string; d?: string; file?: string };

type Entry = {
  kind: 'mono' | 'layers' | 'tone';
  render?: 'vector' | 'masks';
  width: number;
  height: number;
  hash: string;
  file?: string;
  layers?: Layer[];
  base: string;
};

const manifest = artworkManifest as Record<string, Entry>;

type ArtworkProps = {
  /** Promoted id in lib/generated/artwork.js. */
  slug: string;
  /** Read by assistive tech; pass '' for a decorative picture. */
  alt: string;
  /**
   * The colors, normally `var(--ink)` and the like. A list for mono (the one
   * ink) and a photograph (two inks; the darker takes the shadows); for layers, an
   * object keyed by layer name (`{ red: 'var(--accent)', black: 'var(--ink)' }`),
   * since a picture may lack one of its prompt's keys and a list would shift.
   */
  inks: string[] | Record<string, string>;
  /** Photographs only: how the tone file is drawn. */
  mode?: 'duotone' | 'tint' | 'fill';
  /** `cover` fills the box and crops, for a full-bleed background. */
  fit?: 'contain' | 'cover';
  className?: string;
  style?: CSSProperties;
  /** `fill` mode: the pattern the silhouette is cut out of. */
  children?: ReactNode;
  /** data-edit-pattern and data-edit-roles, which the annotator adds to a fill's host. */
  [dataAttribute: `data-${string}`]: string | undefined;
};

const src = (entry: Entry, file: string) => `${entry.base}/${file}?v=${entry.hash.slice(0, 8)}`;
const maskUrl = (entry: Entry, file: string) => `url(${src(entry, file)})`;

export function Artwork({
  slug,
  alt,
  inks,
  mode = 'duotone',
  fit = 'contain',
  className,
  style,
  children,
  ...rest
}: ArtworkProps) {
  const reactId = useId();
  const entry = manifest[slug];

  if (!entry) {
    if (process.env.NODE_ENV !== 'development') return null;
    return <span role="img" aria-label={`Artwork pending: ${slug}`}>Artwork <code>{slug}</code> pending</span>;
  }

  const inkProperties = Array.isArray(inks)
    ? Object.fromEntries(inks.map((ink, i) => [`--art-${i + 1}`, ink]))
    : Object.fromEntries(Object.entries(inks).map(([name, ink]) => [`--art-${name}`, ink]));
  const label = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true as const };
  const data = Object.fromEntries(Object.entries(rest).filter(([key]) => key.startsWith('data-')));
  const classes = (kind: string) =>
    ['artwork', `artwork--${kind}`, fit === 'cover' ? 'artwork--cover' : null, className].filter(Boolean).join(' ');
  const box: CSSProperties = { aspectRatio: `${entry.width} / ${entry.height}` };
  const aspect = fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet';

  if (entry.kind === 'mono') {
    return (
      <span
        {...label}
        {...data}
        data-artwork={slug}
        className={classes('mask')}
        style={{ ...box, ...inkProperties, '--artwork-mask': maskUrl(entry, entry.file!), ...style } as CSSProperties}
      />
    );
  }

  if (entry.kind === 'layers' && entry.render === 'masks') {
    return (
      <span
        {...label}
        {...data}
        data-artwork={slug}
        className={classes('masks')}
        style={{ ...box, ...inkProperties, ...style } as CSSProperties}>
        {entry.layers!.map((layer) => (
          <span
            key={layer.name}
            className="artwork__layer"
            style={{ '--artwork-mask': maskUrl(entry, layer.file!), '--artwork-ink': `var(--art-${layer.name}, currentColor)` } as CSSProperties}
          />
        ))}
      </span>
    );
  }

  if (entry.kind === 'layers') {
    return (
      <svg
        {...label}
        {...data}
        data-artwork={slug}
        className={classes('vector')}
        viewBox={`0 0 ${entry.width} ${entry.height}`}
        preserveAspectRatio={aspect}
        style={{ ...box, ...inkProperties, ...style } as CSSProperties}>
        {entry.layers!.map((layer) => (
          <path key={layer.name} d={layer.d} style={{ fill: `var(--art-${layer.name}, currentColor)` }} />
        ))}
      </svg>
    );
  }

  const file = src(entry, entry.file!);

  if (mode === 'tint') {
    return (
      <span
        {...label}
        {...data}
        data-artwork={slug}
        className={classes('tint')}
        style={{ ...box, ...inkProperties, '--artwork-mask': maskUrl(entry, entry.file!), ...style } as CSSProperties}
      />
    );
  }

  if (mode === 'fill') {
    return (
      <span
        {...label}
        {...data}
        data-artwork={slug}
        className={classes('fill')}
        style={{ ...box, ...inkProperties, '--artwork-mask': maskUrl(entry, entry.file!), ...style } as CSSProperties}>
        {children}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="artwork__shade" src={file} width={entry.width} height={entry.height} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  // duotone: luminance picks between the two inks, the file's alpha is kept.
  const id = `artwork-${slug}-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      {...label}
      {...data}
      data-artwork={slug}
      className={classes('duotone')}
      viewBox={`0 0 ${entry.width} ${entry.height}`}
      preserveAspectRatio={aspect}
      style={{ ...box, ...inkProperties, ...style } as CSSProperties}>
      <filter id={id} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
        {/* The darker of the two inks takes the shadows whichever it is, so a
            re-color that swaps light for dark does not print a negative. */}
        <feFlood style={{ floodColor: 'var(--art-1)' }} result="one" />
        <feFlood style={{ floodColor: 'var(--art-2)' }} result="two" />
        <feBlend in="one" in2="two" mode="darken" result="dark" />
        <feBlend in="one" in2="two" mode="lighten" result="bright" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1" result="shadow" />
        <feComposite in="dark" in2="shadow" operator="in" result="darkPart" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.2126 0.7152 0.0722 0 0" result="light" />
        <feComposite in="bright" in2="light" operator="in" result="lightPart" />
        <feComposite in="darkPart" in2="lightPart" operator="arithmetic" k2="1" k3="1" result="mixed" />
        <feComposite in="mixed" in2="SourceAlpha" operator="in" />
      </filter>
      <image href={file} width={entry.width} height={entry.height} preserveAspectRatio={aspect} filter={`url(#${id})`} />
    </svg>
  );
}
