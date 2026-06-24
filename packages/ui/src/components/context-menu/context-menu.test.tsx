import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './context-menu';

afterEach(() => cleanup());

describe('ContextMenu', () => {
  it('opens on context menu event and calls item select', async () => {
    const onSelect = vi.fn();

    renderWithProvider(
      <ContextMenu>
        <ContextMenuTrigger className="flex h-24 w-48 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-bold">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Right click here'));
    fireEvent.click(await screen.findByText('Copy'));

    expect(onSelect).toHaveBeenCalled();
  });
});
