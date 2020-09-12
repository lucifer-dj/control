import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    theme: {},
    routes: [],
    menu: [],
    mid: "", //第几个菜单被激活
  },
  mutations,
  getters,
  actions,
});

export default store;
