import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbPadding } from '../../tokens/padding';
import type { NbSpacing } from '../../tokens/spacing';

const DEFAULTS: NbStyleDefaults = { gap: 'md', padding: 'none' };
export type ClusterGap = NbSpacing; export type ClusterPadding = NbPadding;
export type ClusterAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type ClusterJustify = 'start' | 'center' | 'end' | 'between';
export type ClusterWrap = 'wrap' | 'nowrap';
export type ClusterSeparator = 'none' | 'solid' | 'dashed' | 'thick';

const alignMap: Record<ClusterAlign, string> = { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline', stretch: 'items-stretch' };
const justifyMap: Record<ClusterJustify, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' };
const wrapMap: Record<ClusterWrap, string> = { wrap: 'flex-wrap', nowrap: 'flex-nowrap' };
const separatorBase = '[--nb-cluster-separator-gap:calc(var(--_nb-gap-resolved)*0.5)] [--nb-cluster-separator-color:var(--nb-border)] [&>*+*]:[margin-inline-start:var(--nb-cluster-separator-gap)] [&>*+*]:[padding-inline-start:var(--nb-cluster-separator-gap)] [&>*+*]:[border-inline-start-color:var(--nb-cluster-separator-color)]';
const separatorStyle: Record<Exclude<ClusterSeparator,'none'>, string> = {
  solid: '[--nb-cluster-separator-thickness:2px] [&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)] [&>*+*]:[border-inline-start-style:solid]',
  dashed: '[--nb-cluster-separator-thickness:2px] [&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)] [&>*+*]:[border-inline-start-style:dashed]',
  thick: '[--nb-cluster-separator-thickness:4px] [&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)] [&>*+*]:[border-inline-start-style:solid]',
};

export interface ClusterProps extends ComponentPropsWithoutRef<'div'> {
  align?: ClusterAlign; justify?: ClusterJustify; wrap?: ClusterWrap; separator?: ClusterSeparator;
  gap?: ClusterGap; padding?: ClusterPadding;
}

export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(({
  className, align = 'center', justify = 'start', wrap = 'wrap', separator = 'none', gap, padding, style, ...props
}, ref) => {
  const styles = resolveNbStyles('cluster', DEFAULTS, { gap, padding }, { tone: false, radius: false, shadow: false, border: false });
  return (
    <div ref={ref} data-nb-cluster="" data-align={align} data-justify={justify} data-wrap={wrap} data-separator={separator}
      className={cn(styles.className, 'flex min-w-0', alignMap[align], justifyMap[justify], wrapMap[wrap], separator !== 'none' && 'gap-x-0', separator !== 'none' && separatorBase, separator !== 'none' && separatorStyle[separator], className)}
      style={{ ...(separator !== 'none' ? { columnGap: 0 } : {}), ...styles.style, ...style }}
      {...styles.dataAttributes} {...props} />
  );
});
Cluster.displayName = 'Cluster';
