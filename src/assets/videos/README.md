# Vault project videos

Drop video files here, named to match each project's `id` in
`src/data/projects.js`:

```
src/assets/videos/motion-and-impact.mp4
src/assets/videos/the-long-cut.mp4
src/assets/videos/soft-focus.mp4
src/assets/videos/full-send.mp4
src/assets/videos/plated.mp4
src/assets/videos/fifteen-seconds.mp4
src/assets/videos/chapter-one.mp4
src/assets/videos/glitch-theory.mp4
```

Each project's `video` field in `projects.js` already points at the
expected filename (`<id>.mp4`). Vault.jsx picks up whatever files
actually exist here via `import.meta.glob` — nothing else needs to
change. A project without a matching file here automatically falls
back to the existing "Preview unavailable" placeholder, both on the
card and in the detail overlay.

`.mp4` only, for now — if you need `.mov`/`.webm` support, the glob
pattern in `Vault.jsx` (`import.meta.glob('../assets/videos/*.mp4', ...)`)
would need its extension list extended.
