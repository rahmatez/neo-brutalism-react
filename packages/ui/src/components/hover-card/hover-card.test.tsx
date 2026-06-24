import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';

afterEach(() => cleanup());

import { renderWithProvider } from '../../test/render';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './index';

describe('HoverCard', () => {
  it('renders trigger and content nodes', () => {
    renderWithProvider(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button type="button">@neo</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Neo Brutalism UI</p>
        </HoverCardContent>
      </HoverCard>,
    );

    expect(screen.getByRole('button', { name: '@neo' })).toBeInTheDocument();
    expect(screen.getByText('Neo Brutalism UI')).toBeInTheDocument();
  });
});
