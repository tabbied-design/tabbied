'use client';

import type { Problem } from 'tabbied-templates';
import styles from './StudioPreview.module.css';

/**
 * What the engine could not apply, said out loud. Two kinds, told apart
 * because a person can act on one and not the other: a slot the engine could
 * not find is a template whose annotations have drifted; a missing bootstrap
 * is the shell's problem and reads as "patterns will not draw".
 */
export function PreviewNotices({ problems }: { problems: Problem[] }) {
  const shell = problems.filter((problem) => problem.path === 'runtime');
  const engine = problems.filter(
    (problem) => problem.level === 'error' && problem.path !== 'runtime'
  );

  return (
    <>
      {shell.length > 0 ? (
        <p className={styles.notice} role="status">
          The template package has changed shape and its patterns cannot be
          drawn here. The text and colors below are still applied.
        </p>
      ) : null}
      {engine.length > 0 ? (
        <p className={styles.notice} role="status">
          {engine.length === 1
            ? 'One part of this document could not be placed on the template: '
            : `${engine.length} parts of this document could not be placed on the template: `}
          {engine.map((problem) => problem.path).join(', ')}.
        </p>
      ) : null}
    </>
  );
}

/**
 * The iframe a built preview document renders in, plus the notice for
 * anything the engine could not apply. Shared by the direction preview and the
 * shared-site view, which differ in what they load and not in how they show it.
 */
export default function PreviewFrame({
  html,
  problems,
  title,
}: {
  html: string;
  problems: Problem[];
  title: string;
}) {
  return (
    <>
      <PreviewNotices problems={problems} />

      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          title={title}
          srcDoc={html}
          // `allow-same-origin` is required: with an opaque origin the
          // same-origin runtime import is blocked and every pattern is missing.
          // What stays denied is what this page actually has: the packaged
          // template's `<form action="#">` and `<a href="#">` links cannot
          // navigate the top frame, submit, or open a popup. The content is
          // first-party (our template, our runtime), and model-authored strings
          // reach it only as text nodes (`writeText` uses createTextNode, so
          // there is no markup path). Revisit this *before* user-supplied
          // markup or images enter this document.
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </>
  );
}
