import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';
import './sticker.css';
import { STICKER_PATHS, type StickerShape } from './sticker.paths';

export type StickerTone = NbToneToken;

const DEFAULT_TONE: StickerTone = 'mint';

export interface StickerProps extends ComponentPropsWithoutRef<'span'> {
  shape?: StickerShape;
  decorative?: boolean;
  rotate?: number;
  size?: number;
  tone?: StickerTone;
}

export const Sticker = forwardRef<HTMLSpanElement, StickerProps>(
  (
    {
      className,
      shape = 'burst',
      decorative = false,
      rotate = 0,
      size = 1,
      tone,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedTone = tone ?? DEFAULT_TONE;
    const fillVars = nbToneVars(resolvedTone);
    const config = STICKER_PATHS[shape];

    return (
      <span
        ref={ref}
        className={cn('nb-sticker', className)}
        data-shape={shape}
        data-nb-sticker=""
        data-tone={resolvedTone}
        aria-hidden={decorative ? true : undefined}
        role={decorative ? undefined : 'img'}
        style={{
          ['--nb-sticker-fill' as string]: fillVars.bg,
          ['--nb-sticker-ink' as string]: fillVars.fg,
          ['--nb-sticker-shadow' as string]: 'var(--nb-shadow, #050505)',
          ['--nb-sticker-rotate' as string]: `${rotate}deg`,
          ['--nb-sticker-scale' as string]: String(size),
          ...style,
          backgroundColor: 'transparent',
        }}
        {...props}
      >
        <span className="nb-sticker__root">
          <svg
            className="nb-sticker__svg"
            viewBox={config.viewBox}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="nb-sticker__shadow"
              d={config.path}
              transform={config.shadowTransform}
            />
            <path className="nb-sticker__shape" d={config.path} />
          </svg>
          <span className="nb-sticker__content">{children}</span>
        </span>
      </span>
    );
  },
);
Sticker.displayName = 'Sticker';

export const StickerFace = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('nb-sticker-face', className)}
    data-nb-sticker-face=""
    aria-hidden="true"
    {...props}
  >
    <svg
      className="nb-sticker-face__svg"
      viewBox="13 5 320 220"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className="nb-sticker-face__eye" cx="126" cy="64" rx="20" ry="35" />
      <ellipse className="nb-sticker-face__eye" cx="214" cy="64" rx="20" ry="35" />
      <path className="nb-sticker-face__smile" d="M78 132 C116 202 226 206 268 150" />
    </svg>
  </span>
));
StickerFace.displayName = 'StickerFace';
