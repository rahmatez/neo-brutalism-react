import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { DatePicker } from './date-picker';
import { startOfDay } from '../calendar/calendar-utils';

describe('DatePicker', () => {
  it('opens the calendar panel from the trigger', () => {
    renderWithProvider(<DatePicker placeholder="Pick a date" />);

    fireEvent.click(screen.getByRole('button', { name: /pick a date/i }));
    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('associates id with the trigger button', () => {
    renderWithProvider(<DatePicker id="event-date" placeholder="Pick a date" />);
    expect(document.getElementById('event-date')).toBe(screen.getByRole('button', { name: /pick a date/i }));
  });

  it('calls onValueChange when a day is selected', () => {
    const onValueChange = vi.fn();
    const today = startOfDay(new Date());
    const target = startOfDay(new Date(today.getFullYear(), today.getMonth(), 20));

    renderWithProvider(
      <DatePicker
        defaultValue={today}
        onValueChange={onValueChange}
        closeOnSelect={false}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: today.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      }),
    );
    const dayButton = screen.getByRole('gridcell', {
      name: target.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    fireEvent.click(dayButton);

    expect(onValueChange).toHaveBeenCalledWith(target);
  });

  it('parses typed input on blur in input variant', () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <DatePicker variant="input" placeholder="MM/DD/YYYY" onValueChange={onValueChange} />,
    );

    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: '06/15/2026' } });
    fireEvent.blur(input);

    expect(onValueChange).toHaveBeenCalledWith(startOfDay(new Date(2026, 5, 15)));
  });

  it('rejects typed dates outside min/max on blur', () => {
    const onValueChange = vi.fn();
    const min = startOfDay(new Date(2026, 5, 10));
    const max = startOfDay(new Date(2026, 5, 20));

    renderWithProvider(
      <DatePicker
        variant="input"
        placeholder="MM/DD/YYYY"
        min={min}
        max={max}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByPlaceholderText('MM/DD/YYYY') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '06/01/2026' } });
    fireEvent.blur(input);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(input.value).toBe('');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('clears the value from the separate clear button', () => {
    const onValueChange = vi.fn();
    const today = startOfDay(new Date());

    renderWithProvider(
      <DatePicker clearable defaultValue={today} onValueChange={onValueChange} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear date' }));
    expect(onValueChange).toHaveBeenCalledWith(undefined);
  });
});
