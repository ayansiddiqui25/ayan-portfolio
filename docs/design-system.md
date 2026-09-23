# Ayan Siddiqui FC — design system

Status: active. Internal project reference, not a public page or PDF.

## Direction

Retro football game meets a well-organized match programme. The generated stadium
and scroll-controlled penalty are the signature, not decorative extras. Keep the
editorial spacing and card hierarchy, but use arcade type and tactile controls.
Avoid unrelated UI styles, rainbow accents, glossy gradients, and football puns
in every heading. Content should feel personal, direct, and honest.

## Source of truth

- `app/design-system.css`: shared tokens, font loading, action states.
- `app/components/ActionLink.tsx`: primary/secondary navigation CTA.
- `app/globals.css`: page layouts and football-scene styling.
- `docs/imagegen-assets.md`: asset provenance and measured scene coordinates.
- `AGENTS.md`: instructions for future contributors and assistant turns.

## Typography

Use the three bundled, locally served, open-license fonts. No runtime font CDN.

| Role | Font | Treatment |
| --- | --- | --- |
| GOAL | Press Start 2P | Normal 400; preserve pixel arcade finish |
| Main name | Oxanium | 700, 60–112px desktop; 56–96px mobile/tablet |
| Section titles | Oxanium | 700, 42–72px desktop; 38–56px mobile; actual section names |
| Card titles | Oxanium | 600, 24–34px; 1.25–1.3 leading |
| Body and navigation | DM Sans | Body 17–18px, line height 1.7–1.8; navigation 13–15px |
| Labels, dates, tags | DM Sans | 14px; minimal tracking, no pixel lettering |
| CTA label | Oxanium | 700, 16px; compact navigation CTA 14px |

Keep paragraphs to approximately 55–65 characters per line. Pixel lettering is
for hierarchy, not long paragraphs. Do not use Arial or serif display fonts.
Use gold/blue emphasis rather than simulated italics. Place Mechatronics Engineering
Student directly below the name in gold Oxanium 21–30px, with TMU beneath it.

## Color roles

| Token | Value | Use |
| --- | --- | --- |
| `--night` | #0b1912 | Page background; dark text on lime buttons |
| `--surface` | #15271d | Cards, secondary controls, placeholders |
| `--surface-raised` | #1e3427 | Hovered surfaces |
| `--paper` | #f2eedf | Main text |
| `--muted` | #b3b9ab | Supporting text |
| `--line` | #f2eedf26 | Quiet dividers and noninteractive borders |
| `--accent` | #d5f568 | Primary CTA fill; reserve for actions |
| `--accent-hover` | #e5ff91 | Primary hover |
| `--accent-edge` | #718c30 | Raised button lower edge |
| `--arcade-blue` | #72bbff | Secondary actions, focus, projects |
| `--arcade-gold` | #f5cf70 | Name emphasis, skills, experience, status |

No red, coral, or orange buttons. Do not introduce new accent hues for each new
section. Assets may retain their natural colors (e.g. purple keeper/blue shirt).
Never rely on color alone to communicate state. Target WCAG AA text contrast.

## Buttons and links

- Primary: lime fill, dark Oxanium label, square 2px corners, 5px solid lower edge.
  Use for the most important action in a section. One primary per action group.
- Secondary: dark surface, blue border and label, same arcade-key geometry.
  Use for a real alternative such as About me, source code, or a live demo.
- Tertiary: DM Sans text link with blue arrow; underline on hover/focus.
  Inline card links must not compete with a primary CTA.
- `ActionLink` is a native anchor for navigation. A state-changing action must
  be a native button using `.action` and its variant class; never a clickable div.
- Default minimum height 52px; compact 44px. Hover lifts 2px, press moves down
  3px. Focus has a 3px blue outline. No hover-only content or autoplay effects.
- Disabled actions must be semantically disabled and must not navigate. Do not
  add fake Resume, contact, or project buttons before their destinations exist.
- Do not nest buttons/anchors inside a whole-card anchor.

Example: `<ActionLink href="#projects">See my work</ActionLink>`;
secondary: `<ActionLink href="#about" variant="secondary">About me</ActionLink>`.

## Layout and surfaces

- Content max width 1280px, fluid width 88%; hero copy uses its scene-specific grid.
- Desktop stadium must cover the actual hero height, not only the viewport.
  `.penalty-stage` is a size container; its shared 2:1 world uses 200cqh to
  cover the height without stretching individual actors or detaching the net.
  Keep desktop intro spacing compact beneath the navigation; mobile retains
  the stacked intro and square scene with its existing framing.
- Base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Section spacing: responsive 80–144px; mobile 80px. Cards use 24/32px padding.
- Card radius 16px, media radius 8px, action radius 2px. Pills reserved for
  navigation shell, badges, and tags, never primary CTAs.
