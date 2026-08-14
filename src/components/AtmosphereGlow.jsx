/**
 * AtmosphereGlow
 * A soft, blurred violet radial field that sits behind section
 * typography and breathes slowly. Purely decorative — absolutely
 * positioned, zero layout impact, pointer-events: none.
 *
 * Props:
 *  - size   diameter in px (default 900)
 *  - strong  use the stronger glow token instead of the soft one
 */
export default function AtmosphereGlow({ size = 900, strong = false, className = '' }) {
  return (
    <div
      className={`atmosphere-glow ${className}`.trim()}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        '--glow-color': strong ? 'var(--violet-glow-strong)' : 'var(--violet-glow-soft)',
      }}
    />
  );
}
