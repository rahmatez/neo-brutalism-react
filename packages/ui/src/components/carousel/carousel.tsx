'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
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
import {
  CarouselContext,
  type CarouselApi,
  type CarouselOptions,
  type CarouselOrientation,
  useCarousel,
} from './carousel-context';

const DEFAULTS: NbStyleDefaults = {
  tone: 'cream',
  radius: 'md',
  shadow: 'hard',
  border: 'strong',
};

function ChevronIcon({ direction }: { direction: 'left' | 'right' | 'up' | 'down' }) {
  const paths = {
    left: 'M15 6 9 12l6 6',
    right: 'm9 6 6 6-6 6',
    up: 'M6 15 12 9l6 6',
    down: 'M6 9l6 6 6-6',
  } as const;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 stroke-[3px]"
      fill="none"
      stroke="currentColor"
    >
      <path d={paths[direction]} strokeLinecap="square" />
    </svg>
  );
}

function getItems(viewport: HTMLDivElement): HTMLElement[] {
  return Array.from(viewport.querySelectorAll<HTMLElement>('[data-nb-carousel-item]'));
}

function scrollViewportToItem(
  viewport: HTMLDivElement,
  item: HTMLElement,
  orientation: CarouselOrientation,
  align: 'start' | 'center' = 'start',
  behavior: ScrollBehavior = 'smooth',
) {
  const isHorizontal = orientation === 'horizontal';
  const itemStart = isHorizontal ? item.offsetLeft : item.offsetTop;
  const itemSize = isHorizontal ? item.offsetWidth : item.offsetHeight;
  const viewportSize = isHorizontal ? viewport.clientWidth : viewport.clientHeight;

  let position = itemStart;
  if (align === 'center') {
    position = Math.max(0, itemStart - (viewportSize - itemSize) / 2);
  }

  viewport.scrollTo({
    left: isHorizontal ? position : viewport.scrollLeft,
    top: isHorizontal ? viewport.scrollTop : position,
    behavior,
  });
}

export interface CarouselProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: CarouselOrientation;
  opts?: CarouselOptions;
  autoplay?: number | false;
  pauseOnHover?: boolean;
  setApi?: (api: CarouselApi) => void;
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
}

export interface CarouselHandle {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  (
    {
      className,
      orientation = 'horizontal',
      opts = {},
      autoplay = false,
      pauseOnHover = true,
      setApi: setApiProp,
      tone,
      radius,
      shadow,
      border,
      style,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const styles = resolveNbStyles('carousel', DEFAULTS, { tone, radius, shadow, border });
    const viewportRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slideCount, setSlideCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const scrollTo = useCallback(
      (index: number) => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const items = getItems(viewport);
        if (items.length === 0) return;

        const loop = opts.loop ?? false;
        let targetIndex = index;
        if (loop) {
          targetIndex = ((index % items.length) + items.length) % items.length;
        } else {
          targetIndex = Math.max(0, Math.min(index, items.length - 1));
        }

        const target = items[targetIndex];
        if (!target) return;

        scrollViewportToItem(viewport, target, orientation, opts.align ?? 'start');
        setSelectedIndex(targetIndex);
      },
      [opts.align, opts.loop, orientation],
    );

    const scrollPrev = useCallback(() => {
      const loop = opts.loop ?? false;
      if (loop || selectedIndex > 0) scrollTo(selectedIndex - 1);
    }, [opts.loop, scrollTo, selectedIndex]);

    const scrollNext = useCallback(() => {
      const loop = opts.loop ?? false;
      if (loop || selectedIndex < slideCount - 1) scrollTo(selectedIndex + 1);
    }, [opts.loop, scrollTo, selectedIndex, slideCount]);

    const api = useMemo<CarouselApi>(
      () => ({
        scrollPrev,
        scrollNext,
        scrollTo,
        selectedIndex,
        slideCount,
        canScrollPrev: (opts.loop ?? false) || selectedIndex > 0,
        canScrollNext: (opts.loop ?? false) || selectedIndex < slideCount - 1,
      }),
      [opts.loop, scrollNext, scrollPrev, scrollTo, selectedIndex, slideCount],
    );

    useImperativeHandle(ref, () => api, [api]);

    useEffect(() => {
      setApiProp?.(api);
    }, [api, setApiProp]);

    const syncFromScroll = useCallback(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const items = getItems(viewport);
      setSlideCount(items.length);
      if (items.length === 0) return;

      const isHorizontal = orientation === 'horizontal';
      const viewportStart = isHorizontal ? viewport.scrollLeft : viewport.scrollTop;
      const viewportSize = isHorizontal ? viewport.clientWidth : viewport.clientHeight;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemStart = isHorizontal ? item.offsetLeft : item.offsetTop;
        const distance = Math.abs(itemStart - viewportStart);
        const centerDistance = Math.abs(itemStart - viewportStart - viewportSize / 2 + (isHorizontal ? item.offsetWidth : item.offsetHeight) / 2);
        const metric = opts.align === 'center' ? centerDistance : distance;
        if (metric < closestDistance) {
          closestDistance = metric;
          closestIndex = index;
        }
      });

