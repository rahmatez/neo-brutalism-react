import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('toggles checked state', () => {
    const onChange = vi.fn();

    renderWithProvider(
      <Checkbox aria-label="Accept terms" onChange={onChange} />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });
});
