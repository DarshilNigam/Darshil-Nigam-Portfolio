import { useEffect, useState } from 'react';

/**
 * ScrollCue
 * A slow-glowing vertical line that suggests scrolling. Mounted
 * once at the router level (like GrainOverlay/ScrollToTop), fixed
 * to the viewport, so it appears on every route without touching
 * Home.jsx or Vault.jsx. Visible only near the top of the page —
 * fades out once the user starts scrolling, fades back in if they
 * scroll back up. Purely decorative: pointer-events: none.
 */
export default function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      setVisible(window.scrollY < 80);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`scroll-cue ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      <span className="scroll-cue-line" />
    </div>
  );
}
