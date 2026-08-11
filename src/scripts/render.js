import { activeFronts, archivedFronts } from './fronts.js';
import { subscribers } from './subscribers.js';
import { onRoute } from './router.js';

const YT = 'https://www.youtube.com/watch?v=';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function external(href) {
  const a = el('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

function videoLink(id, context) {
  const a = external(YT + id);
  const img = el('img', 'yt');
  img.src = '/assets/icons/youtube.svg';
  img.alt = context ? `Watch ${context} on YouTube` : 'Watch on YouTube';
  img.width = 17;
  img.height = 17;
  img.loading = 'lazy';
  a.appendChild(img);
  return a;
}

/* ---------------------------------------------------------------- fronts */

function frontCard(front) {
  const card = el('article', 'panel front-card');
  card.dataset.front = front.id;

  const badge = el('span', 'front-badge');
  badge.appendChild(el('i'));
  badge.appendChild(el('span', null, 'Active'));
  card.appendChild(badge);

  const title = el('h2', 'front-title', front.game);
  if (front.edition) title.appendChild(el('span', 'front-edition', front.edition));
  card.appendChild(title);

  if (front.meta) card.appendChild(el('p', 'front-meta', front.meta));

  if (front.stats?.length) {
    const stats = el('div', 'front-stats');
    front.stats.forEach(s => {
      const wrap = el('div');
      if (s.id) wrap.dataset.stat = s.id;
      wrap.appendChild(el('div', 'front-stat-value', s.value));
      wrap.appendChild(el('div', 'front-stat-label', s.label));
      stats.appendChild(wrap);
    });
    card.appendChild(stats);
  }

  if (front.note) card.appendChild(el('p', 'front-note', front.note));

  if (front.video || front.link) {
    const foot = el('div', 'front-links');
    if (front.video) foot.appendChild(videoLink(front.video, front.game));
    if (front.link) {
      const a = external(front.link.url);
      a.className = 'front-link';
      a.textContent = front.link.label;
      foot.appendChild(a);
    }
    card.appendChild(foot);
  }

  return card;
}

function renderFronts() {
  const mount = document.getElementById('frontsGrid');
  if (!mount || mount.children.length) return;
  const frag = document.createDocumentFragment();
  activeFronts.forEach(f => frag.appendChild(frontCard(f)));
  mount.appendChild(frag);

  const count = document.getElementById('statFronts');
  if (count) count.textContent = String(activeFronts.length);
}

/* ---------------------------------------------------------------- record */

function campaignPanel(campaign) {
  const panel = el('article', 'panel campaign');

  const h3 = el('h3', null, campaign.name);
  if (campaign.video) h3.appendChild(videoLink(campaign.video, campaign.name));
  panel.appendChild(h3);

  campaign.groups.forEach(group => {
    if (group.title) panel.appendChild(el('span', 'group-title', group.title));

    if (group.type === 'rankings') {
      group.items.forEach(i => {
        const row = el('div', 'rank-row');
        row.appendChild(el('b', null, i.label));
        row.appendChild(el('span', null, i.place));
        panel.appendChild(row);
      });
    } else {
      group.items.forEach(i => {
        const row = el('div', 'record-item');
        row.appendChild(el('span', null, i.text));
        if (i.with) {
          const a = external(i.with.url);
          a.textContent = i.with.label;
          row.appendChild(el('span', null, '(w/'));
          row.appendChild(a);
          row.appendChild(el('span', null, ')'));
        }
        if (i.video) row.appendChild(videoLink(i.video, i.text));
        panel.appendChild(row);
      });
    }
  });

  return panel;
}

function renderRecord() {
  const tabs = document.getElementById('recordSwitch');
  const body = document.getElementById('recordBody');
  if (!tabs || tabs.children.length) return;

  // Every game is built once and stacked into a single grid cell, rather than
  // swapping the contents on each click. The cell is always as tall as the
  // tallest game, so choosing a different one cannot change the height of the
  // block — which is what lets the view stay vertically centred like every
  // other view without the heading and switcher jumping.
  const panes = archivedFronts.map(front => {
    const pane = el('div', 'record-pane');
    if (front.period) pane.appendChild(el('p', 'record-period', front.period));

    const grid = el('div', 'campaigns');
    front.campaigns.forEach(c => grid.appendChild(campaignPanel(c)));
    pane.appendChild(grid);

    body.appendChild(pane);
    return pane;
  });

  const select = index => {
    panes.forEach((p, i) => p.classList.toggle('is-active', i === index));
    [...tabs.children].forEach((btn, i) =>
      btn.setAttribute('aria-selected', String(i === index)));
  };

  archivedFronts.forEach((front, i) => {
    const label = front.subtitle ? `${front.game} ${front.subtitle}` : front.game;
    const btn = el('button', null, label);
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => select(i));
    tabs.appendChild(btn);
  });

  select(0);
}

/* ------------------------------------------------------------ shoutouts */

function renderShoutouts() {
  const mount = document.getElementById('shoutoutList');
  if (!mount || mount.children.length) return;
  const frag = document.createDocumentFragment();
  subscribers.forEach(name => frag.appendChild(el('span', null, name)));
  mount.appendChild(frag);
}

/* ----------------------------------------------------------- live stats */

// Raider.IO is public, key-less and CORS-enabled. Everything it touches has a
// sensible value in the markup already, so a failure here is invisible.
async function applyLive() {
  const front = activeFronts.find(f => f.live?.source === 'raiderio');
  if (!front) return;

  const { region, realm, name } = front.live;
  const res = await fetch(
    `https://raider.io/api/v1/guilds/profile?region=${region}&realm=${realm}` +
    `&name=${encodeURIComponent(name)}&fields=raid_progression%2Craid_rankings`);
  if (!res.ok) throw new Error(`raider.io ${res.status}`);
  const data = await res.json();

  // Single-boss raids do not count — a 1/1 M on a one-boss raid is not a tier
  // and the raid team does not quote it. Raider.IO currently lists two
  // (sporefall, the-tidebound-grotto), so filter on boss count rather than
  // naming them.
  const tiers = Object.entries(data.raid_progression || {})
    .filter(([, r]) => r.total_bosses > 1);

  // Of the real tiers, the deepest mythic clear.
  const best = tiers
    .reduce((a, e) => (e[1].mythic_bosses_killed > (a?.[1].mythic_bosses_killed ?? -1) ? e : a), null);
  if (!best || best[1].mythic_bosses_killed === 0) return;

  const [slug, progress] = best;

  // Ranks must come from that same raid. Taking the best rank across all raids
  // paired a 9/9 M tier clear with the standing from a one-boss raid, which is
  // both flattering and not the number the raid team quotes.
  const rank = data.raid_rankings?.[slug]?.mythic ?? {};

  const card = document.querySelector(`[data-front="${front.id}"]`);
  const set = (id, value) => {
    if (!value) return;
    const stat = card?.querySelector(`[data-stat="${id}"] .front-stat-value`);
    if (stat) stat.textContent = value;
  };
  const bar = (id, value) => {
    if (!value) return;
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  };

  set('progress', progress.summary);
  bar('statMythic', progress.summary);

  // One combined figure on the card — the way the raid team quotes it —
  // and split out in the status bar, where there is room for labels.
  if (rank.world > 0 && rank.region > 0) set('rank', `${rank.world} / ${rank.region}`);
  else if (rank.world > 0) set('rank', `${rank.world}`);

  if (rank.world > 0) bar('statWorld', `#${rank.world}`);
  if (rank.region > 0) bar('statRegion', `#${rank.region}`);
}

/* -------------------------------------------------------- featured video */

// The video does not autoplay. Every browser permits autoplay only when the
// player is muted, and there is no parameter or workaround that lifts that —
// so an autoplaying embed would have been a silent one.
//
// It is still worth pausing on navigation: if a visitor starts the video and
// then moves to another view, the audio would otherwise keep playing from a
// panel they can no longer see.
function setupFeaturedVideo() {
  const frame = document.getElementById('featuredVideo');
  if (!frame) return;

  // YouTube's iframe API over postMessage — no extra script needed, the embed
  // already carries enablejsapi=1.
  const command = func => {
    try {
      frame.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }), '*');
    } catch {
      /* player not ready or not same-origin yet — nothing to do */
    }
  };

  onRoute(path => {
    if (path !== '/') command('pauseVideo');
  });
}

/* ------------------------------------------------------------------ init */

export function renderAll() {
  renderFronts();
  renderRecord();
  renderShoutouts();
  setupFeaturedVideo();

  const year = document.getElementById('footerYear');
  if (year) year.textContent = new Date().getFullYear();

  applyLive().catch(() => { /* markup values stand */ });
}
