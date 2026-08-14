# Darshil Nigam — Portfolio Foundation

Design foundation for the portfolio of **Darshil Nigam**, Video Editor / Visual Storyteller.
Direction: dark cinematic luxury + futuristic editorial.

This is the **foundation only** — no portfolio sections, no placeholder
projects. It sets up the system everything else will be built on.

## Run it

```bash
npm install
npm run dev
```

## What's in here

```
src/
  styles/
    tokens.css        Color, spacing, radii, shadow, breakpoint variables
    typography.css     Font stacks + fluid type scale
    animations.css      Easing, durations, keyframes, motion utilities
    global.css          Reset, matte-black background, glassmorphism
                         system, film grain, layout primitives
  components/
    GlassPanel.jsx       Reusable glass surface primitive
    GrainOverlay.jsx     Fixed film-grain texture layer (mount once)
  App.jsx                Foundation shell — proves the system, no sections
  main.jsx                Entry point
```

## System summary

- **Surface** — matte black (`--surface-0` `#08080a`) with a barely-there
  violet/chrome radial falloff, not a flat fill.
- **Chrome/silver** — `--chrome-100` → `--chrome-900` scale, plus
  `--chrome-gradient` for the metallic text/edge treatment (`.text-chrome`).
- **Accent** — electric violet (`--violet-500` `#8a4fff`), used for focus
  states, glass edges, and ambient glow only — never a large fill.
- **Type** — Bodoni Moda (display/editorial), Space Grotesk (headings/UI,
  futuristic), Inter (body), JetBrains Mono (timecodes, labels, metadata).
- **Glass** — `.glass`, with `.glass-elevated`, `.glass-accent`,
  `.glass-interactive` modifiers. Backed by `<GlassPanel />`.
- **Grain** — `<GrainOverlay />`, mounted once at root, SVG turbulence,
  animated, respects `prefers-reduced-motion`.
- **Motion** — cinematic easing curves (`--ease-cinematic`,
  `--ease-out-expo`), fade-up/chrome-sweep/glow-pulse keyframes, all
  utilities in `animations.css`.

## Next steps (not built yet)

Nav, hero, work/reel section, about, contact — build each on top of
the tokens and primitives above rather than introducing new ad hoc
colors, fonts, or blur values.
