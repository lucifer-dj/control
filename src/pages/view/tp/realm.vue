<template>
  <v-container fiuld>
    <!-- <v-subheader>境界介绍</v-subheader> -->
    <v-subheader>
      <span>子栏目:</span>
      <v-btn small class="mx-2" text v-for="(item,idx) in sonColumn" :key="idx">{{item.name}}</v-btn>
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加新境界</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>搜索</v-btn>
      </v-toolbar>
      <v-data-table disable-sort :items="items" :headers="headers">
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="realmDelete(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="realmEdit(item.id)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h5">{{dialogType==="add"?'添加新境界':"更新境界"}}</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <upload type="auto" cols="6" v-model="imgFile" :src="realmModel.pic"></upload>
              <v-col cols="6" height="100">
                <v-text-field label="境界名称" v-model="realmModel.name"></v-text-field>
              </v-col>
              <v-col cols="12" height="100">
                <v-textarea label="大致介绍" solo auto-grow v-model="realmModel.introduce"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn
            width="100"
            class="mx-3"
            @click="submit(dialogType)"
          >{{dialogType==="add"?'添加新境界':"更新境界"}}</v-btn>
          <v-btn width="100" class="mx-3" @click="realmModelReset(1);">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import * as api from "@api";
export default {
  inject: ["getSonColumn"],
  name: "faction",
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "名称", value: "name", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    realmModel: {
      name: "",
      introduce: "",
      pic: "",
    },
    dialog: false,
    imgFile: {},
    dialogType: "add",
    columnData: { cid: -1 },
    sonColumn:[]
  }),
  async mounted() {
    let that = this;
    if (Number(that.$route.query) !== -1) that.columnData = that.$route.query;
    that.realmQueryAll();
    that.sonColumn = await that.getSonColumn(that.columnData.id);
  },
  methods: {
    realmModelReset(type = null) {
      let that = this;
      that.realmModel = {
        name: "",
        introduce: "",
        pic: "",
      };
      that.dialog = false;
      that.dialogType = "add";
      if (!type) that.realmQueryAll();
    },
    async realmQueryAll() {
      let that = this;
      try {
        let result = await api.realmQueryAll(
          { where: { cid: that.columnData.cid }, offset: 0 },
          that
        );
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.dialogType !== "add") return that.realmUpdate();
      console.log(that.imgFile);
      if (that.$u.checkObjectIsEmpty(that.imgFile))
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      try {
        let result0 = await api.upload(that.imgFile, that);
        that.realmModel.start = new Date().valueOf();
        that.realmModel.pic = result0.code === 200 ? result0.data : "";
        that.realmModel.cid = that.columnData.cid;
        if (!result0) return that.$hint({ msg: "上传图片失败", type: "error" });
        let result = await api.realmAdd(that.realmModel, that);
        that.$hint({ msg: result.msg });
        that.realmModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async realmUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await api.upload(that.imgFile, that, that.realmModel.pic);
        that.realmModel.pic = res.code === 200 ? res.data : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.realmModel.update = new Date().valueOf();
      try {
        let result = await api.realmUpdate(that.realmModel, that);
        that.realmModelReset();
        that.$hint({ msg: "更新成功" });
      } catch (e) {
        console.log(e);
      }
    },
    async realmRead(id) {
      let that = this;
      try {
        let result = await api.realmRead({ id }, that);
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async realmEdit(id) {
      let that = this;
      let model = await that.realmRead(id);
      if (model) {
        that.realmModel = model;
        that.dialogType = "edit";
        that.dialog = true;
      }
    },
    async realmDelete(id) {
      let that = this;
      that.$toast({ msg: "确定要删除这方境界吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.realmRead(id);
        if (result.pic) {
          let result0 = await api.deleteFile({ path: result.pic }, that);
        }
        try {
          let result1 = await api.realmDelete({ id }, that);
          that.$hint({ msg: "删除成功" });
          that.realmQueryAll();
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