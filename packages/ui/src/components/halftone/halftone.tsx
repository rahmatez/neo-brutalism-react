'use client';

import {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { cn } from '../../core/cn';

export type HalftoneShape = 'square' | 'circle' | 'rectangle';

const DEFAULT_ROWS = 7;
const DEFAULT_COLUMNS = 7;
const DEFAULT_DOT_SIZE = 6;
const DEFAULT_DOT_GAP = 5;
const RECTANGLE_DEFAULT_ROWS = 3;
const RECTANGLE_DEFAULT_COLUMNS = 13;

export interface HalftoneProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'color'> {
  shape?: HalftoneShape;
  color?: string | null;
  size?: number | null;
  gap?: number | null;
  gapX?: number | null;
  gapY?: number | null;
  rows?: number | null;
  columns?: number | null;
}

export const Halftone = forwardRef<HTMLSpanElement, HalftoneProps>(
  (
    {
      className,
      shape = 'square',
      color = null,
      size = null,
      gap = null,
      gapX = null,
      gapY = null,
      rows = null,
      columns = null,
      style,
      ...props
    },
    ref,
  ) => {
    const resolvedColor = color ?? 'var(--nb-border)';
    const resolvedSize = size ?? DEFAULT_DOT_SIZE;
    const resolvedGap = gap ?? DEFAULT_DOT_GAP;
    const resolvedGapX = gapX ?? gap;
    const resolvedGapY = gapY ?? gap;
    const resolvedRows =
      rows ?? (shape === 'rectangle' ? RECTANGLE_DEFAULT_ROWS : DEFAULT_ROWS);
    const resolvedColumns =
      columns ??
      (shape === 'rectangle' ? RECTANGLE_DEFAULT_COLUMNS : DEFAULT_COLUMNS);

    const total = resolvedSize + resolvedGap;
    const dotR = resolvedSize / 2;
    const svgW = resolvedColumns * total - resolvedGap;
    const svgH = resolvedRows * total - resolvedGap;

    const dots = useMemo(() => {
      const result: { cx: number; cy: number }[] = [];
      for (let row = 0; row < resolvedRows; row++) {
        for (let col = 0; col < resolvedColumns; col++) {
          result.push({ cx: col * total + dotR, cy: row * total + dotR });
        }
      }
      return result;
    }, [resolvedRows, resolvedColumns, total, dotR]);

    const hostStyle: CSSProperties = {
      ['--nb-halftone-color' as string]: resolvedColor,
      ...(resolvedSize != null
        ? { ['--nb-halftone-dot-size' as string]: `${resolvedSize}px` }
        : {}),
      ...(resolvedGapX != null
        ? { ['--nb-halftone-gap-x' as string]: `${resolvedGapX}px` }
        : {}),
      ...(resolvedGapY != null
        ? { ['--nb-halftone-gap-y' as string]: `${resolvedGapY}px` }
        : {}),
      ['--nb-halftone-rows' as string]: String(resolvedRows),
      ['--nb-halftone-columns' as string]: String(resolvedColumns),
      ...style,
    };

    return (
      <span
        ref={ref}
        className={cn(
          'nb-halftone pointer-events-none',
          shape === 'square' && 'nb-halftone--square',
          shape === 'circle' && 'nb-halftone--circle rounded-full overflow-hidden',
          shape === 'rectangle' && 'nb-halftone--rectangle',
          className,
        )}
        aria-hidden="true"
        data-shape={shape}
        data-nb-halftone=""
        style={hostStyle}
        {...props}
      >
        {shape !== 'rectangle' && (
          <svg width={svgW} height={svgH} aria-hidden="true">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={dotR}
                fill={resolvedColor}
              />
            ))}
          </svg>
        )}
        {shape === 'rectangle' && (
          <style>{`
            .nb-halftone--rectangle {
              --nb-halftone-color: var(--nb-border);
              --nb-halftone-dot-size: 8px;
              --nb-halftone-gap-x: 28px;
              --nb-halftone-gap-y: 27px;
              display: block;
              overflow: hidden;
              width: calc(var(--nb-halftone-columns) * var(--nb-halftone-gap-x));
              height: calc(var(--nb-halftone-rows) * var(--nb-halftone-gap-y));
              background-image: radial-gradient(
                circle at center,
                var(--nb-halftone-color) 0 calc(var(--nb-halftone-dot-size) / 2),
                transparent calc((var(--nb-halftone-dot-size) / 2) + 1px)
              );
              background-size: var(--nb-halftone-gap-x) var(--nb-halftone-gap-y);
              background-repeat: repeat;
              background-position: 0 0;
            }
          `}</style>
        )}
      </span>
    );
  },
);
Halftone.displayName = 'Halftone';
