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

export interface NativeSelectProps
  extends ComponentPropsWithoutRef<'select'> {
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, tone, border, style, ...props }, ref) => {
    const group = useInputGroup();
    const isInGroup = group !== null;
    const styles = resolveNbStyles(
      'select',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    return (
      <select
        ref={ref}
        data-nb-select=""
        className={cn(
          styles.className,
          '[--nb-select-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
          '[--nb-select-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
          '[--nb-select-radius:var(--nb-radius)]',
          'flex font-medium appearance-none pr-10',
          'has-[option:disabled:checked]:text-gray-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'aria-invalid:border-(--nb-danger)',
          'aria-invalid:focus-visible:ring-(--nb-danger)',
          isInGroup
            ? ['flex-1 min-w-0', 'focus-visible:outline-none']
            : [
                'bg-(--nb-select-bg)',
                'text-(--nb-select-fg)',
                'border-(--nb-select-border)',
                'rounded-(--nb-select-radius)',
                'shadow-nb',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-select-border)',
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
NativeSelect.displayName = 'NativeSelect';
