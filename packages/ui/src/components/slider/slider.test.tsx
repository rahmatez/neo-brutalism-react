import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Slider } from './index';

describe('Slider', () => {
  it('renders range input and emits change events', () => {
    const onChange = vi.fn();

    renderWithProvider(
      <Slider aria-label="Volume" defaultValue={40} onChange={onChange} min={0} max={100} />,
    );

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('type', 'range');

    fireEvent.change(slider, { target: { value: '70' } });
    expect(onChange).toHaveBeenCalled();
  });
});
