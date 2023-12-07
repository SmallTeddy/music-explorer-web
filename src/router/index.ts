import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './route'

const router = createRouter({
  history: createWebHistory('/music-explorer-web'),
  routes: constantRoutes,
})

export default router
