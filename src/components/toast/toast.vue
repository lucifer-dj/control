<template>
  <div v-if="bool">
    <v-overlay z-index="1000">
      <v-card light class="px-5 py-2">
        <v-card-title v-if="title.length>0">{{title}}</v-card-title>
        <v-card-text class="text-h6">{{msg}}</v-card-text>
        <v-card-actions class="d-flex">
          <v-btn @click="confirm" class="confirm" text>确认</v-btn>
          <v-spacer></v-spacer>
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
  border: 1px solid #0094ff;
  color: #fff;
  background-color: #0094ff;
  transition: all 0.3s ease;
  &:hover {
    background-color: #fff;
    border-color: #0094ff;
    color: #0094ff;
  }
}
.close {
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: #fff;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ecf5ff;
    border-color: #c6e2ff;
    color: #0094ff;
  }
}
</style>