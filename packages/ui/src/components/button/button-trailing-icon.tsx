import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { Icon } from '../icon/icon';

export type ButtonTrailingIconPush = 'none' | 'end';
export type ButtonTrailingIconShape = 'none' | 'square' | 'circle';
export type ButtonTrailingIconSize = 'sm' | 'md' | 'lg';
export type ButtonTrailingIconTone = 'default' | 'inverse' | 'current';

const sizeMap: Record<ButtonTrailingIconSize, string> = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
};

const shapeRadiusMap: Record<ButtonTrailingIconShape, string | undefined> = {
  none: undefined,
  square: '0.25rem',
  circle: '9999px',
};

const toneBgMap: Record<ButtonTrailingIconTone, string | undefined> = {
  default: 'var(--nb-surface)',
  inverse: 'var(--nb-foreground)',
  current: undefined,
};

const toneColorMap: Record<ButtonTrailingIconTone, string | undefined> = {
  default: 'var(--nb-foreground)',
  inverse: 'var(--nb-background)',
  current: undefined,
};

export interface ButtonTrailingIconProps
  extends ComponentPropsWithoutRef<'span'> {
  size?: ButtonTrailingIconSize;
  shape?: ButtonTrailingIconShape;
  tone?: ButtonTrailingIconTone;
  push?: ButtonTrailingIconPush;
  icon?: string;
}

export const ButtonTrailingIcon = forwardRef<
  HTMLSpanElement,
  ButtonTrailingIconProps
>(
  (
    {
      className,
      size,
      shape = 'none',
      tone = 'current',
      push = 'none',
      icon,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const iconSize = size ? sizeMap[size] : undefined;
    const borderRadius = shapeRadiusMap[shape];

    return (
      <span
        ref={ref}
        className={cn(
          '[&_svg]:pointer-events-none',
          push === 'end' && 'ml-auto',
          size && 'inline-flex items-center justify-center',
          className,
        )}
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius,
          background: toneBgMap[tone],
          color: toneColorMap[tone],
          ...style,
        }}
        data-nb-button-trailing-icon=""
        {...props}
      >
        {icon ? <Icon src={icon} size="sm" decorative /> : children}
      </span>
    );
  },
);
ButtonTrailingIcon.displayName = 'ButtonTrailingIcon';
