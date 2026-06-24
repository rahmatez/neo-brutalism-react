import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Select, SelectOption } from './index';

describe('Select', () => {
  it('opens listbox and selects an option', () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <Select aria-label="Framework" defaultValue={null} onValueChange={onValueChange}>
        <SelectOption value="react">React</SelectOption>
        <SelectOption value="vue">Vue</SelectOption>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Framework' }));
    fireEvent.click(screen.getByRole('option', { name: 'React' }));

    expect(onValueChange).toHaveBeenCalledWith('react');
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('does not leak internal props to the DOM', () => {
    renderWithProvider(
      <Select aria-label="Framework" defaultValue={null}>
        <SelectOption value="react">React</SelectOption>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Framework' }));

    const optionWrapper = screen.getByRole('option', { name: 'React' }).parentElement;
    expect(optionWrapper).not.toHaveAttribute('optionIndex');
    expect(optionWrapper).not.toHaveAttribute('totalOptions');
    expect(optionWrapper).not.toHaveAttribute('parentDisabled');
  });
});
