import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import { nbRadiusValue } from '../../tokens/radius';
import { nbShadowValue } from '../../tokens/shadow';
import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import type { NbTextTracking } from '../../tokens/typography';
import { Icon, type IconSize } from '../icon/icon';
import type { TextTransform } from '../text/text';

const DEFAULTS: NbStyleDefaults = { tone: 'default', radius: 'none', shadow: 'sm', border: 'default' };
export type ChipTone = NbToneToken; export type ChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type ChipGroupDirection = 'horizontal' | 'vertical';
export type ChipGroupAlign = 'start' | 'center' | 'end' | 'stretch';

const paddingMap: Record<ChipPadding, string> = {
  none: 'px-0 py-0', sm: 'px-2 py-0.5', md: 'px-2.5 py-0.5', lg: 'px-4 py-2', xl: 'px-5 py-2.5',
};

export interface ChipProps extends ComponentPropsWithoutRef<'span'> {
  padding?: ChipPadding; icon?: string; iconSize?: IconSize;
  tone?: ChipTone; radius?: NbRadius; shadow?: NbShadow; border?: NbBorderStrength;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({
  className, padding = 'md', icon, iconSize = 'sm', tone, radius, shadow, border, style, children, ...props
}, ref) => {
  const styles = resolveNbStyles('chip', DEFAULTS, { tone, radius, shadow, border });
  return (
    <span ref={ref} data-padding={padding} data-nb-chip=""
      className={cn(styles.className, 'inline-flex items-center gap-1.5 text-xs font-bold', paddingMap[padding],
        '[&_svg]:size-[var(--nb-chip-icon-size,0.75rem)] [&_svg]:shrink-0', className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props}>
      {icon && <Icon src={icon} size={iconSize} decorative />}{children}
    </span>
  );
});
Chip.displayName = 'Chip';

const chipGroupAlignMap: Record<ChipGroupAlign, string> = {
  start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch',
};
const chipGroupTrackingMap: Record<NbTextTracking, string | undefined> = {
  tight: '-0.025em', normal: undefined, wide: '0.025em', wider: '0.05em',
};

export interface ChipGroupProps extends ComponentPropsWithoutRef<'div'> {
  direction?: ChipGroupDirection; gap?: NbSpacing; align?: ChipGroupAlign;
  radius?: NbRadius; shadow?: NbShadow; transform?: TextTransform; tracking?: NbTextTracking;
}

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(({
  className, direction = 'horizontal', gap = 'sm', align = 'stretch', radius, shadow,
  transform = 'none', tracking = 'normal', style, ...props
}, ref) => (
  <div ref={ref} data-nb-chip-group=""
    className={cn('flex min-w-0', direction === 'vertical' ? 'flex-col' : 'flex-wrap', chipGroupAlignMap[align], className)}
    style={{
      gap: nbSpacingValue(gap),
      ...(radius ? { ['--nb-chip-radius' as string]: nbRadiusValue(radius) } : {}),
      ...(shadow ? { ['--nb-chip-shadow' as string]: nbShadowValue(shadow) } : {}),
      textTransform: transform === 'none' ? undefined : transform,
      letterSpacing: chipGroupTrackingMap[tracking],
      ...style,
    }} {...props} />
));
ChipGroup.displayName = 'ChipGroup';
