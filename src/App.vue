<template>
  <v-app v-if="isRouterAlive">
    <router-view />
  </v-app>
</template>

<script>
import * as api from "@api";

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
  created() {},
  async mounted() {
    // this.$vue._theme.primary = "#222";
    //做一个进入时的验证
    let that = this;
    let default_theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
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
    async getSonColumn(origin) {
      let that = this;
      try {
        // let result = await api.columnQueryAll({
        //   where: { origin },
        // });
        result = result.code === 200 ? result.data : [];
        return result;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
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
