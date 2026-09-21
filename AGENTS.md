# Portfolio working agreement

Before changing any UI, read `docs/design-system.md` and `app/design-system.css`.
These are the design source of truth for all future additions. Reuse existing
tokens, components, typography, layouts, and assets instead of inventing a new style.

- No red/coral/orange CTA buttons. Primary actions are lime raised arcade keys;
  secondary actions are blue outlined keys. Use `ActionLink` for navigation CTAs.
- Oxanium for readable retro headings and CTAs; Press Start 2P for GOAL only.
  DM Sans for body, navigation, and labels. Section names are prominent titles,
  not tiny numbered eyebrows. The student title belongs directly below Ayan's name.
  Keep small text readable (14px labels, 17px body); do not reintroduce pixel or monospace body text.
- Keep the scroll-driven football scene and its contact/landing timing intact.
- Personal content is supplied in `app/portfolio-content.ts`. Ayan studies
  Mechatronics Engineering at TMU, expected April 2028. Never invent claims or
  copy credentials from references. Only project images and résumé
  file are pending. Preserve approximate qualifiers on supplied metrics.
- If the user changes the design direction, update the design guide and tokens
  in the same change. Do not silently diverge from the system.
- Build and run `npm test` after changes. Preserve reduced-motion behavior,
  visible keyboard focus, responsive layouts, and semantic links/buttons.
