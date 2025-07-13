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

assets/
├── aoc/                         ← AoC logos
├── backgrounds/                ← Site background images
├── icons/                      ← UI SVG icons (Discord, Twitch, etc.)
├── polar/                      ← POLAR logos and preview images
favicon.ico                     ← Site favicon

src/
├── scripts/
│   ├── custom.js               ← Custom JavaScript logic
│   └── webflow.js              ← Webflow-exported JS
├── styles/
│   ├── custom.css              ← Your custom CSS
│   └── webflow.css             ← Webflow-exported CSS

index.html                      ← Main HTML file
index.js                        ← Optional site entry script
README.md                       ← This file
CNAME                           ← GitHub Pages domain config
robots.txt                      ← SEO/crawler control
sitemap.xml                     ← SEO sitemap
