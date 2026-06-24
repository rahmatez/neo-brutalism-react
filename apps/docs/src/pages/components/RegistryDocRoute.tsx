import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ComponentDocPage, type ComponentDocConfig } from '@/docs/components/ComponentDocPage';
import { PageLoading } from '@/docs/layout/PageLoading';
import { PLANNED_COMPONENT_SLUGS } from './component-doc-config';
import type { RegistryDocSlug } from './full-doc-pages';

interface RegistryDocRouteProps {
  slug: RegistryDocSlug;
}

export function RegistryDocRoute({ slug }: RegistryDocRouteProps) {
  const [config, setConfig] = useState<ComponentDocConfig | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setConfig(undefined);

    import('./component-registry-new').then(({ NEW_COMPONENT_REGISTRY }) => {
      if (cancelled) return;
      setConfig(NEW_COMPONENT_REGISTRY[slug] ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (PLANNED_COMPONENT_SLUGS.has(slug)) {
    return <Navigate to="/components/button" replace />;
  }

  if (config === undefined) {
    return <PageLoading />;
  }

  if (!config) {
    return <Navigate to="/components/button" replace />;
  }

  return <ComponentDocPage config={config} />;
}
