<template>
  <v-container fiuld>
    <v-subheader>势力划分</v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加新势力</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>搜索</v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers">
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="factionDelete(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="factionEdit(item.id)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h5">添加新势力</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <upload type="line" cols="12" v-model="imgFile" :src="factionModel.pic"></upload>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="势力名称" v-model="factionModel.name"></v-text-field>
                <v-text-field label="年代" v-model="factionModel.years"></v-text-field>
              </v-col>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="统治者" v-model="factionModel.lead"></v-text-field>
                <v-select label="当前状态" :items="['兴盛','羸弱']" v-model="factionModel.state"></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea label="大致介绍" solo auto-grow v-model="factionModel.introduce"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn width="100" class="mx-3" @click="submit(dialogType)">提交</v-btn>
          <v-btn width="100" class="mx-3" @click="factionModelReset(1);">关闭</v-btn>
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
      { text: "名称", value: "name", align: "center" },
      { text: "状态", value: "state", align: "center" },
      { text: "统治者", value: "lead", align: "center" },
      { text: "年代", value: "years", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    factionModel: {
      name: "",
      state: "",
      introduce: "",
      years: "",
      lead: "",
      pic: "",
    },
    dialog: false,
    imgFile: {},
    dialogType: "add",
  }),
  mounted() {
    let that = this;
    that.factionQueryAll();
  },
  methods: {
    factionModelReset(type = null) {
      let that = this;
      that.factionModel = {
        name: "",
        state: "",
        introduce: "",
        years: "",
        lead: "",
      };
      that.dialog = false;
      that.dialogType = "add";
      if (type)that.factionQueryAll();
    },
    async factionQueryAll() {
      let that = this;
      try {
        let result = await api.factionQueryAll({ num: 0 });
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.dialogType !== "add") return that.factionUpdate();
      console.log(that.imgFile);
      if (that.$u.checkObjectIsEmpty(that.imgFile))
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      that.factionModel.start = new Date().valueOf();
      try {
        let result0 = await api.upload(that.imgFile);
        that.factionModel.pic = result0 ? result0 : "";
        if (!result0) return that.$hint({ msg: "上传图片失败", type: "error" });
        let result = await api.factionAdd(that.factionModel);
        that.$hint({ msg: result.msg });
        that.factionModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async factionUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await api.upload(that.imgFile, that, that.factionModel.pic);
        that.factionModel.pic = res ? res : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.factionModel.update = new Date().valueOf();
      try {
        let result = await api.factionUpdate(that.factionModel);
        that.factionModelReset();
        that.$hint({ msg: "更新成功" });
      } catch (e) {
        console.log(e);
      }
    },
    async factionRead(id) {
      let that = this;
      try {
        let result = await api.factionRead({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async factionEdit(id) {
      let that = this;
      let model = await that.factionRead(id);
      if (model) {
        that.factionModel = model;
        that.dialogType = "edit";
        that.dialog = true;
      }
    },
    async factionDelete(id) {
      let that = this;
      that.$toast({ msg: "确定要删除这方势力吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.factionRead(id);
        if (result.pic) {
          let result0 = await api.deleteFile({ path: result.pic });
        }
        try {
          let result1 = await api.factionDelete({ id });
          that.$hint({ msg: "删除成功" });
          that.factionQueryAll();
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