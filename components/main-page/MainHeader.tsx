import SiteNav from 'components/nav';

// The masthead of the content pages (docs, the legal pages, the 404), which
// still render in the older light theme below it. The bar itself is the shared
// one, so these pages carry the same three destinations as everything else.
export default function MainHeader() {
  return <SiteNav tone="light" />;
}
