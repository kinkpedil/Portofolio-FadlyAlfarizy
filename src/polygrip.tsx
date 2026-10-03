import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import PolyGripPage from './pages/PolyGripPage';
import { LanguageProvider } from './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <PolyGripPage />
      </MotionConfig>
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
);
