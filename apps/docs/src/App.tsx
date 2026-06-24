import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from '@/docs/layout/DocsLayout';
import { PageLoading } from '@/docs/layout/PageLoading';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const CompositionOverviewPage = lazy(() =>
  import('@/pages/composition/CompositionOverviewPage').then((module) => ({
    default: module.CompositionOverviewPage,
  })),
);
const CommonPatternsPage = lazy(() =>
  import('@/pages/composition/CommonPatternsPage').then((module) => ({
    default: module.CommonPatternsPage,
  })),
);
const SplitLayoutsPage = lazy(() =>
  import('@/pages/composition/SplitLayoutsPage').then((module) => ({
    default: module.SplitLayoutsPage,
  })),
);
const StackAndClusterPage = lazy(() =>
  import('@/pages/composition/StackAndClusterPage').then((module) => ({
    default: module.StackAndClusterPage,
  })),
);
const SurfaceAndSectionPage = lazy(() =>
  import('@/pages/composition/SurfaceAndSectionPage').then((module) => ({
    default: module.SurfaceAndSectionPage,
  })),
);
const ComponentDocRoute = lazy(() =>
  import('@/pages/components/ComponentDocRoute').then((module) => ({
    default: module.ComponentDocRoute,
  })),
);
const FaqPage = lazy(() =>
  import('@/pages/docs/FaqPage').then((module) => ({ default: module.FaqPage })),
);
const InspiredDesignsPage = lazy(() =>
  import('@/pages/docs/InspiredDesignsPage').then((module) => ({
    default: module.InspiredDesignsPage,
  })),
);
const InstallationPage = lazy(() =>
  import('@/pages/docs/InstallationPage').then((module) => ({ default: module.InstallationPage })),
);
const IntroductionPage = lazy(() =>
  import('@/pages/docs/IntroductionPage').then((module) => ({ default: module.IntroductionPage })),
);
const OpenToWorkCardRecipePage = lazy(() =>
  import('@/pages/recipes/OpenToWorkCardRecipePage').then((module) => ({
    default: module.OpenToWorkCardRecipePage,
  })),
);
const PodcastCardRecipePage = lazy(() =>
  import('@/pages/recipes/PodcastCardRecipePage').then((module) => ({
    default: module.PodcastCardRecipePage,
  })),
);
const TravelCardRecipePage = lazy(() =>
  import('@/pages/recipes/TravelCardRecipePage').then((module) => ({
    default: module.TravelCardRecipePage,
  })),
);
const PortfolioShowcasePage = lazy(() =>
  import('@/pages/showcase/PortfolioShowcasePage').then((module) => ({
    default: module.PortfolioShowcasePage,
  })),
);

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
          <Route path="/docs/introduction" element={<IntroductionPage />} />
          <Route path="/docs/installation" element={<InstallationPage />} />
          <Route path="/docs/inspired-designs" element={<InspiredDesignsPage />} />
          <Route path="/docs/faq" element={<FaqPage />} />
          <Route path="/composition" element={<Navigate to="/composition/overview" replace />} />
          <Route path="/composition/overview" element={<CompositionOverviewPage />} />
          <Route path="/composition/surface-and-section" element={<SurfaceAndSectionPage />} />
          <Route path="/composition/stack-and-cluster" element={<StackAndClusterPage />} />
          <Route path="/composition/split-layouts" element={<SplitLayoutsPage />} />
          <Route path="/composition/common-patterns" element={<CommonPatternsPage />} />
          <Route path="/components/sonner" element={<Navigate to="/components/toast" replace />} />
          <Route path="/components/:slug" element={<ComponentDocRoute />} />
          <Route path="/recipes/travel-card" element={<TravelCardRecipePage />} />
          <Route path="/recipes/podcast-card" element={<PodcastCardRecipePage />} />
          <Route path="/recipes/open-to-work-card" element={<OpenToWorkCardRecipePage />} />
        </Route>
        <Route path="/showcase/portfolio" element={<PortfolioShowcasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
