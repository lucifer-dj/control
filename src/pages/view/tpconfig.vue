<template>
  <v-container>
    <v-subheader>首页轮播</v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;" :style="[theme.bg_p,theme.co]" class="mr-2">+添加</v-btn>
        <v-btn text :style="[theme.bg_p,theme.co]">更新</v-btn>
      </v-toolbar>
      <v-data-table align="center" :headers="headers" disable-sort :items="items"></v-data-table>
    </v-card>
    <v-dialog class="my-v-dialog" v-model="dialog">
      <v-row justify="center" v-if="dialog">
        <v-col cols="6" class="pa-0 ma-0">
          <v-card class="pa-5">
            <v-card-title
              class="justify-center text-uppercase text-h5"
            >{{dialogType=='add'?'添加':'更新'}}banner</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="tpModel.template"
                    label="*选择模板"
                    :items="templates"
                    required
                    @input="$v.tpModel.template.$touch()"
                    @blur="$v.tpModel.template.$touch()"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="前台路径" v-model="tpModel.front"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="模板名称" v-model="tpModel.name"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="英文名称" v-model="tpModel.ename"></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field label="后台路径" v-model="tpModel.panel"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-subtitle>
              <p class="red--text">*注意</p>
              <p>1.前台路径与模板的名称相同</p>
            </v-card-subtitle>
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
                @click="tpModelReset(1)"
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
// 项目介绍
import * as api from "@api";
export default {
  name: "tpconfig",
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "模板名称", value: "name", align: "center" },
      { text: "英文名", value: "ename", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    tpModel: {
      template: "",
      name: "",
      ename: "",
      front: "",
      panel: "",
    },
    dialog: false,
    dialogType: "add",
    templates: [],
  }),
  methods: {
    async getTps() {
      let that = this;
      try {
        let result = await api.getTps({}, that);
        that.templates = result.code == 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    tpModelReset(type = null) {
      let that = this;
      that.tpModel = {
        template: "",
        name: "",
        ename: "",
        front: "",
        panel: "",
      };
      that.dialogType = "add";
      that.dialog = false;
      if (!type) that.getTps();
    },
  },
  mounted() {
    let that = this;
    that.getTps();
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="less" scoped>
.my-v-dialog {
  box-shadow: none !important;
}
</style>