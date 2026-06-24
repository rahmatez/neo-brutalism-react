import type { ComponentType } from 'react';
import { ComponentDocPage } from '@/docs/components/ComponentDocPage';
import { NEW_COMPONENT_REGISTRY } from './component-registry-new';
import { PLANNED_COMPONENT_SLUGS } from './component-doc-config';

export const REGISTRY_FULL_DOC_PAGES: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(NEW_COMPONENT_REGISTRY)
    .filter(([slug]) => !PLANNED_COMPONENT_SLUGS.has(slug))
    .map(([slug, config]) => [
      slug,
      function RegistryDocPage() {
        return <ComponentDocPage config={config} />;
      },
    ]),
);
