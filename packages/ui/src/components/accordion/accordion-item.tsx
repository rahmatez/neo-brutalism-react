'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import { useAccordion } from './accordion-context';

const DEFAULTS: NbStyleDefaults = {
  tone: 'surface',
  radius: 'md',
  shadow: 'default',
  border: 'default',
};

export interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  open: boolean;
  triggerId: string;
  contentId: string;
  toggle: () => void;
}

const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null);

export function useAccordionItem(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error('Accordion subcomponents must be used within AccordionItem');
  }
  return ctx;
}

export interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  value?: string;
  disabled?: boolean;
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      className,
      value: valueProp,
      disabled = false,
      tone,
      radius,
      shadow,
      border,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const accordion = useAccordion();
    const value = valueProp ?? `neo-accordion-item-${id}`;
    const open = accordion.isItemOpen(value);
    const triggerId = `neo-accordion-trigger-${id}`;
    const contentId = `neo-accordion-content-${id}`;
    const styles = resolveNbStyles('accordion-item', DEFAULTS, {
      tone,
      radius,
      shadow,
      border,
    });

    const itemCtx = useMemo(
      () => ({
        value,
        disabled,
        open,
        triggerId,
        contentId,
        toggle: () => {
          if (!disabled) accordion.toggleItem(value);
        },
      }),
      [value, disabled, open, triggerId, contentId, accordion],
    );

    return (
      <AccordionItemContext.Provider value={itemCtx}>
        <div
          ref={ref}
          className="block"
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          data-orientation="vertical"
          {...props}
        >
          <div
            className={cn(
              styles.className,
              'overflow-hidden rounded-[var(--nb-radius-token,var(--_nb-radius-default))]',
              'border-[length:var(--nb-border-width-token,var(--_nb-border-width-default))]',
              'nb-tone',
              'shadow-[var(--nb-shadow-token,var(--_nb-shadow-default))]',
              disabled && 'opacity-50',
              className,
            )}
            style={{ ...styles.style, ...style }}
            {...styles.dataAttributes}
          >
            {children}
          </div>
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = 'AccordionItem';
