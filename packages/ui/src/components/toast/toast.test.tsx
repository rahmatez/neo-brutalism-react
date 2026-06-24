import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Button } from '../button/button';
import { ToastProvider, useToast } from './index';

function ToastTrigger() {
  const { toast } = useToast();
  return (
    <Button
      type="button"
      onClick={() => toast({ title: 'Saved', description: 'Changes are live.' })}
    >
      Show toast
    </Button>
  );
}

describe('Toast', () => {
  it('shows and dismisses toast messages', () => {
    renderWithProvider(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show toast' }));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Changes are live.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });
});
