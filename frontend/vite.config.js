import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Esto obliga a Vite a usar una única instancia de React para toda la app y librerías
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Pre-empaqueta la librería de Google para evitar errores de hooks
    include: ['@react-oauth/google']
  }
})