<template>
  <v-container fiuld>
    <v-subheader>时间线</v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加新时间线</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>搜索</v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers">
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="yearDelete(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="yearEdit(item.id)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h5">{{dialogType==="add"?'添加时间线':"更新时间线"}}</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <v-col cols="6" height="100">
                <v-text-field label="时间线名称" v-model="yearModel.title"></v-text-field>
                <v-text-field label="结束" v-model="yearModel.yearend"></v-text-field>
              </v-col>
              <v-col cols="6" height="100">
                <v-text-field label="开始" v-model="yearModel.yearstart"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="大致介绍" solo auto-grow v-model="yearModel.introduce"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn
            width="100"
            class="mx-3"
            @click="submit(dialogType)"
          >{{dialogType==="add"?'提交':"更新时间线"}}</v-btn>
          <v-btn width="100" class="mx-3" @click="yearModelReset(1);">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as api from "@api";
export default {
  name: "faction",
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "标题", value: "title", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    yearModel: {
      title: "",
      introduce: "",
      yearend: "",
      yearstart: "",
    },
    dialog: false,
    imgFile: {},
    dialogType: "add",
  }),
  mounted() {
    let that = this;
    that.yearQueryAll();
  },
  methods: {
    yearModelReset(type = null) {
      let that = this;
      that.yearModel = {
        title: "",
        introduce: "",
        yearend: "",
        yearstart: "",
      };
      that.dialog = false;
      that.dialogType = "add";
      if (!type) that.yearQueryAll();
    },
    async yearQueryAll() {
      let that = this;
      try {
        let result = await api.yearQueryAll({ num: 0 });
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.dialogType !== "add") return that.yearUpdate();
      // console.log(that.imgFile);
      // if (that.$u.checkObjectIsEmpty(that.imgFile))
      //   return that.$hint({ msg: "请选择上传的图片", type: "error" });
      that.yearModel.start = new Date().valueOf();
      try {
        // let result0 = await api.upload(that.imgFile);
        // that.yearModel.pic = result0 ? result0 : "";
        // if (!result0) return that.$hint({ msg: "上传图片失败", type: "error" });
        let result = await api.yearAdd(that.yearModel);
        that.$hint({ msg: result.msg });
        that.yearModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async yearUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await api.upload(that.imgFile, that, that.yearModel.pic);
        that.yearModel.pic = res ? res : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.yearModel.update = new Date().valueOf();
      try {
        let result = await api.yearUpdate(that.yearModel);
        that.yearModelReset();
        that.$hint({ msg: "更新成功" });
      } catch (e) {
        console.log(e);
      }
    },
    async yearRead(id) {
      let that = this;
      try {
        let result = await api.yearRead({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async yearEdit(id) {
      let that = this;
      let model = await that.yearRead(id);
      if (model) {
        that.yearModel = model;
        that.dialogType = "edit";
        that.dialog = true;
      }
    },
    async yearDelete(id) {
      let that = this;
      that.$toast({ msg: "确定要删除这方时间线吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.yearRead(id);
        if (result.pic) {
          let result0 = await api.deleteFile({ path: result.pic });
        }
        try {
          let result1 = await api.yearDelete({ id });
          that.$hint({ msg: "删除成功" });
          that.yearQueryAll();
        } catch (e) {
          console.log(e);
        }
      });
    },
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less">
</style>