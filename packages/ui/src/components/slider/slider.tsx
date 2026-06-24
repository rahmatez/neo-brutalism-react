import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  tone?: NbToneToken;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, tone = 'lavender', style, ...props }, ref) => {
    const vars = nbToneVars(tone);
    return (
      <input
        ref={ref}
        type="range"
        data-nb-slider=""
        data-tone={tone}
        className={cn(
          'h-3 w-full cursor-pointer appearance-none rounded-full border-2 border-(--nb-border) bg-(--nb-paper)',
          '[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--nb-border) [&::-webkit-slider-thumb]:bg-(--nb-slider-thumb)',
          '[&::-webkit-slider-thumb]:shadow-[2px_2px_0_0_var(--nb-shadow)]',
          '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2',
          '[&::-moz-range-thumb]:border-(--nb-border) [&::-moz-range-thumb]:bg-(--nb-slider-thumb)',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        style={{
          ['--nb-slider-thumb' as string]: vars.bg,
          ...style,
        }}
        {...props}
      />
    );
  },
);
Slider.displayName = 'Slider';
