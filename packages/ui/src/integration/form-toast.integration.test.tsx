import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { renderWithProvider } from '../test/render';
import { Button } from '../components/button/button';
import { Input } from '../components/input/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRoot,
} from '../components/form';
import { ToastProvider, useToast } from '../components/toast';

afterEach(() => cleanup());

interface SettingsFormValues {
  displayName: string;
}

function SettingsPanel() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    defaultValues: { displayName: '' },
    mode: 'onSubmit',
  });

  return (
    <FormRoot
      form={form}
      onSubmit={(values) => {
        toast({
          title: 'Profile updated',
          description: `Saved as ${values.displayName}.`,
        });
      }}
      className="grid gap-4"
    >
      <FormField
        control={form.control}
        name="displayName"
        rules={{ required: 'Display name is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save profile</Button>
    </FormRoot>
  );
}

describe('Form and toast integration', () => {
  it('shows validation errors then success toast after submit', async () => {
    renderWithProvider(
      <ToastProvider>
        <SettingsPanel />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save profile' }));

    await waitFor(() => {
      expect(screen.getByText('Display name is required.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Profile updated')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Display name'), {
      target: { value: 'Rahmat' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save profile' }));

    await waitFor(() => {
      expect(screen.getByText('Profile updated')).toBeInTheDocument();
    });
    expect(screen.getByText('Saved as Rahmat.')).toBeInTheDocument();
  });
});
