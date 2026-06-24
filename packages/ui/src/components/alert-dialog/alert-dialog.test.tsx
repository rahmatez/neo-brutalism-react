import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  type AlertDialogHandle,
} from './index';

describe('AlertDialog', () => {
  it('opens and closes via imperative handle', () => {
    const ref = createRef<AlertDialogHandle>();

    renderWithProvider(
      <>
        <button type="button" onClick={() => ref.current?.open()}>
          Delete item
        </button>
        <AlertDialog ref={ref}>
          <AlertDialogContent className="p-6">
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            <AlertDialogActions className="mt-4 flex gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialog>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete item' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Delete item?' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
