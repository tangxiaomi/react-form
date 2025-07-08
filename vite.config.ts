import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path' // 新增导入

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // 新增 test 配置
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html']
    }
  },
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
