'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
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

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

function useContextMenuStyles(props: NbStyleProps = {}) {
  return resolveNbStyles('context-menu', DEFAULTS, props, {
    radius: false,
    shadow: false,
    padding: false,
    gap: false,
  });
}

const menuTokens = cn(
  '[--nb-context-menu-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
  '[--nb-context-menu-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
  '[--nb-context-menu-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
  '[--nb-context-menu-radius:var(--nb-radius)]',
);

const contentClassName = cn(
  menuTokens,
  'z-50 min-w-48 overflow-hidden rounded-(--nb-context-menu-radius)',
  'border-2 border-(--nb-context-menu-border) bg-(--nb-context-menu-bg)',
  'p-1 text-(--nb-context-menu-fg) shadow-[4px_4px_0_0_var(--nb-shadow)]',
);

const itemClassName = cn(
  'relative flex cursor-default select-none items-center gap-3 rounded-(--nb-context-menu-radius)',
  'px-3 py-2.5 font-mono text-sm font-bold text-(--nb-context-menu-fg) outline-none transition-colors',
  'focus:bg-[#e8d6ff] data-[highlighted]:bg-[#e8d6ff] data-[highlighted]:text-(--nb-context-menu-fg)',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.5]',
);

const indicatorItemClassName = cn(itemClassName, 'pl-8');

export interface ContextMenuProps extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Root> {}

export const ContextMenu = ContextMenuPrimitive.Root;

export const ContextMenuTrigger = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Trigger
    ref={ref}
    data-nb-context-menu-trigger=""
    className={cn('inline-flex', className)}
    {...props}
  />
));
ContextMenuTrigger.displayName = ContextMenuPrimitive.Trigger.displayName;

export const ContextMenuGroup = ContextMenuPrimitive.Group;

export const ContextMenuPortal = ContextMenuPrimitive.Portal;

export interface ContextMenuContentProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const ContextMenuContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, style, tone, border, ...props }, ref) => {
  const styles = useContextMenuStyles({ tone, border });

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        data-nb-context-menu-content=""
        className={cn(styles.className, contentClassName, className)}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

export const ContextMenuItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-nb-context-menu-item=""
    className={cn(itemClassName, className)}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

export const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-nb-context-menu-checkbox-item=""
    className={cn(indicatorItemClassName, className)}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-nb-context-menu-radio-item=""
    className={cn(indicatorItemClassName, className)}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <span className="size-2 rounded-full bg-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

export const ContextMenuLabel = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-nb-context-menu-label=""
    className={cn(
      'px-3 py-2 font-mono text-xs font-black tracking-widest text-gray-500 uppercase',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

export const ContextMenuSeparator = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-nb-context-menu-separator=""
    className={cn('-mx-1 my-1 h-0.5 bg-(--nb-context-menu-border)', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

export const ContextMenuShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-nb-context-menu-shortcut=""
      className={cn(
        'ms-auto inline-flex shrink-0 items-center',
        'font-mono text-[10px] font-black tracking-widest text-gray-500 uppercase',
        className,
      )}
      {...props}
    />
  ),
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export const ContextMenuSub = ContextMenuPrimitive.Sub;

export const ContextMenuSubTrigger = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-nb-context-menu-sub-trigger=""
    className={cn(itemClassName, inset && 'pl-8', className)}
    {...props}
  >
    {children}
    <svg
      className="ms-auto size-4 fill-none stroke-current stroke-[2.5]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

export interface ContextMenuSubContentProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const ContextMenuSubContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ className, style, tone, border, ...props }, ref) => {
  const styles = useContextMenuStyles({ tone, border });

  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      data-nb-context-menu-sub-content=""
      className={cn(styles.className, contentClassName, className)}
      style={{ ...styles.style, ...style }}
      {...styles.dataAttributes}
      {...props}
    />
  );
});
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
