import Vue from "vue";
import Vuetify, {
  VBtn,
  VApp,
  VCard,
  VChip,
  VData,
  VDataTable,
  VDialog,
  VIcon,
  VLabel,
  VOverlay,
  VSelect,
  VSheet,
  VTextField,
} from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";
Vue.use(Vuetify, {
  components: {
    VBtn,
    VApp,
    VCard,
    VChip,
    VData,
    VDataTable,
    VDialog,
    VIcon,
    VLabel,
    VOverlay,
    VSelect,
    VSheet,
    VTextField,
  },
});
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
});
