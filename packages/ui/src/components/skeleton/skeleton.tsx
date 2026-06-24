import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'text' | 'block' | 'circle';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'block', ...props }, ref) => (
    <div
      ref={ref}
      data-nb-skeleton=""
      data-variant={variant}
      aria-hidden="true"
      className={cn(
        'animate-pulse border-2 border-(--nb-border) bg-(--nb-paper)',
        variant === 'text' && 'h-4 w-full rounded-sm',
        variant === 'block' && 'min-h-8 w-full rounded-md',
        variant === 'circle' && 'size-10 rounded-full',
        className,
      )}
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
