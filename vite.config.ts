import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const rootDir = path.resolve(__dirname, 'site');

export default defineConfig(({ command }) => ({
  root: rootDir,
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': rootDir,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build:
    command === 'build'
      ? {
          outDir: path.resolve(__dirname, 'dist'),
          emptyOutDir: true,
          assetsDir: 'assets',
        }
      : undefined,
}));
