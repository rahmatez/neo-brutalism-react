'use client';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbToneToken } from '../../tokens/tone';
import { useInputGroup } from '../input-group/input-group-context';
import { SelectOption, type SelectOptionProps } from './select-option';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

function getSelectOptionLabel(option: ReactElement<SelectOptionProps>) {
  if (option.props.label) return option.props.label;
  const { children } = option.props;
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  return '';
}

export type SelectValue = string | number;

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  placeholder?: string;
  value?: SelectValue | null;
  defaultValue?: SelectValue | null;
  onValueChange?: (value: SelectValue | null) => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      placeholder = 'Select an option',
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      tone,
      border,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const group = useInputGroup();
    const isInGroup = group !== null;
    const id = useId();
    const triggerId = `neo-select-trigger-${id}`;
    const listboxId = `neo-select-listbox-${id}`;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue | null>(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const [open, setOpen] = useState(false);

    const styles = resolveNbStyles(
      'select',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    const options = Children.toArray(children).filter(isValidElement) as ReactElement<SelectOptionProps>[];
    const selectedOption = options.find((opt) => opt.props.value === value);
    const selectedLabel = selectedOption ? getSelectOptionLabel(selectedOption) : '';

    const setValue = useCallback(
      (next: SelectValue | null) => {
        if (controlledValue === undefined) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [controlledValue, onValueChange],
    );

    const closeAndFocusTrigger = useCallback(() => {
      setOpen(false);
      queueMicrotask(() => triggerRef.current?.focus());
    }, []);

    const selectOption = useCallback(
      (optValue: SelectValue | null, optDisabled?: boolean) => {
        if (disabled || optDisabled) return;
        setValue(optValue);
        closeAndFocusTrigger();
      },
      [disabled, setValue, closeAndFocusTrigger],
    );

    useEffect(() => {
      if (!open) return;
      const handler = (e: globalThis.MouseEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    }, [open]);

    const enabledOptions = options.filter((o) => !o.props.disabled);
    const focusOptionAt = (index: number) => {
      const btn = rootRef.current?.querySelectorAll<HTMLButtonElement>(
        `[role="option"]`,
      )[index];
      btn?.focus();
    };

    const openListboxOnKey = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!disabled) {
          setOpen(true);
          queueMicrotask(() => {
            const idx = enabledOptions.findIndex((o) => o.props.value === value);
            focusOptionAt(idx >= 0 ? idx : 0);
          });
        }
      }
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          styles.className,
          '[--nb-select-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
          '[--nb-select-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
          '[--nb-select-radius:var(--nb-radius)]',
          '[--nb-select-listbox-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
          isInGroup
            ? 'block w-full'
            : [
                'relative block w-full',
                'rounded-(--nb-select-radius)',
                'shadow-nb',
                'focus-within:outline-none focus-within:ring-2 focus-within:ring-(--nb-select-border)',
                'focus-within:ring-offset-2 focus-within:shadow-none',
                'data-[disabled]:border-gray-400 data-[disabled]:shadow-[5px_5px_0_0_#a3a3a3]',
              ],
          className,
        )}
        style={{
          ...styles.style,
          ...(isInGroup ? { backgroundColor: 'transparent', borderWidth: 0 } : {}),
          ...style,
        }}
        {...styles.dataAttributes}
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          id={triggerId}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={openListboxOnKey}
          className={cn(
            'flex h-14 w-full items-center gap-4 font-mono text-base font-bold',
            'text-(--nb-select-fg) transition-all duration-150',
            'disabled:cursor-not-allowed disabled:text-gray-400',
            isInGroup
              ? 'flex-1 min-w-0 bg-transparent px-3 focus-visible:outline-none'
              : 'flex-1 min-w-0 bg-transparent px-5 focus-visible:outline-none',
          )}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-left',
              selectedLabel ? 'text-(--nb-select-fg)' : 'text-gray-400',
            )}
          >
            {selectedLabel || placeholder}
          </span>
          <svg
            className="size-6 shrink-0 fill-none stroke-current stroke-3 stroke-linecap-round stroke-linejoin-round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </button>

        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            className={cn(
              'absolute z-50 top-[calc(100%+8px)]',
              'left-[-6px] w-[calc(100%+12px)] mt-0.5',
              'rounded-b-(--nb-select-radius) border-2 border-(--nb-select-border) bg-(--nb-select-listbox-bg)',
              'shadow-nb',
            )}
          >
            {options.map((child, index) =>
              cloneElement(child, {
                key: child.key ?? index,
                selected: child.props.value === value,
                onSelect: () =>
                  selectOption(child.props.value ?? null, child.props.disabled),
                onClose: closeAndFocusTrigger,
                optionIndex: index,
                totalOptions: options.length,
                parentDisabled: disabled,
              }),
            )}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';

export { SelectOption };
