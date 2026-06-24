import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NeoBrutalismProvider } from 'neobrutalism-ui-react';
import { DocsPageSeo } from '@/docs/components/DocsPageSeo';
import { SITE_BASE_PATH } from '@/docs/site';
import App from './App';
import './styles.css';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const routerBasename = SITE_BASE_PATH || undefined;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NeoBrutalismProvider>
      <BrowserRouter basename={routerBasename}>
        <DocsPageSeo />
        <App />
      </BrowserRouter>
    </NeoBrutalismProvider>
  </StrictMode>,
);
