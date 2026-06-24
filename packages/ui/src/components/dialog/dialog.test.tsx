import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  type DialogHandle,
} from './index';

describe('Dialog', () => {
  it('opens and closes via imperative handle', () => {
    const ref = createRef<DialogHandle>();

    renderWithProvider(
      <>
        <button type="button" onClick={() => ref.current?.open()}>
          Open dialog
        </button>
        <Dialog ref={ref}>
          <DialogContent className="p-6">
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
            <DialogActions className="mt-4 flex gap-2">
              <DialogClose>Cancel</DialogClose>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Confirm' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
