import { renderAll } from './src/scripts/render.js';
import { startRouter } from './src/scripts/router.js';
import { startModals } from './src/scripts/modals.js';

// Views are rendered once up front, then the router just shows and hides them.
renderAll();
startModals();
startRouter();
