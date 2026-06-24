'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_COLLAPSED = '3.5rem';

export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  collapsible: boolean | 'icon';
  sidebarId: string;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider.');
  }
  return context;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsible?: boolean | 'icon';
  children?: ReactNode;
}

export function useSidebarProviderState({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  collapsible = 'icon',
}: SidebarProviderProps) {
  const sidebarId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (collapsible === false) return;
    setOpen(!open);
  }, [collapsible, open, setOpen]);

  const state: SidebarState =
    collapsible === false || open ? 'expanded' : 'collapsed';

  const value = useMemo(
    () => ({
      state,
      open: collapsible === false ? true : open,
      setOpen,
      toggleSidebar,
      collapsible,
      sidebarId,
    }),
    [collapsible, open, setOpen, sidebarId, state, toggleSidebar],
  );

  return {
    value,
    providerStyle: {
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-collapsed': SIDEBAR_WIDTH_COLLAPSED,
    } as CSSProperties,
  };
}
