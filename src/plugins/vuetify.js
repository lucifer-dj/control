import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";
// import "vuetify/dist/vuetify.min.css"
import _theme from "./theme";
let choosedTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";
Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      zhHans,
    },
    current: "zhHans",
  },
  icons: {
    iconfont: "mdi",
  },
  theme: {
    light: true,
  },
});
