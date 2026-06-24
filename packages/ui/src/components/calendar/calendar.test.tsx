import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Calendar } from './index';

describe('Calendar', () => {
  it('renders month grid and selects a day in single mode', () => {
    const onSelect = vi.fn();

    renderWithProvider(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 5, 1)}
        onSelect={onSelect}
      />,
    );

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('June 2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('gridcell', { name: /june 15, 2026/i }));
    expect(onSelect).toHaveBeenCalled();
  });
});
