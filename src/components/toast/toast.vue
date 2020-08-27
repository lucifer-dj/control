<template>
  <div v-if="bool">
    <v-overlay z-index="1000">
      <v-card light class="px-5 py-2" min-width="300" >
        <v-card-title v-if="title.length>0">{{title}}</v-card-title>
        <v-card-text class="text-subtitle-1">{{msg}}</v-card-text>
        <v-card-actions class="d-flex justify-end mt-3">
          <v-btn @click="confirm" class="confirm" text>确认</v-btn>
          <v-btn @click="close" text class="close">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>
<script>
export default {
  name: "toast",
  data: () => ({
    msg: "",
    bool: false,
    title: "",
  }),
  mounted() {},
  methods: {
    confirm() {
      let that = this;
      that.bus.$emit("toastConfirm");
      that.close();
    },
  },
};
</script>
<style lang="less" scoped>
.confirm {
  color: rgb(79, 147, 237);
  transition: all 0.3s ease;
  &:hover {
    background-color: #ecf5ff;
    border-color: #c6e2ff;
    color: #1a73e8;
  }
}
.close {
  color: rgb(79, 147, 237);
  transition: all 0.3s ease;
  &:hover {
    background-color: #ecf5ff;
    border-color: #c6e2ff;
    color: #1a73e8;
  }
}
</style>