import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Switch } from './switch';

describe('Switch', () => {
  it('toggles checked state when clicked', () => {
    renderWithProvider(<Switch aria-label="Notifications" />);

    const input = screen.getByRole('switch');
    expect(input).not.toBeChecked();

    fireEvent.click(input);
    expect(input).toBeChecked();

    fireEvent.click(input);
    expect(input).not.toBeChecked();
  });

  it('moves thumb when checked via controlled state', () => {
    const { rerender } = renderWithProvider(
      <Switch aria-label="Notifications" checked={false} onChange={() => {}} />,
    );

    const track = screen.getByRole('switch').nextElementSibling as HTMLElement;
    const thumb = track.querySelector('span > span') as HTMLElement;

    expect(thumb.className).not.toContain('translate-x-5');

    rerender(
      <Switch aria-label="Notifications" checked onChange={() => {}} />,
    );

    expect(track.className).toContain('peer-checked:[&>span]:translate-x-5');
    expect(screen.getByRole('switch')).toBeChecked();
  });
});
