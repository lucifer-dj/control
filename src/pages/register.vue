<template>
  <main class="main">
    <v-card width="600" class="d-flex align-center flex-column pa-5">
      <v-card-title>welcome</v-card-title>
      <v-card-text class="px-12">
        <v-text-field label="邮箱"></v-text-field>
        <v-text-field label="密码"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn width="100">注册</v-btn>
      </v-card-actions>
    </v-card>
  </main>
</template>
<script>
export default {
  name: "register",
  data: () => ({}),
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
}
</style>