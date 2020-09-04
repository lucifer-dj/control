<template>
  <div class="box v-application-box">
    <v-navigation-drawer
      app
      :mini-variant.sync="menuState"
      v-model="drawer"
      class="drawer"
      :color="$vuetify.theme.dark?'#121212':'#f3f2f1'"
    >
      <v-sheet height="48" width="100%" :color="$vuetify.theme.dark?'#1E1E1E':'#f3f2f1'">
        <!-- <v-img></v-img> -->
        <v-subheader class="justify-center text-uppercase" width="100%">雪中</v-subheader>
      </v-sheet>
      <v-list>
        <v-list-group
          v-for="(item,idx) in menu"
          :key="idx"
          :append-icon="item.child?'iconfont-expand_more':''"
          no-action
          @click="replace(item,idx)"
          :style="listModel===idx&&!$vuetify.theme.dark?theme.bg_a:''"
          :class="listModel===idx?'list_menu_active':''"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon :class="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(n,i) in item.child"
            :key="i"
            @click="replace(n,'n')"
            class="pl-10"
            :style="listModel===n.id&&!$vuetify.theme.dark?theme.bg_a:''"
            :class="listModel===n.id?'list_menu_active':''"
          >
            <v-list-item-icon>
              <v-icon>{{n.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{n.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense text :style="theme.bg_p">
      <v-btn depressed @click="commDrawer();" :style="[theme.bg_p,theme.co]">
        <v-icon>iconfont-goodsppecategory</v-icon>
      </v-btn>
      <v-btn text class="ml-3" :href="indexPath" target="_blank" :style="[theme.bg_p,theme.co]">浏览首页</v-btn>
      <v-spacer></v-spacer>
      <v-btn depressed title="退出" @click="logout" :style="[theme.bg_p,theme.co]">
        <v-icon>iconfont-zhuxiao</v-icon>
      </v-btn>
      <v-btn depressed title="设置" @click="showSide('setting')" :style="[theme.bg_p,theme.co]">
        <v-icon>iconfont-shezhi</v-icon>
      </v-btn>
      <v-btn depressed title="我的信息" @click="showSide('user')" :style="[theme.bg_p,theme.co]">
        <v-icon>iconfont-yonghuming</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="v-main">
      <span v-if="temp_temp"></span>
      <v-row align="stretch" height="100%">
        <v-col :cols="viewCols" class="v-col9">
          <router-view :key="viewKey" />
        </v-col>
        <v-col :cols="sideCols" class="v-col3 pa-0 ma-0">
          <the-side :type="sideType" @close="closeSide"></the-side>
        </v-col>
      </v-row>
      <!-- <v-footer fixed pedless >
        <v-spacer></v-spacer>
        &copy; {{new Date().getFullYear()}}
        <v-sheet tag="a" title="gitee" class="ml-5 text-decoration-none" color="rgba(0,0,0,0)" target="_blank" href="https://gitee.com/luciferdj/xzhdx">lucifer-dj</v-sheet>
      </v-footer>-->
    </v-main>
  </div>
</template>
<script>
import * as api from "@api";
import cfg from "@/plugins/cfg.js";
export default {
  name: "home",
  data: () => ({
    temp_temp: false,
    menu: [
      {
        name: "栏目管理",
        icon: "iconfont iconfont-shebeileixingdangan",
        path: "/column",
        child: [],
      },
      {
        name: "轮播设置",
        path: "/banner",
        icon: "iconfont iconfont-hebing",
      },
      {
        name: "其他设置",
        path: "/config",
        icon: "iconfont iconfont-baobiao",
      },
      {
        name: "模板设置",
        path: "/tpconfig",
        icon: "iconfont iconfont-baobiao",
      },
    ],

    menuState: false,
    drawer: true,
    sideType: "",
    sideCols: 0,
    viewCols: 12,
    viewKey: 0,
    listModel: 0,
  }),
  methods: {
    commDrawer() {
      let that = this;
      //挡在md以上的时候that.menuState一直为true
      //在md一下的时候that.menuState为false
      if (that.$vuetify.breakpoint.smAndDown) {
        that.drawer = !that.drawer;
        return;
      }
      that.drawer = true;
      that.menuState = !that.menuState;
    },
    replace(data, type) {
      let that = this;
      let { path } = data;
      if (type === "n") {
        that.listModel = data.id;
      } else {
        that.listModel = type;
      }
      console.log(9)
      let obj = {};
      if (data.origin) {
        obj = { cid: -1, id: data.id };
        if (Number(data.origin) !== -1) obj.cid = data.origin;
        if (data.template === "page") obj.cid = data.id;
      }
      that.viewKey++;
      that.$router.push({ path, query: obj });
    },
    closeSide() {
      let that = this;
      that.$nextTick(() => {
        that.sideCols = 0;
        that.viewCols = 12;
      });
    },
    showSide(type) {
      let that = this;
      that.$nextTick(() => {
        that.sideCols = 3;
        that.viewCols = 9;
        that.sideType = type;
      });
    },
    logout() {
      let that = this;
      that.$toast({ msg: "确认要退出吗？" });
      that.bus.$on("toastConfirm", function () {
        localStorage.removeItem("token");
        that.$hint({ msg: "已完成退出" });
        setTimeout(() => {
          that.$router.replace("/login");
        }, 500);
      });
    },
    async getColumn() {
      let that = this;
      try {
        let result = await api.columnQueryAll({}, that);
        if (result.code !== 200) {
          that.$hint({ msg: "自动登录失败", type: "error" });
          that.$router.replace("/");
        }
        // console.log(result.data);
        that.menu[0].child = result.data;
        that.menu[0].child = that.disposeMenu;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    let that = this;
    //人物 势力 关于雪中
    //主页 境界划分
    // :style="`{backgroundColor:${_theme.primary}}`"
    that.getColumn();
    if (that.$vuetify.breakpoint.smAndDown) {
      that.$nextTick(() => {
        that.drawer = false;
      });
    }
    let drawer_content = this.$(".v-navigation-drawer__content");
    drawer_content.classList.add("drawer"); //chrome
    drawer_content.style.scrollbarWidth = "none"; //firefox
    drawer_content.style.msOverflowStyle = "none"; //edge
  },
  computed: {
    disposeMenu() {
      let that = this;
      let arr = that.menu[0].child.filter((a) => a.origin == -1);
      arr.forEach((item, idx) => {
        Object.assign(item, cfg.tp[item.template]);
        // if (item.origin == -1) {
        //   item._order = Number(item.id);
        // } else {
        //   item._order = Number(item.origin) + 0.1;
        // }
      });
      // arr.sort((a, b) => a._order - b._order);
      that.menu[0].child = arr;
      return arr;
    },
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  components: {
    theSide: () => import("@components/theSide.vue"),
  },
};
</script>
<style lang="less" scoped>
.box {
  position: relative;
  width: 100%;
  height: calc(100% - 48px);
}
.v-main {
  height: 100%;
}
.v-col3 {
  position: relative;
  height: calc(100vh - 48px);
}
.v-col9 {
  height: calc(100vh - 48px);
  overflow: auto;
  overflow-y: scroll;
  // padding-bottom: 48px;
}
.f12 {
  font-size: 12px;
}
.list_child_item {
  background-color: #f3f2f1;
}
</style>