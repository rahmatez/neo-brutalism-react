import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles } from '../../core/resolve-nb-styles';
import type { NbToneToken } from '../../tokens/tone';

export type MediaItemVariant = 'plain' | 'boxed' | 'chip';
export type MediaItemOrientation = 'horizontal' | 'vertical';
export type MediaItemAlign = 'start' | 'center' | 'between';
export type MediaItemSize = 'xs' | 'sm' | 'md' | 'lg';
export type MediaItemTone = NbToneToken;

const iconSurfaceClasses = cn(
  'relative inline-flex size-[var(--nb-media-item-surface-size)] items-center justify-center',
  'rounded-lg border-[var(--nb-border-width)] border-[var(--nb-border)]',
  'bg-(--nb-media-item-icon-bg) text-black',
);

const baseClasses = cn(
  'relative min-w-0',
  'inline-flex font-bold leading-tight',
  '[--nb-media-item-description-opacity:0.7]',
  '[&_svg]:shrink-0 [&_img]:shrink-0 [&_[data-nb-media-item-icon]]:shrink-0 [&_[data-nb-surface]]:shrink-0',
  '[&_svg]:rounded-[calc(var(--nb-media-item-radius)-0.25rem)]',
  '[&_img]:rounded-[calc(var(--nb-media-item-radius)-0.25rem)]',
  '[&_svg]:h-[var(--nb-media-item-icon-size)] [&_svg]:max-w-[var(--nb-media-item-icon-size)] [&_svg]:w-auto',
  '[&_img]:h-[var(--nb-media-item-icon-size)] [&_img]:max-w-[var(--nb-media-item-icon-size)] [&_img]:w-auto [&_img]:object-contain',
  '[&_[data-nb-media-item-title]]:block',
  '[&_[data-nb-media-item-title]]:[font-family:var(--nb-media-item-title-font-family,inherit)]',
  '[&_[data-nb-media-item-title]]:font-black',
  '[&_[data-nb-media-item-title]]:leading-none',
  '[&_[data-nb-media-item-title]]:text-[length:var(--nb-media-item-title-size,var(--nb-media-item-title-default-size))]',
  '[&_[data-nb-media-item-description]]:mt-1',
  '[&_[data-nb-media-item-description]]:block',
  '[&_[data-nb-media-item-description]]:text-[length:var(--nb-media-item-description-size,var(--nb-media-item-description-default-size))]',
  '[&_[data-nb-media-item-description]]:font-bold',
  '[&_[data-nb-media-item-description]]:leading-none',
  '[&_[data-nb-media-item-description]]:opacity-[var(--nb-media-item-description-opacity)]',
);

function variantClass(variant: MediaItemVariant): string {
  const map: Record<MediaItemVariant, string> = {
    plain: '[--nb-media-item-radius:var(--nb-radius)] bg-transparent',
    boxed:
      'border-[var(--nb-border-width)] border-[var(--nb-media-item-border-color)] bg-[var(--nb-media-item-bg)] shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)] [--nb-media-item-radius:var(--nb-radius)] rounded-[var(--nb-media-item-radius)]',
    chip: 'border-[var(--nb-border-width)] border-[var(--nb-media-item-border-color)] bg-[var(--nb-media-item-bg)] [--nb-media-item-radius:9999px] rounded-[var(--nb-media-item-radius)]',
  };
  return map[variant];
}

function orientationClass(orientation: MediaItemOrientation): string {
  return orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col';
}

function alignClass(align: MediaItemAlign): string {
  const map: Record<MediaItemAlign, string> = {
    start: 'justify-start text-left',
    center: 'justify-center text-center',
    between: 'w-full justify-between',
  };
  return map[align];
}

