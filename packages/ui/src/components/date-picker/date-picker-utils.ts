import type { DateRange, DisabledMatcher } from '../calendar/calendar-utils';
import { isDateDisabled, startOfDay } from '../calendar/calendar-utils';

export type DatePickerMode = 'single' | 'range';
export type DatePickerValue = Date | DateRange | undefined;

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export function formatDateValue(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT,
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDatePickerValue(
  value: DatePickerValue,
  locale: string,
  options?: {
    dateFormat?: Intl.DateTimeFormatOptions;
    rangeSeparator?: string;
  },
): string {
  if (!value) return '';

  const dateFormat = options?.dateFormat ?? DEFAULT_DATE_FORMAT;
  const rangeSeparator = options?.rangeSeparator ?? ' – ';

  if (value instanceof Date) {
    return formatDateValue(value, locale, dateFormat);
  }

  const range = value as DateRange;
  if (!range.from) return '';
  const from = formatDateValue(range.from, locale, dateFormat);
  if (!range.to) return `${from}${rangeSeparator}…`;
  return `${from}${rangeSeparator}${formatDateValue(range.to, locale, dateFormat)}`;
}

export type NumericDateOrder = 'mdy' | 'dmy' | 'ymd';

export function getNumericDateOrder(locale: string): NumericDateOrder {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(2006, 10, 22));
  const order = parts
    .filter((part) => part.type === 'day' || part.type === 'month' || part.type === 'year')
    .map((part) => part.type);

  if (order[0] === 'year') return 'ymd';
  if (order[0] === 'month') return 'mdy';
  return 'dmy';
}

export function parseDateInput(text: string, locale: string): Date | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;

  const localeParsed = tryLocaleDateParse(trimmed, locale);
  if (localeParsed) return startOfDay(localeParsed);

  const timestamp = Date.parse(trimmed);
  if (!Number.isNaN(timestamp)) return startOfDay(new Date(timestamp));

  const numericParsed = tryNumericDateParse(trimmed, locale);
  if (numericParsed) return startOfDay(numericParsed);

  return undefined;
}

export function isParsedDateAllowed(
  date: Date,
  options: {
    min?: Date;
    max?: Date;
    disabled?: DisabledMatcher;
  },
): boolean {
  return !isDateDisabled(date, options);
}

function tryNumericDateParse(text: string, locale: string): Date | undefined {
  const parts = text.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
  if (!parts) return undefined;

  const first = Number(parts[1]);
  const second = Number(parts[2]);
  const year = Number(parts[3].length === 2 ? `20${parts[3]}` : parts[3]);
  const order = getNumericDateOrder(locale);

  let month: number;
  let day: number;

  if (order === 'mdy') {
    month = first - 1;
    day = second;
  } else {
    month = second - 1;
    day = first;
  }

  const candidate = new Date(year, month, day);
  if (
    candidate.getFullYear() === year &&
    candidate.getMonth() === month &&
    candidate.getDate() === day
  ) {
    return candidate;
  }

  return undefined;
}

function tryLocaleDateParse(text: string, locale: string): Date | undefined {
  const patterns = [
    /^(?<month>[A-Za-z]+)\s+(?<day>\d{1,2}),?\s+(?<year>\d{4})$/,
    /^(?<day>\d{1,2})\s+(?<month>[A-Za-z]+)\s+(?<year>\d{4})$/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match?.groups) continue;
    const { day, month, year } = match.groups;
    const parsedMonth = parseMonthName(month, locale);
    if (parsedMonth === undefined) continue;
    const candidate = new Date(Number(year), parsedMonth, Number(day));
    if (
      candidate.getFullYear() === Number(year) &&
      candidate.getMonth() === parsedMonth &&
      candidate.getDate() === Number(day)
    ) {
      return candidate;
    }
  }

  return undefined;
}

function parseMonthName(name: string, locale: string): number | undefined {
  const normalized = name.trim().toLowerCase();
  for (let month = 0; month < 12; month += 1) {
    const long = new Intl.DateTimeFormat(locale, { month: 'long' })
      .format(new Date(2024, month, 1))
      .toLowerCase();
    const short = new Intl.DateTimeFormat(locale, { month: 'short' })
      .format(new Date(2024, month, 1))
      .toLowerCase();
    if (normalized === long || normalized === short) return month;
  }
  return undefined;
}

export function isRangeComplete(value: DatePickerValue): boolean {
  if (!value || value instanceof Date) return value instanceof Date;
  return Boolean(value.from && value.to);
}
