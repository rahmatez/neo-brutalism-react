'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbToneToken } from '../../tokens/tone';
import {
  Calendar,
  type CalendarMode,
  type CalendarProps,
  type CalendarSelection,
} from '../calendar/calendar';
import type { DateRange, DisabledMatcher, WeekStartsOn } from '../calendar/calendar-utils';
import { startOfMonth } from '../calendar/calendar-utils';
import { useInputGroup } from '../input-group/input-group-context';
import {
  formatDatePickerValue,
  isParsedDateAllowed,
  isRangeComplete,
  parseDateInput,
  type DatePickerMode,
  type DatePickerValue,
} from './date-picker-utils';

const DEFAULTS: NbStyleDefaults = { tone: 'surface', border: 'default' };
const PANEL_GAP = 8;

export interface DatePickerPreset {
  label: string;
  value: Date | DateRange | (() => Date | DateRange);
}

export interface DatePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onChange' | 'id'> {
  id?: string;
  mode?: DatePickerMode;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onValueChange?: (value: DatePickerValue) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
  locale?: string;
  weekStartsOn?: WeekStartsOn;
  min?: Date;
  max?: Date;
  disabledDates?: DisabledMatcher;
  dateFormat?: Intl.DateTimeFormatOptions;
  rangeSeparator?: string;
  presets?: DatePickerPreset[];
  variant?: 'button' | 'input';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  tone?: NbToneToken;
  border?: NbBorderStrength;
  calendarTone?: CalendarProps['tone'];
  calendarBorder?: CalendarProps['border'];
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="1" stroke="currentColor" strokeWidth="2.3" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function normalizeValue(mode: DatePickerMode, value: DatePickerValue): DatePickerValue {
  if (!value) return undefined;
  if (mode === 'single') {
    return value instanceof Date ? value : undefined;
  }
  if (value instanceof Date) return { from: value, to: undefined };
  return value;
}

