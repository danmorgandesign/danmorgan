# CLAUDE.md — danmorgan.co.uk

## Overview
Personal portfolio and design engineering lab for **Dan Morgan** (UX/Product Designer). The site showcases product design work, interactive UI components, and agentic design-to-code workflows integrating **Figma** and **Claude Code**.

---

## Technical Stack & Architecture

- **Framework:** Eleventy (11ty) static site generator. Pages are HTML with Nunjucks layouts and partials (nav, footer, head) in `_includes/`.
- **Styling:** Tailwind CSS via npm, building one CSS file from `tokens.css` (primitive + semantic CSS variables, light and dark).
- **Scripts:** Vanilla JavaScript (`contact-form.js`). The contact form goes through Web3Forms.
- **Icons & Motion:** Inline SVG icons, CSS transitions. No icon or animation libraries.
- **Fonts:** Google Fonts. Montserrat for headlines, Google Sans Flex for body text.
- **Hosting:** GitHub Pages, deployed by a GitHub Action that builds `_site`. Custom domain in `CNAME`.
- **Design Systems Bridge:** The Figma MCP server reads the "Design System V1" page. Tokens are copied into `tokens.css` by hand.

---

## Core Development Commands

```bash
# Development
npm run dev           # Start local dev server (http://localhost:3000)
npm run build         # Production build test
npm run lint          # Run ESLint checks
