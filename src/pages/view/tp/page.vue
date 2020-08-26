<template>
  <v-container>
    <v-subheader>关于雪中</v-subheader>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea solo label="摘要" auto-grow v-model="pageModel.description"></v-textarea>
          </v-col>
          <v-col cols="12">
            <span class="mb-3 d-block">请编辑内容</span>
            <editor v-model="pageModel.content"></editor>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="100" class="mx-3" @click="submit(pageType)">{{pageType==='add'?'提交':'确认修改'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import * as api from "@api";
export default {
  name: "about",
  data: () => ({
    pageType: "add",
    pageModel: {
      cid: null,
      content: "",
      description: "",
    },
  }),
  mounted() {
    let that = this;
    that.pageModel.cid = that.$route.query.id;
    that.readPage();
  },
  methods: {
    async readPage() {
      let that = this;
      try {
        let result = await api.readPage({ cid: that.pageModel.cid }, that);
        if (!result.data) return;
        that.pageModel = result.code === 200 ? result.data : [];
        // console.log(that.pageModel);
        that.pageType = "edit";
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.pageType !== "add") return that.updatePage();
      if (that.pageModel.content === "")
        return that.$hint({ msg: "请输入内容" });
      that.pageModel.start = new Date().valueOf();
      that.pageModel.show = true;
      try {
        let result = await api.addPage(that.pageModel, that);
        that.$hint({ msg: "成功。。。" });
      } catch (e) {
        console.log(e);
      }
    },
    async updatePage() {
      let that = this;
      if (that.pageModel.content === "")
        return that.$hint({ msg: "请输入内容" });
      that.pageModel.update = new Date().valueOf();
      try {
        let result = await api.updatePage(that.pageModel, that);
        that.$hint({ msg: result.msg });
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    editor: () => import("@components/editor.vue"),
  },
  // wtach: {
  //   "pageModel.cid"(val, old) {
  //     console.log(val, old);
  //     if (val !== old) {
  //       this.$forceUpdate();
  //     }
  //   },
  // },
};
</script>
<style lang="less" scoped>
</style>