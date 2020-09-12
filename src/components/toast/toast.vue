<template>
  <div v-if="bool">
    <v-overlay z-index="1000">
      <v-card light class="px-5 py-2" min-width="300">
        <v-card-title v-if="title.length>0">{{title}}</v-card-title>
        <v-card-text class="text-subtitle-1">{{msg}}</v-card-text>
        <v-card-actions class="d-flex justify-end mt-3">
          <v-btn @click="confirm" class="confirm" text :style="theme.co_p">确认</v-btn>
          <v-btn @click="close" text class="close" :style="theme.co_p">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>
<script>
import store from "@/store/index";
export default {
  name: "toast",
  store,
  data: () => ({
    msg: "",
    bool: false,
    title: "",
  }),
  mounted() {
    console.log(this);
  },
  methods: {
    confirm() {
      let that = this;
      that.bus.$emit("toastConfirm");
      that.close();
    },
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>