import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveResetMargin, resolveUnderlineStyles } from '../../core/resolve-underline-styles';
import type { NbTone } from '../../tokens/tone';
import { nbFontWeightValue, type NbFontWeight, type NbTextTracking, type NbUnderlineGap, type NbUnderlineVariant, type NbUnderlineWidth } from '../../tokens/typography';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextWeight = NbFontWeight;
export type TextTone = 'default' | 'muted' | 'subtle' | 'inverse' | Extract<NbTone, 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'>;
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type { NbTextTracking as TextTracking } from '../../tokens/typography';
export type TextMeasure = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type TextLeading = 'none' | 'tight' | 'normal' | 'relaxed';
export type TextUnderline = NbUnderlineVariant;

const sizeMap: Record<TextSize, string> = { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' };
const defaultLineHeight: Record<TextSize, string> = { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem', xl: '1.875rem', '2xl': '2rem', '3xl': '2.25rem' };
const leadingMap: Record<TextLeading, string | null> = { none: '1', tight: '1.15', normal: null, relaxed: '1.65' };
const toneMap: Record<TextTone, string> = {
  default: 'var(--nb-foreground)', muted: 'color-mix(in srgb, var(--nb-foreground) 80%, transparent)',
  subtle: 'color-mix(in srgb, var(--nb-foreground) 65%, transparent)', inverse: 'var(--nb-background)',
  primary: 'var(--nb-primary)', secondary: 'var(--nb-secondary)', accent: 'var(--nb-accent)',
  danger: 'var(--nb-danger)', success: 'var(--nb-success)', warning: 'var(--nb-warning)',
};
const trackingMap: Record<NbTextTracking, string> = { tight: '-0.025em', normal: 'normal', wide: '0.025em', wider: '0.05em' };
const measureMap: Record<TextMeasure, string | null> = { none: null, xs: '20rem', sm: '28rem', md: '36rem', lg: '44rem' };

export interface TextProps extends ComponentPropsWithoutRef<'span'> {
  size?: TextSize; weight?: TextWeight; tone?: TextTone; transform?: TextTransform;
  tracking?: NbTextTracking; measure?: TextMeasure; leading?: TextLeading;
  underline?: TextUnderline; underlineGap?: NbUnderlineGap; underlineWidth?: NbUnderlineWidth; reset?: boolean;
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(({
  className, size = 'md', weight = 'normal', tone = 'default', transform = 'none', tracking = 'normal',
  measure = 'none', leading = 'normal', underline = 'none', underlineGap, underlineWidth, reset = true, style, ...props
}, ref) => {
  const underlineStyles = resolveUnderlineStyles({ underline, underlineGap, underlineWidth });
  const resetAttrs = resolveResetMargin(reset);
  return (
    <span ref={ref} data-nb-text="" data-size={size} data-weight={weight} data-tone={tone}
      data-transform={transform} data-tracking={tracking} data-measure={measure} data-leading={leading}
      className={cn(className)} {...underlineStyles.dataAttributes} {...resetAttrs}
      style={{
        color: toneMap[tone], fontSize: sizeMap[size],
        lineHeight: leadingMap[leading] ?? defaultLineHeight[size],
        fontWeight: nbFontWeightValue(weight), textTransform: transform,
        letterSpacing: trackingMap[tracking], maxWidth: measureMap[measure] ?? undefined,
        ...underlineStyles.style, ...style,
      }} {...props} />
  );
});
Text.displayName = 'Text';
