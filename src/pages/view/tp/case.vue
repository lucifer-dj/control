<template>
  <v-container fiuld class="v-container">
    <v-subheader>
      栏目管理
      <v-icon class="mx-1" small>iconfont-xiangyou</v-icon>角色管理
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加新角色</v-btn>
        <v-btn text>
          <v-icon small>iconfont-shanchu</v-icon>删除选中
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon class="mr-2">iconfont-sousuo</v-icon>搜索
        </v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers" show-select>
        <!-- <template v-slot:item.id="{item}">{{item-key}}</template> -->
        <template
          v-slot:item.start="{item}"
        >{{$u.format.call(new Date(Number(item.update?item.update:item.start)), "yyyy-MM-dd")}}</template>
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="deleteCase(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="editCase(item.id)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h5">{{dialogType==='add'?'添加':'编辑'}}角色</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <upload type="card" v-model="imgFile" :src="caseModel.avatar"></upload>
              <v-col cols="4" height="100" class="px-10">
                <v-text-field label="角色名称" v-model="caseModel.name"></v-text-field>
                <v-select label="角色性别" v-model="caseModel.sex" :items="['男','女']"></v-select>
              </v-col>
              <v-col cols="5" height="100" class="px-10">
                <v-text-field label="角色境界" v-model="caseModel.realm"></v-text-field>
                <v-select label="势力划分" v-model="caseModel.place" :items="['北凉','江南']"></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea label="人物描述" solo auto-grow v-model="caseModel.introduce"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn width="100" class="mx-3" @click="submit(dialogType)">{{dialog==='add'?'提交':'确认修改'}}</v-btn>
          <v-btn width="100" class="mx-3" @click="caseModelReset();">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as api from "@api";
export default {
  name: "tpCase",
  data: () => ({
    dialog: false,
    dialogType: "add",
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "名称", value: "name", align: "center" },
      { text: "性别", value: "sex", align: "center" },
      { text: "境界", value: "step", align: "center" },
      { text: "分类", value: "class", align: "center" },
      { text: "发布日期", value: "date", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    caseModel: {
      avatar: "",
      name: "",
      introduce: "",
      sex: "",
      place: "",
      realm: "",
    },
    imgFile: {},
  }),
  mounted() {
    let that = this;
    that.queryCases();
  },
  methods: {
    caseModelReset() {
      let that = this;
      that.caseModel = {
        avatar: "",
        name: "",
        introduce: "",
        sex: "",
        place: "",
        realm: "",
      };
      that.dialogType = "add";
      that.dialog = false;
      that.queryCases();
    },
    async queryCases() {
      let that = this;
      try {
        let result = await api.queryCases({ num: 0 });
        that.items = result.data;
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (type === "edit") return that.updateCase();
      //假设验证通过了
      if (that.$u.checkObjectIsEmpty(that.imgFile)) {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      that.caseModel.start = new Date().valueOf();
      that.caseModel.avatar = "ceshi";
      try {
        let path = await api.upload(that.imgFile);
        if (!path) return;
        that.caseModel.avatar = path;
        let result = await api.addCase(that.caseModel);
        that.$hint({ msg: "添加成功" });
        that.caseModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async updateCase() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        that.caseModel.avatar = await api.upload(that.imgFile);
        if (!that.caseModel.avatar) return;
      }
      try {
        that.caseModel.update = new Date().valueOf();
        let result = await api.updateCase(that.caseModel, that);
        that.$hint({ msg: "修改成功" });
        that.caseModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async readCase(id) {
      let that = this;
      try {
        let result = await api.readCase({ id }, that);
        return result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async editCase(id) {
      let that = this;
      that.caseModel = await that.readCase(id);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async deleteCase(id) {
      let that = this;
      that.$toast({ msg: "确认要删除这位角色吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.readCase(id);
        if (result.avatar) {
          let result0 = await api.deleteFile({ path: result.avatar });
        }
        try {
          let result1 = await api.deleteCase({ id }, that);
          that.$hint({ msg: "成功删除一条数据" });
          that.queryCases();
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
<style lang="less" scoped>
</style>