import { createContext, useContext } from 'react';

export interface DialogContextValue {
  close: () => void;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('Dialog compound components must be used within Dialog');
  }
  return ctx;
}
