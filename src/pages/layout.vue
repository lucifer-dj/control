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
              <v-list-item-title>{{item.call}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(n,i) in item.children"
            :key="i"
            @click="replace(n,'n')"
            class="pl-10"
            :style="listModel===n.id&&!$vuetify.theme.dark?theme.bg_a:''"
            :class="listModel===n.id?'list_menu_active':''"
          >
            <!-- <v-list-item-icon>
              <v-icon>{{n.icon}}</v-icon>
            </v-list-item-icon>-->
            <v-list-item-content>
              <v-list-item-title class="text-center">{{n.call}}</v-list-item-title>
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
import cfg from "@/plugins/cfg.js";
import { getItemObj } from "@/plugins/util.js";
import { fetchMenu } from "@api";
export default {
  name: "layout",
  data: () => ({
    temp_temp: false,
    menuState: false,
    drawer: true,
    sideType: "",
    sideCols: 0,
    viewCols: 12,
    viewKey: 0,
    listModel: 0,
    menu: [],
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
      if (type === "n") {
        that.listModel = data.id;
      } else {
        that.listModel = type;
      }
      try {
        let a = require(`@/pages/view/${data.component}`).default;
        console.log(a);
        that.viewKey++;
        that.$router.push({
          path: data.v_path,
          query: { nid: data.id },
        });
      } catch (e) {
        console.log(e);
        that.$hint({
          msg: "组件路径不正确，请前往节点设置修改",
          type: "error",
        });
      }
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
        localStorage.removeItem("router");
        that.$store.commit("setUser", {});
        that.$hint({ msg: "已完成退出" });
        setTimeout(() => {
          that.$router.replace("/login");
        }, 500);
      });
    },
    async getMenu() {
      let that = this;
      let _user = getItemObj("user");
      try {
        let result = await fetchMenu({ auth: _user.auth });
        that.menu = result.code == 200 ? result.data : [];
        that.$store.commit("setMenu", result.data);
        // console.log(that.menu);
      } catch (e) {
        console.log(e);
        that.$hint({ msg: "获取菜单失败", type: "error" });
      }
    },
  },
  mounted() {
    let that = this;
    //人物 势力 关于雪中
    //主页 境界划分
    // :style="`{backgroundColor:${_theme.primary}}`"
    let drawer_content = this.$(".v-navigation-drawer__content");
    drawer_content.classList.add("drawer"); //chrome
    drawer_content.style.scrollbarWidth = "none"; //firefox
    drawer_content.style.msOverflowStyle = "none"; //edge
    that.getMenu();
  },
  computed: {
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