import { describe, expect, it, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Button } from '../button/button';
import { Input } from '../input/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRoot,
} from './index';

interface ProfileFormValues {
  email: string;
}

function ProfileForm({
  onSubmit,
  defaultEmail = '',
}: {
  onSubmit: (values: ProfileFormValues) => void;
  defaultEmail?: string;
}) {
  const form = useForm<ProfileFormValues>({
    defaultValues: { email: defaultEmail },
    mode: 'onSubmit',
  });

  return (
    <FormRoot form={form} onSubmit={onSubmit} className="grid gap-4">
      <FormField
        control={form.control}
        name="email"
        rules={{ required: 'Email is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="m@example.com" {...field} />
            </FormControl>
            <FormDescription>We will never share your email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save</Button>
    </FormRoot>
  );
}

describe('Form', () => {
  it('links label, description, and control with accessible ids', async () => {
    renderWithProvider(<ProfileForm onSubmit={vi.fn()} />);

    const input = screen.getByLabelText('Email');
    const description = screen.getByText('We will never share your email.');

    expect(input).toHaveAttribute('id');
    expect(screen.getByText('Email')).toHaveAttribute('for', input.getAttribute('id'));
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-describedby', description.id);
    });
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('omits aria-describedby when description and message are absent', () => {
    function MinimalForm() {
      const form = useForm<ProfileFormValues>({ defaultValues: { email: '' } });
      return (
        <FormRoot form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </FormRoot>
      );
    }

    renderWithProvider(<MinimalForm />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-describedby');
  });

  it('only references message id in aria-describedby after validation error', async () => {
    function MinimalForm() {
      const form = useForm<ProfileFormValues>({ defaultValues: { email: '' }, mode: 'onSubmit' });
      return (
        <FormRoot form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'Email is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </FormRoot>
      );
    }

    renderWithProvider(<MinimalForm />);
    const input = screen.getByLabelText('Email');
    expect(input).not.toHaveAttribute('aria-describedby');

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(input.getAttribute('aria-describedby')).toBe(screen.getByRole('alert').id);
  });

  it('shows validation message and aria-invalid on submit', async () => {
    const onSubmit = vi.fn();
    renderWithProvider(<ProfileForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
    });

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.getAttribute('aria-describedby')).toContain(
      screen.getByRole('alert').id,
    );
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input.className).toContain('aria-invalid:border-(--nb-danger)');
  });

  it('submits valid values', async () => {
    const onSubmit = vi.fn();
    renderWithProvider(<ProfileForm onSubmit={onSubmit} defaultEmail="alex@example.com" />);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'alex@example.com' }, expect.anything());
    });
  });

  it('throws when useFormField is used outside FormField', () => {
    function BrokenField() {
      const form = useForm({ defaultValues: { email: '' } });
      return (
        <Form {...form}>
          <FormItem>
            <FormLabel>Email</FormLabel>
          </FormItem>
        </Form>
      );
    }

    expect(() => renderWithProvider(<BrokenField />)).toThrow(
      'useFormField must be used within <FormField>.',
    );
  });
});