function sizeClass(size: MediaItemSize, variant: MediaItemVariant): string {
  const withPad = (base: string, pad: string) =>
    variant === 'plain' ? base : cn(base, pad);
  const sizes: Record<MediaItemSize, string> = {
    xs: withPad(
      cn(
        'gap-[var(--nb-media-item-gap)] text-[0.6875rem]',
        '[--nb-media-item-gap:0.375rem]',
        '[--nb-media-item-icon-size:1rem]',
        '[--nb-media-item-surface-size:2rem]',
        '[--nb-media-item-title-default-size:0.75rem]',
        '[--nb-media-item-description-default-size:0.5625rem]',
      ),
      'px-2 py-1',
    ),
    sm: withPad(
      cn(
        'gap-[var(--nb-media-item-gap)] text-xs',
        '[--nb-media-item-gap:0.5rem]',
        '[--nb-media-item-icon-size:1rem]',
        '[--nb-media-item-surface-size:2.25rem]',
        '[--nb-media-item-title-default-size:0.75rem]',
        '[--nb-media-item-description-default-size:0.625rem]',
      ),
      'px-2.5 py-1.5',
    ),
    md: withPad(
      cn(
        'gap-[var(--nb-media-item-gap)] text-sm',
        '[--nb-media-item-gap:0.75rem]',
        '[--nb-media-item-icon-size:1.25rem]',
        '[--nb-media-item-surface-size:2.75rem]',
        '[--nb-media-item-title-default-size:0.875rem]',
        '[--nb-media-item-description-default-size:0.65625rem]',
      ),
      'px-3 py-2',
    ),
    lg: withPad(
      cn(
        'gap-[var(--nb-media-item-gap)] text-base',
        '[--nb-media-item-gap:1rem]',
        '[--nb-media-item-icon-size:1.5rem]',
        '[--nb-media-item-surface-size:3.25rem]',
        '[--nb-media-item-title-default-size:1rem]',
        '[--nb-media-item-description-default-size:0.75rem]',
      ),
      'px-4 py-3',
    ),
  };
  return sizes[size];
}

export interface MediaItemProps extends HTMLAttributes<HTMLDivElement> {
  variant?: MediaItemVariant;
  orientation?: MediaItemOrientation;
  align?: MediaItemAlign;
  size?: MediaItemSize;
  tone?: MediaItemTone;
  icon?: string;
  iconAlt?: string;
  iconBackground?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
}

export const MediaItem = forwardRef<HTMLDivElement, MediaItemProps>(
  function MediaItem(
    {
      variant = 'plain',
      orientation = 'horizontal',
      align = 'start',
      size = 'md',
      tone,
      icon,
      iconAlt = '',
      iconBackground,
      title,
      description,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) {
    const nb = resolveNbStyles('media-item', { tone: 'default' }, { tone }, {
      tone: true,
      radius: false,
      shadow: false,
      border: false,
      padding: false,
      gap: false,
    });

    return (
      <div
        ref={ref}
        data-nb-media-item=""
        data-variant={variant}
        data-orientation={orientation}
        data-align={align}
        data-size={size}
        className={cn(
          baseClasses,
          variantClass(variant),
          orientationClass(orientation),
          alignClass(align),
          sizeClass(size, variant),
          nb.className,
          className,
        )}
        style={{ ...nb.style, ...style }}
        {...nb.dataAttributes}
        {...props}
      >
        {icon ? (
          iconBackground ? (
            <span
              data-nb-media-item-icon=""
              data-surface="true"
              data-background={iconBackground}
              className={iconSurfaceClasses}
              style={{ ['--nb-media-item-icon-bg' as string]: iconBackground }}
            >
              <img src={icon} alt={iconAlt} />
            </span>
          ) : (
            <img src={icon} alt={iconAlt} />
          )
        ) : null}
        <div data-nb-media-item-content="" className="min-w-0">
          {title ? <MediaItemTitle>{title}</MediaItemTitle> : null}
          {description ? (
            <MediaItemDescription>{description}</MediaItemDescription>
          ) : null}
          {!title && !description ? children : null}
        </div>
      </div>
    );
  },
);

export interface MediaItemIconProps extends HTMLAttributes<HTMLSpanElement> {
  surface?: boolean;
  background?: string;
}

export function MediaItemIcon({
  surface = false,
  background = 'var(--nb-surface)',
  className,
  style,
  ...props
}: MediaItemIconProps) {
  return (
    <span
      data-nb-media-item-icon=""
      data-surface={surface ? 'true' : undefined}
      data-background={surface ? background : undefined}
      className={cn('shrink-0', surface && iconSurfaceClasses, className)}
      style={{
        ...(surface ? { ['--nb-media-item-icon-bg' as string]: background } : {}),
        ...style,
      }}
      {...props}
    />
  );
}

export function MediaItemTitle({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span data-nb-media-item-title="" className={className} {...props} />;
}

export function MediaItemDescription({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span data-nb-media-item-description="" className={className} {...props} />
  );
}
