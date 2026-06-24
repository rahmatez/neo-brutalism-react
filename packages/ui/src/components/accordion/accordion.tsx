'use client';

import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../core/cn';
import {
  AccordionContext,
  type AccordionType,
  type AccordionValue,
} from './accordion-context';

export interface AccordionProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  type?: AccordionType;
  collapsible?: boolean;
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = 'single',
      collapsible = false,
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      useState<AccordionValue>(defaultValue);
    const value = controlledValue ?? uncontrolledValue;

    const setValue = useCallback(
      (next: AccordionValue) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [controlledValue, onValueChange],
    );

    const isItemOpen = useCallback(
      (itemValue: string) => {
        return Array.isArray(value)
          ? value.includes(itemValue)
          : value === itemValue;
      },
      [value],
    );

    const toggleItem = useCallback(
      (itemValue: string) => {
        if (type === 'multiple') {
          const current = Array.isArray(value)
            ? value
            : value
              ? [value]
              : [];
          setValue(
            current.includes(itemValue)
              ? current.filter((v) => v !== itemValue)
              : [...current, itemValue],
          );
          return;
        }

        if (isItemOpen(itemValue)) {
          if (collapsible) setValue(null);
          return;
        }
        setValue(itemValue);
      },
      [type, value, collapsible, setValue, isItemOpen],
    );

    const ctx = useMemo(
      () => ({ type, collapsible, value, setValue, isItemOpen, toggleItem }),
      [type, collapsible, value, setValue, isItemOpen, toggleItem],
    );

    return (
      <AccordionContext.Provider value={ctx}>
        <div
          ref={ref}
          className={cn('block w-full', className)}
          data-orientation="vertical"
          data-type={type}
          {...props}
        >
          <div className="flex w-full flex-col gap-3">{children}</div>
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';
