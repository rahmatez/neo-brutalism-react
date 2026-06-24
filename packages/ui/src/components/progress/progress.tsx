import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbToneToken } from '../../tokens/tone';
import { nbToneVars } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'primary' };

export interface ProgressProps extends ComponentPropsWithoutRef<'div'> {
  value?: number; max?: number; label?: string; tone?: NbToneToken;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, max = 100, label = '', tone, style, ...props }, ref) => {
  const styles = resolveNbStyles('progress', DEFAULTS, { tone }, { radius: false, shadow: false, border: false, padding: false, gap: false });
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fillTone = nbToneVars(tone ?? DEFAULTS.tone!);
  return (
    <div ref={ref} data-nb-progress="" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label || undefined}
      className={cn(styles.className, 'block h-3 w-full overflow-hidden border-2 shadow', className)}
      style={{ backgroundColor: 'var(--nb-secondary-background)', ...styles.style, ...style }} {...styles.dataAttributes} {...props}>
      <div className="h-full transition-[width] duration-200" style={{ width: `${pct}%`, backgroundColor: fillTone.bg }} />
    </div>
  );
});
Progress.displayName = 'Progress';
