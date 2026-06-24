import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { InputOTP } from './index';

describe('InputOTP', () => {
  it('accepts digit entry and paste of full code', () => {
    const onChange = vi.fn();

    renderWithProvider(<InputOTP length={4} value="" onChange={onChange} aria-label="Verification code" />);

    const digits = screen.getAllByRole('textbox');
    expect(digits).toHaveLength(4);

    fireEvent.change(digits[0]!, { target: { value: '1' } });
    expect(onChange).toHaveBeenLastCalledWith('1');

    fireEvent.paste(digits[1]!, {
      clipboardData: { getData: () => '2345' },
    });
    expect(onChange).toHaveBeenLastCalledWith('2345');
  });

  it('exposes a labelled group role', () => {
    renderWithProvider(<InputOTP aria-label="Verification code" />);
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
  });
});
