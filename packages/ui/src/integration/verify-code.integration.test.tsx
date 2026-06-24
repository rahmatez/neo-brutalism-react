import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import { renderWithProvider } from '../test/render';
import { Button } from '../components/button/button';
import { InputOTP } from '../components/input-otp';
import { ToastProvider, useToast } from '../components/toast';

afterEach(() => cleanup());

function VerifyCodeFlow() {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (code.length !== 6) {
          setError('Enter the full 6-digit code.');
          return;
        }
        setError(null);
        toast({ title: 'Verified', description: `Code ${code} accepted.` });
      }}
    >
      <InputOTP
        length={6}
        value={code}
        onChange={setCode}
        aria-label="Verification code"
      />
      {error ? <p role="alert">{error}</p> : null}
      <Button type="submit">Verify</Button>
    </form>
  );
}

describe('Verify code integration', () => {
  it('validates incomplete codes and accepts pasted OTP', async () => {
    renderWithProvider(
      <ToastProvider>
        <VerifyCodeFlow />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter the full 6-digit code.');

    const digits = screen.getAllByRole('textbox');
    fireEvent.paste(digits[0]!, {
      clipboardData: { getData: () => '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => {
      expect(screen.getByText('Verified')).toBeInTheDocument();
    });
    expect(screen.getByText('Code 123456 accepted.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
