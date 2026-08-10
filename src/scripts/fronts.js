// Every game POLAR fields a team in, past and present.
//
// This is the single place to edit when a campaign ends or a new one starts —
// index.html renders both sections from these arrays, so no markup changes.
//
// status: 'active'    — currently being played, shows in Active Fronts
//         'concluded' — finished, shows in Victories
//
// A front may carry a `live` block. When present the renderer asks Raider.IO
// for current progression and replaces the matching stat. The values written
// here still render on their own, so the card is correct with JS disabled,
// offline, or if Raider.IO is down.

export const fronts = [
  {
    id: 'retail',
    game: 'World of Warcraft',
    edition: 'Midnight',
    status: 'active',
    meta: 'US-Illidan · Horde · Mythic progression',
    // labels stay generic so they cannot go stale when the tier rolls over
    stats: [
      { id: 'progress', value: '9/9 M', label: 'Mythic' },
      { id: 'world', value: '#114', label: 'World rank' },
    ],
    note: 'Cutting Edge cleared. Chasing Hall of Fame.',
    video: '82kn8hS_QWI',
    link: { label: 'Warcraft Logs', url: 'https://www.warcraftlogs.com/guild/us/illidan/polar' },
    live: { source: 'raiderio', region: 'us', realm: 'illidan', name: 'polar' },
  },
  {
    id: 'ascension',
    game: 'Ascension',
    edition: 'Conquest of Azeroth',
    status: 'active',
    meta: 'Voljin · 21 classes · 70 specs',
    stats: [
      { id: 'roster', value: '92+', label: 'Roster' },
      { id: 'since', value: 'JUL 3', label: 'Launched' },
    ],
    note: 'Raid progression underway on a fresh realm.',
  },
  {
    id: 'mnm',
    game: 'Monsters & Memories',
    edition: 'Early Access',
    status: 'active',
    meta: 'Classic-style group MMO',
    stats: [{ id: 'phase', value: 'EA', label: 'Phase' }],
    note: 'Building the launch roster now.',
  },
  {
    id: 'lineage2',
    game: 'Lineage 2',
    edition: 'Project LU4',
    status: 'active',
    meta: 'Remastered Classic · fresh start',
    stats: [{ id: 'since', value: 'JUL 31', label: 'Fresh start' }],
    note: 'New front, forming groups.',
  },

  {
    id: 'aoc',
    game: 'Ashes of Creation',
    status: 'concluded',
    period: '2025 — 2026',
    campaigns: [
      {
        name: 'A-P2.0 (Vyra)',
        video: 'lJGgmAaJjzg',
        groups: [
          {
            title: 'Tournaments',
            items: [
              { text: '8v8: 1st Place', with: { label: 'Enveus', url: 'https://guildcontrol.com/' }, video: 'uDJWAP7RnJg' },
              { text: '8v8: 1st Place', video: '3KOwpzS-Gg0' },
              { text: 'Naval PR: 1st Place', with: { label: 'Enveus', url: 'https://guildcontrol.com/' } },
            ],
          },
          {
            title: 'Live Combat',
            items: [
              { text: '20+ Node War Victories' },
              { text: '3-0 Node Sieges' },
              { text: '100+ World Boss Kills' },
            ],
          },
        ],
      },
      {
        name: 'A-P2.5 (Shol)',
        video: 'lHNIRzomYGY',
        groups: [
          { title: 'Tournaments', items: [{ text: '8v8: 3rd Place' }] },
          {
            title: 'Live Combat',
            items: [
              { text: '3-0 Node Sieges' },
              { text: '1st in Guild War Wins' },
            ],
          },
        ],
      },
      {
        name: 'A-P3 (Shol)',
        groups: [
          {
            title: 'Live Combat',
            items: [
              { text: '17/17 Guild Wars' },
              { text: '15+ Node War Victories' },
              { text: '2-0 Node Sieges' },
              { text: '2-0 Node Wars' },
              { text: '1st in World Boss Kills' },
              { text: 'First group to max level on server' },
            ],
          },
        ],
      },
      {
        name: 'Phase Steam (Resna)',
        groups: [
          {
            title: 'Live Combat',
            items: [
              { text: 'Undefeated — decisive server victory' },
              { text: 'World First level 25' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'wow-classic',
    game: 'World of Warcraft',
    subtitle: 'Classic',
    status: 'concluded',
    campaigns: [
      {
        name: 'Cataclysm',
        groups: [
          {
            title: null,
            type: 'rankings',
            items: [
              { label: 'T12', place: 'W11 / NA5' },
              { label: 'T11', place: 'W3 / NA1' },
            ],
          },
        ],
      },
      {
        name: 'WOTLK',
        groups: [
          {
            title: null,
            type: 'rankings',
            items: [
              { label: 'RS', place: 'W10 / NA3' },
              { label: 'T10', place: 'W20 / NA6' },
              { label: 'T9', place: 'W22 / NA9' },
              { label: 'T8', place: 'W39 / NA15' },
            ],
          },
        ],
      },
      {
        name: 'Mastery',
        groups: [
          {
            title: null,
            type: 'rankings',
            // these labels are longer, and the places are a bare "W1"
            wideLabels: true,
            shortPlaces: true,
            items: [
              { label: 'NAXX', place: 'W1' },
              { label: 'AQ40', place: 'W1' },
            ],
          },
        ],
      },
      {
        name: 'Discovery',
        groups: [
          {
            title: null,
            type: 'rankings',
            wideLabels: true,
            items: [
              { label: 'BWL', place: 'W6 / NA1' },
              { label: 'MC', place: 'W3 / NA1' },
              { label: 'ST', place: 'W5 / NA1' },
              { label: 'GNMR', place: 'W7 / NA2' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'albion',
    game: 'Albion Online',
    status: 'concluded',
    period: '2025',
    campaigns: [
      {
        name: 'Territory',
        video: 'vJNmPgWZoik',
        groups: [
          {
            title: 'Live Combat',
            items: [
              { text: 'First guild hideout secured' },
              { text: 'Territory held against contest' },
            ],
          },
        ],
      },
    ],
  },
];

export const activeFronts = fronts.filter(f => f.status === 'active');
export const archivedFronts = fronts.filter(f => f.status === 'concluded');
