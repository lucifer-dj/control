<template>
  <div>
    <upload type="line" v-model="file"></upload>
    <v-btn @click="test">测试</v-btn>
  </div>
</template>
<script>
import * as api from "@api";
export default {
  name: "introduce",
  data: () => ({
    file: {},
  }),
  methods: {
    test() {
      console.log(this.file);
    },
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less" scoped>
</style>