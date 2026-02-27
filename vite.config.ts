import tailwindcss from '@tailwindcss/vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const repoBasePath = '/contaminated-headphones/';
  const isPagesBuild = Boolean(process.env.GITHUB_PAGES);
  return {
    base: isPagesBuild ? repoBasePath : '/',
    plugins: [solidPlugin(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
