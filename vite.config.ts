import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Two pages: the portfolio and the PolyGrip game page at /polygrip/.
    rollupOptions: {
      input: {
        main: 'index.html',
        polygrip: 'polygrip/index.html',
      },
    },
  },
});
