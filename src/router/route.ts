import { RouteRecordRaw } from "vue-router";

const modulesFiles = import.meta.glob("./modules/*.ts", { eager: true });
const modulesRoutes = Object.values(modulesFiles);

const modules: RouteRecordRaw[] = modulesRoutes.reduce(
  (routeArr: RouteRecordRaw[], routeItem: any) => {
    const defaultRoute: RouteRecordRaw[] = Object.values(routeItem);
    routeArr.push(...defaultRoute);
    return routeArr;
  },
  []
);

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: { title: "login" },
  },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    name: "Home",
    meta: { title: "home" },
  },
  ...modules,
];
