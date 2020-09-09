import * as api from "@api";
import router from "./router";
import layout from "@/pages/layout.vue";
const whiteList = ["/login", "/home", "/register"];
let getRouter;
api.getRouter({ token: getItem("token") });
router.beforeEach(async (to, from, next) => {
  let inWhiteList = (s) => whiteList.some((w) => w === s);
  if (inWhiteList(to.path)) {
    next();
  } else {
    if (!getItem("token")) {
      next({ path: "/login" });
    } else {
      if (!getRouter) {
        if (!getItemObj("router")) {
          api.getRouter({ auth: "admin" }).then((res) => {
            console.log(res.data);
            if (res.code > 350) {
              next({ path: "/login" });
            } else {
              getRouter = res.data;
              saveItem("router", getRouter);
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
      console.log(route.component);
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
function getItemObj(name) {
  let obj = localStorage.getItem(name);
  return JSON.parse(obj);
}
function saveItem(name, obj) {
  obj = JSON.stringify(obj);
  localStorage.setItem(name, obj);
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
function getItem(name) {
  return localStorage.getItem(name);
}
export default router;
