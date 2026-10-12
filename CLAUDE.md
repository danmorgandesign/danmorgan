# CLAUDE.md — danmorgan.co.uk

Portfolio for **Dan Morgan** (UX/Product Designer). v2 is a **full front-end rebuild** in Astro, built from a signed-off Figma file. The pre-v2 site (Eleventy + Tailwind CDN) is in git history (last commit before the rebuild: `eca4899`). Use it only to look up old copy, never markup or styles.

## Stack

- **Astro 7** static output, `build.format: 'file'` so URLs stay flat (`/library-lite.html`, as on the old site).
- **Plain CSS.** No Tailwind, no CSS framework, no utility classes beyond the few in `src/styles/global.css`. Component styles go in each `.astro` file's scoped `<style>`.
- **Vanilla JS**, only where a component needs it (menu, lightbox, carousel, contact form, theme toggle, back to top). Use `<script>` in the component. No UI frameworks or islands unless asked.
- **Fonts:** self-hosted Latin WOFF2 in `public/fonts/` (Google Sans Flex variable with wght + opsz for body, since the optical-size axis is needed to match Figma at 14px; Montserrat 700 static for headlines), `@font-face` in `src/styles/fonts.css`. Don't add weights the Figma text styles don't use. The "DM" logo uses Montserrat Black, but it ships as SVG, so that weight is never loaded.
- **Contact form:** Web3Forms via `src/scripts/contact-form.js`, which follows the Contact annotations: validate on submit and then on blur, focus the first invalid field, a Sending state, Sent/Error status banners, keep values on error and clear on success. Copy-email (footer button and Contact link) is `src/scripts/copy-email.js`; the address is assembled at runtime. The access key is meant to be client-side; whether it's restricted to the domain in the Web3Forms dashboard is **unconfirmed**.
- **Redirects:** `/about.html` → `/` (Home is the About page now), via `redirects` in `astro.config.mjs`. It's a static meta-refresh page because GitHub Pages can't send real 301s.
- **Hosting:** GitHub Pages via `.github/workflows/deploy.yml` (Node 24, `npm run build` → `dist/`). It runs on push to `main`. **Before merging `restyle` → `main`, switch Settings → Pages → Source to "GitHub Actions".** Custom domain via `public/CNAME`.

```bash
npm run dev      # http://localhost:3000
npm run build    # → dist/
npm run preview  # serve dist/ on :3000
```

## Layout

```
public/            CNAME, favicon, fonts/ (served as-is)
src/styles/        tokens.css (generated), fonts.css, global.css
src/layouts/       Base.astro (head, CSS imports, theme init)
src/components/    one .astro per Figma component (buttons, header, footer, cards…)
src/components/case-study/  CaseStudyHero, HeroImages, HeroComposite, Divider,
                   CaseSection, FeatureRow, FeatureMedia, Carousel, ZoomableImage,
                   Lightbox, BackToTop
src/layouts/       Base.astro, CaseStudy.astro (adds Lightbox + Back to Top)
src/data/          projects.ts (cards on Home and Portfolio)
src/pages/         index, portfolio, library-lite, easy-invoice, bike-bus, contact → flat .html
src/assets/images/ images processed by astro:assets (use <Image>/<Picture>)
src/scripts/       shared client JS
```

## Token rules (non-negotiable)

- **Semantic tokens only** in components, pages and global.css: `var(--surface-card)`, `var(--space-inset-md)`, `var(--border-width-default)`, never `var(--slate-800)` or `var(--space-4)`.
- **No hard-coded values:** no hex/rgb, no raw px/rem for spacing, sizes, radii, borders, font sizes or shadows. The only exceptions are `0`, `100%`, `auto`, breakpoint widths in media queries, the standard `.visually-hidden` pattern, and **Figma geometry ratios**: image `aspect-ratio`s and the hero-composite scale (`1470 / 1246`), which are unitless proportions of a source asset, not design values.
- **If no semantic token fits, add it to Figma first** (Semantic collection, aliasing a primitive, with explicit scopes), then mirror it in `tokens.css`. Don't invent a value.
- `tokens.css` is **generated from Figma**. Re-sync it from the variables, don't hand-tune it. Primitives → Breakpoint tier → Semantic (mode-invariant, Light, Dark).
- **Lists:** case-study lists are real `<ul>` bullets in Body/Large text. Never hand-type "—" or "•".

## Breakpoints

Mobile-first. Media queries use these literal widths only:

| Tier | Range | Figma frame width |
|---|---|---|
| Mobile | 0–767px (default) | 375 |
| Tablet | `@media (min-width: 768px)` | 834 |
| Desktop | `@media (min-width: 1280px)` | 1920 |

Content max width is 1728px (`--size-content-max`). Use `.page-container` for the page margin and max width. Page margin, grid gutter, section spacing and headline sizes already change per tier inside `tokens.css`, so components shouldn't need their own breakpoints for those.

## Theme

