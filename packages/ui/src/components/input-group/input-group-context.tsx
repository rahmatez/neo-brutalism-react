import { createContext, useContext } from 'react';

export interface InputGroupContextValue {
  hasPrefix: boolean;
  hasSuffix: boolean;
}

export const InputGroupContext = createContext<InputGroupContextValue | null>(
  null,
);

export function useInputGroup(): InputGroupContextValue | null {
  return useContext(InputGroupContext);
}
