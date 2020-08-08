<template>
  <v-container fiuld>
    <v-subheader>
      栏目管理
      <v-icon class="mx-1" small>iconfont-xiangyou</v-icon>势力划分
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加新势力</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>搜索</v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers">
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

    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column">
        <v-card-title class="justify-center text-h5">添加新势力</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <upload type="line" v-model="imgFile" :src="productModel.pic"></upload>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="势力名称" v-model="productModel.name"></v-text-field>
                <v-text-field label="年代" v-model="productModel.years"></v-text-field>
              </v-col>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="统治者" v-model="productModel.lead"></v-text-field>
                <v-select label="当前状态" :items="['兴盛','羸弱']" v-model="productModel.state"></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea label="大致介绍" solo auto-grow v-model="productModel.introduce"></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn width="100" class="mx-3" @click="submit(dialogType)">提交</v-btn>
          <v-btn width="100" class="mx-3" @click="productModelReset();">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as api from "@api";
export default {
  name: "tpProduct",
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
    productModel: {
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
    that.queryProducts();
  },
  methods: {
    productModelReset() {
      let that = this;
      that.productModel = {
        name: "",
        state: "",
        introduce: "",
        years: "",
        lead: "",
      };
      that.dialog = false;
      that.dialogType = "add";
      that.queryProducts();
    },
    async queryProducts() {
      let that = this;
      try {
        let result = await api.queryProducts({ num: 0 });
        that.items = result.data;
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    async uploadPic() {
      let that = this;
      try {
        let fm = new FormData();
        fm.append("file", that.imgFile);
        let result = await api.upload(fm);
        return result.data;
      } catch (e) {
        return false;
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (that.dialogType !== "add") return that.updateProduct();
      console.log(that.imgFile);
      if (that.$u.checkObjectIsEmpty(that.imgFile))
        return that.$hint({ msg: "请选择上传的图片" });
      that.productModel.start = new Date().valueOf();
      try {
        let path = await that.uploadPic();
        that.productModel.pic = path;
        let result = await api.addProduct(that.productModel);
        that.$hint({ msg: result.msg });
        that.productModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async updateProduct() {},
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less">
</style>