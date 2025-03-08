/// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'dracor-react',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/react-fontawesome',
        'react',
        'react-copy-to-clipboard',
        'react-dom',
        '@headlessui/react',
        '@tanstack/react-table',
        '@types/react-copy-to-clipboard',
        'CETEIcean',
        'react-copy-to-clipboard',
        'react-helmet-async',
        'react-router-dom',
        'swagger-ui-react',
        'tailwindcss',
        'tailwindcss-classnames',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
