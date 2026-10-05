'use client';

// A chosen template's Download menu, drawn on a gallery card and in the
// account's table: the customized version when a site was saved, then the
// original in both formats (links to the Worker's gated route). Each place
// draws the menu in its own module, since a portaled popup carries its own
// tokens, so the classes come from the caller.
import { Menu } from '@base-ui/react/menu';
import { ChevronDown, Download } from 'lucide-react';
import { toaster } from 'components/Toaster';
import type { ChosenTemplate } from 'lib/myTemplates';
import { downloadCustomisedSite } from 'lib/studioDownload';

/** Build and save the customized zip in the browser, with the outcome in a toast. */
async function saveCustomised(siteId: string, format: 'html' | 'react'): Promise<void> {
  try {
    toaster.add({ title: 'Preparing your customized download...' });
    await downloadCustomisedSite(siteId, format);
  } catch (cause) {
    toaster.add({ title: cause instanceof Error ? cause.message : 'Could not build the download.' });
  }
}

/** The caller's module classes for each part of the menu. */
export type DownloadMenuClasses = {
  trigger: string;
  caret: string;
  positioner: string;
  menu: string;
  menuLabel: string;
  menuItem: string;
  menuRule: string;
  /** The line under the customized version saying how each format carries it. */
  menuNote: string;
};

// How each format carries the changes: written into the HTML page, which has
// no React left in it, but laid over the React project's source in files of
// their own, because a document of edits cannot be written into JSX
// (lib/studioDownload.ts). Said where the choice is made.
export const CUSTOMIZED_FORMAT_NOTE =
  'Your colors and patterns are written into the HTML page, and laid over the React source in files of their own.';

export default function DownloadMenu({
  name,
  chosen,
  side,
  classes,
}: {
  /** The template's name, for the label over the original's two zips. */
  name: string;
  chosen: ChosenTemplate;
  /** Which way the popup opens: up from a card's footer, down from a table row. */
  side: 'top' | 'bottom';
  classes: DownloadMenuClasses;
}) {
  const { site, slug } = chosen;

  return (
    <Menu.Root>
      <Menu.Trigger className={classes.trigger}>
        <Download size={14} strokeWidth={1.8} aria-hidden="true" />
        Download
        <ChevronDown className={classes.caret} size={14} strokeWidth={1.8} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} align="end" sideOffset={8} className={classes.positioner}>
          <Menu.Popup className={classes.menu}>
            {site ? (
              <>
                <Menu.Group>
                  <Menu.GroupLabel className={classes.menuLabel}>Your customized version</Menu.GroupLabel>
                  <Menu.Item className={classes.menuItem} onClick={() => saveCustomised(site.id, 'html')}>
                    HTML &amp; CSS
                  </Menu.Item>
                  <Menu.Item className={classes.menuItem} onClick={() => saveCustomised(site.id, 'react')}>
                    React project
                  </Menu.Item>
                  <p className={classes.menuNote}>{CUSTOMIZED_FORMAT_NOTE}</p>
                </Menu.Group>
                <Menu.Separator className={classes.menuRule} />
              </>
            ) : null}
            <Menu.Group>
              <Menu.GroupLabel className={classes.menuLabel}>
                {site ? `Original ${name}` : `${name} (original)`}
              </Menu.GroupLabel>
              <Menu.Item className={classes.menuItem} render={<a href={`/downloads/${slug}-html.zip`} download />}>
                HTML &amp; CSS
              </Menu.Item>
              <Menu.Item className={classes.menuItem} render={<a href={`/downloads/${slug}-react.zip`} download />}>
                React project
              </Menu.Item>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
