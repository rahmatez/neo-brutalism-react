import { createContext, useContext } from 'react';

export interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within Tabs');
  return ctx;
}
