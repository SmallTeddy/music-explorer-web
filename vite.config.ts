import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import setupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'

const ENV = 'dev'
const url = {
  dev: 'https://dev.testing.com',
  uat: 'https://uat.testing.com',
}
const ROOT_URL = url[ENV]

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      nodePolyfills(),
      setupExtend(),
      viteMockServe({
        mockPath: './mock',
        localEnabled: command === 'serve',
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      AutoImport({
        // targets to transform
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

        // global imports to register
        imports: [
          // 插件预设支持导入的api
          'vue',
          'vue-router',
          'pinia',
          // 自定义导入的api
        ],

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: './auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src")
      },
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        // 以下为k8s相关测试服务地址
        // '/xxx/': {
        //   target: ROOT_URL, // 用户统一认证
        //   ws: false, // 禁用WebSocket
        //   changeOrigin: true, // 修改请求头中的Origin为目标URL
        //   rewrite: path => path.replace(/^\/xxx/, ''), // 重写请求，去掉前缀
        //   // 绕过代理请求的处理函数
        //   bypass(req, res, proxyOptions) {
        //     // 转发到后端的路径
        //     const proxyUrl = proxyOptions.target + proxyOptions.rewrite(req.url)
        //     console.log(`proxyUrl:${proxyUrl}`) // 打印代理的URL
        //   },
        // },
      },
    },
  }
})
