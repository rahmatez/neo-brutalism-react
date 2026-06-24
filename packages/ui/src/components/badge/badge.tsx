import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'white', radius: 'full', shadow: 'sm', border: 'default' };

export type BadgeTone = NbToneToken;
export type BadgeRadius = NbRadius;
export type BadgeShadow = NbShadow;
export type BadgeBorder = NbBorderStrength;

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  tone?: BadgeTone; radius?: BadgeRadius; shadow?: BadgeShadow; border?: BadgeBorder;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, tone, radius, shadow, border, style, ...props }, ref) => {
  const styles = resolveNbStyles('badge', DEFAULTS, { tone, radius, shadow, border });
  return (
    <span ref={ref} className={cn(styles.className, 'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold', className)}
      style={{ ...styles.style, ...style }} data-nb-badge="" {...styles.dataAttributes} {...props} />
  );
});
Badge.displayName = 'Badge';
