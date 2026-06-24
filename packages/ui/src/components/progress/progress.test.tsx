import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Progress } from './index';

describe('Progress', () => {
  it('renders progressbar with value', () => {
    renderWithProvider(<Progress value={45} aria-label="Upload" />);

    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuenow', '45');
  });
});
