import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  type SheetHandle,
} from './index';

describe('Sheet', () => {
  it('opens and closes via imperative handle', () => {
    const ref = createRef<SheetHandle>();

    renderWithProvider(
      <>
        <button type="button" onClick={() => ref.current?.open()}>
          Open sheet
        </button>
        <Sheet ref={ref}>
          <SheetContent>
            <SheetTitle>Panel</SheetTitle>
            <SheetClose>Dismiss</SheetClose>
          </SheetContent>
        </Sheet>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
