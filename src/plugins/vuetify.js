import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from 'vuetify/es5/locale/zh-Hans';
// import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify);

export default new Vuetify({
  lang:{
    locales:{zhHans},
    current:'zhHans'
  },
  icons:{
  	iconfont:'fa'
  }
})
