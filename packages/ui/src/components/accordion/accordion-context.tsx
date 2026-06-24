import { createContext, useContext } from 'react';

export type AccordionType = 'single' | 'multiple';
export type AccordionValue = string | string[] | null;

export interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  value: AccordionValue;
  setValue: (value: AccordionValue) => void;
  isItemOpen: (itemValue: string) => boolean;
  toggleItem: (itemValue: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
);

export function useAccordion(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return ctx;
}
