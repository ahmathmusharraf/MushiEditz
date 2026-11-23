import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import type {PageId} from './data/agencyData';
import './index.css';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {HomePage} from './pages/HomePage';
import {InsightsPage} from './pages/InsightsPage';
import {ProcessPage} from './pages/ProcessPage';
import {ServicesPage} from './pages/ServicesPage';
import {WorkPage} from './pages/WorkPage';

function resolvePageId(rootEl: HTMLElement): PageId {
  const attr = rootEl.dataset.page as PageId | undefined;
  if (attr) return attr;

  const path = window.location.pathname.toLowerCase();
  if (path.includes('about')) return 'about';
  if (path.includes('services')) return 'services';
  if (path.includes('work')) return 'work';
  if (path.includes('process')) return 'process';
  if (path.includes('insights')) return 'insights';
  if (path.includes('contact')) return 'contact';
  return 'home';
}

function ActivePage({pageId}: {pageId: PageId}) {
  switch (pageId) {
    case 'about':
      return <AboutPage />;
    case 'services':
      return <ServicesPage />;
    case 'work':
      return <WorkPage />;
    case 'process':
      return <ProcessPage />;
    case 'insights':
      return <InsightsPage />;
    case 'contact':
      return <ContactPage />;
    case 'home':
    default:
      return <HomePage />;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const pageId = resolvePageId(rootElement);
  createRoot(rootElement).render(
    <StrictMode>
      <ActivePage pageId={pageId} />
    </StrictMode>
  );
}
