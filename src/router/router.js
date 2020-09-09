import Vue from "vue";
import Router from "vue-router";
import * as api from "@api";
// import cfg from "../plugins/cfg";

const originPush = Router.prototype.push;
Router.prototype.push = function(location) {
  return originPush.call(this, location).catch((err) => err);
};
const originReplace = Router.prototype.replace;
Router.prototype.replace = function(location) {
  return originReplace.call(this, location).catch((err) => err);
};

Vue.use(Router);

// export default new Router({
//   mode: "history",
//   scrollBehavior: () => ({ y: 0 }),
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: () => import("../pages/home.vue"),
//       redirect: "/index",
//       children: [
//         {
//           name: "index",
//           path: "/index",
//           component: () => import("../pages/view/index.vue"),
//         },
//         {
//           name: "column",
//           path: "/column",
//           component: () => import("../pages/view/column.vue"),
//         },
//         {
//           name: "tpconfig",
//           path: "/tpconfig",
//           component: () => import("../pages/view/tpconfig.vue"),
//         },
//         {
//           name: "banner",
//           path: "/banner",
//           component: () => import("../pages/view/banner.vue"),
//         },
//         {
//           name: "introduce",
//           path: "/t",
//           component: () => import("../pages/view/introduce.vue"),
//         },
//         {
//           name: "faction",
//           path: "/faction",
//           component: () => import("../pages/view/tp/faction.vue"),
//         },
//         {
//           name: "about",
//           path: "/about",
//           component: () => import("../pages/view/tp/about.vue"),
//         },
//         {
//           name: "config",
//           path: "/config",
//           component: () => import("../pages/view/config.vue"),
//         },
//         {
//           name: "year",
//           path: "/year",
//           component: () => import("../pages/view/tp/year.vue"),
//         },
//         {
//           name: "realm",
//           path: "/realm",
//           component: () => import("../pages/view/tp/realm.vue"),
//         },
//         {
//           name: "role",
//           path: "/role",
//           component: () => import("../pages/view/tp/role.vue"),
//         },
//         {
//           name: "page",
//           path: "/page",
//           component: () => import("../pages/view/tp/page.vue"),
//         },
//       ],
//     },
//     {
//       path: "/login",
//       name: "login",
//       component: () => import("../pages/login.vue"),
//     },
//     {
//       path: "/register",
//       name: "register",
//       component: () => import("../pages/register.vue"),
//     },
//   ],
// });
let asyncRoutes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../pages/layout.vue"),
    redirect: "/index",
    meta: {
      title: "主页",
      roles: ["admin", "editor"], // 普通的用户角色
    },
    children: [],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      roles: ["admin", "editor"], // 普通的用户角色
    },
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册",
      roles: ["admin", "editor"], // 普通的用户角色
    },
    component: () => import("../pages/register.vue"),
  },
];
let router = new Router({
  mode: "history",
  // scrollBehavior: () => ({ y: 0 }),
  routes: asyncRoutes,
});
export default router;
