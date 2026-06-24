'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { useAccordionItem } from './accordion-item';

export interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<'button'> {}

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const item = useAccordionItem();

  return (
    <h3 className="flex">
      <button
        ref={ref}
        type="button"
        id={item.triggerId}
        aria-expanded={item.open}
        aria-controls={item.contentId}
        data-state={item.open ? 'open' : 'closed'}
        disabled={item.disabled}
        onClick={item.toggle}
        className={cn(
          '[--nb-accordion-trigger-bg:var(--_nb-tone-bg-token)]',
          '[--nb-accordion-trigger-fg:var(--_nb-tone-fg-token)]',
          'flex min-h-14 flex-1 items-center justify-between gap-4',
          'w-full bg-(--nb-accordion-trigger-bg) p-4 text-left text-base font-bold',
          'text-(--nb-accordion-trigger-fg) transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          item.open &&
            'border-b-[length:var(--nb-border-width-token,var(--_nb-border-width-default))] border-b-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
          className,
        )}
        {...props}
      >
        {children}
        <svg
          className="size-6 shrink-0 fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={item.open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
        </svg>
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';
