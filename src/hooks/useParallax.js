import { useEffect, useRef, useState } from 'react';

/**
 * useParallax
 * Returns a ref to attach to an element and a style object with a
 * translateY offset derived from that element's position relative
 * to viewport center. Negative `speed` moves opposite to scroll.
 *
 * Scroll-driven only (rAF-throttled scroll/resize listeners), no
 * continuous animation loop, and fully disabled under
 * prefers-reduced-motion.
 */
export default function useParallax(speed = 0.1) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let ticking = false;

    const measure = () => {
      const el = ref.current;
      ticking = false;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      setOffset((viewportCenter - elCenter) * speed);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return { ref, style: { transform: `translateY(${offset.toFixed(2)}px)` } };
}
