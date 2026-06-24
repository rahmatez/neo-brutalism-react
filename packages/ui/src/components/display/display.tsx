import { createElement, forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { cn } from '../../core/cn';
import { resolveResetMargin, resolveUnderlineStyles } from '../../core/resolve-underline-styles';
import { nbFontWeightValue, type NbFontWeight, type NbUnderlineGap, type NbUnderlineVariant, type NbUnderlineWidth } from '../../tokens/typography';

export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type DisplayWeight = NbFontWeight;
export type DisplayTracking = 'normal' | 'tight' | 'tighter';
export type DisplayLeading = 'none' | 'tight' | 'display';
export type DisplayUnderline = NbUnderlineVariant;

const SIZE_MAP: Record<DisplaySize, string> = { sm: '2rem', md: '3rem', lg: '3.75rem', xl: '4.75rem' };
const FLUID_MAP: Record<DisplaySize, string> = {
  sm: 'clamp(1.75rem, 1.2rem + 2.75vw, 2rem)', md: 'clamp(2.25rem, 1.5rem + 3.75vw, 3rem)',
  lg: 'clamp(2.75rem, 1.8rem + 4.75vw, 3.75rem)', xl: 'clamp(3.25rem, 2rem + 6.25vw, 4.75rem)',
};
const TRACKING_MAP: Record<DisplayTracking, string> = { normal: '0', tight: '-0.025em', tighter: '-0.08em' };
const LEADING_MAP: Record<DisplayLeading, string> = { none: '1', tight: '0.9', display: '0.84' };

type DisplayOwnProps = {
  as?: ElementType;
  size?: DisplaySize;
  weight?: DisplayWeight;
  fluid?: boolean;
  tracking?: DisplayTracking;
  leading?: DisplayLeading;
  underline?: DisplayUnderline;
  underlineGap?: NbUnderlineGap;
  underlineWidth?: NbUnderlineWidth;
  reset?: boolean;
};

export type DisplayProps = DisplayOwnProps & Omit<ComponentPropsWithoutRef<'span'>, keyof DisplayOwnProps>;

export const Display = forwardRef<HTMLElement, DisplayProps>(({
  as: Component = 'span', className, size = 'md', weight = 'black', fluid, tracking = 'tight', leading = 'none',
  underline = 'none', underlineGap, underlineWidth, reset = true, style, ...props
}, ref) => {
  const base = fluid ? FLUID_MAP[size] : SIZE_MAP[size];
  const underlineStyles = resolveUnderlineStyles({ underline, underlineGap, underlineWidth });
  const resetAttrs = resolveResetMargin(reset);
  return createElement(Component, {
    ref,
    'data-nb-display': '',
    className: cn(className),
    ...underlineStyles.dataAttributes,
    ...resetAttrs,
    style: {
      fontSize: `var(--nb-display-size, ${base})`,
      fontWeight: nbFontWeightValue(weight),
      color: 'var(--nb-display-color, currentColor)',
      letterSpacing: TRACKING_MAP[tracking],
      lineHeight: LEADING_MAP[leading],
      ...underlineStyles.style,
      ...style,
    },
    ...props,
  });
});
Display.displayName = 'Display';
