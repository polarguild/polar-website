// Hash router. The site is an app shell: nav swaps the visible view instead of
// scrolling one long page. Hashes keep deep links and the back button working
// on GitHub Pages without any server rewrites.

const ROUTES = {
  '/':        { view: 'view-home',   title: 'POLAR Guild' },
  '/fronts':  { view: 'view-fronts', title: 'Active Fronts — POLAR' },
  '/record':  { view: 'view-record', title: 'The Record — POLAR' },
  '/join':    { view: 'view-join',   title: 'Join — POLAR' },
};

const listeners = [];

export function onRoute(fn) {
  listeners.push(fn);
}

function currentPath() {
  const raw = location.hash.replace(/^#/, '') || '/';
  return ROUTES[raw] ? raw : '/';
}

function show(path) {
  const { view, title } = ROUTES[path];

  document.querySelectorAll('.view').forEach(section => {
    const active = section.id === view;
    section.hidden = !active;
    if (active) {
      section.scrollTop = 0;
      // restart the entrance animation on every visit
      section.classList.remove('is-entering');
      void section.offsetWidth;
      section.classList.add('is-entering');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    const target = link.getAttribute('href').replace(/^#/, '') || '/';
    if (target === path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  document.title = title;
  listeners.forEach(fn => fn(path));
}

function closeMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  nav?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
}

export function startRouter() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // any in-app link closes the mobile menu
  document.addEventListener('click', e => {
    if (e.target.closest('a[href^="#/"]')) closeMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('hashchange', () => show(currentPath()));
  show(currentPath());
}
