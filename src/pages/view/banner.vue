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
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="deleteCol(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="editCol(item)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent class="v-dialog">
      <v-row justify="center">
        <v-col cols="6" class="pa-0 ma-0">
          <v-card class="pa-5">
            <v-card-title class="justify-center text-uppercase text-h5">添加banner</v-card-title>
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
              <v-btn width="120" class="mx-2" @click="submit(dialogType)">提交</v-btn>
              <v-btn width="120" class="mx-2" @click="dialog=false;">关闭</v-btn>
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
    items: [
      { id: 0, column: "banner", order: "3", date: "2020-07-23", oper: "" },
      { id: 1, column: "banner", order: "3", date: "2020-07-23", oper: "" },
    ],
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
    async submit(type) {
      return console.log(this.bannerModel);
      let that = this;
      if (type !== "add") that.updateBanner();
      if (that.$u.checkObjectIsEmpty(that.imgFile)) {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      let res = await api.upload(that.imgFile);
      if (res.code !== 200)
        return that.$hint({ msg: "上传图片失败", type: "error" });
      that.bannerModel.pic = res.data;
      that.bannerModel.date = new Date().valueOf();
      try {
        let result = await api.addBanner(that.bannerModel, that);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    async updateBanner() {},
  },
  async mounted() {
    let that = this;
    that.queryColumns();
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