# Portfolio working agreement

Before changing any UI, read `docs/design-system.md` and `app/design-system.css`.
These are the design source of truth for all future additions. Reuse existing
tokens, components, typography, layouts, and assets instead of inventing a new style.

- No red/coral/orange CTA buttons. Primary actions are lime raised arcade keys;
  secondary actions are blue outlined keys. Use `ActionLink` for navigation CTAs.
- Press Start 2P for display text; Space Mono for body, navigation, and labels.
  Do not reintroduce Arial, generic sans-serif, or editorial serif styles.
- Keep the scroll-driven football scene and its contact/landing timing intact.
- Personal experience, projects, photos, and contact details are pending. Never
  invent these or copy credentials from reference websites.
- If the user changes the design direction, update the design guide and tokens
  in the same change. Do not silently diverge from the system.
- Build and run `npm test` after changes. Preserve reduced-motion behavior,
  visible keyboard focus, responsive layouts, and semantic links/buttons.
