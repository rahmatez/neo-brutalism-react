import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ChangeEvent,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type Ref,
} from 'react';
import { mergeRefs } from '../../core/merge-refs';

type AnyProps = Record<string, unknown>;

function composeHandlers<E>(
  theirs?: (event: E) => void,
  ours?: (event: E) => void,
): ((event: E) => void) | undefined {
  if (!theirs && !ours) return undefined;
  return (event: E) => {
    theirs?.(event);
    ours?.(event);
  };
}

export interface FormSlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactElement;
}

export const FormSlot = forwardRef<HTMLElement, FormSlotProps>(
  ({ children, onBlur, onChange, onClick, ...restSlotProps }, forwardedRef) => {
    if (!isValidElement(children)) {
      throw new Error('FormControl expects a single React element child.');
    }

    const child = children as ReactElement<AnyProps>;
    const childRef = child.props.ref as Ref<HTMLElement> | undefined;

    return cloneElement(child, {
      ...child.props,
      ...restSlotProps,
      ref: mergeRefs(forwardedRef, childRef),
      onBlur: composeHandlers(
        child.props.onBlur as ((event: FocusEvent<HTMLElement>) => void) | undefined,
        onBlur,
      ),
      onChange: composeHandlers(
        child.props.onChange as ((event: ChangeEvent<HTMLElement>) => void) | undefined,
        onChange,
      ),
      onClick: composeHandlers(
        child.props.onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined,
        onClick,
      ),
    });
  },
);
FormSlot.displayName = 'FormSlot';
