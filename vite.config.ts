import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/01-core/src'),
      '@llm': resolve(__dirname, 'src/02-llm/src'),
      '@perception': resolve(__dirname, 'src/03-perception/src'),
      '@ui': resolve(__dirname, 'src/04-ui/src'),
      '@events': resolve(__dirname, 'src/05-events/src'),
    },
  },
  build: {
    target: 'esnext',
    minify: !process.env.TAURI_DEBUG,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
