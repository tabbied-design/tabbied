'use client';

// A saved site's Download menu, drawn in the account's table: the customized
// version, then the original in both formats (plain links: no download needs
// an account). The caller draws the menu in its own module, since a portaled
// popup carries its own tokens, so the classes come from the caller.
import { Menu } from '@base-ui/react/menu';
import { ChevronDown, Download } from 'lucide-react';
import { toaster } from 'components/Toaster';
import { downloadCustomisedSite } from 'lib/studioDownload';

/** How each format carries the changes, said where the choice is made. */
const CUSTOMIZED_FORMAT_NOTE =
  'Your colors and patterns are written into the HTML page, and laid over the React source in files of their own.';

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

export default function DownloadMenu({
  name,
  slug,
  siteId,
  side,
  classes,
}: {
  /** The template's name, for the label over the original's two zips. */
  name: string;
  slug: string;
  /** The saved site whose customized version heads the menu, if any. */
  siteId?: string;
  /** Which way the popup opens. */
  side: 'top' | 'bottom';
  classes: DownloadMenuClasses;
}) {

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
            {siteId ? (
              <>
                <Menu.Group>
                  <Menu.GroupLabel className={classes.menuLabel}>Your customized version</Menu.GroupLabel>
                  <Menu.Item className={classes.menuItem} onClick={() => saveCustomised(siteId, 'html')}>
                    HTML &amp; CSS
                  </Menu.Item>
                  <Menu.Item className={classes.menuItem} onClick={() => saveCustomised(siteId, 'react')}>
                    React project
                  </Menu.Item>
                  <p className={classes.menuNote}>{CUSTOMIZED_FORMAT_NOTE}</p>
                </Menu.Group>
                <Menu.Separator className={classes.menuRule} />
              </>
            ) : null}
            <Menu.Group>
              <Menu.GroupLabel className={classes.menuLabel}>
                {siteId ? `Original ${name}` : `${name} (original)`}
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
