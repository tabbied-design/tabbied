// The Node half, for hosts that run on Node rather than a Worker: what the
// `tabbied-mcp` bin itself passes to `catalogTools`, plus `render_design`.
// Kept off the main entry point, which a Worker bundles and which must stay
// free of node imports (see ../index.ts).
export {
  fetchDocs,
  fetchPreview,
  fetchTemplate,
  fetchTemplateCatalog,
  loadCatalog,
  tabbiedRoot,
} from './resources.js';
export { renderTool } from './render.js';
