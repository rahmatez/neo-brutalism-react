'use client';

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../core/cn';

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  trigger: ReactNode;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, trigger, children, ...props }, ref) => {
    const id = useId();
    return (
      <div ref={ref} data-nb-dropdown-menu="" className={cn('relative inline-flex', className)} {...props}>
        <button
          type="button"
          popoverTarget={id}
          aria-haspopup="menu"
          className="border-2 border-(--nb-border) bg-(--nb-paper) px-4 py-2 font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
        >
          {trigger}
        </button>
        <div
          id={id}
          popover="auto"
          role="menu"
          className="m-0 min-w-40 border-2 border-(--nb-border) bg-(--nb-cream) p-2 shadow-[4px_4px_0_0_var(--nb-shadow)]"
        >
          {children}
        </div>
      </div>
    );
  },
);
DropdownMenu.displayName = 'DropdownMenu';

export const DropdownMenuItem = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      data-nb-dropdown-menu-item=""
      className={cn(
        'flex w-full items-center px-3 py-2 text-left text-sm font-bold hover:bg-(--nb-yellow)',
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      data-nb-dropdown-menu-separator=""
      className={cn('my-2 border-t-2 border-dashed border-(--nb-border)', className)}
      {...props}
    />
  ),
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
