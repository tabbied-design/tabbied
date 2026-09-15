import SiteNav from 'components/nav';

/**
 * The gallery's masthead: the shared bar, pinned, because the palette rail
 * underneath starts where it ends and the design grid scrolls under it. The
 * rail reads the bar's height as `--gallery-bar-h` (SelectPattern.module.css),
 * so the bar keeps to that height at every width the rail is shown at.
 */
export default function GalleryTopBar() {
  return <SiteNav tone="light" sticky />;
}
