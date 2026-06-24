'use client';

import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '../../core/cn';
import { TabsContext, useTabs } from './tabs-context';

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const value = controlledValue ?? uncontrolled;
    const setValue = useCallback(
      (next: string) => {
        if (controlledValue === undefined) setUncontrolled(next);
        onValueChange?.(next);
      },
      [controlledValue, onValueChange],
    );

    return (
      <TabsContext.Provider value={{ value, setValue }}>
        <div ref={ref} data-nb-tabs="" className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      data-nb-tabs-list=""
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    />
  ),
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends ComponentPropsWithoutRef<'button'> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => {
    const { value: active, setValue } = useTabs();
    const isActive = active === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-nb-tabs-trigger=""
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'border-2 border-(--nb-border) px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform',
          isActive ? 'bg-(--nb-mint) -translate-y-0.5' : 'bg-(--nb-paper) hover:bg-(--nb-yellow)',
          className,
        )}
        onClick={(e) => {
          setValue(value);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: active } = useTabs();
    if (active !== value) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        data-nb-tabs-content=""
        data-state="active"
        className={cn('mt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';
