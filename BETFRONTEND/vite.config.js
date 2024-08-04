import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './BETFRONTEND',  // Configura el directorio raíz
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './BETFRONTEND/index.html',  // Asegúrate de que el camino sea correcto
    },
  },
});
