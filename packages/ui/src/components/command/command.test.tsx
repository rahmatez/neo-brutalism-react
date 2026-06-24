import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';

afterEach(() => cleanup());

describe('Command', () => {
  it('filters items while searching', () => {
    renderWithProvider(
      <Command label="Test menu">
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Frameworks">
            <CommandItem value="react">React</CommandItem>
            <CommandItem value="vue">Vue</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );

    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'vue' } });

    expect(screen.getByText('Vue')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('calls onSelect when an item is chosen', () => {
    const onSelect = vi.fn();

    renderWithProvider(
      <Command label="Test menu">
        <CommandInput />
        <CommandList>
          <CommandItem value="calendar" onSelect={onSelect}>
            Calendar
          </CommandItem>
        </CommandList>
      </Command>,
    );

    fireEvent.click(screen.getByText('Calendar'));
    expect(onSelect).toHaveBeenCalledWith('calendar');
  });
});
