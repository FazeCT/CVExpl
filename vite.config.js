import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/keyword': {
        target: 'https://bobcat-ethical-specially.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/keyword/, '')
      }
    }
  }
})
