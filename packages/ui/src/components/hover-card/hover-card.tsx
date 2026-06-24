'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
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
import { menuContentClassName } from '../shared/menu-surface';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

function useHoverCardStyles(props: NbStyleProps = {}) {
  return resolveNbStyles('hover-card', DEFAULTS, props, {
    radius: false,
    shadow: false,
    padding: false,
    gap: false,
  });
}

export interface HoverCardProps extends ComponentPropsWithRef<typeof HoverCardPrimitive.Root> {}

export const HoverCard = HoverCardPrimitive.Root;

export const HoverCardTrigger = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Trigger
    ref={ref}
    data-nb-hover-card-trigger=""
    className={cn('inline-flex', className)}
    {...props}
  />
));
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;

export interface HoverCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, style, tone, border, align = 'center', sideOffset = 8, ...props }, ref) => {
  const styles = useHoverCardStyles({ tone, border });

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        data-nb-hover-card-content=""
        className={cn(
          styles.className,
          menuContentClassName,
          'w-80 p-4 outline-none',
          className,
        )}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export const HoverCardArrow = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    data-nb-hover-card-arrow=""
    className={cn('fill-(--nb-menu-bg)', className)}
    {...props}
  />
));
HoverCardArrow.displayName = HoverCardPrimitive.Arrow.displayName;
