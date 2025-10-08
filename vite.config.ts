import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vue核心库
          if (id.includes('vue') && !id.includes('ant-design-vue')) {
            return 'vue-core'
          }
          // Vue路由和状态管理
          if (id.includes('vue-router') || id.includes('pinia')) {
            return 'vue-libs'
          }
          // Ant Design Vue组件
          if (id.includes('ant-design-vue') || id.includes('@ant-design/icons-vue')) {
            return 'antd'
          }
          // 其他第三方库
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  base: './'
})
