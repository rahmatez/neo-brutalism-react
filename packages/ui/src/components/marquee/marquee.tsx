'use client';

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { cn } from '../../core/cn';

const marqueeStyles = `
@keyframes nb-marquee-1 { from { transform: translateX(0%); } to { transform: translateX(-100%); } }
@keyframes nb-marquee-2 { from { transform: translateX(100%); } to { transform: translateX(0%); } }
@keyframes nb-marquee-reverse-1 { from { transform: translateX(0%); } to { transform: translateX(100%); } }
@keyframes nb-marquee-reverse-2 { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
.nb-marquee-strip-1 { animation-name: nb-marquee-1; animation-duration: var(--nb-marquee-duration, 5s); animation-timing-function: linear; animation-iteration-count: infinite; }
.nb-marquee-strip-1.nb-marquee-reverse { animation-name: nb-marquee-reverse-1; }
.nb-marquee-strip-2 { animation-name: nb-marquee-2; animation-duration: var(--nb-marquee-duration, 5s); animation-timing-function: linear; animation-iteration-count: infinite; }
.nb-marquee-strip-2.nb-marquee-reverse { animation-name: nb-marquee-reverse-2; }
.nb-marquee-strip-1, .nb-marquee-strip-2 { display: flex; width: max-content; min-width: 100%; align-items: center; flex-shrink: 0; }
.nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-1,
.nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-2 { animation-play-state: paused; }
`;

function durationToMs(duration: string): number | null {
  const match = duration.trim().match(/^(\d*\.?\d+)(ms|s)$/);
  if (!match) return null;
  const value = Number(match[1]);
  return match[2] === 's' ? value * 1000 : value;
}

export interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  duration?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      duration = '5s',
      reverse = false,
      pauseOnHover = true,
      children,
      ...props
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const strip1Ref = useRef<HTMLDivElement>(null);
    const strip2Ref = useRef<HTMLDivElement>(null);
    const [widthScale, setWidthScale] = useState(1);

    const scaledDuration = useMemo(() => {
      const ms = durationToMs(duration);
      return ms === null ? duration : `${ms * widthScale}ms`;
    }, [duration, widthScale]);

    const wrapperStyle = {
      ['--nb-marquee-duration' as string]: scaledDuration,
    } as CSSProperties;

    useEffect(() => {
      const strip1 = strip1Ref.current;
      const strip2 = strip2Ref.current;
      const wrapper = wrapperRef.current;
      if (!strip1 || !strip2 || !wrapper) return;

      const syncSecondStrip = () => {
        const clones = Array.from(strip1.childNodes, (node) =>
          node.cloneNode(true),
        );
        strip2.replaceChildren(...clones);
      };

      const updateAnimationScale = () => {
        const wrapperWidth = wrapper.clientWidth;
        const contentWidth = strip1.scrollWidth;
        if (wrapperWidth <= 0 || contentWidth <= 0) {
          setWidthScale(1);
          return;
        }
        setWidthScale(Math.max(1, contentWidth / wrapperWidth));
      };

      syncSecondStrip();
      updateAnimationScale();

      const mutationObserver = new MutationObserver(() => {
        syncSecondStrip();
        updateAnimationScale();
      });
      mutationObserver.observe(strip1, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });

      const resizeObserver = new ResizeObserver(updateAnimationScale);
      resizeObserver.observe(wrapper);
      resizeObserver.observe(strip1);

      return () => {
        mutationObserver.disconnect();
        resizeObserver.disconnect();
      };
    }, [children]);

    return (
      <div ref={ref} className={cn('block', className)} {...props}>
        <style>{marqueeStyles}</style>
        <div
          ref={wrapperRef}
          className={cn(
            'nb-marquee-wrapper relative flex w-full overflow-hidden',
            'border-t-2 border-b-2 border-(--nb-border)',
            'bg-white text-black font-base',
            pauseOnHover && 'nb-pause-on-hover',
          )}
          style={wrapperStyle}
        >
          <div
            ref={strip1Ref}
            className={cn(
              'nb-marquee-strip-1 whitespace-nowrap py-4',
              reverse && 'nb-marquee-reverse',
            )}
          >
            {children}
          </div>
          <div
            ref={strip2Ref}
            className={cn(
              'nb-marquee-strip-2 absolute top-0 left-0 whitespace-nowrap py-4',
              reverse && 'nb-marquee-reverse',
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  },
);
Marquee.displayName = 'Marquee';
