import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbRadius } from '../../tokens/radius';

const DEFAULTS: NbStyleDefaults = { radius: 'md' };
export type StatusDotState = 'online' | 'offline' | 'live';
export type StatusDotSize = 'xs' | 'sm' | 'md' | 'lg';
const sizeMap: Record<StatusDotSize, string> = { xs: '0.375rem', sm: '0.5rem', md: '0.625rem', lg: '0.75rem' };
const stateClass: Record<StatusDotState, string> = {
  online: 'bg-(--nb-success)',
  offline: 'bg-(--nb-secondary-background)',
  live: 'bg-(--nb-danger) animate-pulse',
};

export interface StatusDotProps extends ComponentPropsWithoutRef<'span'> {
  state?: StatusDotState; size?: StatusDotSize; radius?: NbRadius; 'aria-label'?: string;
}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(({ className, state = 'online', size = 'md', radius, style, 'aria-label': ariaLabel, ...props }, ref) => {
  const styles = resolveNbStyles('status-dot', DEFAULTS, { radius }, { tone: false, shadow: false, border: false, padding: false, gap: false });
  return (
    <span ref={ref} role="img" aria-label={ariaLabel ?? state} data-nb-status-dot="" data-state={state} data-size={size}
      className={cn(styles.className, 'inline-block shrink-0', stateClass[state], className)}
      style={{ ['--nb-status-dot-size' as string]: sizeMap[size], width: 'var(--nb-status-dot-size)', height: 'var(--nb-status-dot-size)', ...styles.style, ...style }}
      {...styles.dataAttributes} {...props} />
  );
});
StatusDot.displayName = 'StatusDot';
