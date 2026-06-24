import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NeoBrutalismProvider } from 'neobrutalism-ui-react';
import App from '../App';

const SMOKE_ROUTES = [
  '/',
  '/docs/introduction',
  '/docs/installation',
  '/components/button',
  '/components/alert',
  '/composition/overview',
  '/docs/faq',
] as const;

function renderRoute(path: string) {
  return render(
    <NeoBrutalismProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </NeoBrutalismProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe('docs route smoke', () => {
  it.each(SMOKE_ROUTES)(
    'renders %s with a primary heading',
    async (path) => {
      renderRoute(path);

      await waitFor(
        () => {
          expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        },
        { timeout: 15_000 },
      );
    },
    20_000,
  );
});
