'use client';

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../core/cn';

export interface PopoverProps extends ComponentPropsWithoutRef<'div'> {
  trigger: ReactNode;
  side?: 'top' | 'bottom';
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, trigger, side = 'bottom', children, ...props }, ref) => {
    const id = useId();
    return (
      <div ref={ref} data-nb-popover="" className={cn('relative inline-flex', className)} {...props}>
        <button
          type="button"
          popoverTarget={id}
          className="border-2 border-(--nb-border) bg-(--nb-paper) px-4 py-2 font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
        >
          {trigger}
        </button>
        <div
          id={id}
          popover="auto"
          data-side={side}
          className={cn(
            'm-0 w-64 border-2 border-(--nb-border) bg-(--nb-cream) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]',
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
Popover.displayName = 'Popover';
