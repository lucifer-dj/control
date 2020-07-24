<template>
  <v-app-bar app dense text>
    <v-btn  depressed @click="commDrawer();">
      <v-icon>iconfont-goodsppecategory</v-icon>
    </v-btn> 
    <v-btn text class="ml-3" >浏览首页</v-btn>
    <v-spacer></v-spacer>
    <v-btn depressed title="退出">
      <v-icon>iconfont-zhuxiao</v-icon>
    </v-btn>
    <v-btn depressed title="设置">
      <v-icon>iconfont-shezhi</v-icon>
    </v-btn>
     <v-btn depressed  title="我的信息">
      <v-icon>iconfont-yonghuming</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
// import setting from '@components/setting.js'
export default {
  name:'appHead',
  data:()=>({
  }),
  mounted(){
    // let setter = setting();
    // console.log(setter)
  }
}
</script>
<style lang="less" scoped>
  
</style>