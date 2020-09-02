<template>
  <div class="box">
    <v-card v-if="type==='setting'" flat color="#f8f8f8" class="v-card">
      <v-card flat color="#f8f8f8">
        <v-card-title>
          <span>设置</span>
          <v-spacer></v-spacer>
          <v-btn small text @click="close">
            <v-icon>iconfont-guanbi1</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-subheader>修改主题</v-subheader>
          <v-sheet color="#f8f8f8" class="px-2">
            <v-chip
              class="ma-1"
              v-for="(item,idx) in themeArr"
              :key="idx"
              @click="changeTheme(item)"
            >{{item}}</v-chip>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-card>

    <v-card v-if="type==='user'" flat color="#f8f8f8" class="v-card">
      <v-card flat color="#f8f8f8">
        <v-card-title>
          <span>我的信息</span>
          <v-spacer></v-spacer>
          <v-btn small text @click="close">
            <v-icon>iconfont-guanbi1</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="d-flex">
            <v-card-title>
              <v-avatar>
                <v-img src="../assets/images/avater.png"></v-img>
              </v-avatar>
            </v-card-title>
            <v-card-text class="d-flex justify-center flex-column pa-0">
              <p class="ma-0">Lucifer-dj</p>
              <p class="ma-0">邮箱:lucifer-dj@outlook.com</p>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text class="mr-5">修改信息</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "theSide",
  data: () => ({
    dialog: false,
  }),
  props: {
    type: String,
  },
  mounted() {
    // console.log(this.$vuetify.application)
  },
  methods: {
    close() {
      let that = this;
      that.$emit("close");
    },
    changeTheme(theme) {
      let that = this;
      console.log(that.$vuetify);
    },
  },
  computed: {
    themeArr() {
      return Array(7).fill("blue");
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  // padding-bottom: 48px;
  & > .v-card {
    height: 100%;
    width: 100%;
  }
}
</style>