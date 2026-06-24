import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import { Icon } from '../icon/icon';

const DEFAULTS: NbStyleDefaults = { tone: 'default', radius: 'none', shadow: 'default', border: 'default' };
export type IconButtonShape = 'square' | 'circle';
export type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';
const sizeMap: Record<IconButtonSize, string> = {
  sm: 'size-9 [&_svg]:size-4', md: 'size-11 [&_svg]:size-5', lg: 'size-[3.25rem] [&_svg]:size-6', xl: 'size-14 [&_svg]:size-7',
};

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  shape?: IconButtonShape; size?: IconButtonSize; icon?: string;
  tone?: NbToneToken; radius?: NbRadius; shadow?: NbShadow; border?: NbBorderStrength;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ className, shape = 'square', size = 'md', icon, tone, radius, shadow, border, style, children, ...props }, ref) => {
  const styles = resolveNbStyles('icon-button', DEFAULTS, { tone, radius, shadow, border });
  return (
    <button ref={ref} data-shape={shape} data-nb-icon-button=""
      className={cn(styles.className, 'inline-flex items-center justify-center font-bold transition-all duration-150',
        'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed', shape === 'circle' && 'rounded-full', sizeMap[size], className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props}>
      {icon ? <Icon src={icon} size="md" decorative /> : children}
    </button>
  );
});
IconButton.displayName = 'IconButton';
