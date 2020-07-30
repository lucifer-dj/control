// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import less from 'less'
import vuetify from './plugins/vuetify'
import store from './store/index'
import md5 from 'js-md5'
import toast from '@components/toast.js'
import hint from "@components/hint.js"
import vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(less);
Vue.use(vuelidate)

Vue.prototype.pageIndex = "www.luciferdj.cn";
Vue.prototype.bus = new Vue();
Vue.prototype.$toast = toast;
Vue.prototype.$hint = hint;
Vue.prototype.$ = (str) => document.querySelector(str)
Vue.prototype.$md5 = md5;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')