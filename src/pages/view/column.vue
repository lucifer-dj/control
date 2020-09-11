<template>
  <v-container ref="container">
    <v-card class="px-6 pb-3" elevation="1">
      <v-toolbar flat>
        <v-card-title>栏目管理</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="c_addColumn" :style="[theme.bg_p,theme.co]">+添加栏目</v-btn>
        <v-btn :style="[theme.bg_p,theme.co]">更新排序</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="items"
        disable-sort
        disable-pagination
        hide-default-footer
      >
        <!-- 名称 -->
        <template v-slot:item.name="{item}">
          <span>{{item.origin===-1?item.name:'|—'+item.name}}</span>
        </template>
        <!-- 是否显示 -->
        <template v-slot:item.show="{item}">
          <span>{{item.show?'显示':'隐藏'}}</span>
        </template>

        <!-- 操作 -->
        <template v-slot:item.oper="{item}">
          <v-btn
            fab
            x-small
            depressed
            title="添加子项目"
            class="mx-1"
            @click="addSonCol(item)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont-ic_add_line</v-icon>
          </v-btn>
          <v-btn
            fab
            x-small
            depressed
            title="删除"
            class="mx-1"
            @click="deleteColumn(item.id)"
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
            @click="editCol(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- 添加栏目 -->
    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h4">{{dialogType=='add'?'添加':'修改'}}栏目</v-card-title>
        <v-col md="6">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  label="*栏目名称"
                  v-model="columnModel.name"
                  required
                  @input="$v.columnModel.name.$touch()"
                  @blur="$v.columnModel.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="*栏目英文名称" v-model="columnModel.ename" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="所属栏目"
                  :items="origin"
                  item-text="name"
                  item-value="id"
                  v-model="columnModel.origin"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="columnModel.template" label="*选择模板" :items="tps"></v-select>
              </v-col>
              <v-col cols="12" md="6" class="d-flex flex-row align-center">
                <span>是否隐藏</span>
                <v-radio-group row class="ml-10" v-model="columnModel.show">
                  <v-radio
                    label="显示"
                    :value="1"
                    off-icon="iconfont-weixuan"
                    on-icon="iconfont-xuanzhong"
                  ></v-radio>
                  <v-radio
                    label="隐藏"
                    :value="0"
                    off-icon="iconfont-weixuan"
                    on-icon="iconfont-xuanzhong"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="链接地址" v-model="columnModel.link"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="排序" v-model="columnModel.order"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="关键词" v-model="columnModel.keywords"></v-text-field>
              </v-col>
              <upload v-model="imgFile" type="auto" cols="12" :src="columnModel.pic" ref="upload"></upload>
              <v-col cols="12" md="12">
                <v-textarea label="栏目描述" solo auto-grow v-model="columnModel.description"></v-textarea>
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
          >{{dialogType=='add'?'提交':'确认修改'}}</v-btn>
          <v-btn
            width="100"
            class="mx-3"
            @click="columnModelReset();"
            :style="[theme.bg_p,theme.co]"
          >关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { Api, upload, deleteFile, getTps } from "@api";
