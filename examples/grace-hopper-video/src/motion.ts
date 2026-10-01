// Every Tabbied design carries a ~400ms CSS transition, which is what makes a
// reseed morph on a web page. A video cannot use it: Remotion photographs
// each frame as soon as the page says it is ready, in several tabs at once,
// so a transition would be caught at a different point of its ease in every
// render. Each frame has to be a pure function of the frame number.
//
// Tabbied already has the switch for that. Under `prefers-reduced-motion:
// reduce` its controller mutes the cell transitions for good and pauses the
// few keyframe animations on their first frame, so a reseed cuts straight
// to the new arrangement. The Chromium that Remotion launches cannot be
// asked to emulate the media feature, so this answers that one query here,
// before the first pattern reads it. Every other query reaches the browser.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  const native = window.matchMedia.bind(window);

  const reduced: MediaQueryList = {
    matches: true,
    media: REDUCED_MOTION,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  };

  window.matchMedia = (query: string) =>
    query.replace(/\s+/g, ' ').trim() === REDUCED_MOTION ? reduced : native(query);
}
