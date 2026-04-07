/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mock/**',
      ],
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
});
