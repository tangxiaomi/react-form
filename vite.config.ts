import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 新增导入

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;`,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置别名
    }
  }
})
