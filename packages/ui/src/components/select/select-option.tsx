'use client';

import { forwardRef, type ComponentPropsWithoutRef, type KeyboardEvent } from 'react';
import { cn } from '../../core/cn';
import type { SelectValue } from './select';

export interface SelectOptionProps extends ComponentPropsWithoutRef<'div'> {
  value?: SelectValue | null;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  optionIndex?: number;
  totalOptions?: number;
  parentDisabled?: boolean;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  (
    {
      className,
      value = null,
      label = '',
      disabled = false,
      selected = false,
      onSelect,
      onClose,
      optionIndex: _optionIndex,
      totalOptions: _totalOptions,
      parentDisabled: _parentDisabled,
      children,
      ...props
    },
    ref,
  ) => {
    const showIndicator = value !== null && selected;

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
      }
    };

    return (
      <div ref={ref} className={cn('block', className)} {...props}>
        <button
          type="button"
          role="option"
          aria-selected={selected}
          disabled={disabled}
          onClick={onSelect}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-11 w-full items-center gap-3 px-2',
            'font-mono text-base font-bold text-(--nb-select-fg)',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-select-border)',
            'disabled:pointer-events-none disabled:opacity-50',
            selected
              ? 'bg-[#bdf7c8]'
              : 'bg-transparent hover:bg-[#e8d6ff] focus-visible:bg-[#e8d6ff]',
          )}
        >
          <span className="min-w-0 flex flex-1 items-center gap-3 truncate text-left [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.3] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round">
            {children ?? label}
          </span>
          {showIndicator && (
            <svg
              className="size-6 shrink-0 fill-none stroke-current stroke-3 stroke-linecap-round stroke-linejoin-round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m20 6-11 11-5-5" />
            </svg>
          )}
        </button>
      </div>
    );
  },
);
SelectOption.displayName = 'SelectOption';
