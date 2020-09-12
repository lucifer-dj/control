//同步修改state的状态
import _theme from "@/plugins/theme.js";
import { saveItemObj } from "@/plugins/util.js";
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
