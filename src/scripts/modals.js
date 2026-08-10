import { squads } from './squads.js';
import { subscribers } from './subscribers.js';

// Matches the opacity transition on .squads-modal / .shoutout-modal / .soon-modal
// in custom.css — keep in sync if that duration changes.
const TRANSITION_MS = 300;

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// The modal that is currently open, if any. Only one can be open at a time.
let active = null;

function open(modal) {
  if (active && active !== modal) close(active);

  clearTimeout(modal.hideTimer);
  modal.el.classList.add('showing');
  requestAnimationFrame(() => {
    modal.el.classList.add('visible');
    modal.populate?.();
  });

  modal.triggers.forEach(t => t.setAttribute('aria-expanded', 'true'));
  modal.lastFocused = document.activeElement;
  modal.closeBtn?.focus();
  active = modal;
}

function close(modal) {
  modal.el.classList.remove('visible');
  modal.hideTimer = setTimeout(() => modal.el.classList.remove('showing'), TRANSITION_MS);

  modal.triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
  // Only pull focus back if it is still inside the modal we are closing —
  // otherwise we would yank it away from wherever the user has moved on to.
  if (modal.el.contains(document.activeElement)) modal.lastFocused?.focus();
  if (active === modal) active = null;
}

function isOpen(modal) {
  return modal.el.classList.contains('visible');
}

function createModal({ id, containerId, closeId, triggerIds, populate }) {
  const el = document.getElementById(id);
  if (!el) return null;

  const modal = {
    el,
    container: document.getElementById(containerId),
    closeBtn: document.getElementById(closeId),
    triggers: triggerIds.map(t => document.getElementById(t)).filter(Boolean),
    populate,
    lastFocused: null,
    hideTimer: 0,
  };

  modal.triggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      // The 'visible' class is only applied on the next frame, so a trigger
      // click never reaches the document listener while the modal reads as open.
      isOpen(modal) ? close(modal) : open(modal);
    });
  });

  modal.closeBtn?.addEventListener('click', () => close(modal));

  return modal;
}

function populateSquads() {
  const container = document.getElementById('squadsList');
  if (!container || container.children.length > 0) return;

  const frag = document.createDocumentFragment();
  squads.forEach(s => {
    const item = document.createElement('span');
    const img = document.createElement('img');
    img.src = s.coat;
    img.alt = `${s.name} coat of arms`;
    img.width = 200;
    img.height = 200;
    img.loading = 'lazy';

    item.appendChild(img);
    frag.appendChild(item);
  });
  container.appendChild(frag);
}

function populateShoutouts() {
  const container = document.getElementById('shoutoutList');
  if (!container || container.children.length > 0) return;

  const frag = document.createDocumentFragment();
  subscribers.forEach(name => {
    const span = document.createElement('span');
    span.className = 'white-box shoutout-name';
    span.textContent = name;
    frag.appendChild(span);
  });
  container.appendChild(frag);
}

const modals = [
  {
    id: 'squadsModal',
    containerId: 'squadsModalContainer',
    closeId: 'closeSquadsModalBtn',
    triggerIds: ['openSquadsModalBtn', 'openSquadsModalNav'],
    populate: populateSquads,
  },
  {
    id: 'shoutoutModal',
    containerId: 'shoutoutModalContainer',
    closeId: 'closeShoutoutModalBtn',
    triggerIds: ['openShoutoutModalBtn', 'openShoutoutModalNav'],
    populate: populateShoutouts,
  },
  {
    id: 'soonModal',
    containerId: 'soonModalContainer',
    closeId: 'closeSoonModalBtn',
    triggerIds: ['openSoonModalBtn', 'openSoonModalNav'],
  },
].map(createModal).filter(Boolean);

// One listener pair for every modal, rather than one pair per modal.
document.addEventListener('click', e => {
  if (active && isOpen(active) && !active.container.contains(e.target)) close(active);
});

document.addEventListener('keydown', e => {
  if (!active || !isOpen(active)) return;

  if (e.key === 'Escape') {
    close(active);
    return;
  }

  // Keep Tab inside the open dialog, as aria-modal="true" promises.
  if (e.key === 'Tab') {
    const items = [...active.container.querySelectorAll(FOCUSABLE)]
      .filter(el => el.offsetParent !== null);
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

export { modals };
