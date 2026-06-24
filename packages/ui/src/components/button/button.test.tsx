import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { Button } from './button';

describe('Button', () => {
  it('renders a native button by default', () => {
    renderWithProvider(<Button type="button">Ship it</Button>);
    expect(screen.getByRole('button', { name: 'Ship it' })).toBeInTheDocument();
  });

  it('renders an anchor when href is provided', () => {
    renderWithProvider(
      <Button href="https://example.com" rel="noreferrer">
        Docs
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('calls onClick for button actions', () => {
    const onClick = vi.fn();
    renderWithProvider(
      <Button type="button" onClick={onClick}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
