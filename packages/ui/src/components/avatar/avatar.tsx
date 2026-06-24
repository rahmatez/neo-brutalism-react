import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', radius: 'full', shadow: 'sm', border: 'default' };
export type AvatarTone = NbToneToken; export type AvatarRadius = NbRadius; export type AvatarShadow = NbShadow; export type AvatarBorder = NbBorderStrength;

export interface AvatarProps extends ComponentPropsWithoutRef<'span'> {
  src?: string; alt?: string; tone?: AvatarTone; radius?: AvatarRadius; shadow?: AvatarShadow; border?: AvatarBorder;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(({ className, src, alt = '', tone, radius, shadow, border, style, children, ...props }, ref) => {
  const styles = resolveNbStyles('avatar', DEFAULTS, { tone, radius, shadow, border });
  return (
    <span ref={ref} role="img" aria-label={alt || undefined} data-slot="avatar"
      className={cn(styles.className, 'relative inline-flex h-10 w-10 shrink-0 overflow-hidden font-bold text-sm items-center justify-center', className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props}>
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : children}
    </span>
  );
});
Avatar.displayName = 'Avatar';