Dark applies when the OS prefers dark, **or** when `<html data-theme="dark">` is set. `data-theme="light"` forces light. With no override the site follows the device (light if it states no preference). The Theme Toggle writes an override to `localStorage.theme` (applied by `Base.astro` before first paint); the override is cleared when toggled back to match the device or when the device theme changes. Show/hide sun and moon with CSS, not the Figma `theme-is-*` booleans.

## Typography

The text-style classes in `global.css` mirror the Figma text styles: `.headline-2xl/-xl/-l/-m/-s`, `.body-lg`, `.body`, `.body-sm`, `.label`, `.caption`. **A text style is a look, not a heading level.** Pick the tag from the outline below, then apply the class that matches the Figma layer.

**Heading outline** (from the annotation on Specimen / Text Hierarchy `244:21`):
- **Home:** h1 "Hello, I'm Dan – UX Product Designer" (Headline/L, keep L, don't make it XL) → h2 "Portfolio" (L) → h3 card titles (S)
- **Portfolio:** h1 "Portfolio" (L) → h2 card titles (S) → h2 "Hello, I'm Dan…" (L)
- **Case studies:** h1 project title (XL) → h2 section headers 01–04 (L; the subtitle is a `<p>`, not a heading) → h3 feature titles (M)
- **Contact:** h1 "Let's talk" (XL)
- **Never headings:** the logo (WordMark / Mark-Initials, an SVG inside `<a href="/" aria-label="Dan Morgan, home">`) and nav items (Headline/S look only)
- One h1 per page, no skipped levels. Headline/2XL is unused.

## Figma: source of truth

File **`Hrq0aL2IaT6DpSCmuTW7uY`** ("Dan Morgan Design Website"). Pages: Prototype V3 `264:98`, Design System V1 `186:98`, Documentation `693:94`.

| Page | Desktop | Tablet | Mobile |
|---|---|---|---|
| Home (`index`) | `264:99` | `644:481` | `370:51` |
| Portfolio | `828:1787` | `828:1858` | `828:1897` |
| Library Lite | `399:121` | `616:635` | `566:258` |
| Easy Invoice | `686:573` | `716:644` | `716:822` |
| Bike Bus | `722:787` | `722:969` | `722:1128` |
| Contact | `821:1807` | `824:1780` | `824:1836` |

**Read the Dev Mode annotations before building each piece.** They hold the spec, not just notes:
- **Alt text:** on every hero image, Feature Row image and avatar. Card thumbnails are `alt=""` (decorative).
- **Lightbox:** build spec on Image Enlarge Overlay `809:1511`
- **Carousel:** `491:279` (also described in the Feature Row alt-text annotations)
- **Menu:** Menu (open) `777:384`: a `<nav>` disclosure controlled by the hamburger (`aria-controls`)
- **Back to Top:** annotations on each case study's Back to Top instance (e.g. `846:1789`). Revealed on scroll in code.
- **Contact form:** annotations on the Contact frames (section `821:1806`)

**Prototype-only. Do NOT build:**
- The "Prototype only: image lightbox (42 overlays)" section `923:1844`. It fakes the lightbox, so build one real component from the `809:1511` spec instead.
- The `Prototype` variable collection (`menu-open`, `contact-sent`, `contact-error`, `contact-field-state`) and the Menu Backdrop rectangles. These are state in code.
- **Reverse layer order** on Tablet/Mobile frames, which only fixes Figma z-order.
- **E / V key** triggers on Contact, which preview the error and validation states.

## Assets

- Images live in `src/assets/images/` (per project folders) and render through `astro:assets` (resized, WebP). Get originals from `get_design_context` asset URLs (full-resolution image fills), not canvas exports. Reuse a file rather than shipping a duplicate (the card thumbnails double as feature images).
- **Tablet zoom crops** (`zoom-*.png`) are centre crops of the 1920 source, full height, at the width in each zoom annotation (1170 / 1325 / 1575). Figma fakes them with fill crops. Regenerate them with sharp if a source changes.
- Logos and icons are SVGs exported from Figma, recoloured with semantic tokens (`currentColor` or `style="fill: var(--…)"`). Child components must spread rest props onto their root element, because Astro 7 scopes styles with `data-astro-cid-*` attributes.

## Verifying against Figma

Compare block positions (section tops and heights at 1920 / 834 / 375) with the frame geometry from Figma, not screenshots alone. Single-line wrap differences are expected: Chrome and Figma set Google Sans Flex within ~1% of each other at 18px, so a line that only just fits can break differently.

## Open items

- Web3Forms key domain restriction is unconfirmed.
- Copy kept exactly as in Figma but likely slips: Easy Invoice "Automatic Reminders" body repeats its title; Bike Bus summary "An Award Winning" (the card says "award-winning"), "…through numbers" with no full stop, "…searchable or public,".

## Git

- Work on branch `restyle`. Commit only what was discussed, in scoped commits. **Never push unless Dan asks.**
