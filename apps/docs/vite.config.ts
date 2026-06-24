import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const repoBase =
  process.env.GITHUB_PAGES === 'true' || process.env.VITE_BASE_PATH
    ? process.env.VITE_BASE_PATH ?? '/neo-brutalism-react/'
    : '/';

export default defineConfig({
  base: repoBase,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/shiki') || id.includes('node_modules/@shikijs')) {
            return 'shiki';
          }
          if (id.includes('node_modules/ol')) {
            return 'openlayers';
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'recharts';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
