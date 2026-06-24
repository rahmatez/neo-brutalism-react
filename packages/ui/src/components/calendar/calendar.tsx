'use client';

import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../core/cn';
import {
  resolveNbStyles,
  type NbStyleDefaults,
} from '../../core/resolve-nb-styles';
import type { NbBorderStrength } from '../../tokens/border';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbToneToken } from '../../tokens/tone';
import { nbToneVars } from '../../tokens/tone';
import {
  addMonths,
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  isBetweenDays,
  isDateDisabled,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  type DateRange,
  type DisabledMatcher,
  type WeekStartsOn,
} from './calendar-utils';

const DEFAULTS: NbStyleDefaults = {
  tone: 'cream',
  radius: 'md',
  shadow: 'hard',
  border: 'strong',
};

export type CalendarMode = 'single' | 'range' | 'multiple';
export type CalendarSelection = Date | DateRange | Date[] | undefined;

export interface CalendarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onSelect'> {
  mode?: CalendarMode;
  selected?: CalendarSelection;
  defaultSelected?: CalendarSelection;
  onSelect?: (value: CalendarSelection) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  weekStartsOn?: WeekStartsOn;
  locale?: string;
  min?: Date;
  max?: Date;
  disabled?: DisabledMatcher;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  selectedTone?: NbToneToken;
  rangeTone?: NbToneToken;
  todayTone?: NbToneToken;
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 stroke-[3px]"
      fill="none"
      stroke="currentColor"
    >
      {direction === 'left' ? (
        <path d="M15 6 9 12l6 6" strokeLinecap="square" />
      ) : (
        <path d="m9 6 6 6-6 6" strokeLinecap="square" />
      )}
    </svg>
  );
}

function normalizeSelection(mode: CalendarMode, value: CalendarSelection): CalendarSelection {
  if (mode === 'single') {
    return value instanceof Date ? startOfDay(value) : undefined;
  }
  if (mode === 'range') {
    const range = value as DateRange | undefined;
    if (!range) return undefined;
    return {
      from: range.from ? startOfDay(range.from) : undefined,
      to: range.to ? startOfDay(range.to) : undefined,
    };
  }
  return Array.isArray(value) ? value.map(startOfDay) : [];
}

function isDaySelected(mode: CalendarMode, day: Date, selected: CalendarSelection): boolean {
  if (mode === 'single') {
    return selected instanceof Date && isSameDay(selected, day);
  }
  if (mode === 'range') {
    const range = selected as DateRange | undefined;
    if (!range?.from) return false;
    if (range.from && !range.to) return isSameDay(range.from, day);
    return isBetweenDays(day, range.from, range.to!);
  }
  return Array.isArray(selected) && selected.some((entry) => isSameDay(entry, day));
}

