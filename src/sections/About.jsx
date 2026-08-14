import GlassPanel from '../components/GlassPanel.jsx';
import AtmosphereGlow from '../components/AtmosphereGlow.jsx';
import useParallax from '../hooks/useParallax.js';

const highlights = [
  'Worked with thousands of clients across short-form and long-form video.',
  'Trusted by professional Instagram & YouTube creators.',
  'Collaborated with multiple media companies on ongoing edit pipelines.',
];

/**
 * About — "About the Editor" section.
 * Sits directly below the hero. Self-contained: its own styles
 * live in styles/sections.css, its own assets are the shared
 * GlassPanel / AtmosphereGlow primitives from the foundation.
 */
export default function About() {
  const numberParallax = useParallax(0.1);
  const panelParallax = useParallax(-0.05);

  return (
    <section className="about-section" id="about" aria-label="About the editor">
      <AtmosphereGlow size={1000} />

      <div className="container about-grid">
        <div
          className="about-number-wrap animate-fade-up"
          ref={numberParallax.ref}
          style={numberParallax.style}
          data-animate
        >
          <div className="about-number-stack">
            <span className="about-number text-chrome" aria-hidden="true">
              07
            </span>
            <span className="about-number-reflection text-chrome" aria-hidden="true">
              07
            </span>
          </div>
          <span className="about-number-label font-mono text-xs uppercase tracking-widest">
            Years Editing
          </span>
        </div>

        <div ref={panelParallax.ref} style={panelParallax.style}>
          <GlassPanel elevated interactive className="about-panel glass-reflect animate-fade-up">
            <p className="about-eyebrow font-mono text-xs uppercase tracking-widest">
              About the Editor
            </p>

            <h2 className="about-name font-display">DARSHIL NIGAM</h2>

            <p className="about-role font-heading text-base tracking-wider uppercase">
              Video Editor · Visual Storyteller
            </p>

            <p className="about-lead text-base">
              7+ years of editing experience shaping raw footage into stories
              that hold attention and earn their runtime.
            </p>

            <ul className="about-list">
              {highlights.map((item, i) => (
                <li className="about-list-item" key={item}>
                  <span className="about-list-index font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="about-list-text text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
