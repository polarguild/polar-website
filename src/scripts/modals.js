import { subscribers } from './subscribers.js';

// shoutout modal

function populateShoutouts() {
  const container = document.getElementById('shoutoutList');
  if (!container) {
    console.warn('shoutoutList not found');
    return;
  }

  if (container.children.length > 0) return;

  subscribers.forEach(name => {
    const span = document.createElement('span');
    span.className = 'white-box shoutout-name';
    span.textContent = name;
    container.appendChild(span);
  });
}

const modal = document.getElementById('shoutoutModal');
const openButtons = [
  document.getElementById('openShoutoutModalBtn'),
  document.getElementById('openShoutoutModalNav')
];
const closeButton = document.getElementById('closeShoutoutModalBtn');
const modalContainer = document.getElementById('shoutoutModalContainer');

openButtons.forEach(btn => {
  if (btn) {
    btn.onclick = e => {
      e.preventDefault();
      if (modal.classList.contains('visible')) {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.remove('showing'), 300);
      } else {
        modal.classList.add('showing');
        requestAnimationFrame(() => {
          modal.classList.add('visible');
          populateShoutouts(); // inject names when modal opens
        });
      }
    };
  }
});

if (closeButton) {
  closeButton.onclick = () => {
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.remove('showing'), 300);
  };
}

window.addEventListener('click', e => {
  if (
    modal.classList.contains('visible') &&
    !modalContainer.contains(e.target)
  ) {
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.remove('showing'), 300);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('visible')) {
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.remove('showing'), 300);
  }
});

// soon modal

const soonModal = document.getElementById('soonModal');
const openSoonButtons = [
  document.getElementById('openSoonModalBtn'),
  document.getElementById('openSoonModalNav')
];
const closeSoonButton = document.getElementById('closeSoonModalBtn');
const soonModalContainer = document.getElementById('soonModalContainer');

openSoonButtons.forEach(btn => {
  if (btn) {
    btn.onclick = e => {
      e.preventDefault();
      if (soonModal.classList.contains('visible')) {
        soonModal.classList.remove('visible');
        setTimeout(() => soonModal.classList.remove('showing'), 300);
      } else {
        soonModal.classList.add('showing');
        requestAnimationFrame(() => {
          soonModal.classList.add('visible');
        });
      }
    };
  }
});

if (closeSoonButton) {
  closeSoonButton.onclick = () => {
    soonModal.classList.remove('visible');
    setTimeout(() => soonModal.classList.remove('showing'), 300);
  };
}

window.addEventListener('click', e => {
  if (
    soonModal.classList.contains('visible') &&
    !soonModalContainer.contains(e.target)
  ) {
    soonModal.classList.remove('visible');
    setTimeout(() => soonModal.classList.remove('showing'), 300);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && soonModal.classList.contains('visible')) {
    soonModal.classList.remove('visible');
    setTimeout(() => soonModal.classList.remove('showing'), 300);
  }
});
