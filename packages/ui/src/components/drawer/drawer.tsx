'use client';

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import { DialogContext, useDialog } from '../dialog/dialog-context';

const DEFAULTS: NbStyleDefaults = {
  tone: 'cream',
  radius: 'none',
  shadow: 'hard',
  border: 'default',
};

export type DrawerSide = 'left' | 'right';

export interface DrawerProps extends ComponentPropsWithoutRef<'div'> {
  side?: DrawerSide;
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
}

export interface DrawerHandle {
  open: () => void;
  close: () => void;
}

export const Drawer = forwardRef<DrawerHandle, DrawerProps>(
  (
    {
      className,
      side = 'right',
      tone,
      radius,
      shadow,
      border,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const styles = resolveNbStyles('drawer', DEFAULTS, { tone, radius, shadow, border });

    const open = useCallback(() => dialogRef.current?.showModal(), []);
    const close = useCallback(() => dialogRef.current?.close(), []);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    const dismissOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) close();
    };

    return (
      <DialogContext.Provider value={{ close }}>
        <div
          data-nb-drawer=""
          data-side={side}
          className={cn(styles.className, className)}
          style={{ ...styles.style, ...style }}
          {...styles.dataAttributes}
          {...props}
        >
          <dialog
            ref={dialogRef}
            data-nb-drawer-panel
            onClick={dismissOnBackdrop}
            className={cn(
              'nb-tone m-0 h-full max-h-full w-[min(100vw-2rem,24rem)] max-w-full border-2 border-(--nb-border) p-0 shadow-[6px_6px_0_0_var(--nb-shadow)]',
              'open:flex open:flex-col',
              side === 'right' && 'ml-auto',
              side === 'left' && 'mr-auto',
            )}
          >
            {children}
          </dialog>
        </div>
      </DialogContext.Provider>
    );
  },
);
Drawer.displayName = 'Drawer';

export const DrawerContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-nb-drawer-content="" className={cn('flex h-full flex-col p-6', className)} {...props} />
  ),
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h2'>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} data-nb-drawer-title="" className={cn('text-xl font-black uppercase', className)} {...props} />
  ),
);
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerClose = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, onClick, children = 'Close', ...props }, ref) => {
    const { close } = useDialog();
    return (
      <button
        ref={ref}
        type="button"
        data-nb-drawer-close=""
        className={cn(
          'mt-4 w-fit border-2 border-(--nb-border) bg-(--nb-paper) px-4 py-2 font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]',
          className,
        )}
        onClick={(e) => {
          close();
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DrawerClose.displayName = 'DrawerClose';
