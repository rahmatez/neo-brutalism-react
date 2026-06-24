'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../core/cn';
import type { NbToneToken } from '../../tokens/tone';
import { nbToneVars } from '../../tokens/tone';

interface ToastItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: NbToneToken;
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    window.setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport items={items} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastViewport({
  items,
  onDismiss,
}: {
  items: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div
      data-nb-toast-viewport=""
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-3"
    >
      {items.map((item) => (
        <Toast key={item.id} item={item} onDismiss={() => onDismiss(item.id)} />
      ))}
    </div>
  );
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const vars = nbToneVars(item.tone ?? 'yellow');
  return (
    <div
      role="status"
      data-nb-toast=""
      className="pointer-events-auto border-2 border-(--nb-border) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]"
      style={{ backgroundColor: vars.bg, color: vars.fg }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black uppercase">{item.title}</p>
          {item.description ? <p className="mt-1 text-sm font-medium">{item.description}</p> : null}
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          className="border-2 border-(--nb-border) bg-(--nb-paper) px-2 py-0.5 text-xs font-black"
          onClick={onDismiss}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export const ToastAction = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-nb-toast-action=""
      className={cn(
        'border-2 border-(--nb-border) bg-(--nb-paper) px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_var(--nb-shadow)]',
        className,
      )}
      {...props}
    />
  ),
);
ToastAction.displayName = 'ToastAction';
