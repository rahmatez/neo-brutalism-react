import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export interface ScrollAreaProps extends ComponentPropsWithoutRef<'div'> {}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-nb-scroll-area=""
      className={cn(
        'relative overflow-auto border-2 border-(--nb-border) bg-(--nb-paper)',
        '[scrollbar-width:thin] [scrollbar-color:var(--nb-border)_transparent]',
        className,
      )}
      {...props}
    />
  ),
);
ScrollArea.displayName = 'ScrollArea';
