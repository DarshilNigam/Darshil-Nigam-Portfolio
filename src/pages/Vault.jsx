import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel.jsx';
import AtmosphereGlow from '../components/AtmosphereGlow.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { FILTERS, projects } from '../data/projects.js';
import '../styles/vault.css';

// Picks up whatever .mp4 files actually exist in src/assets/videos/
// at build time (Vite native, no new dependency). Projects without a
// matching file simply aren't in this map, so resolveVideoUrl below
// returns null and callers fall back to the existing placeholder.
const videoModules = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
});

function resolveVideoUrl(filename) {
  if (!filename) return null;
  const match = Object.entries(videoModules).find(([path]) => path.endsWith(`/${filename}`));
  return match ? match[1] : null;
}

// Desktop-only, fine-pointer devices get the hover preview. Touch/
// coarse-pointer devices never trigger it — checked at hover time,
// no extra state needed.
function canHoverPreview() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      <path d="M16 9l5 5M21 9l-5 5" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function ProjectCard({ project, isHovered, onHoverStart, onHoverEnd, onOpen, delay }) {
  const reveal = useScrollReveal({ threshold: 0.15 });
  const videoUrl = resolveVideoUrl(project.video);
  // Only mount the <video> at all while this specific card is the
  // hovered one on a fine-pointer device — nothing loads or plays
  // by default, and only one card can ever be true at a time since
  // isHovered is derived from a single hoveredId in the parent.
  const showPreview = isHovered && videoUrl && canHoverPreview();

  return (
    <div
      ref={reveal.ref}
      className={`reveal ${reveal.visible ? 'is-visible' : ''}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {/* Reuses the chrome-gradient card frame from the "What I Edit" system */}
      <div className="category-card-frame">
        <GlassPanel
          as="button"
          type="button"
          interactive
          className="project-card"
          onClick={() => onOpen(project)}
          onMouseEnter={() => canHoverPreview() && onHoverStart()}
          onMouseLeave={onHoverEnd}
          aria-haspopup="dialog"
        >
          <div className="project-card-media">
            {showPreview && (
              <video
                key={videoUrl}
                className="project-card-video"
                src={videoUrl}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
            <span className="project-card-play" aria-hidden="true">
              ▶
            </span>
            <span className="project-card-media-label">
              {videoUrl ? 'Click to preview' : 'Preview unavailable'}
            </span>
          </div>

          <div className="project-card-meta">
            <span className="project-card-number font-mono">{project.number}</span>
            <span className="project-card-category font-mono">{project.category}</span>
          </div>

          <h3 className="project-card-title font-heading">{project.title}</h3>
        </GlassPanel>
      </div>
    </div>
  );
}

function ProjectOverlay({ project, onClose }) {
  const videoUrl = resolveVideoUrl(project.video);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      // Stop and reset playback the instant the overlay closes/unmounts
      // — only one video should ever be able to play at a time.
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    };
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => setIsMuted((m) => !m);

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };

  return (
    <div
      className="project-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <GlassPanel elevated accent className="project-overlay-panel animate-fade-up">
        <button type="button" className="project-overlay-back" onClick={onClose}>
          ← Back
        </button>

        {videoUrl ? (
          <div className="project-overlay-media project-overlay-media--has-video">
            <video
              key={videoUrl}
              ref={videoRef}
              className="project-overlay-video"
              src={videoUrl}
              muted={isMuted}
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Custom controls — always visible, never auto-hidden, so
                they can't get stuck unreachable the way native browser
                controls were. */}
            <div className="project-overlay-controls">
              <button
                type="button"
                className="project-overlay-control-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                className="project-overlay-control-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MuteIcon /> : <UnmuteIcon />}
              </button>
              <button
                type="button"
                className="project-overlay-control-btn"
                onClick={handleFullscreen}
                aria-label="Fullscreen"
              >
                <FullscreenIcon />
              </button>
            </div>
          </div>
        ) : (
          <div className="project-overlay-media" aria-hidden="true" />
        )}

        <div className="project-overlay-header">
          <h2 className="project-overlay-title font-display">{project.title}</h2>
          <span className="project-overlay-category">{project.category}</span>
        </div>

        <div className="project-overlay-specs">
          <div>
            <span className="project-overlay-spec-label font-mono">Role</span>
            <span className="project-overlay-spec-value">{project.role}</span>
          </div>
          <div>
            <span className="project-overlay-spec-label font-mono">Tools</span>
            <span className="project-overlay-spec-value">{project.tools.join(' · ')}</span>
          </div>
        </div>

        <p className="project-overlay-description">{project.description}</p>
      </GlassPanel>
    </div>
  );
}

/**
 * Vault — "THE VAULT" project showcase page, mounted at /vault.
 * Self-contained: styles/vault.css is imported only here, data
 * lives in data/projects.js (placeholder), and it reuses the
 * existing GlassPanel / AtmosphereGlow / card-frame / reveal system.
 */
export default function Vault() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  // Single source of truth for which card (if any) may show a live
  // preview — guarantees only one video plays in the grid at a time.
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = useMemo(
    () =>
      activeFilter === 'ALL'
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const openProject = (project) => {
    setHoveredId(null);
    setSelectedProject(project);
  };

  return (
    <div className="vault-page">
      <Link to="/" className="vault-back-link glass">
        ← Back to Home
      </Link>

      <section className="vault-hero">
        <AtmosphereGlow size={1000} />
        <h1 className="vault-heading font-display text-chrome animate-chrome-sweep">
          THE VAULT
        </h1>
        <p className="vault-tagline font-heading text-lg">
          A collection of cuts, stories &amp; controlled chaos.
        </p>

        <nav className="vault-filters" aria-label="Filter projects by category">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </nav>
      </section>

      <div className="container">
        {filtered.length > 0 ? (
          <div className="vault-grid">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredId === project.id}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId((id) => (id === project.id ? null : id))}
                onOpen={openProject}
                delay={i * 70}
              />
            ))}
          </div>
        ) : (
          <p className="vault-empty">No projects in this category yet.</p>
        )}
      </div>

      {selectedProject && (
        <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
