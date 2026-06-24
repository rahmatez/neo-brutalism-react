import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  type DrawerHandle,
} from './index';

describe('Drawer', () => {
  it('opens and closes via imperative handle', () => {
    const ref = createRef<DrawerHandle>();

    renderWithProvider(
      <>
        <button type="button" onClick={() => ref.current?.open()}>
          Open drawer
        </button>
        <Drawer ref={ref}>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerClose>Close</DrawerClose>
          </DrawerContent>
        </Drawer>
      </>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
