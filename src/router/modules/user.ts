import type { RouteRecordRaw } from 'vue-router'

const UserLayout = () => import('@/views/layout/index.vue')

const user: RouteRecordRaw = {
  path: '/user',
  component: UserLayout,
  name: 'User',
  meta: { title: 'user' },
  redirect: '/user/info',
  children: [
    {
      path: 'info',
      component: () => import('@/views/user/info.vue'),
      name: 'UserInfo',
      meta: { title: 'userInfo' },
    },
  ],
}

export { user }
