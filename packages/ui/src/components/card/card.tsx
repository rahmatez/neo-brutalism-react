import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'background', radius: 'lg', shadow: 'default', border: 'default' };
export type CardTone = NbToneToken; export type CardRadius = NbRadius; export type CardShadow = NbShadow; export type CardBorder = NbBorderStrength;
export type CardActionsAlign = 'start' | 'end';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  tone?: CardTone; radius?: CardRadius; shadow?: CardShadow; border?: CardBorder;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, tone, radius, shadow, border, style, ...props }, ref) => {
  const styles = resolveNbStyles('card', DEFAULTS, { tone, radius, shadow, border });
  return <div ref={ref} data-slot="card" className={cn(styles.className, 'flex flex-col gap-6 py-6 font-medium', className)} style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props} />;
});
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-header" className={cn('grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-title" className={cn('font-bold leading-none', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-description" className={cn('text-sm font-medium', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export interface CardActionsProps extends ComponentPropsWithoutRef<'div'> { align?: CardActionsAlign; }
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(({ className, align = 'start', ...props }, ref) => (
  <div ref={ref} data-slot="card-actions" data-align={align}
    className={cn('flex flex-wrap items-center gap-3 px-6 [[data-slot=card-footer]_&]:px-0', align === 'end' ? 'justify-end' : 'justify-start', className)} {...props} />
));
CardActions.displayName = 'CardActions';

export const CardContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-content" className={cn('px-6', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="card-footer" className={cn('flex items-center px-6 has-[[data-slot=card-actions]]:flex-wrap has-[[data-slot=card-actions]]:justify-between has-[[data-slot=card-actions]]:gap-4 [.border-t]:pt-6', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
