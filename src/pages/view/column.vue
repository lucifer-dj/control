<template>
  <v-container ref="container">
    <v-card class="px-6 pb-3" elevation="1">
      <v-toolbar flat>
        <v-card-title>栏目管理</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="c_addColumn">+添加栏目</v-btn>
        <v-btn>更新排序</v-btn>
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
          <span>{{item.name}}</span>
        </template>
        <!-- 是否显示 -->
        <template v-slot:item.show="{item}">
          <span>{{item.show?'显示':'隐藏'}}</span>
        </template>

        <!-- 操作 -->
        <template v-slot:item.oper="{item}">
          <v-btn fab x-small depressed title="添加子项目" class="mx-1" @click="addSonCol(item)">
            <v-icon>iconfont-ic_add_line</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="删除" class="mx-1" @click="deleteCol(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="readColumn(item.id)">
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
                <v-select label="所属栏目" :items="origin" v-model="columnModel.origin"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="columnModel.template"
                  label="*选择模板"
                  :items="template"
                  item-text="name"
                  item-value="en"
                  required
                  @input="$v.columnModel.template.$touch()"
                  @blur="$v.columnModel.name.$touch()"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" class="d-flex flex-row align-center">
                <span>是否隐藏</span>
                <v-radio-group row class="ml-10" v-model="columnModel.show">
                  <v-radio
                    label="显示"
                    value="1"
                    off-icon="iconfont-weixuan"
                    on-icon="iconfont-xuanzhong"
                  ></v-radio>
                  <v-radio
                    label="隐藏"
                    value="0"
                    off-icon="iconfont-weixuan"
                    on-icon="iconfont-xuanzhong"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <!-- <v-col cols="12" md="6">
              <v-text-field label="栏目英文名称"></v-text-field>
              </v-col>-->
              <v-col cols="12" md="6">
                <v-text-field label="排序" v-model="columnModel.order"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="关键词" v-model="columnModel.keywords"></v-text-field>
              </v-col>
              <upload v-model="imgFile" type="line" :src="columnModel.pic" ref="upload"></upload>
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
          >{{dialogType=='add'?'提交':'确认修改'}}</v-btn>
          <v-btn width="100" class="mx-3" @click="columnModelReset();">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import * as api from "@api";
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
      { text: "名称", value: "name", align: "center" },
      { text: "显示", value: "show", align: "center" },
      { text: "排序", value: "order", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    dialog: false,
    dialogType: "add",
    origin: ["顶级栏目", "角色管理", "内容价绍", "势力划分"],
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
    },
  }),
  async mounted() {
    let that = this;
    that.queryColumns();
  },
  methods: {
    // getFile(e) {
    //   console.log(e);
    // },
    c_addColumn() {
      let that = this;
      that.columnModelReset();
      that.dialog = true;
      that.dialogType = "add";
      // console.log(that.$u.checkObjectIsEmpty(that.imgFile));
    },
    columnModelReset() {
      let that = this;
      that.columnModel = {
        origin: "顶级栏目",
        name: "",
        show: "1",
        description: "",
        keywords: "",
        pic: [],
        order: "",
        template: "",
      };
      that.imgFile = {};
      // that.reload();
      that.dialog = false;
      that.queryColumns();
    },
    async submit(type) {
      let that = this;
      that.columnModel.icon = cfg.tp[that.columnModel.template].icon;
      if (type != "add") return that.editCol();
      that.$v.columnModel.$touch();
      let pic = "";
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        that.columnModel.pic = await that.uploadPic();
      }
      try {
        that.columnModel.pic = pic;
        let result = await api.addColumn(that.columnModel, that);
        that.$hint({ msg: result.msg, type: "success" });
        that.columnModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async uploadPic() {
      let that = this;
      try {
        let fm = new FormData();
        fm.append("file", that.imgFile);
        let result = await api.upload(fm, that);
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async queryColumns() {
      let that = this;
      try {
        let result = await api.queryColumns();
        that.items = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async readColumn(id) {
      let that = this;
      try {
        let result = await api.readColumn({ id }, that);
        that.dialog = true;
        that.dialogType = "edit";
        that.columnModel = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async editCol(id) {
      let that = this;
      // that.$v.columnModel.$touch();
      // if(that.$v.columnModel.$invalid){
      //   return console.log('请填写必填项')
      // }
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        console.log("有图片");
        that.columnModel.pic = await that.uploadPic();
      }
      try {
        let result = await api.editCol(that.columnModel, that);
        that.$hint({ msg: "修改成功", type: "success" });
        that.columnModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCol(id) {
      let that = this;
      that.$toast({ msg: "确认要删除这个栏目吗？" });
      that.bus.$on("toastConfirm", async function () {
        try {
          let result = await api.deleteCol({ id });
          that.$hint({ msg: "删除成功", type: "success" });
          that.queryColumns();
        } catch (e) {
          console.log(e);
        }
      });
    },
    async addSonCol() {
      let that = this;
      // that.reload();
      that.$toast({ msg: "功能正在研发中。。。" });
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
      let arr = [];
      let keys = Object.keys(cfg.tp);
      keys.forEach((item) => arr.push(cfg.tp[item]));
      return arr;
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

