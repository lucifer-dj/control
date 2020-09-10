import { fetchRouter } from "@api";
import router from "./router";
import layout from "@/pages/layout.vue";
const whiteList = ["/login", "/home", "/register"];
import { getItemForStorage, getItemObj, saveItemObj } from "@/plugins/util.js";
import store from "@/store/index";
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
          let _user = getItemObj("user");
          if (!_user) return next({ path: "/login" });
          fetchRouter({ auth: _user.auth }).then((res) => {
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
      try {
        if (route.component === "Layout") route.component = layout;
        else
          route.component = require(`@/pages/view/${route.component}`).default;
      } catch (e) {
        let hint = document.querySelector("#temp_hint_panel");
        hint.innerHTML =
          "有组件路径错误,请前往节点管理处修改 错误组件名称==>" +
          route.meta.call;
        hint.style.display = "block";
        setTimeout(() => {
          hint.style.display = "none";
        }, 4000);
        console.log("有模板路径错误");
        return;
      }
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
