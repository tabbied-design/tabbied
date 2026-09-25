// Importing css-doodle registers the <css-doodle> custom element, and that
// side effect is this module's whole purpose. It is isolated here (and listed
// in package.json "sideEffects") so bundlers never drop the registration while
// everything else stays shakeable. Safe during SSR: css-doodle guards its
// customElements.define() call.
import 'css-doodle';
