import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The portfolio, the PolyGrip game page at /polygrip/, and 404.html, which Vercel serves for unknown URLs.
    rollupOptions: {
      input: {
        main: 'index.html',
        polygrip: 'polygrip/index.html',
        notfound: '404.html',
      },
    },
  },
});
