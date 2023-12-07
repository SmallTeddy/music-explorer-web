import type { RouteRecordRaw } from 'vue-router'

// 导入模块文件
const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true })
// 获取模块路由
const modulesRoutes = Object.values(modulesFiles)

// 遍历模块路由，将路由记录添加到modules数组中
const modules: RouteRecordRaw[] = modulesRoutes.reduce(
  (routeArr: RouteRecordRaw[], routeItem: any) => {
    // 获取默认路由
    const defaultRoute: RouteRecordRaw[] = Object.values(routeItem)
    // 将默认路由添加到modules数组中
    routeArr.push(...defaultRoute)
    return routeArr
  },
  [],
) as RouteRecordRaw[]

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
