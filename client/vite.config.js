import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   //... other configs ...
   server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // Important for HMR to work on mobile
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5173}
})
