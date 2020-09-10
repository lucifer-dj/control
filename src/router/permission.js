import { fetchRouter } from "@api";
import router from "./router";
import layout from "@/pages/layout.vue";
const whiteList = ["/login", "/home", "/register"];
import { getItemForStorage, getItemObj, saveItemObj } from "@/plugins/util.js";
let getRouter;
router.beforeEach(async (to, from, next) => {
  let inWhiteList = (s) => whiteList.some((w) => w === s);
  if (inWhiteList(to.path)) {
    next();
  } else {
    if (!getItemForStorage("token")) {
      next({ path: "/login" });
    } else {
      if (!getRouter) {
        if (!getItemObj("router")) {
          fetchRouter({ auth: "admin" }).then((res) => {
            if (res.code > 350) {
              next({ path: "/login" });
            } else {
              getRouter = res.data;
              saveItemObj("router", getRouter);
              routerGo(to, next);
            }
          });
        } else {
          getRouter = getItemObj("router");
          routerGo(to, next);
        }
      } else {
        next();
      }
    }
  }
});

function filterAsyncRouter(routes) {
  let res = routes.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") route.component = layout;
      else route.component = require(`@/pages/view/${route.component}`).default;
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
  return res;
}

function routerGo(to, next) {
  if ("code" in getRouter) {
    localStorage.removeItem("router");
    next({ path: "/login" });
  } else {
    getRouter = filterAsyncRouter(getRouter);
    router.matcher.addRoutes(getRouter);
    next({ ...to, replace: true });
  }
}

export default router;