import { required } from "vuelidate/lib/validators";
import cfg from "@/plugins/cfg.js";
export default {
  inject: ["reload"],
  name: "column",
  validations: {
    columnModel: {
      name: {
        required,
      },
      template: {
        required,
      },
    },
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "名称", value: "name", align: "left" },
      { text: "显示", value: "show", align: "center" },
      { text: "排序", value: "order", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    dialog: false,
    dialogType: "add",
    imgFile: {},
    columnModel: {
      origin: "顶级栏目",
      name: "",
      show: "1",
      description: "",
      keywords: "",
      pic: "",
      order: "",
      template: "",
      ename: "",
      link: "",
      icon: "",
    },
    api: new Api("column"),
    tps: [],
    columnData: {},
  }),
  async mounted() {
    let that = this;
    that.columnData = that.$route.query;
    that.columnQueryAll();
    that.getHtmlTps();
  },
  methods: {
    c_addColumn() {
      let that = this;
      that.dialog = true;
    },
    columnModelReset(type = null) {
      let that = this;
      that.columnModel = {
        origin: "顶级栏目",
        name: "",
        show: "1",
        description: "",
        keywords: "",
        pic: "",
        order: "",
        template: "",
        en: "",
        link: "",
        icon: "",
      };
      that.imgFile = {};
      // that.reload();
      that.dialog = false;
      that.dialogType = "add";
    },
    async submit(type) {
      let that = this;
      if (that.checkLink(that.columnModel))
        return that.$hint({ msg: "link重复", type: "error" });
      if (type != "add") return that.updateColumn();
      that.$v.columnModel.$touch();
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await upload(that.imgFile);
        that.columnModel.pic = res ? res.data : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      } else {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      try {
        let result = await that.api.add(that.columnModel, that);
        that.$hint({ msg: result.msg });
        that.reload();
      } catch (e) {
        console.log(e);
      }
    },
    async columnQueryAll() {
      let that = this;
      try {
        let result = await that.api.queryAll({}, that);
        that.items = result.code === 200 ? result.data : [];
        that.items = that.disposeItem;
      } catch (e) {
        console.log(e);
      }
    },
    checkLink(params) {
      let that = this;
      let { link } = params;
      if (that.columnModel.link === link) return false;
      return Boolean(that.items.find((ele) => ele.link === link));
    },
    async readColumn(id) {
      let that = this;
      try {
        let result = await that.api.read({ id }, that);
        // console.log(result.data);
        return result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async updateColumn() {
      let that = this;
      // that.$v.columnModel.$touch();
      // if(that.$v.columnModel.$invalid){
      //   return console.log('请填写必填项')
      // }
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await upload(that.imgFile, that, that.columnModel.pic);
        that.columnModel.pic = res ? res.data : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      try {
        console.log(that.columnModel.pic);
        let result = await that.api.update(that.columnModel, that);
        that.$hint({ msg: "修改成功" });
        that.reload();
      } catch (e) {
        console.log(e);
      }
    },
    async deleteColumn(id) {
      let that = this;
      that.$toast({ msg: "确认要删除这个栏目吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.readColumn(id);
        if (result.pic) {
          let result0 = await deleteFile({ path: result.pic });
        }
        try {
          let result1 = await that.api.delete({ id });
          that.$hint({ msg: "删除成功" });
          that.reload();
        } catch (e) {
          console.log(e);
        }
      });
    },
    async editCol(id) {
      let that = this;
      that.columnModel = await that.readColumn(id);
      console.log(that.columnModel);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async addSonCol(column) {
      let that = this;
      if (column.origin !== -1)
        return that.$hint({ msg: "不支持对子栏目添加栏目", type: "error" });
      that.columnModel.origin = column.id;
      that.dialog = true;
    },
    async getHtmlTps() {
      let that = this;
      try {
        let result = await getTps();
        that.tps = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async addNode() {
      let that = this;
      let _column = getItemObj("router");
      _column = _column[0].children.filter((r) => r.component === "column");
      _column = _column[0];
      return;
      let obj = {
        deep: 2,
        // cid: _column.id,
        // call: that.tpModel.name,
        // title: that.tpModel.name,
        // v_path: that.tpModel.name,
        // component: that.tpModel.template.split(".")[0],
        // auth: "user",
      };
      try {
        let result = await that.nodeApi.add(obj);
        if (result.code === 200) return true;
        return false;
      } catch (e) {
        console.log(e);
        that.$hint({ msg: "添加失败", type: "error" });
        return false;
      }
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.userModel.name.$dirty) return errors;
      !this.$v.userModel.name.required && errors.push("必填");
      return errors;
    },
    templateErrors() {
      const errors = [];
      if (!this.$v.userModel.template.$dirty) return errors;
      !this.$v.userModel.template.required && errors.push("必填");
      return errors;
    },
    template() {
      let that = this;
      let arr = [];
      let obj = cfg.tp;
      for (let item in obj) {
        arr.push(obj[item]);
      }
      return arr;
    },
    origin() {
      let that = this;
      let arr = [];
      arr.push({ name: "顶级栏目", id: that.columnData.id });
      that.items.forEach((item, idx) => {
        arr.push(item);
      });
      return arr;
    },
    disposeItem() {
      let that = this;
      let arr = that.items;
      arr.forEach((item, idx) => {
        if (item.origin == -1) {
          item._order = Number(item.id);
        } else {
          item._order = Number(item.origin) + 0.1;
        }
      });
      arr.sort((a, b) => a._order - b._order);
      return arr;
    },
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
};
</script>
<style lang="less">
tbody > tr {
  cursor: pointer;
}
</style>

