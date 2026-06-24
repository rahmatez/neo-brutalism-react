import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { nbTypographyFontValue, type NbTypographyFont } from '../../tokens/typography';

export interface TypographyProps extends ComponentPropsWithoutRef<'span'> {
  font?: NbTypographyFont;
}

export const Typography = forwardRef<HTMLSpanElement, TypographyProps>(({ className, font = 'inherit', style, ...props }, ref) => {
  const fontFamily = nbTypographyFontValue(font);
  return (
    <span ref={ref} className={cn(className)} data-nb-typography={font !== 'inherit' ? font : undefined}
      style={{ ...(fontFamily ? { fontFamily, ['--nb-typography-font' as string]: fontFamily } : {}), ...style }} {...props} />
  );
});
Typography.displayName = 'Typography';
