import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <NotFoundPage />
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
);
