import SiteNav from 'components/nav';

// The homepage's masthead is the shared one in its dark tone. It used to be a
// nav of its own, which is how it came to carry a different set of links from
// every other page; the tone is the only thing about it that is the homepage's.
export default function HomeNav() {
  return <SiteNav tone="dark" />;
}
