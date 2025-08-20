// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   resolve: {
//     alias: {
//       '@': new URL('./src', import.meta.url).pathname,
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/lib': '/src/lib',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
      '@/constants': '/src/constants'
    }
  }
})