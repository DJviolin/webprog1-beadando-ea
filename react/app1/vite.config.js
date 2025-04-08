import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../dist/app1',
    emptyOutDir: true,
  },
});

/* import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  /plugins: [react(), viteSingleFile()],
  plugins: [react()],
  base: './',
  build: {
    outDir: resolve(import.meta.dirname, '../dist/app1'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'bundle.js',
        inlineDynamicImports: true,
      },
    },
  },
}); */