function getRangePosition(day: Date, range?: DateRange): 'start' | 'end' | 'middle' | undefined {
  if (!range?.from || !range.to) {
    if (range?.from && isSameDay(range.from, day)) return 'start';
    return undefined;
  }
  if (isSameDay(day, range.from)) return 'start';
  if (isSameDay(day, range.to)) return 'end';
  if (isBetweenDays(day, range.from, range.to)) return 'middle';
  return undefined;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      mode = 'single',
      selected: controlledSelected,
      defaultSelected,
      onSelect,
      month: controlledMonth,
      defaultMonth,
      onMonthChange,
      weekStartsOn = 0,
      locale = 'en-US',
      min,
      max,
      disabled,
      showOutsideDays = true,
      fixedWeeks = true,
      selectedTone = 'mint',
      rangeTone = 'lavender',
      todayTone = 'yellow',
      tone,
      radius,
      shadow,
      border,
      style,
      ...props
    },
    ref,
  ) => {
    const styles = resolveNbStyles('calendar', DEFAULTS, { tone, radius, shadow, border });
    const selectedVars = nbToneVars(selectedTone);
    const rangeVars = nbToneVars(rangeTone);
    const todayVars = nbToneVars(todayTone);

    const [uncontrolledMonth, setUncontrolledMonth] = useState(
      startOfMonth(defaultMonth ?? new Date()),
    );
    const [uncontrolledSelected, setUncontrolledSelected] = useState<CalendarSelection>(
      normalizeSelection(mode, defaultSelected),
    );

    const month = startOfMonth(controlledMonth ?? uncontrolledMonth);
    const selected = normalizeSelection(
      mode,
      controlledSelected !== undefined ? controlledSelected : uncontrolledSelected,
    );

    const setMonth = useCallback(
      (next: Date) => {
        const normalized = startOfMonth(next);
        if (controlledMonth === undefined) setUncontrolledMonth(normalized);
        onMonthChange?.(normalized);
      },
      [controlledMonth, onMonthChange],
    );

    const setSelected = useCallback(
      (next: CalendarSelection) => {
        const normalized = normalizeSelection(mode, next);
        if (controlledSelected === undefined) setUncontrolledSelected(normalized);
        onSelect?.(normalized);
      },
      [controlledSelected, mode, onSelect],
    );

    const weekdays = useMemo(
      () => getWeekdayLabels(locale, weekStartsOn),
      [locale, weekStartsOn],
    );
    const days = useMemo(
      () => getCalendarDays(month, weekStartsOn, fixedWeeks),
      [fixedWeeks, month, weekStartsOn],
    );
    const weeks = useMemo(() => {
      const rows: Date[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7));
      }
      return rows;
    }, [days]);

    const focusDay = useMemo(() => {
      if (mode === 'single' && selected instanceof Date) return selected;
      if (mode === 'range') {
        const range = selected as DateRange | undefined;
        return range?.from;
      }
      if (mode === 'multiple' && Array.isArray(selected) && selected.length > 0) {
        return selected[0];
      }
      return startOfDay(new Date());
    }, [mode, selected]);

    const disabledOptions = useMemo(() => ({ min, max, disabled }), [disabled, max, min]);

    const handleDaySelect = useCallback(
      (day: Date) => {
        if (isDateDisabled(day, disabledOptions)) return;

        if (mode === 'single') {
          setSelected(day);
          return;
        }

        if (mode === 'multiple') {
          const current = Array.isArray(selected) ? selected : [];
          const exists = current.some((entry) => isSameDay(entry, day));
          setSelected(
            exists
              ? current.filter((entry) => !isSameDay(entry, day))
              : [...current, day],
          );
          return;
        }

        const range = (selected as DateRange | undefined) ?? {};
        if (!range.from || (range.from && range.to)) {
          setSelected({ from: day, to: undefined });
          return;
        }

        if (isBeforeOrSame(day, range.from)) {
          setSelected({ from: day, to: range.from });
        } else {
          setSelected({ from: range.from, to: day });
        }
      },
      [disabledOptions, mode, selected, setSelected],
    );

    const handleDayKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>, day: Date) => {
        const delta: Record<string, number> = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -7,
          ArrowDown: 7,
        };
        const offset = delta[event.key];
        if (offset === undefined) return;
        event.preventDefault();
        const next = new Date(day);
        next.setDate(day.getDate() + offset);
        const button = event.currentTarget
          .closest('[data-nb-calendar]')
          ?.querySelector<HTMLButtonElement>(`[data-day="${next.toISOString()}"]`);
        button?.focus();
        if (!isSameMonth(next, month)) {
          setMonth(next);
        }
      },
      [month, setMonth],
    );

    return (
      <div
        ref={ref}
        data-nb-calendar=""
        className={cn(
          styles.className,
          'inline-block w-full max-w-sm p-4',
          className,
        )}
        style={{
          ...styles.style,
          ['--nb-calendar-selected-bg' as string]: selectedVars.bg,
          ['--nb-calendar-selected-fg' as string]: selectedVars.fg,
          ['--nb-calendar-range-bg' as string]: rangeVars.bg,
          ['--nb-calendar-today-bg' as string]: todayVars.bg,
          ...style,
        }}
        {...styles.dataAttributes}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label="Previous month"
            className={navButtonClass}
            onClick={() => setMonth(addMonths(month, -1))}
          >
            <ChevronIcon direction="left" />
          </button>
          <p className="text-center text-sm font-black uppercase tracking-wide">
            {formatMonthYear(month, locale)}
          </p>
          <button
            type="button"
            aria-label="Next month"
            className={navButtonClass}
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <table className="w-full border-collapse" role="grid" aria-label={formatMonthYear(month, locale)}>
          <thead>
            <tr className="text-xs font-black uppercase tracking-wide">
              {weekdays.map((label) => (
                <th key={label} scope="col" className="pb-2 text-center font-black">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week) => (
              <tr key={week[0].toISOString()}>
                {week.map((day) => {
                  const outside = !isSameMonth(day, month);
                  if (outside && !showOutsideDays) {
                    return <td key={day.toISOString()} className="p-0.5" aria-hidden="true" />;
                  }

                  const isDisabled = isDateDisabled(day, disabledOptions);
                  const selectedDay = isDaySelected(mode, day, selected);
                  const rangePosition =
                    mode === 'range' ? getRangePosition(day, selected as DateRange) : undefined;
                  const today = isToday(day);

                  return (
                    <td key={day.toISOString()} className="p-0.5" role="presentation">
                      <button
                        type="button"
                        role="gridcell"
                        data-day={day.toISOString()}
                        data-outside={outside ? 'true' : undefined}
                        data-today={today ? 'true' : undefined}
                        data-selected={selectedDay ? 'true' : undefined}
                        data-range={rangePosition}
                        disabled={isDisabled}
                        aria-selected={selectedDay}
                        aria-label={day.toLocaleDateString(locale, {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        tabIndex={focusDay && isSameDay(day, focusDay) ? 0 : -1}
                        className={cn(dayButtonClass, outside && 'opacity-35')}
                        onClick={() => handleDaySelect(day)}
                        onKeyDown={(event) => handleDayKeyDown(event, day)}
                      >
                        {day.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
Calendar.displayName = 'Calendar';

function isBeforeOrSame(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() <= startOfDay(b).getTime();
}

const navButtonClass = cn(
  'inline-flex size-10 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper)',
  'font-black shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform',
  'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
);

const dayButtonClass = cn(
  'relative flex size-10 w-full items-center justify-center border-2 border-transparent',
  'text-sm font-bold transition-colors',
  'focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-1',
  'disabled:cursor-not-allowed disabled:opacity-40',
  'data-[today=true]:border-(--nb-border) data-[today=true]:bg-(--nb-calendar-today-bg)',
  'data-[selected=true]:border-(--nb-border) data-[selected=true]:bg-(--nb-calendar-selected-bg)',
  'data-[selected=true]:text-(--nb-calendar-selected-fg) data-[selected=true]:shadow-[2px_2px_0_0_var(--nb-shadow)]',
  'data-[range=middle]:rounded-none data-[range=middle]:border-x-0 data-[range=middle]:bg-(--nb-calendar-range-bg)',
  'data-[range=middle]:shadow-none',
  'data-[range=start]:rounded-r-none data-[range=start]:bg-(--nb-calendar-selected-bg)',
  'data-[range=end]:rounded-l-none data-[range=end]:bg-(--nb-calendar-selected-bg)',
  'hover:bg-(--nb-yellow)',
);
