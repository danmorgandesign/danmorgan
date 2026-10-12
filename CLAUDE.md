# CLAUDE.md — danmorgan.co.uk

Portfolio for **Dan Morgan** (UX/Product Designer). v2 is a **full front-end rebuild** in Astro, built from a signed-off Figma file. The pre-v2 site (Eleventy + Tailwind CDN) is in git history (last commit before the rebuild: `eca4899`). Use it only to look up old copy, never markup or styles.

## Stack

- **Astro 7** static output, `build.format: 'file'` so URLs stay flat (`/library-lite.html`, as on the old site).
- **Plain CSS.** No Tailwind, no CSS framework, no utility classes beyond the few in `src/styles/global.css`. Component styles go in each `.astro` file's scoped `<style>`.
- **Vanilla JS**, only where a component needs it (menu, lightbox, carousel, contact form, theme toggle, back to top). Use `<script>` in the component. No UI frameworks or islands unless asked.
- **Fonts:** self-hosted Latin WOFF2 in `public/fonts/` (Google Sans Flex 400/500 for body, Montserrat 700 for headlines), `@font-face` in `src/styles/fonts.css`. Don't add weights the Figma text styles don't use. The "DM" logo uses Montserrat Black, but it ships as SVG, so that weight is never loaded.
- **Contact form:** Web3Forms. The logic (honeypot, obfuscated copy-email button) is in `src/scripts/contact-form.js`, carried over from v1. It still toggles old Tailwind status classes (`text-green-600`/`text-red-600`) and needs rewiring to the new Contact component and the Form Status states. The access key is meant to be client-side; whether it's restricted to the domain in the Web3Forms dashboard is **unconfirmed**.
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
src/components/    one .astro per Figma component
src/pages/         one .astro per page → flat .html
src/assets/images/ images processed by astro:assets (use <Image>/<Picture>)
src/scripts/       shared client JS
```

## Token rules (non-negotiable)

- **Semantic tokens only** in components, pages and global.css: `var(--surface-card)`, `var(--space-inset-md)`, `var(--border-width-default)`, never `var(--slate-800)` or `var(--space-4)`.
- **No hard-coded values:** no hex/rgb, no raw px/rem for spacing, sizes, radii, borders, font sizes or shadows. The only exceptions are `0`, `100%`, `auto`, breakpoint widths in media queries, and the standard `.visually-hidden` pattern.
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

Light is the default. Dark applies when the OS prefers dark, **or** when `<html data-theme="dark">` is set. `data-theme="light"` forces light. The Theme Toggle writes `localStorage.theme`, and `Base.astro` applies it before first paint. Show/hide sun and moon with CSS, not the Figma `theme-is-*` booleans.

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

- Export hero frames and zoom crops **@2x** from Figma (export settings already exist) into `src/assets/images/`, and render them with `astro:assets` so they get resized and converted to modern formats. The PNGs carried over from v1 are old screenshots, so replace them as each page is built.
- Export logos as **SVG** and inline them or put them in `src/assets/`.

## Open decisions

- `about.html`: Figma has no About page (Home is the about). Redirect it or drop it?
- Web3Forms key domain restriction is unconfirmed.

## Git

- Work on branch `restyle`. Commit only what was discussed, in scoped commits. **Never push unless Dan asks.**
