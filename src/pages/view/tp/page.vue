<template>
  <v-container>
    <v-subheader>
      栏目管理
      <v-icon class="mx-1" small>iconfont-xiangyou</v-icon>内容介绍
    </v-subheader>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea solo label="摘要" auto-grow></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea solo label="内容" auto-grow></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn width="100" class="mx-3">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "tpPage",
  data: () => ({}),
};
</script>
<style lang="less" scoped>
</style>