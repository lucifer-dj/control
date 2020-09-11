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
  // setMenu({ commit }, auth) {
  //   fetchMenu(auth).then((res) => {
  //     if (res.code == 200) {
  //       commit("setMenu", res.data);
  //     } else {
  //       commit("setMenu", []);
  //     }
  //   });
  // },
};

export default actions;
