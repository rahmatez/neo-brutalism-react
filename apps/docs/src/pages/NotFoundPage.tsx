import { Stack, Text, Title } from 'neobrutalism-ui-react';
import { DocsRouterButton } from '@/docs/components/DocsRouterButton';
import { DocsNavbar } from '@/docs/layout/DocsNavbar';
import { PageTransition } from '@/docs/layout/PageTransition';

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <DocsNavbar />
      <PageTransition>
        <main className="docs-grid-bg flex min-h-screen items-center justify-center px-5 pt-32 pb-16">
          <Stack gap="md" className="max-w-lg text-center">
            <Title className="text-6xl">404</Title>
            <Text size="lg" weight="bold">
              This page took a wrong turn off the brutalist grid.
            </Text>
            <DocsRouterButton to="/" className="mx-auto">
              Back home
            </DocsRouterButton>
          </Stack>
        </main>
      </PageTransition>
    </div>
  );
}
