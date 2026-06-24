import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export interface TitleProps extends ComponentPropsWithoutRef<'span'> {}

export const Title = forwardRef<HTMLSpanElement, TitleProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn(className)} data-nb-title="" data-underline="wave" {...props} />
));
Title.displayName = 'Title';
