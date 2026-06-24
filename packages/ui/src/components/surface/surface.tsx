import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbPadding } from '../../tokens/padding';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import type { NbTypographyFont } from '../../tokens/typography';
import { nbTypographyFontValue } from '../../tokens/typography';

const DEFAULTS: NbStyleDefaults = {
  tone: 'default',
  radius: 'md',
  shadow: 'default',
  border: 'default',
  padding: 'none',
};

export type SurfaceTone = NbToneToken;
export type SurfaceRadius = NbRadius;
export type SurfaceBorder = NbBorderStrength;
export type SurfaceShadow = NbShadow;
export type SurfacePadding = NbPadding;
export type SurfaceSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl';
export type SurfaceLayout = 'block' | 'center' | 'row' | 'stack';
export type SurfaceEdge = 'none' | 'top' | 'bottom';

const sizeMap: Record<SurfaceSize, string> = {
  auto: '',
  sm: 'size-8 shrink-0',
  md: 'size-10 shrink-0',
  lg: 'size-11 shrink-0',
  xl: 'size-12 shrink-0',
};

const layoutMap: Record<SurfaceLayout, string> = {
  block: '',
  center: 'inline-flex items-center justify-center',
  row: 'flex items-center',
  stack: 'flex flex-col',
};

const edgeMap: Record<SurfaceEdge, string> = {
  none: '',
  top: '[--nb-surface-edge-width:2px] [--nb-surface-edge-color:var(--nb-border)] border-t-(length:--nb-surface-edge-width) border-t-(--nb-surface-edge-color)',
  bottom:
    '[--nb-surface-edge-width:2px] [--nb-surface-edge-color:var(--nb-border)] border-b-(length:--nb-surface-edge-width) border-b-(--nb-surface-edge-color)',
};

export interface SurfaceProps extends ComponentPropsWithoutRef<'div'> {
  tone?: SurfaceTone;
  radius?: SurfaceRadius;
  shadow?: SurfaceShadow;
  border?: SurfaceBorder;
  padding?: SurfacePadding;
  size?: SurfaceSize;
  layout?: SurfaceLayout;
  edge?: SurfaceEdge;
  clip?: boolean;
  typography?: NbTypographyFont;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      className,
      tone,
      radius,
      shadow,
      border,
      padding,
      size = 'auto',
      layout = 'block',
      edge = 'none',
      clip,
      typography = 'inherit',
      style,
      ...props
    },
    ref,
  ) => {
    const styles = resolveNbStyles('surface', DEFAULTS, {
      tone,
      radius,
      shadow,
      border,
      padding,
    });
    const fontFamily = nbTypographyFontValue(typography);

    return (
      <div
        ref={ref}
        className={cn(
          styles.className,
          'relative box-border border-solid',
          clip && 'overflow-hidden',
          sizeMap[size],
          layoutMap[layout],
          edgeMap[edge],
          className,
        )}
        style={{
          ...styles.style,
          ...(fontFamily ? { fontFamily } : {}),
          ...(typography !== 'inherit'
            ? { ['--nb-typography-font' as string]: fontFamily }
            : {}),
          ...style,
        }}
        data-nb-surface=""
        data-size={size}
        data-layout={layout}
        data-padding={padding ?? DEFAULTS.padding}
        data-edge={edge}
        data-nb-typography={typography}
        {...styles.dataAttributes}
        {...props}
      />
    );
  },
);
Surface.displayName = 'Surface';
