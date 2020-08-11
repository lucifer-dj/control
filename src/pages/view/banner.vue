<template>
  <v-container>
    <v-subheader>
      页面设置
      <v-icon class="iconfont iconxiangyou mx-1" small></v-icon>首页轮播
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加</v-btn>
        <v-btn text>更新</v-btn>
      </v-toolbar>
      <v-data-table align="center" :headers="headers" disable-sort :items="items">
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="deleteBanner(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="editBanner(item.id)">
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
                <upload type="line" :src="bannerModel.pic" v-model="imgFile" cols="6"></upload>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                width="120"
                class="mx-2"
                @click="submit(dialogType)"
              >{{dialogType=='add'?'提交':'更新BANNER'}}</v-btn>
              <v-btn width="120" class="mx-2" @click="bannerModelReset(1)">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
import * as api from "@api";
export default {
  name: "banner",
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "所属栏目", value: "column" },
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
  }),
  methods: {
    async queryColumns() {
      let that = this;
      try {
        let result = await api.queryColumns();
        // console.log(result.data);
        that.columns = result.data;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
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
      if (!type) that.queryBanners();
    },
    async submit(type) {
      let that = this;
      if (type !== "add") return that.updateBanner();
      if (that.$u.checkObjectIsEmpty(that.imgFile)) {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      let res = await api.upload(that.imgFile, that);
      if (res.code !== 200)
        return that.$hint({ msg: "上传图片失败", type: "error" });
      that.bannerModel.pic = res.data;
      that.bannerModel.date = new Date().valueOf();
      try {
        let result = await api.addBanner(that.bannerModel, that);
        console.log(result);
        that.$hint({ msg: "添加成功" });
        that.bannerModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async editBanner(id) {
      let that = this;
      that.bannerModel = await that.readBanner(id);
      if (!that.bannerModel) return that.bannerModelReset(1);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async readBanner(id) {
      let that = this;
      try {
        let result = await api.readBanner({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async updateBanner() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let result = await api.upload(that.imgFile, that, that.bannerModel.pic);
        that.bannerModel.pic = result ? result.data : that.bannerModel.pic;
        if (!result) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.bannerModel.date = new Date().valueOf();
      try {
        let result0 = await api.updateBanner(that.bannerModel);
        that.$hint({ msg: "更新成功" });
        that.bannerModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async queryBanners() {
      let that = this;
      try {
        let result = await api.queryBanners();
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async deleteBanner(id) {
      let that = this;
      that.$toast({ msg: "确认删除吗？" });
      that.bus.$on("toastConfirm", async function () {
        if (that.bannerModel.pic.length > 0) {
          try {
            let result = await api.deleteFile({ path: that.bannerModel.pic });
          } catch (e) {
            console.error(e);
          }
        }
        try {
          let result = await api.deleteBanner({ id });
          if (result.code === 200) {
            return that.$hint({ msg: "删除成功" });
            that.queryBanners();
          }
          that.$hint({ msg: "删除失败" });
        } catch (e) {
          console.error(e);
          that.$hint({ msg: "删除失败" });
        }
      });
    },
  },
  async mounted() {
    let that = this;
    that.queryColumns();
    that.queryBanners();
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less">
.v-dialog {
  box-shadow: none !important;
}
</style>