import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';

export type SwitchSize = 'sm' | 'md' | 'lg';

const trackSize: Record<SwitchSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-[3.25rem]',
};

const thumbSize: Record<SwitchSize, string> = {
  sm: 'size-3.5',
  md: 'size-4.5',
  lg: 'size-5.5',
};

/** Track is the input's peer sibling — translate the inner thumb when checked. */
const thumbTranslate: Record<SwitchSize, string> = {
  sm: 'peer-checked:[&>span]:translate-x-4',
  md: 'peer-checked:[&>span]:translate-x-5',
  lg: 'peer-checked:[&>span]:translate-x-6',
};

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  size?: SwitchSize;
  tone?: NbToneToken;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = 'md', tone = 'mint', style, ...props }, ref) => {
    const vars = nbToneVars(tone);
    return (
      <label
        className={cn(
          'relative inline-flex cursor-pointer items-center',
          props.disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          data-nb-switch=""
          data-size={size}
          data-tone={tone}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            'relative rounded-full border-2 border-(--nb-border) bg-(--nb-paper) shadow-[2px_2px_0_0_var(--nb-shadow)] transition-colors',
            'peer-checked:bg-(--nb-switch-track-bg)',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-(--nb-border) peer-focus-visible:ring-offset-2',
            trackSize[size],
            thumbTranslate[size],
          )}
          style={{
            ['--nb-switch-track-bg' as string]: vars.bg,
            ...style,
          }}
        >
          <span
            className={cn(
              'absolute top-1/2 left-0.5 block -translate-y-1/2 rounded-full border-2 border-(--nb-border) bg-white shadow-[1px_1px_0_0_var(--nb-shadow)] transition-transform',
              thumbSize[size],
            )}
          />
        </span>
      </label>
    );
  },
);
Switch.displayName = 'Switch';
