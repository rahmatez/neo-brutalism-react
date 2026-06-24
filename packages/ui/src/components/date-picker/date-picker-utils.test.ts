import { describe, expect, it } from 'vitest';
import { startOfDay } from '../calendar/calendar-utils';
import { getNumericDateOrder, isParsedDateAllowed, parseDateInput } from './date-picker-utils';

describe('date-picker-utils', () => {
  it('parses US numeric dates as month/day/year', () => {
    expect(parseDateInput('06/15/2026', 'en-US')).toEqual(startOfDay(new Date(2026, 5, 15)));
  });

  it('parses UK numeric dates as day/month/year', () => {
    expect(parseDateInput('15/06/2026', 'en-GB')).toEqual(startOfDay(new Date(2026, 5, 15)));
  });

  it('detects numeric date order from locale', () => {
    expect(getNumericDateOrder('en-US')).toBe('mdy');
    expect(getNumericDateOrder('en-GB')).toBe('dmy');
  });

  it('rejects dates outside allowed constraints', () => {
    const min = startOfDay(new Date(2026, 5, 10));
    const max = startOfDay(new Date(2026, 5, 20));
    expect(isParsedDateAllowed(startOfDay(new Date(2026, 5, 15)), { min, max })).toBe(true);
    expect(isParsedDateAllowed(startOfDay(new Date(2026, 5, 1)), { min, max })).toBe(false);
  });
});
