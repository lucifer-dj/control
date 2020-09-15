//异步修改state的状态
import { fetchRouter, fetchMenu } from "@api";
const actions = {
  getRouter({ commit }, user = {}) {
    fetchRouter(user).then((res) => {
      if (res.code == 200) {
        commit("getRouter", res.data);
      } else {
        commit("getRouter", []);
      }
    });
  },
};

export default actions;
