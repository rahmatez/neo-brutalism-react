import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';

export type InputPrefixAlign = 'center' | 'stretch';

export interface InputPrefixProps extends ComponentPropsWithoutRef<'span'> {
  align?: InputPrefixAlign;
}

export const InputPrefix = forwardRef<HTMLSpanElement, InputPrefixProps>(
  ({ className, align = 'center', ...props }, ref) => (
    <span
      ref={ref}
      data-nb-input-prefix=""
      data-align={align}
      className={cn(
        'flex w-12 shrink-0 items-center justify-center border-r-2 border-(--nb-border) bg-[#ffd24a] text-sm font-bold',
        align === 'stretch' && 'self-stretch',
        className,
      )}
      {...props}
    />
  ),
);
InputPrefix.displayName = 'InputPrefix';
