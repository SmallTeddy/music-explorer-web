import type { RouteRecordRaw } from 'vue-router'

const UserLayout = () => import('@/views/layout/index.vue')

const news: RouteRecordRaw = {
  path: '/news',
  component: UserLayout,
  name: 'News',
  meta: { title: 'news' },
  redirect: '/news/animal',
  children: [
    {
      path: 'animal',
      component: () => import('@/views/news/animal.vue'),
      name: 'AnimalList',
      meta: { title: 'animalList' },
    },
    {
      path: 'nature',
      component: () => import('@/views/news/nature.vue'),
      name: 'NatureList',
      meta: { title: 'natureList' },
    },
    {
      path: 'article/:id',
      component: () => import('@/views/news/article.vue'),
      name: 'Article',
      meta: { title: 'article' },
    },
  ],
}

export { news }
