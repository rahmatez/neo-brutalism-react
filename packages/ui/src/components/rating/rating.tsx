import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbToneToken } from '../../tokens/tone';
import { nbToneVars } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'warning' };

export interface RatingProps extends ComponentPropsWithoutRef<'span'> {
  value?: number; max?: number; count?: number; tone?: NbToneToken;
}

export const Rating = forwardRef<HTMLSpanElement, RatingProps>(({ className, value = 0, max = 5, count, tone, style, ...props }, ref) => {
  const styles = resolveNbStyles('rating', DEFAULTS, { tone }, { radius: false, shadow: false, border: false, padding: false, gap: false });
  const fillColor = nbToneVars(tone ?? DEFAULTS.tone!).bg;
  const stars = Array.from({ length: max }, (_, i) => (i < Math.round(value) ? '★' : '☆'));
  return (
    <span ref={ref} role="img" aria-label={`Rating: ${value} out of ${max}`}
      className={cn(styles.className, 'inline-flex items-center gap-0.5', className)}
      style={{ backgroundColor: 'transparent', ['--nb-rating-filled' as string]: fillColor, ...styles.style, ...style }}
      {...styles.dataAttributes} {...props}>
      {stars.map((s, i) => <span key={i} style={{ color: i < Math.round(value) ? fillColor : 'var(--nb-border)' }}>{s}</span>)}
      {count !== undefined && <span className="ml-1 text-sm font-bold">({count})</span>}
    </span>
  );
});
Rating.displayName = 'Rating';
