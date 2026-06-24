import { Outlet } from 'react-router-dom';
import { PageTransition } from './PageTransition';
import { DocsNavbar } from './DocsNavbar';
import { DocsPagination } from './DocsPagination';
import { DocsSidebar } from './DocsSidebar';
import { DocsToc } from './DocsToc';

export function DocsLayout() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-40 left-2 hidden h-14 w-14 rotate-12 border-4 border-(--nb-border) bg-(--nb-pink) shadow-[5px_5px_0_0_var(--nb-shadow)] xl:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed bottom-12 right-4 hidden h-10 w-10 -rotate-12 rounded-full border-4 border-(--nb-border) bg-(--nb-lavender) shadow-[4px_4px_0_0_var(--nb-shadow)] xl:block"
      />

      <DocsNavbar />

      <div className="flex pt-32">
        <DocsSidebar />

        <main
          data-docs-content
          className="docs-grid-bg min-h-[calc(100vh-8rem)] w-full min-w-0 flex-1 px-5 py-12 lg:ml-80 lg:mr-52 lg:px-8"
        >
          <div className="mx-auto min-h-full w-full min-w-0 max-w-3xl">
            <PageTransition>
              <Outlet />
            </PageTransition>
            <DocsPagination />
          </div>
        </main>

        <aside className="fixed top-32 right-8 hidden h-[calc(100vh-9rem)] w-48 shrink-0 overflow-y-auto border-4 border-(--nb-border) bg-(--nb-paper) p-4 shadow-[8px_8px_0_0_var(--nb-shadow)] lg:block">
          <DocsToc />
        </aside>
      </div>
    </div>
  );
}
