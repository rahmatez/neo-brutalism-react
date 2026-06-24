import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export interface MarqueeItemProps extends ComponentPropsWithoutRef<'span'> {}

export const MarqueeItem = forwardRef<HTMLSpanElement, MarqueeItemProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('mx-4 inline-flex shrink-0 items-center text-4xl whitespace-nowrap', className)} {...props} />
));
MarqueeItem.displayName = 'MarqueeItem';
