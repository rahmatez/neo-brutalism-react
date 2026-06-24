import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Alert, AlertDescription, AlertTitle } from './index';

describe('Alert', () => {
  it('renders alert role with title and description', () => {
    renderWithProvider(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something needs attention.</AlertDescription>
      </Alert>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something needs attention.')).toBeInTheDocument();
  });
});
