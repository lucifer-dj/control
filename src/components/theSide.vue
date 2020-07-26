<template>
  <div class="box">
    <v-card v-if="type==='setting'" flat color="#f8f8f8" class="v-card">
      <v-card-title>
        <span>设置</span>
        <v-spacer></v-spacer>
        <v-btn small text @click="close">
          <v-icon>iconfont-guanbi1</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-card v-if="type==='user'" flat color="#f8f8f8" class="v-card">
      <v-card-title>
        <span>我的信息</span>
        <v-spacer></v-spacer>
        <v-btn small text @click="close">
          <v-icon>iconfont-guanbi1</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  name:'theSide',
  data:()=>({
    dialog: false
  }),
  props: {
    type:String,
  },
  mounted(){
    // console.log(this.$vuetify.application)
  },
  methods:{
    close(){
      let that = this;
      that.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
  .box{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height:100%;
    // padding-bottom: 48px;
    &>.v-card{
      height: 100%;
      width: 100%;
    }
  }
</style>