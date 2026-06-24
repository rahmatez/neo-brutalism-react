import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../core/cn';

export interface StatProps extends ComponentPropsWithoutRef<'div'> {
  value: string; label: string; direction?: 'row' | 'column'; icon?: ReactNode;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(({ className, value, label, direction = 'column', icon, style, ...props }, ref) => (
  <div ref={ref} data-slot="stat"
    className={cn('inline-flex gap-2', direction === 'row' ? 'flex-row items-baseline' : 'flex-col', className)}
    style={{ ['--nb-stat-value-size' as string]: '1.5rem', ['--nb-stat-label-size' as string]: '0.875rem', ...style }} {...props}>
    {icon && <span data-slot="stat-icon">{icon}</span>}
    <span className="font-black leading-none" style={{ fontSize: 'var(--nb-stat-value-size)' }}>{value}</span>
    <span className="font-bold opacity-70" style={{ fontSize: 'var(--nb-stat-label-size)' }}>{label}</span>
  </div>
));
Stat.displayName = 'Stat';
