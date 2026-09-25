'use client';

// The template kit's small-screen menu: a copy of a header's section links
// behind a "Menu" toggle, for the widths where the page hides its own nav.
//
// A <details>, not a button with state: the HTML package strips the runtime
// and nothing of this runs there, so open and shut must be the browser's own.
// The summary is already a disclosure button to assistive technology.
//
// Script adds only closing, on a followed link, an outside click and Escape:
// the effect below, and the same few lines as a plain script in the HTML
// package (MENU_SCRIPT in scripts/package-templates.mjs).
//
// No CSS module of its own, since the packager ships one stylesheet per page:
// the shape is `.template-menu` in styles/globals.css (every package's
// base.css), and the page's class supplies when to show the menu and
// `--template-menu-bg`, the ground its panel sits on.
import { useEffect, useRef, type ReactNode } from 'react';

export function TemplateMenu({
  className,
  label = 'Menu',
  children,
}: {
  /** The page's own class: its breakpoint and its `--template-menu-bg`. */
  className?: string;
  label?: string;
  /** The header's links, as the header renders them. */
  children: ReactNode;
}) {
  const menu = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const details = menu.current;
      const target = event.target as Element | null;

      if (!details?.open || !target) return;
      if (!details.contains(target) || target.closest('a')) details.open = false;
    };

    const onKey = (event: KeyboardEvent) => {
      const details = menu.current;

      if (event.key !== 'Escape' || !details?.open) return;
      details.open = false;
      details.querySelector('summary')?.focus();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <details ref={menu} className={className ? `template-menu ${className}` : 'template-menu'}>
      <summary className="template-menu__toggle">
        <span className="template-menu__icon" aria-hidden="true">
          <span />
          <span />
        </span>
        {label}
      </summary>
      <div className="template-menu__panel">{children}</div>
    </details>
  );
}
