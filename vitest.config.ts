import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    tsconfigPaths: true, // Vite maneja los paths de TypeScript de forma nativa ahora
  },
});