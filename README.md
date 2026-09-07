# Astro Playtest

Trial build of the **About** frame from the SHOUT-Dev Figma file
([node 1502:6087](https://www.figma.com/design/rtDFN45DbY5JSc1qIMD7NL/SHOUT-Dev?node-id=1502-6087)),
built in Astro.

This project was scaffolded by hand in an environment without npm registry
access, so dependencies have never been installed here. Run it locally:

```bash
npm install
npm run dev
```

Then open http://localhost:4321/about

## Known gaps vs. the Figma frame

The Figma MCP connection dropped mid-session before every detail could be
read, so a few things here are placeholders rather than pulled from the
design:

- **Colors, type scale, spacing** — no design tokens were fetched
  (`get_variable_defs` / `get_design_context` didn't run). Currently a
  dark theme with a lime accent, defined in `src/layouts/Layout.astro`.
- **Core Values cards** (6 cards in the "Core values" section) — the
  individual card titles/descriptions sit deeper in the Figma node tree
  than this session's read reached. Placeholder copy lives in
  `src/components/CoreValues.astro`.
- **Footer** — the frame's footer is a shared Figma symbol whose content
  wasn't read. `src/components/Footer.astro` is a generic placeholder.
- **Top nav** — link labels weren't confirmed. `src/components/Nav.astro`
  is a placeholder.
- **"The Shift" step ordering** — the three-step timeline's exact
  before/after pairing couldn't be confirmed from coordinates alone;
  ordered as a logical narrative in `src/components/Shift.astro`.

All hero, pillars, "the shift" headings/body copy, core values section
copy, and leadership team bios/names are pulled verbatim from the Figma
text nodes.

Once Figma is reconnected, re-run the frame read and update the flagged
components above.
