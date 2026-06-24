'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../core/cn';
import { useAccordionItem } from './accordion-item';

export interface AccordionContentProps
  extends ComponentPropsWithoutRef<'div'> {}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const item = useAccordionItem();

  return (
    <div ref={ref} className="block" {...props}>
      <div
        id={item.contentId}
        role="region"
        aria-labelledby={item.triggerId}
        data-slot="accordion-content"
        data-state={item.open ? 'open' : 'closed'}
        data-orientation="vertical"
        aria-hidden={!item.open}
        className={cn(
          '[--nb-accordion-content-bg:var(--nb-surface)]',
          '[--nb-accordion-content-fg:var(--nb-surface-foreground)]',
          'grid overflow-hidden bg-(--nb-accordion-content-bg) text-sm font-medium',
          'text-(--nb-accordion-content-fg)',
          'transition-[grid-template-rows] duration-200 ease-out',
          item.open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          className,
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';
