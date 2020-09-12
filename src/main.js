// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/router.js";
// import sass from "sass";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import md5 from "js-md5";
import toast from "@components/toast/toast.js";
import hint from "@components/hint/hint.js";
import loading from "@components/loading/loading.js";
import vuelidate from "vuelidate";
import * as util from "./plugins/util";
import cfg from "./plugins/cfg";
Vue.config.productionTip = false;
import "@/router/permission.js";

Vue.use(vuelidate);
Vue.prototype.indexPath = cfg.isdev
  ? "http://127.0.0.1:7001"
  : "http://119.45.57.238";
Vue.prototype.bus = new Vue();
Vue.prototype.$toast = toast;
Vue.prototype.$hint = hint;
Vue.prototype.$loading = loading;
Vue.prototype.$u = util;
Vue.prototype.$ = (str) => document.querySelector(str);
Vue.prototype.$md5 = md5;
// Vue.prototype.$app = App;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
