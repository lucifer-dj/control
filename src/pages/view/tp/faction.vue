<template>
  <v-container fluid class="px-12">
    <v-subheader>势力划分</v-subheader>
    <v-subheader v-if="sonColumn.length>0">
      <span>子栏目:</span>
      <v-btn small class="mx-2" text v-for="(item,idx) in sonColumn" :key="idx">{{item.name}}</v-btn>
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;" :style="[theme.bg_p,theme.co]">+添加新势力</v-btn>
        <v-spacer></v-spacer>
        <v-btn text :style="[theme.bg_p,theme.co]">搜索</v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers">
        <template v-slot:item.oper="{item}">
          <v-btn
            fab
            x-small
            depressed
            title="删除"
            class="mx-1"
            @click="factionDelete(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn
            fab
            x-small
            depressed
            title="修改"
            class="mx-1"
            @click="factionEdit(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
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
              <upload type="auto" cols="12" v-model="imgFile" :src="factionModel.pic"></upload>
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
          <v-btn
            width="100"
            class="mx-3"
            @click="submit(dialogType)"
            :style="[theme.bg_p,theme.co]"
          >提交</v-btn>
          <v-btn
            width="100"
            class="mx-3"
            @click="factionModelReset(1);"
            :style="[theme.bg_p,theme.co]"
          >关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { checkObjectIsEmpty } from "@/plugins/util.js";
import { Api, upload, deleteFile } from "@api";
export default {
  name: "faction",
  inject: ["getSonColumn"],
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
    sonColumn: [],
    api: new Api("faction"),
  }),
  async mounted() {
    let that = this;
    that.factionModel.nid = that.$route.query.nid;
    that.factionQueryAll();
    that.sonColumn = that.getSonColumn(that.factionModel.nid);
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
        nid: that.$route.query.nid,
      };
      that.dialog = false;
      that.dialogType = "add";
      if (!type) that.factionQueryAll();
    },
    async factionQueryAll() {
      let that = this;
      try {
        let result = await that.api.queryAll(
          { where: { nid: that.factionModel.nid }, offset: 0 },
          that
        );
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.dialogType !== "add") return that.factionUpdate();
      if (checkObjectIsEmpty(that.imgFile))
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      try {
        let result0 = await upload(that.imgFile, that);
        that.factionModel.date = new Date().valueOf();
        that.factionModel.pic = result0.code === 200 ? result0.data : "";
        if (!result0) return that.$hint({ msg: "上传图片失败", type: "error" });
        let result = await that.api.add(that.factionModel, that);
        that.$hint({ msg: result.msg });
        that.factionModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async factionUpdate() {
      let that = this;
      if (!checkObjectIsEmpty(that.imgFile)) {
        let res = await upload(that.imgFile, that, that.factionModel.pic);
        if (res.code != 200)
          return that.$hint({ msg: "上传图片失败", type: "error" });
        that.factionModel.pic = res.code === 200 ? res.data : "";
      }
      that.factionModel.date = new Date().valueOf();
      console.log(that.factionModel);
      try {
        let result = await that.api.update(that.factionModel, that);
        that.factionModelReset();
        that.$hint({ msg: "更新成功" });
      } catch (e) {
        console.log(e);
      }
    },
    async factionRead(id) {
      let that = this;
      try {
        let result = await that.api.read({ id }, that);
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async factionEdit(id) {
      let that = this;
      that.factionModel = await that.factionRead(id);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async factionDelete(id) {
      let that = this;
      that.$toast({ msg: "确定要删除这方势力吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.factionRead(id);
        if (result.pic) {
          let result0 = await deleteFile({ path: result.pic });
        }
        try {
          let result1 = await that.api.delete({ id }, that);
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
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="scss">
</style>