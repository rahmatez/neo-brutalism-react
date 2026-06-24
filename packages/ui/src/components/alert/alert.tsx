import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Callout, type CalloutProps } from '../callout/callout';
import { cn } from '../../core/cn';

export type AlertProps = CalloutProps & {
  variant?: 'default' | 'destructive';
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', tone, ...props }, ref) => (
    <Callout
      ref={ref}
      role="alert"
      data-nb-alert=""
      data-variant={variant}
      tone={tone ?? (variant === 'destructive' ? 'pink' : 'yellow')}
      className={cn('normal-case', className)}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

export const AlertTitle = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-nb-alert-title="" className={cn('font-black uppercase', className)} {...props} />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-nb-alert-description="" className={cn('mt-1 text-sm font-medium normal-case', className)} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';
