// Modals are opened by any [data-modal="<id>"] control and close on the X, a
// backdrop click, or Escape. One document-level listener pair serves all of them.

const TRANSITION_MS = 180;
const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

let active = null;
let lastFocused = null;
let hideTimer = 0;

function open(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (!modal) return;
  if (active && active !== modal) close();

  clearTimeout(hideTimer);
  lastFocused = document.activeElement;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('is-open'));

  active = modal;
  modal.querySelector('[data-close]')?.focus();
  document.querySelectorAll(`[data-modal="${id}"]`)
    .forEach(t => t.setAttribute('aria-expanded', 'true'));
}

function close() {
  if (!active) return;
  const modal = active;
  const id = modal.id.replace(/^modal-/, '');

  modal.classList.remove('is-open');
  hideTimer = setTimeout(() => { modal.hidden = true; }, TRANSITION_MS);

  document.querySelectorAll(`[data-modal="${id}"]`)
    .forEach(t => t.setAttribute('aria-expanded', 'false'));

  // only reclaim focus if it is still inside the modal being closed
  if (modal.contains(document.activeElement)) lastFocused?.focus();
  active = null;
}

export function startModals() {
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.modal);
      return;
    }

    if (!active) return;
    if (e.target.closest('[data-close]') || !e.target.closest('.modal-box')) close();
  });

  document.addEventListener('keydown', e => {
    if (!active) return;

    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }

    // keep Tab inside the dialog, as aria-modal promises
    if (e.key === 'Tab') {
      const items = [...active.querySelectorAll(FOCUSABLE)].filter(n => n.offsetParent !== null);
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
}
