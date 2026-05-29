import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for all text assets
    compression({ algorithm: 'gzip', ext: '.gz' }),
    // Brotli compression (better ratio, supported by modern browsers/CDNs)
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately, rarely changes
          vendor: ['react', 'react-dom'],
          // Icons bundled apart — large, changes independently
          icons: ['lucide-react'],
        },
      },
    },
    // Inline tiny assets as base64 (< 4KB)
    assetsInlineLimit: 4096,
    // Enable CSS code splitting per chunk
    cssCodeSplit: true,
    // Set target for better tree-shaking
    target: 'es2015',
    // Minify with esbuild (faster than terser, similar output)
    minify: 'esbuild',
    // Suppress chunk size warnings above 500KB
    chunkSizeWarningLimit: 600,
  },
});
