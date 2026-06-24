import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = { tone: 'default', radius: 'lg', shadow: 'none', border: 'default' };
export type MediaFrameRatio = 'auto' | '1/1' | '3/4' | '4/3' | '3/2' | '16/9' | '21/9';
export type MediaFrameFit = 'cover' | 'contain' | 'fill';

const ratioMap: Record<MediaFrameRatio, string> = {
  auto: '', '1/1': 'aspect-square', '3/4': 'aspect-[3/4]', '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]', '16/9': 'aspect-video', '21/9': 'aspect-[21/9]',
};
const fitMap: Record<MediaFrameFit, string> = {
  cover: '[&_img]:object-cover [&_video]:object-cover',
  contain: '[&_img]:object-contain [&_video]:object-contain',
  fill: '[&_img]:object-fill [&_video]:object-fill',
};

export interface MediaFrameProps extends ComponentPropsWithoutRef<'div'> {
  ratio?: MediaFrameRatio; fit?: MediaFrameFit;
  tone?: NbToneToken; radius?: NbRadius; shadow?: NbShadow; border?: NbBorderStrength;
}

export const MediaFrame = forwardRef<HTMLDivElement, MediaFrameProps>(({
  className, ratio = 'auto', fit = 'cover', tone, radius, shadow, border, style, ...props
}, ref) => {
  const styles = resolveNbStyles('media-frame', DEFAULTS, { tone, radius, shadow, border });
  return (
    <div ref={ref} data-nb-media-frame="" data-ratio={ratio} data-fit={fit}
      className={cn(styles.className, 'relative block overflow-hidden',
        '[&_img]:h-full [&_img]:w-full [&_video]:h-full [&_video]:w-full', ratioMap[ratio], fitMap[fit], className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props} />
  );
});
MediaFrame.displayName = 'MediaFrame';
