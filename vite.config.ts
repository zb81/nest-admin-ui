import { resolve } from 'node:path'
import process from 'node:process'

import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import svgr from 'vite-plugin-svgr'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      svgr(),
      react(),
      viteCompression(),
    ],
    resolve: {
      alias: {
        '@': pathResolve('./src/'),
      },
    },
    server: {
      open: true,
      host: true,
      port: Number.parseInt(env.VITE_APP_DEV_PORT),
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendors: ['classnames', 'consola', '@zb81/req', 'framer-motion'],
            react: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd', 'ahooks'],
          },
        },
      },
    },
  }
})
