<template>
  <v-container>
    <v-card flat>
      <v-card-title>其他设置</v-card-title>
      <v-card-text>
        <v-row class="flex-column">
          <v-col cols="4">
            <v-text-field label="网站名称" v-model="siteModel.name"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="网站首页" v-model="siteModel.home"></v-text-field>
          </v-col>
          <upload v-model="imgFile" :src="siteModel.logo" type="card" cols="4"></upload>
          <v-col cols="4">
            <v-text-field label="联系邮箱" v-model="siteModel.email"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="联系QQ" v-model="siteModel.qq"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="GIT" v-model="siteModel.git"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="允许上传大小" v-model="siteModel.filesize"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="cookie密码" v-model="siteModel.cookiePass"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="120" @click="siteUpdate">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import * as api from "@api";
// 站点配置
export default {
  name: "config",
  data: () => ({
    siteModel: {},
    imgFile: {},
  }),
  async mounted() {
    let that = this;
    that.siteModel = await that.siteGet();
  },
  methods: {
    async siteGet() {
      let that = this;
      try {
        let result = await api.siteGet({}, that);
        if (result.code === 200 && result.data) return result.data;
        return {
          name: "",
          logo: "",
          email: "",
          qq: "",
          git: "",
          filesize: "",
          cookiePass: "",
          home: "",
        };
      } catch (e) {
        console.log(e);
      }
    },
    async siteUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        if (that.siteModel.logo !== "") {
          let result0 = await api.deleteFile({ path: that.siteModel.logo });
          console.log(result0);
        }
        let result1 = await api.upload(that.imgFile);
        that.siteModel.logo = result1.code === 200 ? result1.data : "";
      }
      try {
        let result = await api.siteUpdate(that.siteModel, that);
        that.$hint({ msg: "修改成功" });
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less" scoped>
</style>