import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * Attach `ref` to an element; `visible` flips true once it enters
 * the viewport and stays true (one-shot reveal, not re-triggered on
 * scroll-up — keeps things calm rather than flickery). Skips the
 * observer entirely under prefers-reduced-motion and reveals
 * immediately instead.
 */
export default function useScrollReveal({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return undefined;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
