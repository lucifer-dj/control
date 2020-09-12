<template>
  <v-snackbar v-model="bool" top :timeout="time" :color="theme.color" elevation="0">
    <span :class="theme.font">{{msg}}</span>
  </v-snackbar>
</template>
<script>
export default {
  name: "hint",
  data: () => ({
    msg: "这是一个3s的提示狂",
    bool: true,
    time: 3000,
    type: "success",
  }),
  methods: {},
  mounted() {},
  computed: {
    theme() {
      let obj = {
        success: {
          color: "#e1f3d8",
          font: "success--text",
        },
        error: {
          color: "#fef0f0",
          font: "red--text",
        },
      };
      return obj[this.type];
    },
  },
};
</script>
<style lang="scss" scoped>
</style>