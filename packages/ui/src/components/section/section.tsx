import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbDivider } from '../../tokens/divider';
import type { NbPadding } from '../../tokens/padding';

const DEFAULTS: NbStyleDefaults = { padding: 'md' };
export type SectionPadding = NbPadding;
export type SectionDivider = NbDivider;
export type SectionDividerStyle = 'solid' | 'dashed' | 'dotted';
export type SectionLayout = 'default' | 'center' | 'between';
export type SectionAlign = 'stretch' | 'start' | 'center' | 'end';

function layoutClass(layout: SectionLayout): string {
  const map: Record<SectionLayout, string> = {
    default: 'block',
    center: 'flex justify-center gap-[var(--nb-spacing-md,1rem)]',
    between: 'flex justify-between gap-[var(--nb-spacing-md,1rem)]',
  };

  return map[layout];
}

function alignClass(layout: SectionLayout, align: SectionAlign): string {
  if (layout === 'default') {
    return '';
  }

  const map: Record<SectionAlign, string> = {
    stretch: 'items-stretch',
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return map[align];
}

function dividerStyleClass(dividerStyle: SectionDividerStyle): string {
  const map: Record<SectionDividerStyle, string> = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return map[dividerStyle];
}

function dividerClass(divider: SectionDivider, dividerStyle: SectionDividerStyle): string {
  if (divider === 'none') {
    return '';
  }

  const widthMap: Record<Exclude<SectionDivider, 'none'>, string> = {
    top: 'border-t-(length:--nb-border-width)',
    right: 'border-r-(length:--nb-border-width)',
    bottom: 'border-b-(length:--nb-border-width)',
    left: 'border-l-(length:--nb-border-width)',
    block: 'border-y-(length:--nb-border-width)',
    inline: 'border-x-(length:--nb-border-width)',
    all: 'border-(length:--nb-border-width)',
  };

  return cn(widthMap[divider], 'border-(--nb-border)', dividerStyleClass(dividerStyle));
}

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  divider?: SectionDivider;
  dividerStyle?: SectionDividerStyle;
  layout?: SectionLayout;
  align?: SectionAlign;
  flush?: boolean;
  padding?: SectionPadding;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      divider = 'none',
      dividerStyle = 'solid',
      layout = 'default',
      align = 'stretch',
      flush,
      padding,
      style,
      ...props
    },
    ref,
  ) => {
    const styles = resolveNbStyles(
      'section',
      DEFAULTS,
      { padding },
      { tone: false, radius: false, shadow: false, border: false, gap: false },
    );

    return (
      <section
        ref={ref}
        data-nb-section=""
        data-divider={divider}
        data-divider-style={dividerStyle}
        data-layout={layout}
        data-align={align}
        data-flush={flush ? '' : undefined}
        className={cn(
          'box-border min-w-0',
          layoutClass(layout),
          alignClass(layout, align),
          dividerClass(divider, dividerStyle),
          styles.className,
          flush && 'mx-[calc(var(--nb-padding-token,var(--_nb-padding-default))*-1)]',
          className,
        )}
        style={{ ...styles.style, ...style }}
        {...styles.dataAttributes}
        {...props}
      />
    );
  },
);
Section.displayName = 'Section';
