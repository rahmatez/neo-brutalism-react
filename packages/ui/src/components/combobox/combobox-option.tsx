'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import type { ComboboxValue } from './combobox';

export interface ComboboxOptionProps extends ComponentPropsWithoutRef<'div'> {
  value?: ComboboxValue | null;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  optionId?: string;
  onSelect?: () => void;
}

export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>(
  (
    {
      className,
      value = null,
      label = '',
      disabled = false,
      selected = false,
      highlighted = false,
      optionId,
      onSelect,
      children,
      ...props
    },
    ref,
  ) => {
    const showIndicator = value !== null && selected;

    return (
      <div ref={ref} className={cn('block', className)} {...props}>
        <button
          id={optionId}
          type="button"
          role="option"
          aria-selected={selected}
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onSelect}
          className={cn(
            'flex h-11 w-full items-center gap-3 px-2',
            'font-mono text-base font-bold text-(--nb-combobox-fg)',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-combobox-border)',
            'disabled:pointer-events-none disabled:opacity-50',
            selected
              ? 'bg-[#bdf7c8]'
              : highlighted
                ? 'bg-[#e8d6ff]'
                : 'bg-transparent hover:bg-[#e8d6ff]',
          )}
        >
          <span className="min-w-0 flex flex-1 items-center gap-3 truncate text-left [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.3] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round">
            {children ?? label}
          </span>
          {showIndicator && (
            <svg
              className="size-6 shrink-0 fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
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
ComboboxOption.displayName = 'ComboboxOption';
