import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PageLoading } from '@/docs/layout/PageLoading';
import { FULL_DOC_PAGES, isRegistryDocSlug } from './full-doc-pages';
import { RegistryDocRoute } from './RegistryDocRoute';

export function ComponentDocRoute() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/components/button" replace />;
  }

  const FullPage = FULL_DOC_PAGES[slug];
  if (FullPage) {
    return (
      <Suspense fallback={<PageLoading />}>
        <FullPage />
      </Suspense>
    );
  }

  if (isRegistryDocSlug(slug)) {
    return <RegistryDocRoute slug={slug} />;
  }

  return <Navigate to="/components/button" replace />;
}
