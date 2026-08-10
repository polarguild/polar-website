import { activeFronts, archivedFronts } from './fronts.js';

const YT_WATCH = 'https://www.youtube.com/watch?v=';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// The small YouTube glyph used throughout the page for "there is a video of this".
function videoLink(id, context) {
  const a = el('a');
  a.href = YT_WATCH + id;
  a.target = '_blank';
  a.rel = 'noopener';

  const img = el('img', 'yt-icon');
  img.src = '/assets/icons/youtube.svg';
  img.alt = context ? `Watch ${context} on YouTube` : 'Watch on YouTube';
  img.width = 22;
  img.height = 22;
  img.loading = 'lazy';

  a.appendChild(img);
  return a;
}

/* active fronts */

function renderStat(stat) {
  const wrap = el('div', 'front-stat');
  // data-stat lets the Raider.IO pass find and replace this value later
  if (stat.id) wrap.dataset.stat = stat.id;
  wrap.appendChild(el('div', 'front-stat-value', stat.value));
  wrap.appendChild(el('div', 'front-stat-label', stat.label));
  return wrap;
}

function renderFrontCard(front) {
  const card = el('article', 'front-card');
  card.dataset.front = front.id;

  const badge = el('span', 'front-badge');
  badge.appendChild(el('span', 'front-badge-dot'));
  badge.appendChild(el('span', null, 'ACTIVE'));
  card.appendChild(badge);

  const title = el('h3', 'front-title', front.game);
  if (front.edition) title.appendChild(el('span', 'front-edition', front.edition));
  card.appendChild(title);

  if (front.meta) card.appendChild(el('p', 'front-meta', front.meta));

  if (front.stats?.length) {
    const stats = el('div', 'front-stats');
    front.stats.forEach(s => stats.appendChild(renderStat(s)));
    card.appendChild(stats);
  }

  if (front.note) card.appendChild(el('p', 'front-note', front.note));

  if (front.video || front.link) {
    const foot = el('div', 'front-links');
    if (front.video) foot.appendChild(videoLink(front.video, front.game));
    if (front.link) {
      const a = el('a', 'front-link', front.link.label);
      a.href = front.link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      foot.appendChild(a);
    }
    card.appendChild(foot);
  }

  return card;
}

/* archive */

function renderListItem(item) {
  const row = el('li', 'record-item');

  row.appendChild(document.createTextNode(item.text));

  // optional "(w/ <ally>)" credit, where the ally name links out
  if (item.with) {
    row.appendChild(document.createTextNode(' (w/ '));
    const a = el('a', null, item.with.label);
    a.href = item.with.url;
    a.target = '_blank';
    a.rel = 'noopener';
    row.appendChild(a);
    row.appendChild(document.createTextNode(')'));
  }

  if (item.video) {
    row.appendChild(document.createTextNode(' '));
    row.appendChild(videoLink(item.video, item.text));
  }

  return row;
}

function renderRankingItem(item, group) {
  const row = el('div', 'victories-item');

  const label = el('div', group.wideLabels ? 'competition-wide' : 'competition');
  label.appendChild(el('b', null, `${item.label}:`));
  row.appendChild(label);

  row.appendChild(el('div', group.shortPlaces ? 'place-narrow' : 'place', item.place));
  return row;
}

function renderGroup(group) {
  const frag = document.createDocumentFragment();

  if (group.title) {
    const heading = el('span', 'aoc-topic');
    heading.appendChild(el('b', null, group.title));
    frag.appendChild(heading);
  }

  if (group.type === 'rankings') {
    group.items.forEach(i => frag.appendChild(renderRankingItem(i, group)));
  } else {
    const list = el('ul', 'record-list');
    group.items.forEach(i => list.appendChild(renderListItem(i)));
    frag.appendChild(list);
  }

  return frag;
}

function renderCampaign(campaign) {
  const wrap = el('div', 'record-campaign');

  const h4 = el('h4', null, campaign.name);
  if (campaign.video) {
    h4.appendChild(document.createTextNode(' '));
    h4.appendChild(videoLink(campaign.video, campaign.name));
  }
  wrap.appendChild(h4);

  campaign.groups.forEach(g => wrap.appendChild(renderGroup(g)));
  return wrap;
}

function renderArchiveCard(front) {
  const box = el('div', 'white-box record-card');

  const h3 = el('h3', null, front.game);
  if (front.subtitle) h3.appendChild(el('span', 'record-subtitle', front.subtitle));
  box.appendChild(h3);

  if (front.period) box.appendChild(el('p', 'record-period', front.period));

  const body = el('div', 'paragraph victory-box record-body');
  front.campaigns.forEach(c => body.appendChild(renderCampaign(c)));
  box.appendChild(body);

  return box;
}

/* live progression */

// Raider.IO is public, key-less and CORS-enabled. If anything about that stops
// being true the statics written in fronts.js are already on screen, so this
// failing is invisible rather than destructive.
async function applyLiveProgression(front) {
  const { region, realm, name } = front.live;
  const url = `https://raider.io/api/v1/guilds/profile?region=${region}&realm=${realm}` +
              `&name=${encodeURIComponent(name)}&fields=raid_progression%2Craid_rankings`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`raider.io responded ${res.status}`);
  const data = await res.json();

  const card = document.querySelector(`[data-front="${front.id}"]`);
  if (!card) return;

  // Headline is the guild's deepest mythic clear, not the most recent raid —
  // a fresh single-boss raid would otherwise replace a full-tier clear with
  // something like "1/1 M" and read as a downgrade.
  const best = Object.values(data.raid_progression || {})
    .reduce((a, r) => (r.mythic_bosses_killed > (a?.mythic_bosses_killed ?? -1) ? r : a), null);
  if (best?.mythic_bosses_killed > 0) setStat(card, 'progress', best.summary);

  // Best (lowest) mythic world rank across every tier that has one.
  const ranks = Object.values(data.raid_rankings || {})
    .map(r => r.mythic?.world)
    .filter(n => typeof n === 'number' && n > 0);
  if (ranks.length) setStat(card, 'world', `#${Math.min(...ranks)}`);

  card.dataset.live = 'true';
}

function setStat(card, id, value) {
  const node = card.querySelector(`[data-stat="${id}"] .front-stat-value`);
  if (node && value) node.textContent = value;
}

/* mount */

export function renderFronts() {
  const activeMount = document.getElementById('frontsList');
  if (activeMount && !activeMount.children.length) {
    const frag = document.createDocumentFragment();
    activeFronts.forEach(f => frag.appendChild(renderFrontCard(f)));
    activeMount.appendChild(frag);
  }

  const archiveMount = document.getElementById('victoriesList');
  if (archiveMount && !archiveMount.children.length) {
    const frag = document.createDocumentFragment();
    archivedFronts.forEach(f => frag.appendChild(renderArchiveCard(f)));
    archiveMount.appendChild(frag);
  }

  activeFronts
    .filter(f => f.live?.source === 'raiderio')
    .forEach(f => applyLiveProgression(f).catch(() => { /* statics stand */ }));
}
