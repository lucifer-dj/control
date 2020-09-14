<template>
  <v-app v-if="isRouterAlive">
    <router-view />
  </v-app>
</template>

<script>
import { getItemForStorage, saveItemObj, getItemObj } from "@/plugins/util.js";
import { getUserInfo, fetchRouter } from "@api";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
      getSonColumn: this.getSonColumn,
    };
  },
  data: () => ({
    isRouterAlive: true,
  }),
  created() {
    this.getInfo();
  },
  async mounted() {
    // this.$vue._theme.primary = "#222";
    //做一个进入时的验证
    let that = this;
    let default_theme = getItemForStorage("theme")
      ? getItemForStorage("theme")
      : "light";
    if (default_theme === "dark") {
      that.$store.commit("changeTheme", {
        primary: "#121212",
        assist: "#fff",
        color: "#fff",
      });
      that.$vuetify.theme.dark = true;
    } else that.$store.commit("changeTheme", default_theme);
    let temp_loading = document.querySelector("#temp_loading");
    temp_loading.style.display = "none";
  },
  watch: {
    $route(to, from) {
      console.log(`从  ${from.path}  =>   ${to.path}  `);
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    getSonColumn(id) {
      let that = this;
      let _node = getItemObj("router")[0].children;
      _node = _node.filter((_) => _.cid == id);
      return _node;
    },
    async getInfo() {
      let that = this;
      let token = getItemForStorage("token");
      if (!token) return;
      try {
        let result = await getUserInfo({ token });
        if (result.code === 200) {
          saveItemObj("user", result.data);
          if (!getItemObj("router")) {
            let _res = await fetchRouter({ auth: result.data.auth });
            if (_res.code === 200) {
              saveItemObj("router", _res.data);
            }
          }
          that.$router.replace("/");
          that.$hint({ msg: "自动登录成功" });
        } else {
          that.$hint({ msg: "tokan验证失败", type: "error" });
          that.$router.replace("/login");
        }
      } catch (e) {
        console.log(e);
        that.$hint({ msg: "错误->" + e, type: "error" });
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background-color: #f4f6f9;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none !important;
}
.v-main > .v-main__wrap {
  height: 100%;
}
html {
  overflow-x: hidden;
}
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
::-webkit-scrollbar-corner {
  background: #f8f8f8;
}
::-webkit-scrollbar-button {
  // background-color: #222;
}
::-webkit-scrollbar-thumb {
  border-radius: 9px;
  border: solid 6px #c8c6c4;
  background-clip: content-box;
  cursor: pointer;
  &:hover {
    background-color: #98a3a6;
  }
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
.my-blue {
  background-color: #0094ff !important;
  color: #fff !important;
}
</style>
