import {
  Atom,
  CircleUserRound,
  LayoutTemplate,
  LogIn,
  LogOut,
  Settings,
  Shapes,
  ShieldCheck,
  VenetianMask,
  type LucideIcon,
} from 'lucide-react';

// The icons in the account menus. Three bars draw one (SiteNav, the
// customizer's and the template preview's), each in its own module because a
// portaled popup carries its own tokens, so the icons are chosen here once
// and a row reads the same in all three. Websites is the admin sidebar's
// Templates icon, and Stop impersonating is the Impersonate one.
export const MENU_ICONS = {
  account: CircleUserRound,
  patterns: Shapes,
  websites: LayoutTemplate,
  react: Atom,
  settings: Settings,
  admin: ShieldCheck,
  signIn: LogIn,
  signOut: LogOut,
  stopImpersonating: VenetianMask,
} satisfies Record<string, LucideIcon>;

/** A menu row's icon, at the size every account menu draws it. */
export default function MenuIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={className} size={16} strokeWidth={1.75} aria-hidden="true" />;
}
