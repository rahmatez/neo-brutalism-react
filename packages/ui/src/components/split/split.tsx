import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbPadding } from '../../tokens/padding';
import type { NbSpacing } from '../../tokens/spacing';

const DEFAULTS: NbStyleDefaults = { gap: 'lg', padding: 'none' };
export type SplitRatio = '1:1' | '2:1' | '3:1' | '1:2' | '1:3' | 'fill:auto' | 'auto:fill';
export type SplitGap = NbSpacing; export type SplitPadding = NbPadding;
export type SplitCollapse = 'none' | 'sm' | 'md' | 'lg';
export type SplitAlign = 'start' | 'center' | 'end' | 'stretch';
export type SplitSeparator = 'none' | 'solid' | 'dashed' | 'thick';

const ratioMap: Record<SplitRatio, string> = {
  '1:1': '[--nb-split-columns:minmax(0,1fr)_minmax(0,1fr)]', '2:1': '[--nb-split-columns:minmax(0,2fr)_minmax(0,1fr)]',
  '3:1': '[--nb-split-columns:minmax(0,3fr)_minmax(0,1fr)]', '1:2': '[--nb-split-columns:minmax(0,1fr)_minmax(0,2fr)]',
  '1:3': '[--nb-split-columns:minmax(0,1fr)_minmax(0,3fr)]', 'fill:auto': '[--nb-split-columns:minmax(0,1fr)_auto]',
  'auto:fill': '[--nb-split-columns:auto_minmax(0,1fr)]',
};
const collapseMap: Record<SplitCollapse, string> = {
  none: 'grid-cols-[var(--nb-split-columns)]', sm: 'grid-cols-1 sm:grid-cols-[var(--nb-split-columns)]',
  md: 'grid-cols-1 md:grid-cols-[var(--nb-split-columns)]', lg: 'grid-cols-1 lg:grid-cols-[var(--nb-split-columns)]',
};
const alignMap: Record<SplitAlign, string> = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
const sepBase = '[&>*:first-child]:relative [&>*:first-child]:after:pointer-events-none [&>*:first-child]:after:absolute [&>*:first-child]:after:inset-y-0 [&>*:first-child]:after:[inset-inline-end:calc(var(--_nb-gap-resolved)/-2)] [&>*:first-child]:after:[border-inline-end-color:var(--nb-border)] [&>*:first-child]:after:content-[""]';
const sepStyle: Record<Exclude<SplitSeparator,'none'>, string> = {
  solid: '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)] [&>*:first-child]:after:border-solid',
  dashed: '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)] [&>*:first-child]:after:border-dashed',
  thick: '[&>*:first-child]:after:[border-inline-end-width:4px] [&>*:first-child]:after:border-solid',
};
const sepVis: Record<SplitCollapse, string> = {
  none: '', sm: '[&>*:first-child]:after:hidden sm:[&>*:first-child]:after:block',
  md: '[&>*:first-child]:after:hidden md:[&>*:first-child]:after:block', lg: '[&>*:first-child]:after:hidden lg:[&>*:first-child]:after:block',
};

export interface SplitProps extends ComponentPropsWithoutRef<'div'> {
  ratio?: SplitRatio; collapse?: SplitCollapse; align?: SplitAlign; separator?: SplitSeparator; gap?: SplitGap; padding?: SplitPadding;
}

export const Split = forwardRef<HTMLDivElement, SplitProps>(({
  className, ratio = '1:1', collapse = 'md', align = 'stretch', separator = 'none', gap, padding, style, ...props
}, ref) => {
  const styles = resolveNbStyles('split', DEFAULTS, { gap, padding }, { tone: false, radius: false, shadow: false, border: false });
  return (
    <div ref={ref} data-nb-split="" data-ratio={ratio} data-collapse={collapse} data-align={align} data-separator={separator}
      className={cn(styles.className, 'grid min-w-0', alignMap[align], ratioMap[ratio], collapseMap[collapse],
        separator !== 'none' && sepBase, separator !== 'none' && sepStyle[separator], separator !== 'none' && sepVis[collapse], className)}
      style={{ ...styles.style, ...style }} {...styles.dataAttributes} {...props} />
  );
});
Split.displayName = 'Split';
