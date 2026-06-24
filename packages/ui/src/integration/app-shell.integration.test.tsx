import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

import { renderWithProvider } from '../test/render';
import { Button } from '../components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  type DialogHandle,
} from '../components/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuButtonLabel,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../components/sidebar';

afterEach(() => cleanup());

describe('App shell integration', () => {
  it('collapses sidebar and opens a dialog from the main inset', () => {
    const dialogRef = createRef<DialogHandle>();

    renderWithProvider(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLabel>Neo Docs</SidebarHeaderLabel>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Home">
                  <span aria-hidden="true">⌂</span>
                  <SidebarMenuButtonLabel>Home</SidebarMenuButtonLabel>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger>Menu</SidebarTrigger>
          <Button type="button" onClick={() => dialogRef.current?.open()}>
            New item
          </Button>
          <Dialog ref={dialogRef}>
            <DialogContent className="p-6">
              <DialogTitle>Create item</DialogTitle>
              <DialogClose>Close</DialogClose>
            </DialogContent>
          </Dialog>
        </SidebarInset>
      </SidebarProvider>,
    );

    const sidebar = document.querySelector('[data-nb-sidebar]');
    const trigger = screen.getByRole('button', { name: 'Menu' });

    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.getAttribute('aria-controls')).toBe(sidebar?.id);

    fireEvent.click(trigger);
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'New item' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Create item' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
