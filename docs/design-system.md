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

Use only the two bundled, locally served, open-license fonts. No runtime font CDN.

| Role | Font | Treatment |
| --- | --- | --- |
| Name, section titles, card titles, GOAL | Press Start 2P | Normal 400, no synthetic italics/bold; line height 1.45–1.65 |
| Main name | Press Start 2P | 32–68px desktop; 28–64px mobile/tablet, fit surname on its own line |
| Section titles | Press Start 2P | 24–46px desktop; 21–30px mobile |
| Card titles | Press Start 2P | 14–24px; short phrases, generous leading |
| Body and navigation | Space Mono | Body 15–17px, line height 1.7–1.85; navigation 12–13px |
| Labels, dates, tags | Space Mono | 11–12px; uppercase labels with subtle tracking |
| CTA label | Press Start 2P | 10px, 1.7 leading; compact navigation CTA 8px |

Keep paragraphs to approximately 55–65 characters per line. Pixel lettering is
for hierarchy, not long paragraphs. Do not use Arial or serif display fonts.
Use gold/blue emphasis rather than simulated italic pixel text.

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

- Primary: lime fill, dark pixel label, square 2px corners, 5px solid lower edge.
  Use for the most important action in a section. One primary per action group.
- Secondary: dark surface, blue border and label, same arcade-key geometry.
  Use for a real alternative such as About me, source code, or a live demo.
- Tertiary: Space Mono text link with blue arrow; underline on hover/focus.
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
- Base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Section spacing: responsive 80–144px; mobile 80px. Cards use 24/32px padding.
- Card radius 16px, media radius 8px, action radius 2px. Pills reserved for
  navigation shell, badges, and tags, never primary CTAs.
- Preserve overview grid 1.65:1:1 on desktop, two columns on tablet, one on mobile.
- Section headings: small label left (30%), title right. Stack on mobile.
- Experience: sticky note left, dated timeline right. Unpin and stack on mobile.
- Projects: Qasam image-led feature plus a two-column supporting project grid.
  Use expandable engineering notes for detail. Skills: two-column category panels.
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
- Portrait placeholder: AS monogram and explicit photo-pending label; .82 ratio.
- Social preview: preserve existing `public/og.png` unless explicitly changed.

Never imply placeholders are real project imagery or invent experience/metrics.
New generated assets must match perspective, pixel scale, light, palette, and
transparent edges. Record provenance in `docs/imagegen-assets.md`.

## Motion and accessibility

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
3. Pick an existing layout and one of the two fonts, not a new visual language.
4. Give the main action a lime primary; supporting actions a blue secondary.
5. Keep content and controls readable at mobile widths and reduced motion.
6. Run `npm test` and TypeScript validation; preserve animation regressions.
7. Update this document and shared tokens together if the user changes direction.
