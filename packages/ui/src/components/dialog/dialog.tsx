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
import { DialogContext, useDialog } from './dialog-context';

const DEFAULTS: NbStyleDefaults = {
  tone: 'white',
  radius: 'sm',
  shadow: 'hard',
  border: 'default',
};

export interface DialogProps extends ComponentPropsWithoutRef<'div'> {
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
}

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export const Dialog = forwardRef<DialogHandle, DialogProps>(
  (
    { className, tone, radius, shadow, border, style, children, ...props },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const styles = resolveNbStyles('dialog', DEFAULTS, {
      tone,
      radius,
      shadow,
      border,
    });

    const open = useCallback(() => {
      dialogRef.current?.showModal();
    }, []);

    const close = useCallback(() => {
      dialogRef.current?.close();
    }, []);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    const dismissOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) {
        close();
      }
    };

    return (
      <DialogContext.Provider value={{ close }}>
        <div
          data-slot="dialog"
          className={cn(styles.className, className)}
          style={{ ...styles.style, ...style }}
          {...styles.dataAttributes}
          {...props}
        >
          <dialog
            ref={dialogRef}
            data-nb-dialog
            onClick={dismissOnBackdrop}
            className={cn(
              'w-[calc(100vw-2rem)] max-w-2xl',
              'nb-tone',
              'm-auto p-0 max-h-[90vh] overflow-x-hidden',
              'open:flex open:flex-col',
            )}
          >
            {children}
          </dialog>
        </div>
      </DialogContext.Provider>
    );
  },
);
Dialog.displayName = 'Dialog';

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h2'>
>(({ ...props }, ref) => (
  <h2 ref={ref} data-slot="dialog-title" {...props} />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<'p'>
>(({ className, style, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="dialog-description"
    className={className}
    style={{
      ['--nb-dialog-description-fg' as string]: '#4b5563',
      ...style,
    }}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export const DialogContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="dialog-content"
    className={className}
    style={{
      ['--nb-dialog-content-bg' as string]: 'transparent',
      ...style,
    }}
    {...props}
  />
));
DialogContent.displayName = 'DialogContent';

export const DialogActions = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="dialog-actions"
    className={className}
    style={{
      ['--nb-dialog-actions-bg' as string]: 'transparent',
      ...style,
    }}
    {...props}
  />
));
DialogActions.displayName = 'DialogActions';

export interface DialogCloseProps extends ComponentPropsWithoutRef<'button'> {}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, ...props }, ref) => {
    const { close } = useDialog();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          close();
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
DialogClose.displayName = 'DialogClose';
