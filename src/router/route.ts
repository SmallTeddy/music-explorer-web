import type { RouteRecordRaw } from 'vue-router'

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true })

const modules: RouteRecordRaw[] = Object.entries(modulesFiles)
  .reduce((accumulator: RouteRecordRaw[], [_path, file]: [string, unknown]) => {
    if (typeof file === 'function') {
      const module = file()
      if (module.default) {
        accumulator.push(module.default)
      }
    }
    return accumulator
  }, [])

const UserLayout = () => import('@/views/layout/index.vue')

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: { title: 'login' },
  },
  {
    path: '/home',
    component: UserLayout,
    name: 'Home',
    meta: { title: 'home' },
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        name: 'HomeIndex',
        meta: { title: 'homeIndex' },
      },
    ],
  },
  ...modules,
]
