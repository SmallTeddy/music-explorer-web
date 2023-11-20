import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite.plugins'

const base_url = 'xxx'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(env, command === 'build'),
    base: './',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host: "0.0.0.0",
      proxy: {
        '/xxx': {
          target: base_url,
          changeOrigin: true,
        }
      }
    }
  }
})
