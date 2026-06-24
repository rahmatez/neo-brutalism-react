import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
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
} from './index';

describe('Sidebar', () => {
  it('toggles collapsed state', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader>App</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SidebarMenuButtonLabel>Home</SidebarMenuButtonLabel>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger>Toggle</SidebarTrigger>
        </SidebarInset>
      </SidebarProvider>,
    );

    const sidebar = document.querySelector('[data-nb-sidebar]');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
  });

  it('hides menu labels when collapsed', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
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
      </SidebarProvider>,
    );

    const label = screen.getByText('Home');
    expect(label.className).toContain('group-data-[state=collapsed]/sidebar:sr-only');
    expect(document.querySelector('[data-nb-sidebar]')).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('title', 'Home');
  });

  it('supports asChild with anchor links', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/docs">Docs</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('data-nb-sidebar-menu-button', '');
    expect(link).toHaveAttribute('data-active', '');
  });

  it('does not collapse when collapsible is false', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen collapsible={false}>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger>Toggle</SidebarTrigger>
        </SidebarInset>
      </SidebarProvider>,
    );

    const sidebar = document.querySelector('[data-nb-sidebar]');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(screen.queryByRole('button', { name: 'Toggle' })).not.toBeInTheDocument();
  });

  it('hides header labels when collapsed', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLabel className="font-mono text-sm font-black uppercase">
              Neo App
            </SidebarHeaderLabel>
          </SidebarHeader>
        </Sidebar>
      </SidebarProvider>,
    );

    expect(screen.getByText('Neo App').className).toContain(
      'group-data-[state=collapsed]/sidebar:sr-only',
    );
    expect(document.querySelector('[data-nb-sidebar]')).toHaveAttribute('data-state', 'collapsed');
  });

  it('centers menu buttons in collapsed icon mode', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
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
      </SidebarProvider>,
    );

    const button = screen.getByRole('button', { name: 'Home' });
    expect(button.className).toContain('group-data-[state=collapsed]/sidebar:justify-center');
    expect(button.className).toContain('group-data-[state=collapsed]/sidebar:px-2');
    expect(document.querySelector('[data-nb-sidebar-provider]')).toHaveAttribute(
      'data-state',
      'collapsed',
    );
  });

  it('expands again when trigger is clicked after collapse', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SidebarMenuButtonLabel>Home</SidebarMenuButtonLabel>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger>Toggle</SidebarTrigger>
        </SidebarInset>
      </SidebarProvider>,
    );

    const sidebar = document.querySelector('[data-nb-sidebar]');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
  });

  it('exposes expanded state on the sidebar trigger', () => {
    renderWithProvider(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger>Toggle</SidebarTrigger>
        </SidebarInset>
      </SidebarProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });
    const sidebar = document.querySelector('[data-nb-sidebar]');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.getAttribute('aria-controls')).toBe(sidebar?.id);

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
