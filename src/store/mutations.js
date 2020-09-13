//同步修改state的状态
import { saveItemObj } from "@/plugins/util.js";
import { theme as _theme } from "@/plugins/static.js";
const mutations = {
  changeTheme(state, theme) {
    if (typeof theme === "object") {
      state.theme = theme;
    } else {
      state.theme = _theme[theme];
    }
  },
  getRouter(state, router) {
    state.router = router;
    saveItemObj("router", router);
  },
  setMenu(state, menu) {
    state.menu = menu;
  },
  setMid(state, mid) {
    state.mid = mid;
  },
};

export default mutations;
