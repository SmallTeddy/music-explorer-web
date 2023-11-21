import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite.plugins'

import path from 'path'

const ENV = 'dev'
const url = {
  dev: 'https://dev.testing.com',
  uat: 'https://uat.testing.com'
}
const ROOT_URL = url[ENV]

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
        // views
        '@views': path.resolve(__dirname, './src/views')
      }
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        //以下为k8s相关测试服务地址
        '/xxx/': {
          target: ROOT_URL, // 用户统一认证
          changeOrigin: true
        },
      }
    }
    // css: {
    //   // css预处理器
    //   preprocessorOptions: {
    //     scss: {
    //       // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
    //       // 给导入的路径最后加上 ;
    //       additionalData: '@import "@/styles/variables.module.scss";'
    //     }
    //   }
    // }
  }
})
