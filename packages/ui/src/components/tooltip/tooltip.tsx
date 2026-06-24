'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../core/cn';

export interface TooltipProps extends Omit<ComponentPropsWithoutRef<'div'>, 'content'> {
  content: ReactNode;
  side?: 'top' | 'bottom';
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content: tooltipContent, side = 'top', children, ...props }, ref) => (
    <div
      ref={ref}
      data-nb-tooltip=""
      className={cn('group/tooltip relative inline-flex', className)}
      {...props}
    >
      {children}
      <span
        role="tooltip"
        data-side={side}
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap',
          'border-2 border-(--nb-border) bg-(--nb-yellow) px-2 py-1 text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]',
          'group-hover/tooltip:block group-focus-within/tooltip:block',
          side === 'top' && 'bottom-full mb-2',
          side === 'bottom' && 'top-full mt-2',
        )}
      >
        {tooltipContent}
      </span>
    </div>
  ),
);
Tooltip.displayName = 'Tooltip';
