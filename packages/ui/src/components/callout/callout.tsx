import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'yellow', shadow: 'hard' };
export type CalloutSize = 'sm' | 'md' | 'lg' | 'xl';
export type CalloutLayout = 'inline' | 'between' | 'center';
export type CalloutTone = NbToneToken; export type CalloutShadow = NbShadow;

const sizeClasses: Record<CalloutSize, string> = {
  sm: 'px-3 py-1 text-xs gap-2', md: 'px-4 py-1.5 text-sm gap-2',
  lg: 'px-5 py-2 text-base gap-3', xl: 'px-6 py-2.5 text-lg gap-4',
};
const sizeRadius: Record<CalloutSize, string> = { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.625rem' };
const layoutMap: Record<CalloutLayout, string> = {
  inline: 'justify-start', between: 'justify-between', center: 'justify-center',
};

export interface CalloutProps extends ComponentPropsWithoutRef<'div'> {
  size?: CalloutSize; layout?: CalloutLayout; radius?: NbRadius; tone?: CalloutTone; shadow?: CalloutShadow;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(({
  className, size = 'lg', layout = 'inline', radius, tone, shadow, style, ...props
}, ref) => {
  const styles = resolveNbStyles('callout', DEFAULTS, { tone, shadow }, { radius: false, border: false, padding: false, gap: false });
  const resolvedRadius = radius ? nbRadiusValue(radius) : sizeRadius[size];
  return (
    <div ref={ref} data-nb-callout="" data-size={size} data-layout={layout} data-radius={radius}
      className={cn(styles.className, 'inline-flex w-full items-center border-2 font-black uppercase', sizeClasses[size], layoutMap[layout], className)}
      style={{ ['--nb-callout-radius' as string]: resolvedRadius, ['--nb-callout-border-width' as string]: 'var(--nb-border-width)', borderRadius: 'var(--nb-callout-radius)', ...styles.style, ...style }}
      {...styles.dataAttributes} {...props} />
  );
});
Callout.displayName = 'Callout';
