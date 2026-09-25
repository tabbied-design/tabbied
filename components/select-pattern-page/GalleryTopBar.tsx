import SiteNav from 'components/nav';

/**
 * The gallery's masthead, pinned: the palette rail starts where it ends and the
 * design grid scrolls under it. The rail reads the bar's height as
 * `--gallery-bar-h` (SelectPattern.module.css), so the two must agree.
 */
export default function GalleryTopBar() {
  return <SiteNav tone="light" sticky />;
}
