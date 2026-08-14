import AtmosphereGlow from '../components/AtmosphereGlow.jsx';
import About from '../sections/About.jsx';
import WhatIEdit from '../sections/WhatIEdit.jsx';

/**
 * Home — the existing homepage.
 * Content is unchanged from the previous single-page App: hero,
 * About the Editor, What I Edit. Relocated here only so it can be
 * mounted at the "/" route now that routing exists.
 */
export default function Home() {
  return (
    <>
      <section
        className="hero-section"
        id="hero"
        aria-label="Darshil Nigam — Video Editor / Visual Storyteller"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-5)',
          textAlign: 'center',
          padding: 'var(--space-6)',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        <AtmosphereGlow size={1100} />

        <h1
          className="text-chrome animate-chrome-sweep animate-fade-up-slow"
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: 'var(--text-6xl)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-tight)',
          }}
          data-animate
        >
          DARSHIL NIGAM
        </h1>

        <p
          className="font-mono text-sm text-violet animate-fade-up"
          style={{
            position: 'relative',
            zIndex: 1,
            letterSpacing: 'var(--tracking-widest)',
            marginTop: 'var(--space-2)',
          }}
          data-animate
        >
          7 YEARS OF EDITING
        </p>

        <p
          className="font-heading text-lg text-secondary animate-fade-up"
          style={{
            position: 'relative',
            zIndex: 1,
            letterSpacing: 'var(--tracking-wider)',
          }}
          data-animate
        >
          VIDEO EDITOR · VISUAL STORYTELLER
        </p>
      </section>

      <About />
      <WhatIEdit />
    </>
  );
}
