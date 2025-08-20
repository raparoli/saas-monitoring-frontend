import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/auth': path.resolve(__dirname, './src/modules/auth'),
      '@/dashboard': path.resolve(__dirname, './src/modules/dashboard'),
      '@/products': path.resolve(__dirname, './src/modules/products'),
      '@/alerts': path.resolve(__dirname, './src/modules/alerts'),
      '@/users': path.resolve(__dirname, './src/modules/users'),
      '@/acronis': path.resolve(__dirname, './src/modules/acronis')
    }
  },
  esbuild: {
    jsx: 'automatic'
  }
})