'use client';

import { Command as CommandPrimitive } from 'cmdk';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
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

function useCommandStyles(props: NbStyleProps = {}) {
  return resolveNbStyles('command', DEFAULTS, props, {
    radius: false,
    shadow: false,
    padding: false,
    gap: false,
  });
}

const commandTokens = cn(
  '[--nb-command-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
  '[--nb-command-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
  '[--nb-command-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
  '[--nb-command-radius:var(--nb-radius)]',
);

export interface CommandProps extends ComponentPropsWithoutRef<typeof CommandPrimitive> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const Command = forwardRef<HTMLDivElement, CommandProps>(
  ({ className, style, tone, border, ...props }, ref) => {
    const styles = useCommandStyles({ tone, border });

    return (
      <CommandPrimitive
        ref={ref}
        data-nb-command=""
        className={cn(
          styles.className,
          commandTokens,
          'flex h-full w-full flex-col overflow-hidden',
          'rounded-(--nb-command-radius) border-2 border-(--nb-command-border)',
          'bg-(--nb-command-bg) text-(--nb-command-fg) shadow-nb',
          className,
        )}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    );
  },
);
Command.displayName = 'Command';

export const CommandInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center gap-3 border-b-2 border-(--nb-command-border) px-4"
    cmdk-input-wrapper=""
  >
    <svg
      className="size-5 shrink-0 fill-none stroke-current stroke-[2.5] opacity-60"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-14 w-full min-w-0 bg-transparent font-mono text-base font-bold',
        'text-(--nb-command-fg) placeholder:text-gray-400',
        'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

export const CommandList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto p-2', className)}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

export const CommandEmpty = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn('px-4 py-8 text-center font-mono text-sm font-bold text-gray-500', className)}
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

export const CommandGroup = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-(--nb-command-fg)',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2',
      '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs',
      '[&_[cmdk-group-heading]]:font-black [&_[cmdk-group-heading]]:uppercase',
      '[&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-gray-500',
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

export const CommandItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-3 rounded-(--nb-command-radius)',
      'px-3 py-2.5 font-mono text-base font-bold outline-none transition-colors',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      'data-[selected=true]:bg-[#e8d6ff] data-[selected=true]:text-(--nb-command-fg)',
      '[&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.3]',
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

export const CommandSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-2 h-0.5 bg-(--nb-command-border)', className)}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

export const CommandShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'ms-auto inline-flex shrink-0 items-center gap-1',
        'border-2 border-(--nb-border) bg-(--nb-paper) px-1.5 py-0.5',
        'font-mono text-[10px] font-black tracking-widest text-gray-600 uppercase shadow-[2px_2px_0_0_var(--nb-shadow)]',
        className,
      )}
      {...props}
    />
  ),
);
CommandShortcut.displayName = 'CommandShortcut';

export const CommandLoading = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    className={cn('px-4 py-3 font-mono text-sm font-bold text-gray-500', className)}
    {...props}
  />
));
CommandLoading.displayName = 'CommandLoading';

export type CommandDialogProps = ComponentPropsWithRef<typeof CommandPrimitive.Dialog> & {
  tone?: NbToneToken;
  border?: NbBorderStrength;
};

export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(
  (
    {
      className,
      style,
      tone,
      border,
      overlayClassName,
      contentClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const styles = useCommandStyles({ tone, border });

    return (
      <CommandPrimitive.Dialog
        ref={ref}
        data-nb-command-dialog=""
        overlayClassName={cn(
          'fixed inset-0 z-50 bg-black/55',
          overlayClassName,
        )}
        contentClassName={cn(
          'fixed top-[16%] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2',
          'overflow-hidden p-0',
          contentClassName,
        )}
        className={cn(
          styles.className,
          commandTokens,
          'flex h-full w-full flex-col overflow-hidden',
          'rounded-(--nb-command-radius) border-2 border-(--nb-command-border)',
          'bg-(--nb-command-bg) text-(--nb-command-fg) shadow-[8px_8px_0_0_var(--nb-shadow)]',
          className,
        )}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      >
        {children}
      </CommandPrimitive.Dialog>
    );
  },
);
CommandDialog.displayName = 'CommandDialog';
