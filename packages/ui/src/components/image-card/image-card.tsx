import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'background', radius: 'md', shadow: 'default', border: 'default' };

export interface ImageCardProps extends ComponentPropsWithoutRef<'div'> {
  image: string; alt: string;
  tone?: NbToneToken; radius?: NbRadius; shadow?: NbShadow; border?: NbBorderStrength;
}

export const ImageCard = forwardRef<HTMLDivElement, ImageCardProps>(({
  className, image, alt, tone, radius, shadow, border, style, children, ...props
}, ref) => {
  const styles = resolveNbStyles('image-card', DEFAULTS, { tone, radius, shadow, border });
  return (
    <div ref={ref} data-slot="image-card"
      className={cn(styles.className, 'flex flex-col overflow-hidden font-medium', className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props}>
      <img src={image} alt={alt} loading="lazy" className="w-full object-cover" />
      {children}
    </div>
  );
});
ImageCard.displayName = 'ImageCard';

export const ImageCardCaption = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="image-card-caption"
    className={cn('border-t border-(--nb-border) px-6 py-4 text-center font-bold text-base', className)} {...props} />
));
ImageCardCaption.displayName = 'ImageCardCaption';
