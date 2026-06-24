'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
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
import {
  menuContentClassName,
  menuIndicatorItemClassName,
  menuItemClassName,
  menuLabelClassName,
  menuSeparatorClassName,
  menuShortcutClassName,
} from '../shared/menu-surface';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

function useMenubarStyles(props: NbStyleProps = {}) {
  return resolveNbStyles('menubar', DEFAULTS, props, {
    radius: false,
    shadow: false,
    padding: false,
    gap: false,
  });
}

export interface MenubarProps extends ComponentPropsWithRef<typeof MenubarPrimitive.Root> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const Menubar = forwardRef<ElementRef<typeof MenubarPrimitive.Root>, MenubarProps>(
  ({ className, style, tone, border, ...props }, ref) => {
    const styles = useMenubarStyles({ tone, border });
    return (
      <MenubarPrimitive.Root
        ref={ref}
        data-nb-menubar=""
        className={cn(
          styles.className,
          menuContentClassName,
          'flex h-12 items-center gap-1 p-1',
          className,
        )}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    );
  },
);
Menubar.displayName = MenubarPrimitive.Root.displayName;

export const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;

export const MenubarGroup: typeof MenubarPrimitive.Group = MenubarPrimitive.Group;

export const MenubarPortal: typeof MenubarPrimitive.Portal = MenubarPrimitive.Portal;

export const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup = MenubarPrimitive.RadioGroup;

export const MenubarSub: typeof MenubarPrimitive.Sub = MenubarPrimitive.Sub;

export const MenubarTrigger = forwardRef<
  ElementRef<typeof MenubarPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-nb-menubar-trigger=""
    className={cn(
      menuItemClassName,
      'cursor-pointer rounded-(--nb-menu-radius) px-3 py-1.5',
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export interface MenubarContentProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const MenubarContent = forwardRef<
  ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({ className, style, tone, border, align = 'start', sideOffset = 8, ...props }, ref) => {
  const styles = useMenubarStyles({ tone, border });

  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        data-nb-menubar-content=""
        className={cn(styles.className, menuContentClassName, 'min-w-48 p-1', className)}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

export const MenubarItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.Item>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    data-nb-menubar-item=""
    className={cn(menuItemClassName, inset && 'pl-8', className)}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

export const MenubarCheckboxItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    data-nb-menubar-checkbox-item=""
    className={cn(menuIndicatorItemClassName, className)}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

export const MenubarRadioItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    data-nb-menubar-radio-item=""
    className={cn(menuIndicatorItemClassName, className)}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <span className="size-2 rounded-full bg-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

export const MenubarLabel = forwardRef<
  ElementRef<typeof MenubarPrimitive.Label>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    data-nb-menubar-label=""
    className={cn(menuLabelClassName, inset && 'pl-8', className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

export const MenubarSeparator = forwardRef<
  ElementRef<typeof MenubarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    data-nb-menubar-separator=""
    className={cn(menuSeparatorClassName, className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

export const MenubarShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} data-nb-menubar-shortcut="" className={cn(menuShortcutClassName, className)} {...props} />
  ),
);
MenubarShortcut.displayName = 'MenubarShortcut';

export const MenubarSubTrigger = forwardRef<
  ElementRef<typeof MenubarPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    data-nb-menubar-sub-trigger=""
    className={cn(menuItemClassName, inset && 'pl-8', className)}
    {...props}
  >
    {children}
    <svg className="ms-auto size-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

export interface MenubarSubContentProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const MenubarSubContent = forwardRef<
  ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, style, tone, border, ...props }, ref) => {
  const styles = useMenubarStyles({ tone, border });

  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      data-nb-menubar-sub-content=""
      className={cn(styles.className, menuContentClassName, 'min-w-48 p-1', className)}
      style={{ ...styles.style, ...style }}
      {...styles.dataAttributes}
      {...props}
    />
  );
});
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
