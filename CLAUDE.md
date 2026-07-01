# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Run the Intake (see "Intake — Ask Before Building" below) and ASK the user the questions before writing any frontend code.** Never skip intake — it sets brand, direction, and which skills to activate. Use `AskUserQuestion` when available.
- **STEP 1 of every web project is creating the project's own `DESIGN.md` in its root** (the five-moves method — see "Step 1 — Create the Project's DESIGN.md"). **Never write page code until that file exists.** Then read it first and build to it on every build.
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **The 74-system library (`awesome-design-md/`) is a reference + Move-1 "Pull" source**, not the deliverable. The deliverable is *this project's* `DESIGN.md`.

## Web Design Stack (installed 2026-06-26)
Three resources now back every site build. Each folder is its own brand — always read the **current** project's `brand_assets/` + `CLAUDE.md`; never assume a global brand.

1. **DESIGN.md library** — `awesome-design-md/` — 74 brand design systems + visual gallery (`Voir-galerie.command`). Source of the design *direction*. Details in the section below.
2. **Taste skills** (anti-slop frontend) — installed skills that enforce premium layout/typography/motion:
   - `design-taste-frontend` — the default anti-slop engine. Reads the brief, infers direction, ships non-templated **code**. Almost always on.
   - Style variants — **activate exactly one** per project: `high-end-visual-design` (premium/calm/expensive) · `minimalist-ui` (editorial Notion/Linear) · `industrial-brutalist-ui` (Swiss/hard).
   - `redesign-existing-projects` — audit-first upgrade of an **existing** site.
   - `image-to-code` — generate reference images → analyze → build to match.
   - `imagegen-frontend-web` / `imagegen-frontend-mobile` / `brandkit` — **images only** (comps, screens, identity boards) to show the client or feed the build.
   - `full-output-enforcement` — bolt on if the agent truncates output.
   - `gpt-taste` — stricter variant when building via GPT/Codex. `stitch-design-taste` — export a Google-Stitch DESIGN.md.
3. **Workflow skills** (`_AGENCY/skills/robonuggets/`, also in Cowork):
   - `personalise` — adapt any new external input (repo/skill/tutorial) to this setup before adopting it.
   - `calibrate` — end-of-session: capture corrections/preferences into the right `CLAUDE.md` / memory.
   - `tweak` — live slider panel on a single-file HTML to dial in speed/type/density/glow, then `bake` into source CSS.

## Build Process — Skill Order
Follow this order when building a site. Skip steps only if the Intake answers make them irrelevant.

