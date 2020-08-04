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
        <v-card-title class="justify-center text-h5">添加角色</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <v-col cols="2" class="px-4">
                <v-sheet height="100%" color="red">添加头像</v-sheet>
              </v-col>
              <v-col cols="5" height="100" class="px-10">
                <v-text-field label="角色名称"></v-text-field>
                <v-select label="角色性别" :items="['男','女']"></v-select>
              </v-col>
              <v-col cols="5" height="100" class="px-10">
                <v-text-field label="角色境界"></v-text-field>
                <v-select label="势力划分" :items="['北凉','江南']"></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea label="人物描述" solo auto-grow></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-btn width="100" class="mx-3">提交</v-btn>
          <v-btn width="100" class="mx-3" @click="dialog=false;roleModelReset();">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as api from "@api";
export default {
  name: "role",
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "名称", value: "name", align: "center" },
      { text: "性别", value: "sex", align: "center" },
      { text: "境界", value: "step", align: "center" },
      { text: "分类", value: "class", align: "center" },
      { text: "发布日期", value: "date", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [
      {
        id: 0,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 1,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 2,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 3,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 4,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 5,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 6,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 7,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 8,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 9,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 10,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 11,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 12,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 13,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 14,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 15,
        name: "徐晓",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
      {
        id: 16,
        name: "徐凤年",
        sex: "男",
        step: "陆地神仙",
        class: "北凉",
        date: "2020-07-22",
        oper: "",
      },
    ],
    roleModel: {},
  }),
  mounted() {
    let that = this;
    that.queryRoles();
  },
  methods: {
    roleModelReset() {
      this.roleModel = {};
    },
    async queryRoles() {
      let that = this;
      try {
        let result = await api.queryRoles({ num: 0 });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>