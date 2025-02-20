import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  // Sem root: 'src', index.html está na raiz
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});