import GlassPanel from '../components/GlassPanel.jsx';
import AtmosphereGlow from '../components/AtmosphereGlow.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import '../styles/hire-me.css';

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const specialties = [
  'High-Effect Edits',
  'Girl Edits',
  'Storytime YouTube',
  'Story-Style Instagram',
  'Kitchen / Food Edits',
  'Gym & Fitness',
  'Creator / Social Content',
];

const targetClients = [
  'YouTubers',
  'Instagram Creators',
  'Influencers',
  'New Creators',
  'Personal Creators',
  'Media Companies',
];

/**
 * WhyWorkWithMe — "WHY WORK WITH ME" / hire-me section.
 * Rendered after The Vault on the /vault route (composed in
 * App.jsx), but fully self-contained: its own scoped stylesheet
 * (styles/hire-me.css) and no changes to Vault.jsx itself.
 */
export default function WhyWorkWithMe() {
  const header = useScrollReveal({ threshold: 0.3 });
  const chips = useScrollReveal({ threshold: 0.2 });
  const grid = useScrollReveal({ threshold: 0.2 });
  const targets = useScrollReveal({ threshold: 0.2 });
  const cta = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="hire-section" id="hire-me" aria-label="Why work with me">
      <AtmosphereGlow size={1100} />

      <div className="container">
        <div
          ref={header.ref}
          className={`hire-header reveal ${header.visible ? 'is-visible' : ''}`}
        >
          <p className="hire-eyebrow font-mono text-xs uppercase tracking-widest">
            Why Work With Me
          </p>
          <h2 className="hire-heading font-display text-chrome">
            I CAN EDIT ALMOST ANYTHING
          </h2>
          <p className="hire-subheading font-heading text-base">
            7+ years crafting cinematic, social-first edits built to stop the scroll.
          </p>
        </div>

        <div
          ref={chips.ref}
          className={`hire-specialties reveal ${chips.visible ? 'is-visible' : ''}`}
        >
          {specialties.map((s) => (
            <span key={s} className="specialty-chip font-mono text-xs">
              {s}
            </span>
          ))}
        </div>

        <div
          ref={grid.ref}
          className={`hire-grid reveal ${grid.visible ? 'is-visible' : ''}`}
        >
          <GlassPanel elevated className="credibility-panel">
            <p className="credibility-title">Credibility</p>
            <ul className="credibility-list">
              <li>7+ Years Editing</li>
              <li>Thousands of Clients</li>
              <li>Professional Creators &amp; Media Companies</li>
            </ul>
          </GlassPanel>

          <GlassPanel elevated accent className="pricing-panel">
            <p className="pricing-eyebrow">Pricing</p>
            <p className="pricing-value font-display text-chrome">
              ₹400 – ₹550<span className="pricing-unit"> / edit</span>
            </p>
            <ul className="pricing-bonus">
              <li>10 edits → 1 free</li>
              <li>15 edits → 2 free</li>
            </ul>
          </GlassPanel>
        </div>

        <div
          ref={targets.ref}
          className={`hire-targets reveal ${targets.visible ? 'is-visible' : ''}`}
        >
          <p className="hire-targets-label font-mono text-xs">Who I Work With</p>
          <div className="target-chip-row">
            {targetClients.map((t) => (
              <span key={t} className="target-chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div ref={cta.ref} className={`hire-cta reveal ${cta.visible ? 'is-visible' : ''}`}>
          <GlassPanel
            as="a"
            href="mailto:darshilnigam99@gmail.com"
            accent
            interactive
            className="start-project-button"
          >
            Start a Project →
          </GlassPanel>

          <div className="hire-contact">
            <a href="mailto:darshilnigam99@gmail.com" className="hire-contact-link">
              <ExternalLinkIcon />
              <span>darshilnigam99@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/darshiloffshoree/"
              target="_blank"
              rel="noreferrer"
              className="hire-contact-link"
            >
              <ExternalLinkIcon />
              <span>@darshiloffshoree</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
