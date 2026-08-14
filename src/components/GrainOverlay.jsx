/**
 * GrainOverlay
 * Renders once at the root, above every other layer, and never
 * mounts more than one instance. Purely visual — aria-hidden and
 * pointer-events: none are set in CSS (.grain-overlay).
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
