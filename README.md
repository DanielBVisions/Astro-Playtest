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

Real image assets from Daniel's exported `About.zip` are wired in under
`public/images/about/`: the hero collage photos and pre-composited stat
badges, the mission section's ribbon graphic, one core-values card
background, all four leadership headshots, the team banner photo, and the
join-CTA background photo. Pillar icons use the exact SVG paths from that
export too (bolt / bar chart / heart).

## Remaining gaps

A few assets weren't in the export, so these are still approximated:

- **Move Fast** and **Global Mindset** core values cards reuse the one
  photo-card background that was exported (`value-card-bg.png`, from
  Performance Obsession) rather than their own distinct images.
- **Nav/footer chrome** — the SHOUT wordmark logo (SVG), the nav's chevron
  icon, and the footer's social icons/divider line weren't in the export,
  so those are still hand-drawn approximations (text wordmark, inline
  SVGs).

Everything else — text, colors, spacing, the zigzag layout of "The Shift",
the purple/photo checkerboard pattern in Core Values, and now the real
photography — matches the Figma source.