function getAnchorElement(root: HTMLDivElement | null): HTMLElement | null {
  return root;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      id: propId,
      className,
      mode = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = 'Pick a date',
      disabled = false,
      clearable = false,
      open: controlledOpen,
      onOpenChange,
      closeOnSelect = true,
      locale = 'en-US',
      weekStartsOn = 0,
      min,
      max,
      disabledDates,
      dateFormat,
      rangeSeparator,
      presets,
      variant = 'button',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      tone,
      border,
      calendarTone,
      calendarBorder,
      style,
      ...props
    },
    ref,
  ) => {
    const group = useInputGroup();
    const isInGroup = group !== null;
    const generatedId = useId();
    const triggerId = propId ?? `neo-date-picker-trigger-${generatedId}`;
    const panelId = `neo-date-picker-panel-${generatedId}`;
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState<DatePickerValue>(
      normalizeValue(mode, defaultValue),
    );
    const value = normalizeValue(
      mode,
      controlledValue !== undefined ? controlledValue : uncontrolledValue,
    );

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    const [inputText, setInputText] = useState(() =>
      formatDatePickerValue(value, locale, { dateFormat, rangeSeparator }),
    );
    const [inputInvalid, setInputInvalid] = useState(false);
    const [month, setMonth] = useState<Date>(() => {
      if (value instanceof Date) return startOfMonth(value);
      const range = value as DateRange | undefined;
      if (range?.from) return startOfMonth(range.from);
      return startOfMonth(new Date());
    });
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({
      position: 'fixed',
      top: 0,
      left: 0,
      visibility: 'hidden',
    });

    const styles = resolveNbStyles(
      'date-picker',
      DEFAULTS,
      { tone, border },
      { radius: false, shadow: false, padding: false, gap: false },
    );

    const displayValue = formatDatePickerValue(value, locale, { dateFormat, rangeSeparator });
    const hasValue =
      mode === 'single'
        ? value instanceof Date
        : Boolean((value as DateRange | undefined)?.from);

    const constraintOptions = useMemo(
      () => ({ min, max, disabled: disabledDates }),
      [disabledDates, max, min],
    );

    const setOpen = useCallback(
      (next: boolean) => {
        if (controlledOpen === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      [controlledOpen, onOpenChange],
    );

    const setValue = useCallback(
      (next: DatePickerValue) => {
        const normalized = normalizeValue(mode, next);
        if (controlledValue === undefined) setUncontrolledValue(normalized);
        onValueChange?.(normalized);
        setInputText(formatDatePickerValue(normalized, locale, { dateFormat, rangeSeparator }));
        setInputInvalid(false);
        if (normalized instanceof Date) {
          setMonth(startOfMonth(normalized));
        } else if ((normalized as DateRange | undefined)?.from) {
          setMonth(startOfMonth((normalized as DateRange).from!));
        }
      },
      [controlledValue, dateFormat, locale, mode, onValueChange, rangeSeparator],
    );

    const closeAndFocusTrigger = useCallback(() => {
      setOpen(false);
      queueMicrotask(() => {
        if (variant === 'input') inputRef.current?.focus();
        else triggerRef.current?.focus();
      });
    }, [setOpen, variant]);

    const handleCalendarSelect = useCallback(
      (selection: CalendarSelection) => {
        if (mode === 'single') {
          const next = selection instanceof Date ? selection : undefined;
          setValue(next);
          if (closeOnSelect && next) closeAndFocusTrigger();
          return;
        }

        const range = selection as DateRange | undefined;
        setValue(range);
        if (closeOnSelect && isRangeComplete(range)) closeAndFocusTrigger();
      },
      [closeAndFocusTrigger, closeOnSelect, mode, setValue],
    );

    const clearValue = useCallback(
      (event?: React.MouseEvent | React.KeyboardEvent) => {
        event?.preventDefault();
        event?.stopPropagation();
        setValue(undefined);
        setInputText('');
        closeAndFocusTrigger();
      },
      [closeAndFocusTrigger, setValue],
    );

    const applyPreset = useCallback(
      (preset: DatePickerPreset) => {
        const next = typeof preset.value === 'function' ? preset.value() : preset.value;
        setValue(normalizeValue(mode, next));
        if (closeOnSelect && (mode === 'single' || isRangeComplete(next))) {
          closeAndFocusTrigger();
        }
      },
      [closeAndFocusTrigger, closeOnSelect, mode, setValue],
    );

    const commitInput = useCallback(() => {
      if (mode !== 'single' || variant !== 'input') return;

      if (!inputText.trim()) {
        setValue(undefined);
        return;
      }

      const parsed = parseDateInput(inputText, locale);
      if (!parsed || !isParsedDateAllowed(parsed, constraintOptions)) {
        setInputText(displayValue);
        setInputInvalid(Boolean(inputText.trim()));
        return;
      }

      setValue(parsed);
    }, [constraintOptions, displayValue, inputText, locale, mode, setValue, variant]);

    const updatePanelPosition = useCallback(() => {
      const anchor = getAnchorElement(rootRef.current);
      const panel = panelRef.current;
      if (!anchor || !panel) return;

      const rect = anchor.getBoundingClientRect();
      const viewportPadding = 16;
      const width = rect.width;

      let left = rect.left;
      if (left + width > window.innerWidth - viewportPadding) {
        left = window.innerWidth - width - viewportPadding;
      }
      if (left < viewportPadding) left = viewportPadding;

      setPanelStyle({
        position: 'fixed',
        top: rect.bottom + PANEL_GAP,
        left,
        width,
        zIndex: 50,
        visibility: 'visible',
      });
    }, []);

    useEffect(() => {
      if (variant !== 'input') return;
      setInputText(displayValue);
      setInputInvalid(false);
    }, [displayValue, variant]);

    useLayoutEffect(() => {
      if (!open) return;
      updatePanelPosition();
      const handleLayout = () => updatePanelPosition();
      window.addEventListener('resize', handleLayout);
      window.addEventListener('scroll', handleLayout, true);
      return () => {
        window.removeEventListener('resize', handleLayout);
        window.removeEventListener('scroll', handleLayout, true);
      };
    }, [month, open, presets, updatePanelPosition, value]);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: globalThis.MouseEvent) => {
        const target = event.target as Node;
        if (rootRef.current?.contains(target)) return;
        if (panelRef.current?.contains(target)) return;
        setOpen(false);
      };
      const onKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeAndFocusTrigger();
        }
      };
      document.addEventListener('mousedown', onPointerDown);
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('mousedown', onPointerDown);
        document.removeEventListener('keydown', onKeyDown);
      };
    }, [closeAndFocusTrigger, open, setOpen]);

    const openPanelOnKey = (event: KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!disabled) setOpen(true);
      }
    };

    const calendarMode: CalendarMode = mode;
    const calendarSelected: CalendarSelection =
      mode === 'single'
        ? value instanceof Date
          ? value
          : undefined
        : (value as DateRange | undefined);

    const clearButtonClass =
      'inline-flex size-8 shrink-0 items-center justify-center font-black text-(--nb-date-picker-fg) hover:bg-(--nb-yellow) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-date-picker-border)';

    const panel = open ? (
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="Choose date"
        style={panelStyle}
        className={cn(
          'max-w-[calc(100vw-2rem)]',
          'rounded-(--nb-date-picker-radius) border-2 border-(--nb-date-picker-border) bg-(--nb-date-picker-panel-bg)',
          'shadow-nb',
        )}
      >
        {presets && presets.length > 0 ? (
          <div className="flex flex-wrap gap-2 border-b-2 border-(--nb-date-picker-border) p-3">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="border-2 border-(--nb-date-picker-border) bg-(--nb-paper) px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0_0_var(--nb-shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        ) : null}
        <Calendar
          mode={calendarMode}
          selected={calendarSelected}
          onSelect={handleCalendarSelect}
          month={month}
          onMonthChange={setMonth}
          locale={locale}
          weekStartsOn={weekStartsOn}
          min={min}
          max={max}
          disabled={disabledDates}
          tone={calendarTone}
          border={calendarBorder}
          className="w-full max-w-none border-0 shadow-none"
        />
      </div>
    ) : null;

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        data-variant={variant}
        className={cn(
          styles.className,
          '[--nb-date-picker-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
          '[--nb-date-picker-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
          '[--nb-date-picker-radius:var(--nb-radius)]',
          '[--nb-date-picker-panel-bg:var(--_nb-tone-bg-token,var(--_nb-tone-bg-default))]',
          isInGroup
            ? 'block w-full'
            : [
                'relative block w-full',
                'rounded-(--nb-date-picker-radius)',
                'shadow-nb',
                'focus-within:outline-none focus-within:ring-2 focus-within:ring-(--nb-date-picker-border)',
                'focus-within:ring-offset-2 focus-within:shadow-none',
                'data-[disabled]:border-gray-400 data-[disabled]:shadow-[5px_5px_0_0_#a3a3a3]',
                'has-[[aria-invalid=true]]:border-(--nb-danger)',
                'has-[[aria-invalid=true]]:focus-within:ring-(--nb-danger)',
                'has-[input[aria-invalid=true]]:border-(--nb-danger)',
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
        {variant === 'input' ? (
          <div className="flex h-14 w-full items-center">
            <input
              ref={inputRef}
              id={triggerId}
              type="text"
              inputMode="text"
              disabled={disabled}
              value={inputText}
              placeholder={placeholder}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              aria-describedby={ariaDescribedby}
              aria-invalid={ariaInvalid || inputInvalid || undefined}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={panelId}
              onChange={(event) => {
                setInputText(event.target.value);
                setInputInvalid(false);
              }}
              onBlur={commitInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  commitInput();
                  return;
                }
                openPanelOnKey(event);
              }}
              onFocus={() => !disabled && setOpen(true)}
              className={cn(
                'min-w-0 flex-1 bg-transparent font-mono text-base font-bold text-(--nb-date-picker-fg)',
                'placeholder:text-gray-400 focus-visible:outline-none',
                'disabled:cursor-not-allowed disabled:text-gray-400',
                inputInvalid && 'text-(--nb-danger)',
                isInGroup ? 'px-3' : 'px-5',
              )}
            />
            {clearable && hasValue && !disabled ? (
              <button
                type="button"
                aria-label="Clear date"
                onClick={clearValue}
                className={cn(clearButtonClass, 'mr-1')}
              >
                ×
              </button>
            ) : null}
            <button
              ref={triggerRef}
              type="button"
              disabled={disabled}
              aria-label="Open calendar"
              onClick={() => !disabled && setOpen(!open)}
              onKeyDown={openPanelOnKey}
              className="inline-flex size-14 shrink-0 items-center justify-center border-l-2 border-(--nb-date-picker-border) text-(--nb-date-picker-fg) disabled:cursor-not-allowed disabled:text-gray-400"
            >
              <CalendarIcon className="size-5" />
            </button>
          </div>
        ) : (
          <div className="flex h-14 w-full items-center">
            <button
              ref={triggerRef}
              type="button"
              id={triggerId}
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              aria-describedby={ariaDescribedby}
              aria-invalid={ariaInvalid || undefined}
              onClick={() => !disabled && setOpen(!open)}
              onKeyDown={openPanelOnKey}
              className={cn(
                'flex min-w-0 flex-1 items-center gap-3 font-mono text-base font-bold',
                'text-(--nb-date-picker-fg) transition-all duration-150',
                'disabled:cursor-not-allowed disabled:text-gray-400',
                isInGroup
                  ? 'bg-transparent px-3 focus-visible:outline-none'
                  : 'bg-transparent px-5 focus-visible:outline-none',
              )}
            >
              <CalendarIcon className="size-5 shrink-0" />
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-left',
                  displayValue ? 'text-(--nb-date-picker-fg)' : 'text-gray-400',
                )}
              >
                {displayValue || placeholder}
              </span>
              <svg
                className="size-6 shrink-0 fill-none stroke-current stroke-3 stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
              </svg>
            </button>
            {clearable && hasValue && !disabled ? (
              <button
                type="button"
                aria-label="Clear date"
                onClick={clearValue}
                className={cn(clearButtonClass, 'mr-1 border-l-2 border-(--nb-date-picker-border)')}
              >
                ×
              </button>
            ) : null}
          </div>
        )}

        {typeof document !== 'undefined' && panel
          ? createPortal(panel, document.body)
          : null}
      </div>
    );
  },
);
DatePicker.displayName = 'DatePicker';
