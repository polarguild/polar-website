# < POLAR >

Official placeholder website for the POLAR MMO guild.

## Technology

This is a single-page static site built with:
- HTML
- CSS
- Vanilla JavaScript

No frameworks. No backend. No routing. No database. Just fast and minimal.

## Deployment

All changes pushed to `main` are automatically deployed to [polarguild.org](https://polarguild.org) via GitHub Pages.

> Domain forwarding to Squarespace is handled outside this repo.

## Current Status

This is a temporary public-facing site until a designer joins the project or a full site is built.  
It's meant to act as a lightweight info hub and landing page.

## Repo Structure

```
assets/                         ← Images
favicon.ico                     ← Favicon

src/
├── scripts/                    ← JavaScript logic & data
├── styles/                     ← CSS

index.html                      ← HTML
index.js                        ← JavaScript imports
README.md                       ← This file
CNAME                           ← Domain config
robots.txt                      ← SEO/crawler control
sitemap.xml                     ← SEO sitemap
```

## Local Development

There is no build step. Serve the repo root over HTTP so the absolute
`/assets/...` paths and the ES module in `index.js` resolve:

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` via `file://` will not
work — ES modules are blocked on that scheme.

## Conventions

A few things that are easy to trip over when editing:

- **Images are AVIF.** Everything except `assets/polar/link-preview.png` (the
  Open Graph image, which social scrapers need in a widely supported format)
  and `favicon.ico`. Encode new art with
  `avifenc -q 72 -s 4 source.png out.avif`, resized to about 2× its display
  size. The originals live in git history.
- **`<img>` tags carry `width`/`height`.** These reserve space and prevent
  layout shift, but they are also presentation hints: if CSS sets only one
  dimension, set the other to `auto` in CSS or the tag will pin it.
- **Games and results are data, not markup.** `src/scripts/fronts.js` drives
  both the Active Fronts cards and the Victories records. To retire a campaign
  flip its `status` from `active` to `concluded`; to add a new game, append an
  entry. No HTML changes.
- **Live progression.** A front with a `live` block is topped up from
  Raider.IO at page load (public, no API key). The values committed in
  `fronts.js` render on their own, so the card stays correct with JS off or
  if Raider.IO is unreachable — keep them roughly current anyway.
- **Squad crests** are data, not markup — add them to `src/scripts/squads.js`
  and the modal picks them up.
- **Modals** share one implementation in `src/scripts/modals.js`. Add a new one
  by appending an entry to the `modals` array, not by copying the logic.
