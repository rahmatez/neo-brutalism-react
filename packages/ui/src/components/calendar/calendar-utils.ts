export type WeekStartsOn = 0 | 1;

export interface DateRange {
  from?: Date;
  to?: Date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount, 1);
  return startOfMonth(next);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isToday(date: Date): boolean {
  return isSameDay(date, startOfDay(new Date()));
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function isBetweenDays(date: Date, from: Date, to: Date): boolean {
  const time = startOfDay(date).getTime();
  const start = startOfDay(from).getTime();
  const end = startOfDay(to).getTime();
  return time >= Math.min(start, end) && time <= Math.max(start, end);
}

export function getWeekdayLabels(locale: string, weekStartsOn: WeekStartsOn): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const labels: string[] = [];
  const base = new Date(2024, 0, weekStartsOn === 0 ? 7 : 1);
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(base);
    day.setDate(base.getDate() + i);
    labels.push(formatter.format(day));
  }
  return labels;
}

export function formatMonthYear(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
}

export function getCalendarDays(
  month: Date,
  weekStartsOn: WeekStartsOn,
  fixedWeeks = true,
): Date[] {
  const monthStart = startOfMonth(month);
  const startOffset = (monthStart.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startOffset);

  const minDays = fixedWeeks ? 42 : 35;
  let dayCount = minDays;

  if (!fixedWeeks) {
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const trailing = (7 - ((startOffset + daysInMonth) % 7)) % 7;
    dayCount = startOffset + daysInMonth + trailing;
  }

  return Array.from({ length: dayCount }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return startOfDay(day);
  });
}

export type DisabledMatcher = Date[] | ((date: Date) => boolean);

export function isDateDisabled(
  date: Date,
  options: {
    min?: Date;
    max?: Date;
    disabled?: DisabledMatcher;
  },
): boolean {
  const { min, max, disabled } = options;
  if (min && isBeforeDay(date, min)) return true;
  if (max && isAfterDay(date, max)) return true;
  if (!disabled) return false;
  if (Array.isArray(disabled)) {
    return disabled.some((entry) => isSameDay(entry, date));
  }
  return disabled(date);
}
