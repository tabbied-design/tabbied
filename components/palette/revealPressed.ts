/**
 * Scroll a horizontal row of palette chips so the pressed one is in view,
 * centered, without moving the page. A no-op when it is already whole on
 * screen, so tapping a visible chip never jumps the row under the finger.
 *
 * Sets `scrollLeft` rather than calling `scrollIntoView`, which would also
 * scroll the document to reach a row that is not on screen yet.
 */
export function revealPressed(row: HTMLElement): void {
  const pressed = row.querySelector<HTMLElement>('[aria-pressed="true"]');

  if (!pressed) return;

  // A chip is either the pressed button itself or the pill around it.
  const chip = pressed.parentElement === row ? pressed : (pressed.parentElement ?? pressed);
  const view = row.getBoundingClientRect();
  const box = chip.getBoundingClientRect();

  if (box.left >= view.left && box.right <= view.right) return;

  row.scrollLeft += box.left - view.left - (view.width - box.width) / 2;
}
