import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());
import { renderWithProvider } from '../../test/render';
import { Combobox, ComboboxOption } from './combobox';

describe('Combobox', () => {
  it('renders and filters options while searching', () => {
    renderWithProvider(
      <Combobox placeholder="Pick a framework">
        <ComboboxOption value="react" label="React" />
        <ComboboxOption value="vue" label="Vue" />
        <ComboboxOption value="svelte" label="Svelte" />
      </Combobox>,
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'vue' } });

    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument();
  });

  it('calls onValueChange when an option is selected', () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <Combobox onValueChange={onValueChange}>
        <ComboboxOption value="react" label="React" />
        <ComboboxOption value="vue" label="Vue" />
      </Combobox>,
    );

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'React' }));

    expect(onValueChange).toHaveBeenCalledWith('react');
  });
});
