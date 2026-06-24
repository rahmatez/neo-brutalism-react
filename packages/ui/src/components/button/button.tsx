import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';

const DEFAULTS: NbStyleDefaults = {
  tone: 'primary',
  radius: 'md',
  shadow: 'default',
  border: 'default',
};

export type ButtonPress = 'push' | 'reverse' | 'none';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonTone = NbToneToken;
export type ButtonRadius = NbRadius;
export type ButtonShadow = NbShadow;
export type ButtonBorder = NbBorderStrength;

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-base gap-2',
  lg: 'h-[3.25rem] px-5 text-lg gap-2.5',
  xl: 'h-14 px-4 text-xl gap-3',
};

const pressMap: Record<ButtonPress, string> = {
  push:
    'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
  reverse:
    'hover:-translate-x-(--nb-reverse-shadow-offset-x) hover:-translate-y-(--nb-reverse-shadow-offset-y)',
  none: '',
};

type ButtonBaseProps = {
  tone?: ButtonTone;
  radius?: ButtonRadius;
  shadow?: ButtonShadow;
  border?: ButtonBorder;
  press?: ButtonPress;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  (
    | (ComponentPropsWithoutRef<'button'> & { href?: undefined })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      tone,
      radius,
      shadow,
      border,
      press = 'push',
      size = 'md',
      fullWidth,
      style,
      href,
      ...props
    },
    ref,
  ) => {
    const styles = resolveNbStyles('button', DEFAULTS, {
      tone,
      radius,
      shadow,
      border,
    });

    const sharedClassName = cn(
      styles.className,
      'inline-flex items-center justify-center whitespace-nowrap select-none font-bold',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',
      pressMap[press],
      sizeMap[size],
      fullWidth && 'w-full',
      className,
    );

    const sharedProps = {
      className: sharedClassName,
      style: { ...styles.style, ...style },
      'data-press': press,
      'data-size': size,
      'data-full-width': fullWidth ? '' : undefined,
      ...styles.dataAttributes,
    };

    if (href) {
      return (
        <a
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          href={href}
          {...sharedProps}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...sharedProps}
        {...(props as ComponentPropsWithoutRef<'button'>)}
      />
    );
  },
);
Button.displayName = 'Button';
