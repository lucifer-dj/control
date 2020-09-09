import Vue from "vue";
import Router from "vue-router";

const originPush = Router.prototype.push;
Router.prototype.push = function(location) {
  return originPush.call(this, location).catch((err) => err);
};
const originReplace = Router.prototype.replace;
Router.prototype.replace = function(location) {
  return originReplace.call(this, location).catch((err) => err);
};

Vue.use(Router);
let asyncRoutes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      auth: ["user"], // 普通的用户角色
    },
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册",
      auth: ["user"], // 普通的用户角色
    },
    component: () => import("../pages/register.vue"),
  },
];
let router = new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRoutes,
});
export default router;