- Preserve overview grid 1.65:1:1 on desktop, two columns on tablet, one on mobile.
- Section headings: prominent section name (Experience, Projects, Skills, About me,
  Contact), small solid accent marker, no repetitive slogan underneath. No tiny
  numbered section labels or oversized slogans competing with the section name.
- Experience: a focused dated timeline without a decorative slogan card.
- About: use 32px paragraph spacing and no em dashes, including education copy.
  Location labels use Toronto, Ontario. Certifications belong between Skills and
  About, with names, issuers, and only supplied dates/credential links. Keep the
  section hidden while the certifications list is empty; never invent credentials.
- Projects: separate Software & AI and Hardware & Mechanical sections, with
  anchor jump links. Category lives on each project in `app/portfolio-content.ts`.
  Qasam leads software; the self-parking car leads hardware. Robotics belongs in
  hardware. Card titles and text open `/projects/[slug]` with Problem, Solution, My role,
  and Outcome. Keep homepage cards concise; galleries, detailed results, credits,
  and external links belong on case-study pages. Use real report drawings with
  contain sizing and captions. `ZoomImage` opens real project images and the About
  portrait in an in-page native dialog, never a separate tab. Keep image buttons
  separate from project links. Support Escape, backdrop click, Close, trapped focus,
  restored trigger focus, and locked background scrolling. Temporarily hidden projects
  are excluded through `visibleProjects`, including direct routes and related links;
  retain their source content for later restoration. Separate personal contributions
  from team work and design targets from validated results. Case-study copy lives in
  `app/project-details.ts`. Skills: two-column category panels, gold 22px Oxanium
  headings, and filled raised-green pills with 14px medium DM Sans text. Use
  balanced 8px gaps and 8px/16px pill padding; long labels wrap on small screens.
  Skill pills are static labels, not buttons: no arrows, trailing slashes, or hover
  animations. Use plain category names without slash separators.
  Supplied personal content lives in `app/portfolio-content.ts`; only images and
  the résumé file are pending. Preserve approximate qualifiers on metrics.
- Breakpoints: 1000px tablet/stacked hero, 650px single-column content/mobile nav.
- Reuse pitch-line dividers, shirt numbers, and frame details sparingly.

## Assets

Reuse existing `public/game-assets/` artwork. Preserve pixelated rendering for
pixel art only; future real screenshots/photos use normal image rendering.
Keep transparent sprite padding, sheet clipping, world coordinates, and aspect
ratios intact. No arbitrary scaling of a single scene actor independently.

- Field: `stadium-field-v2.png` (1774×887), includes aligned goal and field lines.
- Player: `siddiqui-kick-sheet.png`, four poses, SIDDIQUI / 10 shirt.
- Keeper: ready, launch, airborne, stretch, landed sequence.
- Ball: existing transparent ball asset, synced to measured boot contact.
- Project placeholders: bordered frame, index and explicit image label; 1.6:1.
- Portrait: `ayan-retro-portrait.png`, generated from Ayan's supplied photograph,
  blue number 10 football kit. Reuse in About and crop via CSS for navigation avatar.
- Social preview: preserve existing `public/og.png` unless explicitly changed.

Never imply placeholders are real project imagery or invent experience/metrics.
New generated assets must match perspective, pixel scale, light, palette, and
transparent edges. Record provenance in `docs/imagegen-assets.md`.

## Motion and accessibility

Navigation uses `PortfolioNav`: portrait and identity left, compact link group,
lime CTA right. Rounded rectangular shell, not an oversized pill. Hide after
the first 8px of scroll and keep hidden until `scrollPenaltyTime` reaches DURATION.
Reverse this when scrolling back into the sequence; restore at the top. Hidden
navigation is inert and excluded from assistive technology. With reduced motion,
keep navigation visible. Recalculate on resize, restored pages, and hero resizing.

Football motion is reversible and controlled by scrolling, never elapsed-time
autoplay. Ball stays still until boot contact. Keeper dives away from the ball,
lands on the field, and GOAL/net reaction finish before the next section.
Crowd stays still. Keep `penalty-motion.mjs` tests passing. Reduced motion shows
a settled scene, no pinning, net reaction, GOAL, or button movement.
Use real headings, descriptive links/alt text, and aria-hidden decorative arrows.
Touch navigation targets should be at least 44px tall. Ensure long text wraps
without horizontal overflow at 320px. Keep visible keyboard focus on every control.

## Checklist for future additions

1. Read this document and reuse shared tokens and components.
2. Use supplied personal content; label missing material honestly.
3. Pick an existing layout and the appropriate typography role, not a new visual language.
4. Give the main action a lime primary; supporting actions a blue secondary.
5. Keep content and controls readable at mobile widths and reduced motion.
6. Run `npm test` and TypeScript validation; preserve animation regressions.
7. Update this document and shared tokens together if the user changes direction.
