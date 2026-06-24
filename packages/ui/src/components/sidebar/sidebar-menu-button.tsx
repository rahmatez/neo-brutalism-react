'use client';

import { cn } from '../../core/cn';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useSidebar } from './sidebar-context';
import { SidebarSlot } from './sidebar-slot';

export function sidebarMenuButtonClassName() {
  return cn(
    'flex w-full items-center gap-3 rounded-(--nb-radius) border-2 border-transparent px-3 py-2.5',
    'font-mono text-sm font-bold text-left transition-colors',
    'hover:border-(--nb-border) hover:bg-(--nb-yellow) hover:shadow-[2px_2px_0_0_var(--nb-shadow)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
    'data-[active]:border-(--nb-border) data-[active]:bg-(--nb-mint) data-[active]:shadow-[2px_2px_0_0_var(--nb-shadow)]',
    'group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-2',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  );
}

export interface SidebarMenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  isActive?: boolean;
  /** Shown as native tooltip when the sidebar is collapsed to icon-only mode. */
  tooltip?: string;
}

export function SidebarMenuButton({
  asChild = false,
  className,
  isActive,
  tooltip,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const sharedProps = {
    'data-nb-sidebar-menu-button': '',
    'data-active': isActive ? '' : undefined,
    className: cn(sidebarMenuButtonClassName(), className),
    title: collapsed && tooltip ? tooltip : undefined,
  };

  if (asChild) {
    return (
      <SidebarSlot {...sharedProps} {...props}>
        {children as ReactElement}
      </SidebarSlot>
    );
  }

  return (
    <button type="button" {...sharedProps} {...props}>
      {children}
    </button>
  );
}

export function SidebarMenuButtonLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-nb-sidebar-menu-label=""
      className={cn('truncate group-data-[state=collapsed]/sidebar:sr-only', className)}
      {...props}
    />
  );
}
