import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';

export type CheckboxSize = 'sm' | 'md' | 'lg';
const sizeMap: Record<CheckboxSize, string> = {
  sm: 'size-4', md: 'size-5', lg: 'size-6',
};

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  size?: CheckboxSize; tone?: NbToneToken;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, size = 'md', tone = 'primary', style, ...props }, ref) => {
  const vars = nbToneVars(tone);
  return (
    <input
      ref={ref}
      type="checkbox"
      data-nb-checkbox=""
      data-size={size}
      data-tone={tone}
      className={cn('peer grid appearance-none place-content-center rounded border-2 border-(--nb-border) outline-none',
        'checked:bg-(--nb-checkbox-bg) checked:text-(--nb-checkbox-fg)',
        'focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50', sizeMap[size], className)}
      style={{ ['--nb-checkbox-bg' as string]: vars.bg, ['--nb-checkbox-fg' as string]: vars.fg, ...style }} {...props} />
  );
});
Checkbox.displayName = 'Checkbox';
