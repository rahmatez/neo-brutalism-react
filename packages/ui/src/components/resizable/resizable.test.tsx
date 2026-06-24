import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './index';

describe('Resizable', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders panels and handle', () => {
    renderWithProvider(
      <ResizablePanelGroup direction="horizontal" style={{ height: 200 }}>
        <ResizablePanel defaultSize={50}>
          <div>Left</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Right</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
    expect(document.querySelector('[data-nb-resizable-handle]')).toBeInTheDocument();
  });

  it('renders vertical panel group layout', () => {
    renderWithProvider(
      <ResizablePanelGroup direction="vertical" style={{ height: 240 }}>
        <ResizablePanel defaultSize={40}>
          <div>Top</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div>Bottom</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const group = document.querySelector('[data-nb-resizable-group]');
    expect(group).toHaveAttribute('data-panel-group-direction', 'vertical');
    expect(group?.className).toContain('data-[panel-group-direction=vertical]:flex-col');
    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
  });

  it('supports collapsible panels', () => {
    renderWithProvider(
      <ResizablePanelGroup direction="horizontal" style={{ height: 200 }}>
        <ResizablePanel id="sidebar" collapsible defaultSize={30} minSize={15}>
          <div>Sidebar</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <div>Main</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const sidebar = document.querySelector('[data-panel-id="sidebar"]');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute('data-panel-collapsible', 'true');
  });

  it('reads persisted layout from autoSaveId', () => {
    localStorage.setItem(
      'react-resizable-panels:nb-test-layout',
      JSON.stringify({ 'panel-a': 30, 'panel-b': 70 }),
    );

    renderWithProvider(
      <ResizablePanelGroup autoSaveId="nb-test-layout" direction="horizontal" style={{ height: 200 }}>
        <ResizablePanel id="panel-a" defaultSize={50}>
          <div>Tree</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel id="panel-b" defaultSize={50}>
          <div>Canvas</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    expect(localStorage.getItem('react-resizable-panels:nb-test-layout')).toBeTruthy();
    expect(screen.getByText('Tree')).toBeInTheDocument();
    expect(screen.getByText('Canvas')).toBeInTheDocument();
  });
});