1. **Intake** — ask the questions below. Lock brand, page type, mood, style variant, motion level, image-first vs straight-to-code.
2. **DESIGN.md (the real Step 1)** — create the project's own `DESIGN.md` in its root via the five moves (**Pull** from the brand / `brand_assets/` / a gallery system as reference, or **Design** 3 directions → user picks one). Write · De-slop · this is the design system; build to it from here on.
3. **(Optional) Comps first** — if the user wants to see it before code: `imagegen-frontend-web` (or `image-to-code` for the generate→analyze→build pipeline). For mobile: `imagegen-frontend-mobile`. For identity: `brandkit`.
4. **Build** — activate `design-taste-frontend` + the **one** chosen style variant. Apply all rules in this file (Animation Stack, Layout & CSS Stack, Depth, Typography, Anti-Generic Guardrails). Add `full-output-enforcement` if output gets truncated.
5. **Existing site?** — use `redesign-existing-projects` instead of step 4 (audit-first, don't break functionality).
6. **Screenshot QA** — serve on localhost, screenshot, compare, fix. At least 2 rounds (see Screenshot Workflow).
7. **Fine-tune** — `tweak [file]` (or `tweak max`) to dial visuals in-browser, then `bake tweak` to write values into the CSS and remove the panel.
8. **Close** — run `calibrate` (or `calibrate lite`) to fold any corrections from the session back into this file / memory.
9. **New external resource encountered?** — run `personalise [thing]` before adopting it.

## Intake — Ask Before Building
Before writing any frontend code, ask the user these (batch them; `AskUserQuestion` if available). Don't proceed until answered.

1. **Client / brand** — which folder/brand? Is there a `brand_assets/` to obey? (If yes, it overrides any borrowed DESIGN.md.)
2. **Page type** — landing, portfolio, multi-section marketing, or app UI? (Taste skills target pages, not dashboards/data tables.)
3. **Mood / direction** — dark · editorial · fintech · playful · minimal · luxury? → picks the DESIGN.md reference.
4. **Style variant** — premium-calm (`high-end-visual-design`), minimalist (`minimalist-ui`), or brutalist (`industrial-brutalist-ui`)? (Pick ONE.)
5. **Motion level** — subtle hover only · scroll-driven · full magnetic/pinned sequences?
6. **Reference** — any reference image, inspiration site, or DESIGN.md to anchor on? (Inspire, never copy literally.)
7. **Image-first?** — generate comps to approve before coding, or go straight to code?
8. **Content** — real copy/images provided, or placeholders (`placehold.co`)?
9. **Layout & grid** — which **grid system** (structure) + **layout archetype** (composition)? **Always ask this.** Browse the reference: `_AGENCY/CTO/blueprints/layout-grid-reference/` (double-click `Voir-layouts.command`) or `awesome-design-md/layouts.html` (linked from the gallery). Copy the prompt(s) → they feed the `## Layout & grid` section of the project's DESIGN.md.

## Step 1 — Create the Project's DESIGN.md (five moves)
**Before any page code, every web project gets its own `DESIGN.md` in its root.** It's the design system written down — colour, type, spacing, shape, motion, components, voice, and bans — so Claude builds like *this brand*, not like the average of everything. Method: RoboNuggets five moves (full guide + prompts: `_AGENCY/CTO/blueprints/design-md-method/`).

| # | Move | What you do |
|---|------|-------------|
| 01 | **Pull** | Brand already exists (client or VPD) → point Claude at it and have it write the system down. |
| 02 | **Design** | No brand yet → make three real decisions first (colour strategy, light/dark, type+spacing), then build around them. |
| 03 | **Write** | Save the choices as `DESIGN.md` in the project root (skeleton below). |
| 04 | **De-slop** | Add the bans list — the patterns you'll never ship — then run the slop test. |
| 05 | **Reuse** | Drop the file in every future build; read it first; update it once when taste shifts. |

**Which path:** existing client/brand → **Pull** (use the live site + 2-3 screenshots, the client's `brand_assets/`, or the closest system in `awesome-design-md/` as a starting reference — adapt, don't copy). Net-new with no brand → **Design** (ask for 3 genuinely different directions, user picks one, then lock it).

**Move 1 — Pull (prompt):** "Look at this brand and write me a design system I can reuse. Site: [URL] + screenshots. Pull out: colours named by role (background, text, main accent, any secondary); fonts + the size jump between headings and body; spacing and breathing room; corner radius, borders, shadow use; how buttons and cards are styled; the tone of the writing. Also list what this brand clearly never does. Put it in a single `DESIGN.md` in plain markdown." → **Screenshots beat words.**

**Move 2 — Design (prompt):** "New brand, no existing look. Give me three genuinely different directions (not three shades of one idea). For each: a one-sentence picture of who uses it and where (so light vs dark is obvious); the colour approach (mostly-neutral+one accent / one bold colour / a few named colours / colour-drenched); a font pairing + the size jump; the overall feeling in three words. Then I'll pick one and we lock it."

**Move 3 — Write — the `DESIGN.md` skeleton (project root):**
```markdown
# DESIGN.md
## Brand & voice    — who it's for, the feeling in 3 words, how the writing sounds
## Colour           — background, text, accent(s), each named by role + hex
## Typography       — heading font, body font, the size scale, line-length cap (~65–75ch)
## Spacing & layout — the spacing rhythm, max widths, how generous the whitespace is
## Layout & grid    — the grid system (12-col, modular, Swiss, named-areas…) + layout archetype (bento, split, editorial, sidebar…) chosen from the layout-grid reference; what structure each section uses, + layout bans
## Shape & elevation— corner radius, border style, how shadow is (or isn't) used
## Motion           — easing, speed, what is allowed to animate
## Components       — buttons, cards, inputs — the recurring pieces, drawn once
## Bans             — the patterns you refuse to ship (see Move 04)
```
Keep it plain and skimmable: short lines, real values, no fluff. When done, build one sample page that follows it exactly.

**Move 4 — De-slop — default bans** (align with Anti-Generic Guardrails + the `no-ai-design-clutter` rule):
- Pure black `#000` / pure white `#fff` → tint every neutral toward the brand colour
- Gradient text → one solid colour; show emphasis with weight or size
- Coloured left-border stripes on cards/callouts → full border, soft tint, or a leading number
- Default glassmorphism → blur only rare and on purpose
- Hero-metric block (huge number, tiny label, gradient accent) — the SaaS cliché
- Identical card grids (same icon/heading/text repeated down the page)
- Em dashes in copy → use commas, colons, or full stops

**Slop test (two parts):** (1) Could anyone glance at it and say "AI made this"? (2) Could they guess the colours from the category alone (finance→navy+gold, AI→dark blue, health→white+teal)? If yes to either, rework until the answer isn't obvious.

**Move 5 — Reuse loop:** `DESIGN.md` sits in the project root → tell Claude "read `DESIGN.md` first, then build [X], follow it exactly, ask for 3 variations side-by-side" → when taste shifts, edit the one file and every future build follows.

## DESIGN.md Library (74 design systems)
A local collection of ready-to-use design-system documents lives in `awesome-design-md/`. Each captures a real brand's full system (color palette + roles, typography hierarchy, component styling, spacing, depth, do's/don'ts) in one markdown file that an agent reads to produce on-brand UI.

**Location:** `awesome-design-md/design-md/<site>/DESIGN.md` — 74 sites (claude, stripe, vercel, linear.app, figma, notion, apple, supabase, cursor, nvidia, uber, sanity, framer, spotify, revolut, mastercard, ferrari, nike, playstation, …).

**Browse visually:** double-click `awesome-design-md/Voir-galerie.command` to open the gallery (`gallery.html`) — all 74 styles as cards with color swatches, fonts, and a one-click "copier le prompt". Filterable by name/mood/color.

**How to use in a build:**
1. Pick the closest design system to the brief (by brand match or mood — dark/editorial/fintech/playful/minimal).
2. Read its `DESIGN.md` and adopt its tokens: exact hex palette + roles, type families + hierarchy, component states, spacing scale, shadow/elevation system.
3. **Do not copy literally** — same rule as reference images and inspiration sites: absorb the spatial logic, color restraint, and typographic personality, then express it originally with placeholder content.
4. When a `brand_assets/` folder exists for the actual client, its real palette/logo/fonts always override the borrowed DESIGN.md.

To regenerate the gallery after pulling new sites: `python3 build_gallery.py` (script in the agency tooling).

## Layout & Grid Reference (27 systems)
A companion to the DESIGN.md library, dedicated to **structure**: 11 grid systems (12-col, single-column, modular, baseline, hierarchical, Swiss/typographic, named-areas, subgrid, broken/overlap, golden-ratio, masonry) + 16 layout archetypes (hero, split-screen, bento, editorial-asymmetric, magazine, Z-pattern, F-pattern, holy-grail, sidebar, full-bleed, card-grid, long-form, diagonal, scrollytelling, layered, horizontal-scroll/Reel). Each card has a visual diagram, when-to-use, the CSS approach, and a one-click "Copier le prompt".

**Location:** canonical at `_AGENCY/CTO/blueprints/layout-grid-reference/` (open `Voir-layouts.command`); synced copy at `awesome-design-md/layouts.html` (linked from the gallery top bar, reciprocal link back).

**How to use in a build:** during Intake (question 9) browse the reference, pick **one grid + one layout** that fit the brief, copy their prompts into the project's `## Layout & grid` DESIGN.md section, then build to them. Regenerate after editing the catalog: `python3 build_layouts.py` (then resync the `awesome-design-md/` copy).

## Reference Images
- If a reference image is provided: **do not copy it literally.** Get greatly inspired by its layout, spacing, typography, and color — absorb the spatial logic and visual hierarchy, then express it originally. Swap in placeholder content (images via `https://placehold.co/`, generic copy).
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Inspiration Sites
- **Inspiration / reference sites are per-project, not global.** Each project defines its own. Look for them in the current project's own `CLAUDE.md` (an `## Inspiration Sites` block) or its `brand_assets/`. Never carry one project's references into another.
- If the current project lists none, **ask for them during Intake** (question 6) — don't invent or reuse defaults.
- **Do not copy reference sites literally.** Once you have the project's list: absorb their aesthetic, spatial logic, motion feel, and typographic personality, then express it originally. Study what makes them feel premium — micro-interactions, whitespace rhythm, color restraint, typographic hierarchy — internalize it, don't reproduce it.

Per-project block to paste into a project's `CLAUDE.md` when references are chosen:
```
## Inspiration Sites
- https://example-one.com — what to borrow (e.g. hero rhythm, type pairing)
- https://example-two.com — what to borrow (e.g. scroll motion, color restraint)
```

## Animation Stack
Use these tools to produce fluid, physically-grounded motion — not CSS tweens slapped on divs.

- **GSAP + ScrollTrigger** (via CDN) — the industry standard for scroll-driven sequences, pinning, parallax, and timeline orchestration. Use for hero entrances, section reveals, and scrub-based animations.
- **Lenis** (via CDN) — smooth scroll inertia. Always pair with GSAP ScrollTrigger. Makes the whole page feel alive before a single animation fires.
- **Motion One** (via CDN) — lightweight Web Animations API wrapper for micro-interactions (button states, card hovers, list staggering). Use when GSAP is overkill.
- **Native CSS scroll-driven animations** (`animation-timeline: scroll()` / `view()`) — for simple parallax or progress indicators without JS overhead. Use when browser support allows.
- **Splitting.js** — word and character splitting for text reveal animations. Always pair with GSAP for staggered character entrances.

### Animation Principles
- Animate only `transform` and `opacity`. Never layout properties.
- Never use `transition-all`.
- Use spring-style easing: `cubic-bezier(0.16, 1, 0.3, 1)` or GSAP's `power3.out` / `elastic.out`.
- Stagger sibling elements (cards, list items, chars) — never animate them in unison.
- Every scroll-triggered animation should have a subtle overshoot or settle — nothing should stop dead.
- Use `will-change: transform` sparingly and only on actively animating elements.

## Layout & CSS Stack
Modern layout should feel intentional and spatial — not a stack of divs with margin-top.

- **CSS Grid with named areas and subgrid** — for editorial, asymmetric, and magazine-style layouts. Use `subgrid` to align nested elements across parent tracks.
- **CSS `clamp()` for fluid typography and spacing** — no breakpoint jumps. Everything scales continuously: `font-size: clamp(1rem, 2.5vw, 1.5rem)`.
- **Container queries** (`@container`) — component-level responsiveness. Layouts adapt to their container, not just the viewport.
- **Logical properties** (`margin-inline`, `padding-block`) — future-proof, direction-aware spacing.
- **`oklch()` color space** — perceptually uniform. Use for brand color derivation and generating tints/shades that feel hand-picked: `oklch(65% 0.18 250)`.
- **`color-mix()`** — blend colors natively without Sass: `color-mix(in oklch, var(--brand) 20%, white)`.
- **CSS custom properties with `@property`** — typed, animatable variables. Use for animating gradients, colors, and numeric values that CSS can't normally tween.
- **CSS nesting** — write component styles without a preprocessor.
- **`@layer`** — explicit cascade control. Avoid specificity wars.
- **`backdrop-filter`** — frosted glass surfaces. Layer with low-opacity backgrounds for depth.
- **SVG `feTurbulence` noise filter** — grain and texture directly in CSS/SVG, no image assets needed.
- **`mix-blend-mode`** — color treatment layers over images (`multiply`, `overlay`, `screen`).
- **View Transitions API** — page-level and element-level morphing transitions. Use for SPA-like feel without a framework.

## Visual Depth System
Every design must have a layering system — surfaces should not all sit at the same z-plane.

- **Base layer:** main background, flat or subtle gradient
- **Elevated layer:** cards, panels — slight background lift + shadow
- **Floating layer:** modals, tooltips, sticky nav — strong shadow, blur backdrop
- **Shadows:** never `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`. Use layered shadows with color tinting:
```css
  box-shadow:
    0 1px 2px oklch(30% 0.2 250 / 0.08),
    0 4px 12px oklch(30% 0.2 250 / 0.12),
    0 16px 40px oklch(30% 0.2 250 / 0.08);
```

## Typography Stack
- Pair a **display/serif** (e.g. Playfair Display, Fraunces, Instrument Serif) with a **clean sans** (e.g. Inter, DM Sans, Geist).
- Use **variable fonts** where available — animate `font-weight` and `font-variation-settings` for kinetic type.
- Large headings: `letter-spacing: -0.03em`, `line-height: 1.05`
- Body: `line-height: 1.7`, `max-width: 65ch`
- Fluid scale: always use `clamp()`, never fixed px at breakpoints.
- Load from Google Fonts CDN or Bunny Fonts (privacy-friendly alternative).

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- GSAP via CDN: `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>`
- ScrollTrigger via CDN: `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>`
- Lenis via CDN: `<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis/bundled/lenis.min.js"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Derive from `oklch()` — pick a hue and build a perceptually consistent scale.
- **Shadows:** Never flat `shadow-md`. Always layered, color-tinted, multi-stop.
- **Gradients:** Layer multiple radial gradients. Add SVG noise grain for texture and depth.
- **Animations:** Staggered, spring-eased, scroll-triggered. Never uniform or instant.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Gradient overlay + `mix-blend-mode` color treatment layer. Never raw `<img>` drops.
- **Spacing:** Fluid tokens via `clamp()` — not random Tailwind steps.
- **Layout:** At least one CSS Grid named-area layout per page. No all-flexbox pages.

## Hard Rules
- Do not copy reference images or inspiration sites literally — internalize, then express originally
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not use flat single-stop shadows
- Do not animate layout properties — only `transform` and `opacity`
- Do not use fixed px font sizes — always `clamp()`