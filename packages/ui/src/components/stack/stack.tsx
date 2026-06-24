import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { resolveNbStyles, type NbStyleDefaults } from '../../core/resolve-nb-styles';
import type { NbSpacing } from '../../tokens/spacing';

const DEFAULTS: NbStyleDefaults = { gap: 'md' };
export type StackGap = NbSpacing;
export type StackAlign = 'stretch' | 'start' | 'center' | 'end';
export type StackJustify = 'start' | 'center' | 'end' | 'between';
export type StackSeparator = 'none' | 'solid' | 'dashed' | 'thick';

const alignMap: Record<StackAlign, string> = { stretch: 'items-stretch', start: 'items-start', center: 'items-center', end: 'items-end' };
const justifyMap: Record<StackJustify, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' };
const separatorMap: Record<StackSeparator, string> = {
  none: '',
  solid: '[&>*+*]:border-t-(length:--nb-border-width) [&>*+*]:border-solid [&>*+*]:[border-top-color:var(--nb-border)] [&>*+*]:pt-[var(--nb-stack-gap)]',
  dashed: '[&>*+*]:border-t-(length:--nb-border-width) [&>*+*]:border-dashed [&>*+*]:[border-top-color:var(--nb-border)] [&>*+*]:pt-[var(--nb-stack-gap)]',
  thick: '[&>*+*]:border-t-4 [&>*+*]:border-solid [&>*+*]:[border-top-color:var(--nb-border)] [&>*+*]:pt-[var(--nb-stack-gap)]',
};

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  align?: StackAlign; justify?: StackJustify; separator?: StackSeparator; gap?: StackGap;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({
  className, align = 'stretch', justify = 'start', separator = 'none', gap, style, ...props
}, ref) => {
  const styles = resolveNbStyles('stack', DEFAULTS, { gap }, { tone: false, radius: false, shadow: false, border: false, padding: false });
  return (
    <div ref={ref} data-nb-stack="" data-align={align} data-justify={justify} data-separator={separator}
      className={cn(styles.className, 'flex min-w-0 flex-col', alignMap[align], justifyMap[justify], separatorMap[separator], className)}
      style={{ ['--nb-stack-gap' as string]: 'var(--_nb-gap-resolved)', ...styles.style, ...style }}
      {...styles.dataAttributes} {...props} />
  );
});
Stack.displayName = 'Stack';
