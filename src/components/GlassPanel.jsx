/**
 * GlassPanel
 * Base primitive for the glassmorphism system. Every card, nav bar,
 * or modal in the portfolio should compose this rather than
 * re-declaring backdrop-filter/border values inline.
 *
 * Props:
 *  - elevated   raises background opacity for stacked/foreground panels
 *  - accent     violet-tinted border + ambient glow
 *  - interactive  adds hover lift + glow transition
 *  - as         polymorphic tag (default: 'div')
 */
export default function GlassPanel({
  elevated = false,
  accent = false,
  interactive = false,
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'glass',
    elevated && 'glass-elevated',
    accent && 'glass-accent',
    interactive && 'glass-interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
