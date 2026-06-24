'use client';

import * as ResizablePrimitive from 'react-resizable-panels';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { cn } from '../../core/cn';

type ResizablePanelGroupProps = ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>;

export const ResizablePanelGroup: ForwardRefExoticComponent<
  ResizablePanelGroupProps & RefAttributes<ResizablePrimitive.ImperativePanelGroupHandle>
> = forwardRef<
  ResizablePrimitive.ImperativePanelGroupHandle,
  ResizablePanelGroupProps
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    data-nb-resizable-group=""
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
));
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

export const ResizablePanel = ResizablePrimitive.Panel;

export interface ResizableHandleProps
  extends ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelResizeHandle> {
  withHandle?: boolean;
}

export function ResizableHandle({ className, withHandle = true, ...props }: ResizableHandleProps) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-nb-resizable-handle=""
      className={cn(
        'relative flex w-3 items-center justify-center bg-(--nb-paper)',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-(--nb-border)',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
        'data-[panel-group-direction=vertical]:h-3 data-[panel-group-direction=vertical]:w-full',
        'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-0.5',
        'data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0',
        'data-[panel-group-direction=vertical]:after:-translate-y-1/2',
        className,
      )}
      {...props}
    >
      {withHandle ? (
        <div
          aria-hidden="true"
          className="z-10 flex h-8 w-3 items-center justify-center rounded-sm border-2 border-(--nb-border) bg-(--nb-yellow) shadow-[2px_2px_0_0_var(--nb-shadow)]"
        >
          <svg className="size-3 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
            <path d="M8 9h8M8 15h8" strokeLinecap="round" />
          </svg>
        </div>
      ) : null}
    </ResizablePrimitive.PanelResizeHandle>
  );
}
