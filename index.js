import './src/scripts/webflow.js';
import './src/scripts/modals.js';
import { renderFronts } from './src/scripts/fronts-render.js';

renderFronts();

// The markup carries a hardcoded year so the footer is still correct with JS
// disabled; this just keeps it from going stale.
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();