      setSelectedIndex(closestIndex);
    }, [opts.align, orientation]);

    useEffect(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      syncFromScroll();
      viewport.addEventListener('scroll', syncFromScroll, { passive: true });

      const resizeObserver = new ResizeObserver(syncFromScroll);
      resizeObserver.observe(viewport);

      return () => {
        viewport.removeEventListener('scroll', syncFromScroll);
        resizeObserver.disconnect();
      };
    }, [syncFromScroll]);

    useEffect(() => {
      if (!autoplay || (pauseOnHover && isHovered)) return;
      const id = window.setInterval(() => scrollNext(), autoplay);
      return () => window.clearInterval(id);
    }, [autoplay, isHovered, pauseOnHover, scrollNext]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      } else {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          scrollPrev();
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          scrollNext();
        }
      }
      onKeyDown?.(event);
    };

    return (
      <CarouselContext.Provider
        value={{ viewportRef, orientation, options: opts, api, setApi: setApiProp }}
      >
        <div
          data-nb-carousel=""
          data-orientation={orientation}
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel"
          className={cn(styles.className, 'relative w-full', className)}
          style={{ ...styles.style, ...style }}
          {...styles.dataAttributes}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

export const CarouselContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const { viewportRef, orientation } = useCarousel();
    const setViewportRef = useCallback(
      (node: HTMLDivElement | null) => {
        viewportRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, viewportRef],
    );

    return (
      <div
        ref={setViewportRef}
        data-nb-carousel-content=""
        className={cn(
          'flex scroll-smooth',
          orientation === 'horizontal'
            ? 'snap-x snap-mandatory overflow-x-auto overflow-y-hidden'
            : 'max-h-80 snap-y snap-mandatory flex-col overflow-y-auto overflow-x-hidden',
          'overflow-anchor-none',
          '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselContent.displayName = 'CarouselContent';

export interface CarouselItemProps extends ComponentPropsWithoutRef<'div'> {
  label?: string;
}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, label, children, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        aria-label={label}
        data-nb-carousel-item=""
        className={cn(
          'min-w-0 shrink-0 grow-0 snap-start',
          orientation === 'horizontal' ? 'basis-full' : 'basis-full',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselItem.displayName = 'CarouselItem';

const navButtonClass = cn(
  'inline-flex size-10 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper)',
  'font-black shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform',
  'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_var(--nb-shadow)]',
);

const navSlotClass = {
  horizontal: {
    previous: 'top-1/2 left-3 -translate-y-1/2',
    next: 'top-1/2 right-3 -translate-y-1/2',
  },
  vertical: {
    previous: 'top-3 left-1/2 -translate-x-1/2',
    next: 'bottom-3 left-1/2 -translate-x-1/2',
  },
} as const;

export const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, onClick, ...props }, ref) => {
    const { orientation, api } = useCarousel();
    const direction = orientation === 'horizontal' ? 'left' : 'up';
    const slotClass =
      orientation === 'horizontal' ? navSlotClass.horizontal.previous : navSlotClass.vertical.previous;

    return (
      <div className={cn('pointer-events-none absolute z-10', slotClass)}>
        <button
          ref={ref}
          type="button"
          data-nb-carousel-previous=""
          aria-label="Previous slide"
          disabled={!api.canScrollPrev}
          className={cn(navButtonClass, 'pointer-events-auto', className)}
          onClick={(event) => {
            api.scrollPrev();
            onClick?.(event);
          }}
          {...props}
        >
          <ChevronIcon direction={direction} />
        </button>
      </div>
    );
  },
);
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, onClick, ...props }, ref) => {
    const { orientation, api } = useCarousel();
    const direction = orientation === 'horizontal' ? 'right' : 'down';
    const slotClass =
      orientation === 'horizontal' ? navSlotClass.horizontal.next : navSlotClass.vertical.next;

    return (
      <div className={cn('pointer-events-none absolute z-10', slotClass)}>
        <button
          ref={ref}
          type="button"
          data-nb-carousel-next=""
          aria-label="Next slide"
          disabled={!api.canScrollNext}
          className={cn(navButtonClass, 'pointer-events-auto', className)}
          onClick={(event) => {
            api.scrollNext();
            onClick?.(event);
          }}
          {...props}
        >
          <ChevronIcon direction={direction} />
        </button>
      </div>
    );
  },
);
CarouselNext.displayName = 'CarouselNext';

export interface CarouselIndicatorsProps extends ComponentPropsWithoutRef<'div'> {
  renderLabel?: (index: number, active: boolean) => ReactNode;
}

export const CarouselIndicators = forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ className, renderLabel, ...props }, ref) => {
    const { api } = useCarousel();

    if (api.slideCount <= 1) return null;

    return (
      <div
        ref={ref}
        data-nb-carousel-indicators=""
        className={cn('mt-4 flex items-center justify-center gap-2 px-4 pb-4', className)}
        {...props}
      >
        {Array.from({ length: api.slideCount }, (_, index) => {
          const active = index === api.selectedIndex;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={active ? 'true' : undefined}
              data-active={active ? 'true' : undefined}
              className={cn(
                'size-3 border-2 border-(--nb-border) bg-(--nb-paper) shadow-[2px_2px_0_0_var(--nb-shadow)] transition-colors',
                active && 'bg-(--nb-mint)',
              )}
              onClick={() => api.scrollTo(index)}
            >
              {renderLabel?.(index, active)}
            </button>
          );
        })}
      </div>
    );
  },
);
CarouselIndicators.displayName = 'CarouselIndicators';
