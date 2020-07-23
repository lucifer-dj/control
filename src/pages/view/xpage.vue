<template>
  <v-container>
    <v-card flat>
      <v-card-title>页面管理</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field label="网站名称"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-file-input label="网站logo"></v-file-input>
          </v-col>
          <v-col cols="4">
            <v-text-field label="联系邮箱"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="联系QQ"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="GIT"></v-text-field>
          </v-col>
           <v-col cols="4">
            <v-text-field label="允许上传大小"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="cookie密码"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="120" >提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name:'xpage',
  data:()=>({
  })
}
</script>
<style lang="less" scoped>
  
</style>