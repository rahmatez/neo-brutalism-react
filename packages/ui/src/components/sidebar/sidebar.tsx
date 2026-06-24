'use client';

import { type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { cn } from '../../core/cn';
import { Button } from '../button/button';
import {
  SidebarContext,
  useSidebar,
  useSidebarProviderState,
  type SidebarProviderProps as SidebarProviderContextProps,
} from './sidebar-context';
import { SidebarMenuButton, SidebarMenuButtonLabel } from './sidebar-menu-button';

export type { SidebarContextValue, SidebarState } from './sidebar-context';
export { useSidebar };
export type { SidebarMenuButtonProps } from './sidebar-menu-button';
export { SidebarMenuButton, SidebarMenuButtonLabel };

export interface SidebarProviderProps
  extends Omit<ComponentPropsWithoutRef<'div'>, keyof SidebarProviderContextProps>,
    SidebarProviderContextProps {}

export function SidebarProvider({
  defaultOpen,
  open,
  onOpenChange,
  collapsible,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const { value, providerStyle } = useSidebarProviderState({
    defaultOpen,
    open,
    onOpenChange,
    collapsible,
  });

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-nb-sidebar-provider=""
        data-state={value.state}
        className={cn('group/sidebar flex min-h-svh w-full', className)}
        style={{ ...providerStyle, ...style } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends ComponentPropsWithoutRef<'aside'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  className,
  children,
  id,
  ...props
}: SidebarProps) {
  const { state, sidebarId } = useSidebar();

  return (
    <aside
      id={id ?? sidebarId}
      data-nb-sidebar=""
      data-side={side}
      data-variant={variant}
      data-state={state}
      className={cn(
        'group/sidebar relative z-20 flex h-svh shrink-0 flex-col border-(--nb-border) bg-(--nb-paper) text-(--nb-foreground)',
        'w-[var(--sidebar-width)] transition-[width] duration-200 ease-linear',
        'data-[state=collapsed]:w-[var(--sidebar-width-collapsed)]',
        side === 'left' ? 'border-r-2' : 'border-l-2 order-last',
        variant === 'floating' && 'm-3 h-[calc(100svh-1.5rem)] rounded-(--nb-radius) border-2 shadow-nb',
        variant === 'inset' && 'm-3 h-[calc(100svh-1.5rem)] rounded-(--nb-radius) border-2 shadow-nb',
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-nb-sidebar-header=""
      className={cn('flex flex-col gap-2 border-b-2 border-(--nb-border) p-4', className)}
      {...props}
    />
  );
}

export function SidebarHeaderLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-nb-sidebar-header-label=""
      className={cn('group-data-[state=collapsed]/sidebar:sr-only', className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-nb-sidebar-footer=""
      className={cn('mt-auto flex flex-col gap-2 border-t-2 border-(--nb-border) p-4', className)}
      {...props}
    />
  );
}

export function SidebarContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-nb-sidebar-content=""
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2', className)}
      {...props}
    />
  );
}

export function SidebarGroup({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div data-nb-sidebar-group="" className={cn('flex flex-col gap-1 p-2', className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-nb-sidebar-group-label=""
      className={cn(
        'px-2 py-1 font-mono text-xs font-black tracking-widest text-gray-500 uppercase',
        'group-data-[state=collapsed]/sidebar:sr-only',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div data-nb-sidebar-group-content="" className={cn('flex flex-col gap-1', className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: ComponentPropsWithoutRef<'ul'>) {
  return <ul data-nb-sidebar-menu="" className={cn('flex flex-col gap-1', className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: ComponentPropsWithoutRef<'li'>) {
  return <li data-nb-sidebar-menu-item="" className={cn('list-none', className)} {...props} />;
}

export function SidebarTrigger({
  className,
  onClick,
  children,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  const { toggleSidebar, collapsible, open, sidebarId } = useSidebar();

  if (collapsible === false) {
    return null;
  }

  return (
    <Button
      type="button"
      tone="secondary"
      size="sm"
      data-nb-sidebar-trigger=""
      aria-expanded={open}
      aria-controls={sidebarId}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? 'Toggle sidebar'}
    </Button>
  );
}

export function SidebarRail({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  const { toggleSidebar, collapsible } = useSidebar();

  if (collapsible === false) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      data-nb-sidebar-rail=""
      onClick={toggleSidebar}
      className={cn(
        'absolute inset-y-0 z-30 hidden w-4 -translate-x-1/2 transition-all sm:flex',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-(--nb-border)',
        'group-data-[side=left]/sidebar:-right-4 group-data-[side=right]/sidebar:-left-4',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarInset({ className, ...props }: ComponentPropsWithoutRef<'main'>) {
  return (
    <main
      data-nb-sidebar-inset=""
      className={cn('relative flex min-h-svh flex-1 flex-col bg-(--nb-background)', className)}
      {...props}
    />
  );
}
