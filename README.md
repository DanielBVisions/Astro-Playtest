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

## Sourced from Figma

Colors, type (Darker Grotesque), copy, and layout for every section — nav,
hero + stat badges, mission statement, three pillars, "the shift" timeline,
all six core values cards, leadership team, join CTA, and footer — were
pulled directly from Figma via `get_variable_defs` and `get_design_context`
on the relevant nodes. Component files note the source node IDs in their
top comment.

## Known gaps vs. the Figma frame

No photo or icon assets were downloadable this session (this environment's
network policy blocks fetches to figma.com), so anywhere the design uses a
real photo, those are placeholder gradient blocks:

- Hero image collage (real stat numbers/labels are accurate; the photos
  behind them are not)
- The three "photo" core values cards (Performance Obsession, Move Fast,
  Global Mindset)
- Leadership team photo banner and the 4 member headshots
- Join CTA section background photo

Everything else — text, colors, spacing, the zigzag layout of "The Shift",
the purple/photo checkerboard pattern in Core Values — matches the Figma
source. Once Figma access is available again, swap in the real images via
the Figma MCP's asset download.
