import { describe, expect, it, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { Skeleton } from './index';

describe('Skeleton', () => {
  it('renders placeholder with data attribute', () => {
    const { container } = renderWithProvider(<Skeleton className="h-8 w-32" />);
    expect(container.querySelector('[data-nb-skeleton]')).toBeInTheDocument();
  });
});
