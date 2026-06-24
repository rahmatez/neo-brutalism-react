'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../core/cn';

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsible() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error('Collapsible parts must be used within Collapsible');
  return ctx;
}

export interface CollapsibleProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultOpen'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    { className, open: controlledOpen, defaultOpen = false, onOpenChange, children, ...props },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const open = controlledOpen ?? uncontrolled;
    const toggle = useCallback(() => {
      const next = !open;
      if (controlledOpen === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    }, [controlledOpen, onOpenChange, open]);

    return (
      <CollapsibleContext.Provider value={{ open, toggle }}>
        <div ref={ref} data-nb-collapsible="" data-state={open ? 'open' : 'closed'} className={cn(className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = 'Collapsible';

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, onClick, ...props }, ref) => {
    const { open, toggle } = useCollapsible();
    return (
      <button
        ref={ref}
        type="button"
        data-nb-collapsible-trigger=""
        data-state={open ? 'open' : 'closed'}
        aria-expanded={open}
        className={cn('w-full text-left', className)}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsible();
    if (!open) return null;
    return (
      <div ref={ref} data-nb-collapsible-content="" data-state="open" className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);
CollapsibleContent.displayName = 'CollapsibleContent';
