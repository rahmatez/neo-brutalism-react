import { Children, forwardRef, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { cn } from '../../core/cn';

export interface AvatarGroupProps extends ComponentPropsWithoutRef<'div'> { overflow?: number; }

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({ className, overflow = 0, children, ...props }, ref) => {
  const childArray = Children.toArray(children) as ReactElement[];
  const visible = overflow > 0 ? childArray.slice(0, overflow) : childArray;
  const hiddenCount = overflow > 0 ? Math.max(0, childArray.length - overflow) : 0;
  return (
    <div ref={ref} className={cn('flex items-center [&>*]:-ml-3 [&>*:first-child]:ml-0', className)} data-nb-avatar-group="" {...props}>
      {visible}
      {hiddenCount > 0 && (
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-(--nb-border) bg-(--nb-secondary-background) text-sm font-bold shadow-[2px_2px_0_0_var(--nb-shadow)]">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
});
AvatarGroup.displayName = 'AvatarGroup';
