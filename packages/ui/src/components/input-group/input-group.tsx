import {
  Children,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from 'react';
import { cn } from '../../core/cn';
import { InputGroupContext } from './input-group-context';

export interface InputGroupProps extends ComponentPropsWithoutRef<'div'> {}

function isPrefixElement(child: ReactElement): boolean {
  const type = child.type as { displayName?: string };
  return type?.displayName === 'InputPrefix';
}

function isSuffixElement(child: ReactElement): boolean {
  const type = child.type as { displayName?: string };
  return type?.displayName === 'InputSuffix';
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    const childArray = Children.toArray(children).filter(isValidElement) as ReactElement[];
    const hasPrefix = childArray.some(isPrefixElement);
    const hasSuffix = childArray.some(isSuffixElement);

    return (
      <InputGroupContext.Provider value={{ hasPrefix, hasSuffix }}>
        <div
          ref={ref}
          className={cn(
            '[--nb-input-group-bg:var(--nb-input-bg,var(--nb-field-bg))]',
            '[--nb-input-group-border:var(--nb-border)]',
            '[--nb-input-group-radius:var(--nb-radius)]',
            'relative inline-flex w-full rounded-(--nb-input-group-radius) border-2 border-(--nb-input-group-border)',
            'bg-(--nb-input-group-bg) shadow-nb focus-within:outline-none',
            'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-(--nb-input-group-border) focus-within:shadow-none',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  },
);
InputGroup.displayName = 'InputGroup';
