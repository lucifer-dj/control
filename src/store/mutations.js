//同步修改state的状态
import _theme from "@/plugins/theme.js";
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
  },
};

export default mutations;
