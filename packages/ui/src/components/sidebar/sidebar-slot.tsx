import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from 'react';
import { mergeRefs } from '../../core/merge-refs';

type AnyProps = Record<string, unknown>;

export interface SidebarSlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactElement;
}

export const SidebarSlot = forwardRef<HTMLElement, SidebarSlotProps>(
  ({ children, className, ...slotProps }, forwardedRef) => {
    if (!isValidElement(children)) {
      throw new Error('SidebarMenuButton with asChild expects a single React element child.');
    }

    const child = children as ReactElement<AnyProps>;
    const childRef = child.props.ref as Ref<HTMLElement> | undefined;

    return cloneElement(child, {
      ...child.props,
      ...slotProps,
      className: [child.props.className, className].filter(Boolean).join(' ') || undefined,
      ref: mergeRefs(forwardedRef, childRef),
    });
  },
);
SidebarSlot.displayName = 'SidebarSlot';
