import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbToneToken } from '../../tokens/tone';
import { useInputGroup } from '../input-group/input-group-context';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: InputSize;
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = 'md', tone, border, style, ...props },
    ref,
  ) => {
    const group = useInputGroup();
    const isInGroup = group !== null;
    const styles = resolveNbStyles(
      'input',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    return (
      <input
        ref={ref}
        data-nb-input=""
        data-size={size}
        className={cn(
          styles.className,
          '[--nb-input-radius:var(--nb-radius)]',
          '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
          'flex font-medium',
          'placeholder:text-gray-400',
          'file:h-full file:py-0 file:my-0 file:mr-3 file:px-3',
          'file:cursor-pointer file:text-sm file:font-bold',
          'file:bg-(--nb-main) file:text-(--nb-main-foreground)',
          'file:border-0 file:border-r-2 file:border-(--nb-border)',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'aria-invalid:border-(--nb-danger)',
          'aria-invalid:focus-visible:ring-(--nb-danger)',
          isInGroup
            ? ['flex-1 min-w-0', 'focus-visible:outline-none']
            : [
                'rounded-(--nb-input-radius)',
                'shadow-[var(--nb-input-shadow)]',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
                'focus-visible:ring-offset-2 focus-visible:shadow-none',
              ],
          className,
        )}
        style={{
          ...styles.style,
          ...(isInGroup
            ? { backgroundColor: 'transparent', borderWidth: 0 }
            : {}),
          ...style,
        }}
        {...styles.dataAttributes}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
