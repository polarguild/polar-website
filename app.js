import { renderAll } from './src/scripts/render.js?v=2';
import { startRouter } from './src/scripts/router.js';
import { startModals } from './src/scripts/dialog.js';

// Entry point. Deliberately NOT named index.js: the previous site served an
// /index.js with different contents, and GitHub Pages caches for 10 minutes
// without revalidating. A returning visitor could get new HTML plus the old
// cached module, whose imports now 404 — killing every script on the page.
// Same reason src/scripts/dialog.js is not called modals.js.

// Views are rendered once up front, then the router just shows and hides them.
renderAll();
startModals();
startRouter();
