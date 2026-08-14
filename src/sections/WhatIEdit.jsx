import { Link } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel.jsx';
import AtmosphereGlow from '../components/AtmosphereGlow.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import useTilt from '../hooks/useTilt.js';

const categories = [
  { title: 'High-Effects Edits', desc: 'VFX-driven cuts built for scroll-stopping impact.' },
  { title: 'Girl / Lifestyle Edits', desc: 'Soft, aesthetic edits for lifestyle and personal brand.' },
  { title: 'Storytime YouTube', desc: 'Long-form storytelling paced for retention.' },
  { title: 'Story-Driven Instagram', desc: 'Reels built around narrative, not just cuts.' },
  { title: 'Gym & Fitness', desc: 'High-energy edits that match the intensity.' },
  { title: 'Food / Kitchen Content', desc: 'Appetite-driving edits, frame by frame.' },
];

function CategoryCard({ index, title, desc, delay }) {
  const tilt = useTilt(7);
  const reveal = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={reveal.ref}
      className={`reveal ${reveal.visible ? 'is-visible' : ''}`}
      style={{ '--delay': `${delay}ms` }}
    >
      <div
        className="category-card-frame"
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <GlassPanel as="div" className="category-card">
          <span className="category-card-index font-mono text-xs uppercase tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="category-card-title font-heading">{title}</h3>
          <p className="category-card-desc text-sm">{desc}</p>
        </GlassPanel>
      </div>
    </div>
  );
}

/**
 * WhatIEdit — "WHAT I EDIT" section.
 * Sits below About. Self-contained: styles in styles/sections.css
 * (the "What I Edit" block), interaction via useTilt/useScrollReveal.
 */
export default function WhatIEdit() {
  const header = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="edit-section" id="what-i-edit" aria-label="What I edit">
      <AtmosphereGlow size={1200} />

      <div className="container">
        <div
          ref={header.ref}
          className={`edit-header reveal ${header.visible ? 'is-visible' : ''}`}
        >
          <p className="edit-eyebrow font-mono text-xs uppercase tracking-widest">
            What I Edit
          </p>
          <h2 className="edit-heading font-display">WHAT I EDIT</h2>
          <p className="edit-subheading font-heading">
            Different formats. Same obsession with impact.
          </p>
        </div>

        <div className="edit-grid">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              index={i}
              title={cat.title}
              desc={cat.desc}
              delay={i * 80}
            />
          ))}
        </div>

        <div className="edit-closing">
          <p className="edit-closing-line">
            Whatever the format, the edit has to make people stop.
          </p>

          <GlassPanel
            as={Link}
            to="/vault"
            accent
            interactive
            className="vault-cta-button font-mono text-sm uppercase tracking-wide animate-fade-up"
          >
            Explore The Vault →
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
