//异步修改state的状态
import { fetchRouter } from "@api";
const actions = {
  getRouter({ commit }, user = {}) {
    fetchRouter(user).then((res) => {
      if (res.code == 200) {
        commit("getRouter", res.data);
      }
    });
  },
};

export default actions;
