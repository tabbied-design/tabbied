import SiteNav from 'components/nav';

// The account pages' masthead: the shared bar, which already knows the person
// and draws their initials. `initials` lives with the bar now and is re-exported
// here for the admin pages that name it from this module.
export { initials } from 'components/nav';

export default function AccountHeader() {
  return <SiteNav tone="light" />;
}
