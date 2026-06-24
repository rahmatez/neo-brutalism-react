'use client';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
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
import { ComboboxOption, type ComboboxOptionProps } from './combobox-option';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };

export type ComboboxValue = string | number;

export interface ComboboxProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue' | 'id'> {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  value?: ComboboxValue | null;
  defaultValue?: ComboboxValue | null;
  onValueChange?: (value: ComboboxValue | null) => void;
  disabled?: boolean;
  clearable?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  tone?: NbToneToken;
  border?: NbBorderStrength;
}

function optionSearchText(option: ReactElement<ComboboxOptionProps>) {
  return `${option.props.label ?? ''}`.toLowerCase();
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      placeholder = 'Select an option',
      searchPlaceholder = 'Search…',
      emptyMessage = 'No results found.',
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      disabled = false,
      clearable = false,
      id: propId,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
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
    const hasPrefix = group?.hasPrefix ?? false;
    const id = useId();
    const inputId = propId ?? `neo-combobox-input-${id}`;
    const listboxId = `neo-combobox-listbox-${id}`;
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState<ComboboxValue | null>(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const styles = resolveNbStyles(
      'combobox',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    const options = Children.toArray(children).filter(isValidElement) as ReactElement<ComboboxOptionProps>[];
    const selectedOption = options.find((opt) => opt.props.value === value);
    const selectedLabel = selectedOption?.props.label ?? '';

    const filteredOptions = useMemo(() => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) return options;
      return options.filter((option) => optionSearchText(option).includes(normalized));
    }, [options, query]);

    const enabledFilteredOptions = filteredOptions.filter((option) => !option.props.disabled);

    const setValue = useCallback(
      (next: ComboboxValue | null) => {
        if (controlledValue === undefined) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [controlledValue, onValueChange],
    );

    const closeListbox = useCallback(() => {
      setOpen(false);
      setQuery('');
      setHighlightedIndex(0);
    }, []);

    const selectOption = useCallback(
      (optValue: ComboboxValue | null, optDisabled?: boolean) => {
        if (disabled || optDisabled) return;
        setValue(optValue);
        closeListbox();
        queueMicrotask(() => inputRef.current?.focus());
      },
      [closeListbox, disabled, setValue],
    );

    const openListbox = useCallback(
      (resetQuery = true) => {
        if (disabled) return;
        setOpen(true);
        if (resetQuery) setQuery('');
        const pool = resetQuery ? options : filteredOptions;
        const enabled = pool.filter((opt) => !opt.props.disabled);
        const selectedIndex = enabled.findIndex((opt) => opt.props.value === value);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      },
      [disabled, filteredOptions, options, value],
    );

    useEffect(() => {
      if (!open) return;
      const handler = (event: globalThis.MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) closeListbox();
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [closeListbox, open]);

    useEffect(() => {
      if (highlightedIndex >= enabledFilteredOptions.length) {
        setHighlightedIndex(Math.max(enabledFilteredOptions.length - 1, 0));
      }
    }, [enabledFilteredOptions.length, highlightedIndex]);

    const moveHighlight = (direction: 1 | -1) => {
      if (enabledFilteredOptions.length === 0) return;
      setHighlightedIndex((current) => {
        const next = current + direction;
        if (next < 0) return enabledFilteredOptions.length - 1;
        if (next >= enabledFilteredOptions.length) return 0;
        return next;
      });
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!open) openListbox();
          else moveHighlight(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!open) openListbox();
          else moveHighlight(-1);
          break;
        case 'Enter':
          if (open && enabledFilteredOptions[highlightedIndex]) {
            event.preventDefault();
            const option = enabledFilteredOptions[highlightedIndex];
            selectOption(option.props.value ?? null, option.props.disabled);
          }
          break;
        case 'Escape':
          if (open) {
            event.preventDefault();
            closeListbox();
          }
          break;
        case 'Home':
          if (open) {
            event.preventDefault();
            setHighlightedIndex(0);
          }
          break;
        case 'End':
          if (open) {
            event.preventDefault();
            setHighlightedIndex(Math.max(enabledFilteredOptions.length - 1, 0));
          }
          break;
        default:
          break;
      }
    };

    const displayValue = open ? query : selectedLabel;
    const activeDescendant =
      open && enabledFilteredOptions[highlightedIndex]
        ? `neo-combobox-option-${id}-${filteredOptions.indexOf(enabledFilteredOptions[highlightedIndex])}`
        : undefined;

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-nb-combobox=""
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          styles.className,
          '[--nb-combobox-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
          '[--nb-combobox-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
          '[--nb-combobox-radius:var(--nb-radius)]',
          '[--nb-combobox-listbox-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
          'relative block w-full',
          isInGroup && 'min-w-0 flex-1',
          !isInGroup && [
            'rounded-(--nb-combobox-radius)',
            'shadow-nb',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-(--nb-combobox-border)',
            'focus-within:ring-offset-2 focus-within:shadow-none',
            'data-[disabled]:border-gray-400 data-[disabled]:shadow-[5px_5px_0_0_#a3a3a3]',
            'has-[input[aria-invalid=true]]:border-(--nb-danger)',
            'has-[input[aria-invalid=true]]:focus-within:ring-(--nb-danger)',
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
        <div
          className={cn(
            'flex h-14 w-full items-center gap-2',
            isInGroup ? 'px-3' : 'px-4',
          )}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            aria-invalid={ariaInvalid || undefined}
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={activeDescendant}
            aria-autocomplete="list"
            placeholder={open ? searchPlaceholder : placeholder}
            value={displayValue}
            onChange={(event) => {
              setQuery(event.target.value);
              if (!open) setOpen(true);
              setHighlightedIndex(0);
            }}
            onFocus={() => openListbox(!open)}
            onKeyDown={handleInputKeyDown}
            className={cn(
              'min-w-0 flex-1 bg-transparent font-mono text-base font-bold',
              'text-(--nb-combobox-fg) placeholder:text-gray-400',
              'focus-visible:outline-none disabled:cursor-not-allowed disabled:text-gray-400',
              !open && !selectedLabel && 'text-gray-400',
            )}
          />

          {clearable && value != null && !disabled ? (
            <button
              type="button"
              aria-label="Clear selection"
              className="inline-flex size-8 shrink-0 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) shadow-[2px_2px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setValue(null);
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <svg
                className="size-4 fill-none stroke-current stroke-3"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}

          <svg
            className="size-6 shrink-0 fill-none stroke-current stroke-3 stroke-linecap-round stroke-linejoin-round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </div>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={inputId}
            className={cn(
              'absolute z-50 max-h-60 overflow-y-auto',
              'border-2 border-(--nb-combobox-border) bg-(--nb-combobox-listbox-bg) shadow-nb',
              isInGroup
                ? cn(
                    'top-full mt-2 rounded-(--nb-combobox-radius)',
                    hasPrefix ? 'left-[-3rem] w-[calc(100%+3rem)]' : 'left-0 w-full',
                  )
                : 'top-[calc(100%+8px)] left-[-6px] w-[calc(100%+12px)] rounded-b-(--nb-combobox-radius)',
            )}
          >
            {filteredOptions.length === 0 ? (
              <p className="px-4 py-3 font-mono text-sm font-bold text-gray-500">{emptyMessage}</p>
            ) : (
              filteredOptions.map((child, index) => {
                const enabledIndex = enabledFilteredOptions.indexOf(child);
                const isHighlighted = enabledIndex === highlightedIndex;
                const optionId = `neo-combobox-option-${id}-${index}`;

                return cloneElement(child, {
                  key: child.key ?? index,
                  optionId,
                  selected: child.props.value === value,
                  highlighted: isHighlighted,
                  onSelect: () =>
                    selectOption(child.props.value ?? null, child.props.disabled),
                });
              })
            )}
          </div>
        ) : null}
      </div>
    );
  },
);
Combobox.displayName = 'Combobox';

export { ComboboxOption };
