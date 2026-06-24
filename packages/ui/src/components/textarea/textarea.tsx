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

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'size'> {
  size?: TextareaSize;
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, size = 'md', tone, border, style, ...props },
    ref,
  ) => {
    const group = useInputGroup();
    const isInGroup = group !== null;
    const styles = resolveNbStyles(
      'textarea',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    return (
      <textarea
        ref={ref}
        data-nb-textarea=""
        data-size={size}
        className={cn(
          styles.className,
          '[--nb-input-radius:var(--nb-radius)]',
          '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
          'flex w-full resize-none font-medium',
          'placeholder:text-gray-400',
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
Textarea.displayName = 'Textarea';
