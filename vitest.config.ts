import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path';
// vite-plugin-solid depends on Vite directly and Vitest bundles its own Vite typings,
// which leads to incompatible structural types. Casting to `any` keeps tsc satisfied
// while still registering the plugin for JSX transforms during tests.
const solid = solidPlugin() as any;

export default defineConfig({
  plugins: [solid],
  resolve: {
    conditions: ['browser'],
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
