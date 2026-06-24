import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from './index';

describe('Menubar', () => {
  it('renders menu triggers', () => {
    renderWithProvider(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
  });

  it('opens a menu with arrow down', async () => {
    renderWithProvider(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const file = screen.getByRole('menuitem', { name: 'File' });
    file.focus();
    fireEvent.keyDown(file, { key: 'ArrowDown' });

    expect(await screen.findByRole('menuitem', { name: 'New' })).toBeInTheDocument();
  });

  it('opens a menu with enter on a focused trigger', async () => {
    renderWithProvider(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const edit = screen.getByRole('menuitem', { name: 'Edit' });
    edit.focus();
    fireEvent.keyDown(edit, { key: 'Enter' });

    expect(await screen.findByRole('menuitem', { name: 'Undo' })).toBeInTheDocument();
  });

  it('fires onCheckedChange for checkbox items', async () => {
    const onToolbarChange = vi.fn();

    renderWithProvider(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked onCheckedChange={onToolbarChange}>
              Toolbar
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const view = screen.getByRole('menuitem', { name: 'View' });
    view.focus();
    fireEvent.keyDown(view, { key: 'ArrowDown' });

    fireEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Toolbar' }));
    expect(onToolbarChange).toHaveBeenCalledWith(false);
  });

  it('fires onValueChange for radio items', async () => {
    const onThemeChange = vi.fn();

    renderWithProvider(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="neo" onValueChange={onThemeChange}>
              <MenubarRadioItem value="neo">Neo</MenubarRadioItem>
              <MenubarRadioItem value="paper">Paper</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const view = screen.getByRole('menuitem', { name: 'View' });
    view.focus();
    fireEvent.keyDown(view, { key: 'ArrowDown' });

    fireEvent.click(await screen.findByRole('menuitemradio', { name: 'Paper' }));
    expect(onThemeChange).toHaveBeenCalledWith('paper');
  });
});
