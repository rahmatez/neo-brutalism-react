'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ElementRef,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
  type NbStyleProps,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbToneToken } from '../../tokens/tone';
import { menuContentClassName, menuItemClassName } from '../shared/menu-surface';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

function useNavigationMenuStyles(props: NbStyleProps = {}) {
  return resolveNbStyles('navigation-menu', DEFAULTS, props, {
    radius: false,
    shadow: false,
    padding: false,
    gap: false,
  });
}

export interface NavigationMenuProps
  extends ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, style, tone, border, ...props }, ref) => {
  const styles = useNavigationMenuStyles({ tone, border });

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-nb-navigation-menu=""
      className={cn(styles.className, 'relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      style={{ ...styles.style, ...style }}
      {...styles.dataAttributes}
      {...props}
    />
  );
});
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-nb-navigation-menu-list=""
    className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigationMenuItem: typeof NavigationMenuPrimitive.Item = NavigationMenuPrimitive.Item;

export function navigationMenuLinkClassName(variant: 'default' | 'compact' = 'default') {
  return cn(
    'block rounded-(--nb-radius) border-2 border-transparent font-mono text-sm font-bold transition-colors',
    'hover:border-(--nb-border) hover:shadow-[2px_2px_0_0_var(--nb-shadow)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
    'data-[active]:border-(--nb-border) data-[active]:bg-(--nb-mint) data-[active]:shadow-[2px_2px_0_0_var(--nb-shadow)]',
    variant === 'default'
      ? 'p-3 hover:bg-(--nb-yellow)'
      : 'px-3 py-2 hover:bg-(--nb-mint)',
  );
}

export interface NavigationMenuLinkProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  variant?: 'default' | 'compact';
}

export const NavigationMenuLink = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, variant = 'default', ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-nb-navigation-menu-link=""
    className={cn(navigationMenuLinkClassName(variant), className)}
    {...props}
  />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

export const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-nb-navigation-menu-trigger=""
    className={cn(
      menuItemClassName,
      'group inline-flex h-11 cursor-pointer items-center justify-center gap-1 rounded-(--nb-menu-radius)',
      'border-2 border-transparent bg-transparent px-4 py-2',
      'hover:border-(--nb-border) hover:bg-(--nb-yellow) hover:shadow-[3px_3px_0_0_var(--nb-shadow)]',
      'data-[state=open]:border-(--nb-border) data-[state=open]:bg-(--nb-mint) data-[state=open]:shadow-[3px_3px_0_0_var(--nb-shadow)]',
      className,
    )}
    {...props}
  >
    {children}
    <svg
      className="relative top-px size-4 transition duration-200 group-data-[state=open]:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export interface NavigationMenuContentProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, style, tone, border, ...props }, ref) => {
  const styles = useNavigationMenuStyles({ tone, border });

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-nb-navigation-menu-content=""
      className={cn(
        styles.className,
        menuContentClassName,
        'left-0 top-0 w-full p-4 md:absolute md:w-auto',
        className,
      )}
      style={{ ...styles.style, ...style }}
      {...styles.dataAttributes}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

export const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute top-full left-0 flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-nb-navigation-menu-viewport=""
      className={cn(
        'origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden',
        'rounded-(--nb-radius) border-2 border-(--nb-border) bg-(--nb-cream) shadow-[4px_4px_0_0_var(--nb-shadow)]',
        'md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

export const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-nb-navigation-menu-indicator=""
    className={cn(
      'top-full z-[1] flex h-2 items-end justify-center overflow-hidden',
      className,
    )}
    {...props}
  >
    <div className="relative top-[70%] size-2 rotate-45 border-2 border-(--nb-border) bg-(--nb-cream) shadow-[2px_2px_0_0_var(--nb-shadow)]" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;
