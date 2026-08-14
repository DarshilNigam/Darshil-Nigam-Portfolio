import { useCallback, useRef } from 'react';

/**
 * useTilt
 * Subtle perspective tilt that follows the cursor, plus a cursor-
 * tracked highlight position, both delivered as CSS custom
 * properties (--tilt-x, --tilt-y, --glow-x, --glow-y) so the actual
 * transform/background lives in CSS, not inline React state — one
 * rAF-throttled DOM write per frame, no re-renders.
 *
 * No-ops on coarse-pointer (touch) devices and under
 * prefers-reduced-motion.
 */
export default function useTilt(maxTiltDeg = 7) {
  const ref = useRef(null);
  const frame = useRef(null);

  const shouldSkip = () => {
    if (typeof window === 'undefined') return true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    return reduced || coarse;
  };

  const onMouseMove = useCallback(
    (e) => {
      if (shouldSkip()) return;
      const el = ref.current;
      if (!el) return;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--tilt-x', `${(-y * maxTiltDeg).toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${(x * maxTiltDeg).toFixed(2)}deg`);
        el.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    },
    [maxTiltDeg]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
