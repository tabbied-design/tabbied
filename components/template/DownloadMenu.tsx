'use client';

// A chosen template's Download menu, drawn on a gallery card and in the
// account's table: the customized version when a site was saved, then the
// original in both formats. The zips are links to the Worker's gated route,
// which makes the template the person's on its first download. Each place
// draws the menu in its own module (a portaled popup carries its own tokens,
// see CLAUDE.md), so the classes come from the caller and the body lives
// here once rather than in two copies that have to agree.
import { Menu } from '@base-ui-components/react/menu';
import { toaster } from 'components/Toaster';
import type { ChosenTemplate } from 'lib/myTemplates';
import { downloadCustomisedSite } from 'lib/studioDownload';

/** Build and save the customized zip in the browser, with the outcome in a toast. */
export async function saveCustomised(siteId: string): Promise<void> {
  try {
    toaster.add({ title: 'Preparing your customized download...' });
    await downloadCustomisedSite(siteId);
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
};

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
        Download <span className={classes.caret} aria-hidden="true">&#x25BE;</span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} align="end" sideOffset={8} className={classes.positioner}>
          <Menu.Popup className={classes.menu}>
            {site ? (
              <>
                <Menu.Group>
                  <Menu.GroupLabel className={classes.menuLabel}>Your customized version</Menu.GroupLabel>
                  <Menu.Item className={classes.menuItem} onClick={() => saveCustomised(site.id)}>
                    HTML &amp; CSS
                  </Menu.Item>
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
