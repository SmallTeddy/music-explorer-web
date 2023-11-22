import { RouteRecordRaw } from 'vue-router';

const user: RouteRecordRaw = {
  path: "/user",
  component: () => import("@/views/user/index.vue"),
  name: "User",
  meta: { title: "user" },
  redirect: "/user/info",
  children: [
    {
      path: "info",
      component: () => import("@/views/user/info.vue"),
      name: "UserInfoList",
      meta: { title: "userInfoList" },
    },
  ],
};

export { user }
