'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { Menu } from '@base-ui-components/react/menu';
import {
  ArrowDownToLine,
  ChevronDown,
  ChevronLeft,
  FileCode,
  ImageDown,
  Info,
  Link as LinkIcon,
  CodeXml,
  Shuffle,
  TriangleAlert,
} from 'lucide-react';
import {
  armGalleryScrollRestore,
  consumeGalleryNavigation,
} from 'lib/galleryScroll';
import styles from './EditPatternHeader.module.css';

type EditPatternHeaderProps = {
  patternName: string;
  /**
   * Draw the layout again. One action, not a menu of scopes: the colours are
   * chosen from the rail, so a shuffle only ever rearranges the cells.
   */
  onShuffle: () => void;
  /** Download the current pattern as a PNG. */
  onExportPng: () => void;
  /** Download the current pattern as a native vector SVG. */
  onExportSvg: () => void;
  /** SVG export is disabled for designs using effects SVG can't represent. */
  svgExportDisabled: boolean;
  /**
   * The current export has known limitations (filter-based effects or
   * documented sub-pixel deviations) - mark the menu item with a warning.
   */
  svgExportWarning: boolean;
  /** Copy the current (fully-encoded) URL to the clipboard. */
  onCopyLink: () => void | Promise<void>;
  /** Copy a ready-to-paste <TabbiedPattern> snippet to the clipboard. */
  onCopyReactComponent: () => void | Promise<void>;
  /**
   * A picture is set behind the pattern. The menu then says which exports
   * carry it, because two of the four cannot: the picture is an object URL
   * local to this tab, so the link and the snippet open without it.
   */
  hasBackgroundImage: boolean;
  /** Below the two-column breakpoint: the actions are two circles. */
  mobile: boolean;
};

export default function EditPatternHeader({
  patternName,
  onShuffle,
  onExportPng,
  onExportSvg,
  svgExportDisabled,
  svgExportWarning,
  onCopyLink,
  onCopyReactComponent,
  hasBackgroundImage,
  mobile,
}: EditPatternHeaderProps) {
  const router = useRouter();

  // Whether this editor was opened from the gallery (a marker the gallery card
  // sets on click, consumed here on mount).
  const [cameFromGallery, setCameFromGallery] = useState(false);

  useEffect(() => {
    setCameFromGallery(consumeGalleryNavigation());
  }, []);

  // Go back through history so the gallery's previous scroll position is
  // restored. Modified clicks (open in new tab) fall through to the href.
  const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (cameFromGallery) {
      armGalleryScrollRestore();
      router.back();
    } else {
      router.push('/patterns');
    }
  };

  // Export is a dropdown at every width: a PNG download plus clipboard
  // exports. On a phone it used to be a sheet that replaced the rail, which
  // put four short rows a screen away from the button that opened them.
  const exportMenu = (trigger: ReactNode) => (
    <Menu.Root>
      {trigger}
      <Menu.Portal>
        <Menu.Positioner
          className={styles.menuPositioner}
          side="bottom"
          align="end"
          sideOffset={6}
        >
          <Menu.Popup className={styles.menuPopup}>
            <Menu.Item className={styles.menuItem} onClick={onExportPng}>
              <ImageDown size={15} /> Download PNG
            </Menu.Item>
            <Menu.Item
              className={styles.menuItem}
              onClick={onExportSvg}
              disabled={svgExportDisabled}
              title={
                svgExportDisabled
                  ? "This design uses effects SVG can't represent."
                  : undefined
              }
            >
              <FileCode size={15} /> Download SVG
              {svgExportWarning && (
                <TriangleAlert
                  className={styles.menuItemWarning}
                  size={14}
                  aria-label="Has export limitations"
                />
              )}
            </Menu.Item>
            <Menu.Item
              className={styles.menuItem}
              onClick={() => void onCopyLink()}
            >
              <LinkIcon size={15} /> Copy shareable link
            </Menu.Item>
            <Menu.Item
              className={styles.menuItem}
              onClick={() => void onCopyReactComponent()}
            >
              <CodeXml size={15} /> Copy React component
            </Menu.Item>
            {hasBackgroundImage && (
              <p className={styles.menuNote}>
                <Info size={15} aria-hidden="true" />
                <span>
                  The PNG and the SVG carry your background image. The link and
                  the React component do not - it stays on this device.
                </span>
              </p>
            )}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );

  // The pattern is named under the stage, in the plate's caption, so the
  // header carries no title: the heading is for assistive tech alone.
  if (mobile) {
    return (
      <header className={`${styles.header} ${styles.headerMobile}`}>
        <NextLink
          href="/patterns"
          prefetch={false}
          onClick={handleBack}
          className={styles.backCircle}
          aria-label="Back to gallery"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </NextLink>

        <h1 className={styles.srOnly}>{patternName}</h1>

        <span className={styles.spacer} />

        <button
          type="button"
          className={styles.iconCircle}
          onClick={onShuffle}
          aria-label="Shuffle"
          title="Shuffle the layout"
        >
          <Shuffle size={16} strokeWidth={1.7} />
        </button>
        {exportMenu(
          <Menu.Trigger
            className={`${styles.iconCircle} ${styles.iconCircleExport}`}
            aria-label="Export"
            title="Export"
          >
            <ArrowDownToLine size={17} />
          </Menu.Trigger>
        )}
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <NextLink
        href="/patterns"
        prefetch={false}
        onClick={handleBack}
        className={styles.backCircle}
        aria-label="Back to gallery"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </NextLink>
      <span className={styles.crumb} aria-hidden="true">
        Patterns
      </span>

      <h1 className={styles.srOnly}>{patternName}</h1>

      <span className={styles.spacer} />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.shuffle}
          onClick={onShuffle}
          title="Shuffle the layout"
        >
          <Shuffle size={16} strokeWidth={1.7} aria-hidden="true" />
          <span>Shuffle</span>
        </button>

        {exportMenu(
          <Menu.Trigger
            className={`${styles.btn} ${styles.btnExport}`}
            aria-label="Export"
          >
            <span className={styles.label}>Export</span>
            <ChevronDown className={styles.chevronIcon} size={13} />
          </Menu.Trigger>
        )}
      </div>
    </header>
  );
}
