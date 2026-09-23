'use client';

// The template kit's small-screen menu: a copy of a header's section links
// behind a "Menu" toggle, for the widths where the page hides its own nav.
//
// A <details>, not a button with state, because it has to work in all three
// places a template lives. On the site and in the React package this
// component runs; in the HTML package the Next runtime is stripped and
// nothing of it runs at all, so the open and shut must be the browser's own.
// The summary is a button to assistive technology and says whether it is
// expanded, which is the disclosure pattern with nothing to wire up.
//
// What script adds is closing: on a followed link, a click outside, and
// Escape. Here that is the effect below; the HTML package carries the same
// few lines as a plain script (scripts/package-templates.mjs), since a page
// with no framework would otherwise leave the menu open over the section it
// just scrolled to.
//
// No CSS module of its own: the packager ships one stylesheet per page and
// refuses a second. The shape lives in styles/globals.css (the global sheet
// every package carries as base.css) under `.template-menu`, and the page
// supplies the rest through the class it passes: when to show the menu, and
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
