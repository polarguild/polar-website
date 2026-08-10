# < POLAR >

Official website for the POLAR MMO guild.

## Technology

A static site with no build step, no framework and no dependencies:

- HTML
- CSS (one stylesheet, `src/styles/polar.css`)
- Vanilla JavaScript, as ES modules

No jQuery, no Webflow runtime, no CDN scripts. The only third-party request
is Google Fonts, plus a Raider.IO call for live raid progression.

## Deployment

All changes pushed to `main` are automatically deployed to
[polarguild.org](https://polarguild.org) via GitHub Pages.

## Architecture

The site is an **app shell, not a scrolling page**. A fixed header and status
bar sandwich a stage that shows exactly one view at a time. Navigation swaps
views; the page itself never scrolls.

```
Home     #/          identity, featured video, headline numbers
Fronts   #/fronts    the games POLAR is currently fielding a team in
Record   #/record    the archive, one game at a time via the switcher
Join     #/join      what we look for, how to apply
```

Routing is hash-based (`src/scripts/router.js`) so deep links and the back
button work on GitHub Pages without any server rewrites. Unknown routes fall
back to Home.

Each view is responsible for fitting or scrolling *inside itself*. A short
view centres in the available height; a tall one scrolls internally.

## Repo Structure

```
assets/                         ← images (AVIF) and icons

src/
├── scripts/
│   ├── fronts.js               ← DATA: every game, past and present
│   ├── squads.js               ← DATA: squad crests (unused; the Squads
│   │                                 view was removed, kept for re-adding)
│   ├── subscribers.js          ← DATA: supporter names
│   ├── render.js               ← builds views from the data above
│   ├── router.js               ← hash routing + mobile menu
│   └── modals.js               ← shared modal behaviour
└── styles/
    └── polar.css               ← the whole design system

index.html                      ← app shell + static view content
index.js                        ← entry point
CNAME                           ← domain config
robots.txt / sitemap.xml        ← SEO
```

## Local Development

There is no build step. Serve the repo root over HTTP so the absolute
`/assets/...` paths and the ES modules resolve:

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` via `file://` will not
work — ES modules are blocked on that scheme.

> Browsers cache ES modules aggressively and `http.server` sends no
> `Cache-Control`. If an edit to a `.js` file appears to do nothing, hard
> reload or add a query string.

## Conventions

Things that are easy to trip over when editing:

- **Games and results are data, not markup.** `src/scripts/fronts.js` drives
  both the Fronts cards and the Record archive. To retire a campaign, flip its
  `status` from `active` to `concluded`; to add a game, append an entry. No
  HTML or CSS changes.
- **Live progression.** A front with a `live` block is topped up from Raider.IO
  on load (public, no API key, CORS-enabled). It takes the guild's *deepest*
  mythic clear, not the most recent raid, so a fresh single-boss tier cannot
  replace a full clear and read as a downgrade. The values committed in
  `fronts.js` render on their own, so JS off or Raider.IO down degrades to
  correct-but-frozen rather than empty — keep them roughly current anyway.
- **Images are AVIF.** Everything except `assets/polar/link-preview.png` (the
  Open Graph image, which social scrapers need in a widely supported format)
  and `favicon.ico`. Encode new art with `avifenc -q 72 -s 4 source.png out.avif`,
  resized to about 2× its display size. Originals live in git history.
- **Modals** are opened by any `[data-modal="<id>"]` control and close on the X,
  a backdrop click, or Escape. Add one by writing the markup with a matching
  `id="modal-<id>"` — no JavaScript changes.
- **`height: auto` on images is load-bearing.** Tags carry `width`/`height` so
  the browser reserves space, but those are presentation hints — without
  `height: auto` in the reset they pin the rendered height and distort the
  image. Rules needing a fixed size set both dimensions.
- **The design system is one file.** Colours, type, spacing and motion are all
  custom properties at the top of `polar.css`. Change them there, not inline.
- **Contrast.** Small labels use `--gray-dim`, which is tuned to stay above
  5:1 on panel backgrounds. If you darken it, check the contrast again.
