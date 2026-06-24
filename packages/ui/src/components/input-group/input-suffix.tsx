import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export type InputSuffixAlign = 'center' | 'stretch';

export interface InputSuffixProps extends ComponentPropsWithoutRef<'span'> {
  align?: InputSuffixAlign;
}

export const InputSuffix = forwardRef<HTMLSpanElement, InputSuffixProps>(
  ({ className, align = 'center', ...props }, ref) => (
    <span
      ref={ref}
      data-align={align}
      className={cn(
        'flex w-12 shrink-0 items-center justify-center border-l-2 border-(--nb-border) bg-[#ffd24a] text-sm font-bold',
        align === 'stretch' && 'self-stretch',
        className,
      )}
      {...props}
    />
  ),
);
InputSuffix.displayName = 'InputSuffix';
