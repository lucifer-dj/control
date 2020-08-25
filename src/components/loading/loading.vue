<template>
  <v-overlay z-index="1000" v-model="bool">
    <v-card light width="150" height="150">
      <v-card-text class="ma-0">
        <div class="k-square-holder2">
          <div class="k-square3 k-square3a"></div>
          <div class="k-square3 k-square3b"></div>
          <div class="k-square3 k-square3c"></div>
          <div class="k-square3 k-square3d"></div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-center mt-2">正在{{msg}}。。。</v-card-actions>
    </v-card>
  </v-overlay>
</template>
<script>
export default {
  name: "loading",
  data: () => ({
    bool: false,
    msg: "加载",
  }),
  computed: {},
};
</script>
<style lang="less">
.k-square-holder2 {
  margin: 0 auto;
  width: 40px;
  margin-top: 20px;
}
.k-square3 {
  display: inline-block;
  width: 15px;
  height: 15px;
  opacity: 0.2;
  animation: k-loadingQ 2s infinite;
  opacity: 0.5;
}

.k-square3a {
  transform: translate(0, -25px);
  margin-right: 3px;
  background-color: #0094ff;
}
.k-square3b {
  transform: translate(25px, 0);
  background-color: #ffc107;
}
.k-square3c {
  transform: translate(-25px, 0);
  background-color: #ee6362;
  margin-right: 3px;
}
.k-square3d {
  transform: translate(0, 25px);
  background-color: #2cb0b2;
}
@keyframes k-loadingQ {
  33% {
    transform: translate(0, 0);
    opacity: 0.7;
  }
  66% {
    transform: translate(0, 0);
    opacity: 0.7;
  }
}
</style>
