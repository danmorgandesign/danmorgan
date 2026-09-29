# CLAUDE.md — danmorgan.co.uk

## Overview
Personal portfolio and design engineering lab for **Dan Morgan** (UX/Product Designer). The site showcases product design work, interactive UI components, and agentic design-to-code workflows integrating **Figma** and **Claude Code**.

---

## Technical Stack & Architecture

- **Framework:** Eleventy (11ty) static site generator. Source lives in `src/`; pages are HTML with Nunjucks front matter, a shared layout (`src/_includes/base.njk`) and partials (`nav.njk`, `footer.njk`). Page URLs are pinned via explicit `permalink:` front matter to keep the original flat `.html` paths (no `/about/`-style directories).
- **Styling:** Tailwind CSS via the CDN script (`<script src="https://cdn.tailwindcss.com">`), same as before the Eleventy conversion — **not yet** an npm build from `tokens.css`. That's planned future work for the visual restyle, not done yet.
- **Scripts:** Vanilla JavaScript (`contact-form.js`). The contact form goes through Web3Forms.
- **Icons & Motion:** Inline SVG icons, CSS transitions. No icon or animation libraries.
- **Fonts:** Google Fonts — currently still **Lato** (body) and **Nunito** (headings), unchanged from pre-Eleventy. Montserrat / Google Sans Flex is the planned future direction, not yet applied.
- **Hosting:** GitHub Pages. A GitHub Action (`.github/workflows/deploy.yml`) builds `_site` via `npm run build` and deploys it. **Before merging this to `main`, the repo's Pages source (Settings → Pages → Build and deployment) needs switching from "Deploy from a branch" to "GitHub Actions"** — otherwise Pages will keep trying to serve the raw `src/`/config files instead of the built site. Custom domain in `CNAME` (passed through from `src/CNAME`).
- **Design Systems Bridge:** The Figma MCP server reads the "Design System V1" page. Tokens are copied into `tokens.css` by hand — `tokens.css` doesn't exist yet; this is part of the pending restyle work.

---

## Core Development Commands

```bash
# Development
npm run dev           # Start local dev server (http://localhost:8080)
npm run build         # Production build test
