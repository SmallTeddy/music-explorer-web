import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { constantRoutes } from './route'
import { Local } from '@/utils/cache'

// export const UserLayout = () => import('../layout/index.vue')

export const route404 = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  // component: () => import('../views/error/notFound.vue')
}

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
})

/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
router.beforeEach((to, _from, next) => {
  if (to.path == '/login') {
    // 登录或者注册x才可以往下进行
    next()
  } else {
    // 获取 token
    const token = Local.get('token')
    // token 不存在
    if (!token) {
      ElMessage.error('登录失败，请先登录')
      next('/login')
    }
    else {
      next()
    }
  }
})

export default router
