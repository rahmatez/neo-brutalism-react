import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorVariant = 'solid' | 'dashed' | 'thick';

export interface SeparatorProps extends ComponentPropsWithoutRef<'hr'> {
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({ orientation = 'horizontal', variant = 'solid', style, ...props }, ref) => {
  const isVertical = orientation === 'vertical';
  const width = variant === 'thick' ? '4px' : '2px';
  const borderStyle = variant === 'dashed' ? 'dashed' : 'solid';
  return (
    <hr ref={ref} data-nb-separator="" aria-orientation={orientation}
      style={{
        border: 'none',
        margin: 0,
        ...(isVertical
          ? { width, height: '100%', borderLeft: `${width} ${borderStyle} var(--nb-border)` }
          : { height: width, width: '100%', borderTop: `${width} ${borderStyle} var(--nb-border)` }),
        ...style,
      }} {...props} />
  );
});
Separator.displayName = 'Separator';
