import { forwardRef, useEffect, useRef, type CSSProperties, type ComponentPropsWithoutRef } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconTone = 'current' | 'default' | 'muted' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning';
export type IconMode = 'mask' | 'image';
const sizeMap: Record<IconSize, string> = { xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem', xl: '2rem' };
const toneMap: Record<IconTone, string> = {
  current: 'currentColor', default: 'var(--nb-foreground)',
  muted: 'color-mix(in srgb, var(--nb-foreground) 75%, transparent)', inverse: 'var(--nb-background)',
  primary: 'var(--nb-primary)', secondary: 'var(--nb-secondary)', accent: 'var(--nb-accent)',
  danger: 'var(--nb-danger)', success: 'var(--nb-success)', warning: 'var(--nb-warning)',
};

export interface IconProps extends ComponentPropsWithoutRef<'span'> {
  src: string; mode?: IconMode; size?: IconSize; tone?: IconTone; decorative?: boolean; label?: string | null;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(({ src, mode = 'mask', size = 'md', tone = 'current', decorative = false, label = null, style, ...props }, ref) => {
  const warned = useRef(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !warned.current && !decorative && !label) {
      console.warn('[neobrutalism-ui] Icon should be marked decorative or given a label.');
      warned.current = true;
    }
  }, [decorative, label]);
  const sizeVal = sizeMap[size];
  const toneVal = toneMap[tone];
  const srcUrl = `url("${src}")`;
  const isMask = mode === 'mask';
  const iconStyle: CSSProperties = {
    display: 'inline-block', width: sizeVal, height: sizeVal, flexShrink: 0, verticalAlign: 'middle',
    color: toneVal, ['--nb-icon-color' as string]: toneVal,
    ...(isMask ? {
      backgroundColor: 'var(--nb-icon-color, currentColor)',
      maskImage: srcUrl, WebkitMaskImage: srcUrl,
      maskSize: 'contain', WebkitMaskSize: 'contain',
      maskPosition: 'center', WebkitMaskPosition: 'center',
      maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
    } : {
      backgroundImage: srcUrl, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    }),
    ...style,
  };
  return (
    <span ref={ref} data-nb-icon="" data-size={size} data-tone={tone} data-mode={mode}
      role={!decorative && label ? 'img' : undefined} aria-hidden={decorative ? true : undefined} aria-label={decorative ? undefined : label ?? undefined}
      style={iconStyle} {...props} />
  );
});
Icon.displayName = 'Icon';
