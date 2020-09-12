<template>
  <v-container>
    <v-subheader>首页轮播</v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;" :style="[theme.bg_p,theme.co]" class="mr-2">+添加</v-btn>
        <v-btn text :style="[theme.bg_p,theme.co]">更新</v-btn>
      </v-toolbar>
      <v-data-table align="center" :headers="headers" disable-sort :items="items">
        <!-- <template v-slot:item.cid="{item}">{{columnByCid[item.cid].name}}</template> -->
        <template v-slot:item.oper="{item}">
          <v-btn
            fab
            x-small
            depressed
            title="删除"
            class="mx-1"
            @click="bannerDelete(item.id)"
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
            @click="editBanner(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent class="v-dialog">
      <v-row justify="center" v-if="dialog">
        <v-col cols="6" class="pa-0 ma-0">
          <v-card class="pa-5">
            <v-card-title
              class="justify-center text-uppercase text-h5"
            >{{dialogType=='add'?'添加':'更新'}}banner</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="标题" v-model="bannerModel.title"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="所属分类"
                    :items="columns"
                    item-text="name"
                    item-value="id"
                    v-model="bannerModel.cid"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="跳转网址" v-model="bannerModel.url"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="排序" v-model="bannerModel.order"></v-text-field>
                </v-col>
                <upload type="auto" :src="bannerModel.pic" v-model="imgFile" cols="6"></upload>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                width="120"
                class="mx-2"
                @click="submit(dialogType)"
                :style="[theme.bg_p,theme.co]"
              >{{dialogType=='add'?'提交':'更新BANNER'}}</v-btn>
              <v-btn
                width="120"
                class="mx-2"
                @click="bannerModelReset(1)"
                :style="[theme.bg_p,theme.co]"
              >关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
import { Api, upload, deleteFile } from "@api";
export default {
  name: "banner",
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "所属栏目", value: "cid" },
      { text: "排序", value: "order" },
      { text: "发布时间", value: "date" },
      { text: "操作", value: "oper" },
    ],
    items: [],
    dialog: false,
    dialogType: "add",
    bannerModel: {
      title: "",
      pic: "",
      order: "",
      url: "",
      cid: "",
    },
    columns: [],
    imgFile: {},
    api: new Api("banner"),
    columnApi: new Api("column"),
  }),
  async mounted() {
    let that = this;
    that.getColumn();
    that.bannerQueryAll();
  },
  methods: {
    bannerModelReset(type = null) {
      let that = this;
      that.bannerModel = {
        title: "",
        pic: "",
        order: "",
        url: "",
        cid: "",
      };
      that.dialogType = "add";
      that.imgFile = {};
      that.dialog = false;
      if (!type) that.bannerQueryAll();
    },
    async submit(type) {
      let that = this;
      if (type !== "add") return that.bannerUpdate();
      if (that.$u.checkObjectIsEmpty(that.imgFile)) {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      let res = await upload(that.imgFile, that);
      if (res.code !== 200)
        return that.$hint({ msg: "上传图片失败", type: "error" });
      that.bannerModel.pic = res.data;
      that.bannerModel.date = new Date().valueOf();
      try {
        let result = await that.api.add(that.bannerModel, that);
        console.log(result);
        that.$hint({ msg: "添加成功" });
        that.bannerModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async editBanner(id) {
      let that = this;
      that.bannerModel = await that.bannerRead(id);
      if (!that.bannerModel) return that.bannerModelReset(1);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async bannerRead(id) {
      let that = this;
      try {
        let result = await that.api.read({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async bannerUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let result = await upload(that.imgFile, that, that.bannerModel.pic);
        that.bannerModel.pic =
          result.code === 200 ? result.data : that.bannerModel.pic;
        if (!result) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.bannerModel.date = new Date().valueOf();
      try {
        let result0 = await that.api.update(that.bannerModel);
        if (result0.code === 200) that.$hint({ msg: "更新成功" });
        else that.$hint({ msg: "更新失败", type: "error" });
        that.bannerModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async bannerQueryAll() {
      let that = this;
      try {
        let result = await that.api.queryAll();
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async bannerDelete(id) {
      let that = this;
      that.$toast({ msg: "确认删除吗？" });
      that.bus.$on("toastConfirm", async function () {
        if (that.bannerModel.pic.length > 0) {
          try {
            let result = await deleteFile({
              path: that.bannerModel.pic,
            });
          } catch (e) {
            console.error(e);
          }
        }
        try {
          let result = await that.api.delete({ id });
          that.$hint({
            msg: result.msg,
            type: result.code === 200 ? "success" : "error",
          });
          that.bannerQueryAll();
        } catch (e) {
          console.error(e);
          that.$hint({ msg: "删除失败", type: "error" });
        }
      });
    },
    async getColumn() {
      let that = this;
      try {
        let result = await that.columnApi.queryAll();
        that.columns = result.code === 200 ? result.data : [];
      } catch (e) {
        console.error(e);
        that.$hint({ msg: "获取所以模板失败", type: "error" });
      }
    },
  },
  computed: {
    // columnByCid() {
    //   let that = this;
    //   let obj = {};
    //   that.columns.forEach((item, idx) => {
    //     obj[item.id] = item;
    //   });
    //   return obj;
    // },
    theme() {
      return this.$store.getters.getTheme;
    },
  },

  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="scss">
.v-dialog {
  box-shadow: none !important;
}
</style>