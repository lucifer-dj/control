<template>
  <v-overlay>
    <v-card>
      <v-card-title>提示信息</v-card-title>
    </v-card>
    <v-card-text>
      信息主题
    </v-card-text>
    <v-card-actions>
      <v-btn>确认</v-btn>
      <v-btn>取消</v-btn>
    </v-card-actions>
  </v-overlay>
</template>
<script>
export default {
  name:'toast',
  data:()=>({
  })
}
</script>
<style lang="less" scoped>
  
</style>