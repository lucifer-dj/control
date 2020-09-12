<template>
  <v-container>
    <v-subheader>模板设置</v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;" :style="[theme.bg_p,theme.co]" class="mr-2">+添加</v-btn>
        <v-btn text :style="[theme.bg_p,theme.co]">更新</v-btn>
      </v-toolbar>
      <v-data-table align="center" :headers="headers" disable-sort :items="items">
        <template v-slot:item.oper="{item}">
          <v-btn
            fab
            x-small
            depressed
            title="删除"
            class="mx-1"
            @click="tpDelete(item.id)"
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
            @click="editTp(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog">
      <v-row justify="center" v-if="dialog" class="dialog_row">
        <v-col cols="6" class="pa-0 ma-0">
          <v-card class="pa-5">
            <v-card-title
              class="justify-center text-uppercase text-h5"
            >{{dialogType=='add'?'添加':'更新'}}banner</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select v-model="tpModel.template" label="*选择模板" :items="htmls" required></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="模板名称" v-model="tpModel.call"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="URL路径==>VUE" v-model="tpModel.v_path"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="import引入路径"
                    persistent-hint
                    hint="不要以/开头"
                    v-model="tpModel.component"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="VUE组件name" v-model="tpModel.name"></v-text-field>
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
              >{{dialogType=='add'?'提交':'更新'}}</v-btn>
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
import { Api, getTps } from "@api";
import { getItemObj } from "@/plugins/util.js";
export default {
  name: "tpConfig",
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "模板名称", value: "call", align: "center" },
      { text: "VUE组件", value: "name", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    tpModel: {
      template: "",
      call: "",
      name: "",
      component: "",
      v_path: "",
    },
    dialog: false,
    dialogType: "add",
    htmls: [],
    api: new Api("tmp"),
    nodeApi: new Api("node"),
  }),
  mounted() {
    let that = this;
    that.getHtmlList();
    that.tpQueryAll();
    // that.addNode();
  },
  methods: {
    async getHtmlList() {
      let that = this;
      try {
        let result = await getTps({}, that);
        that.htmls = result.code == 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    tpModelReset(type = null) {
      let that = this;
      that.tpModel = {
        template: "",
        call: "",
        name: "",
        component: "",
        v_path: "",
      };
      that.dialogType = "add";
      that.dialog = false;
      if (!type) that.tpQueryAll();
    },
    async tpQueryAll() {
      let that = this;
      try {
        let result = await that.api.queryAll();
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async submit() {
      let that = this;
      that.tpModel.component = "tp/" + that.tpModel.component;
      if (that.dialogType !== "add") return that.tpUpdate();
      try {
        let result = await that.api.add(that.tpModel);
        if (result.code === 200) {
          that.$hint({ msg: "添加成功" });
          that.tpModelReset();
        }
      } catch (e) {
        console.log(e);
        that.$hint({ msg: "添加失败", type: "error" });
      }
    },
    async editTp(id) {
      let that = this;
      that.tpModel = await that.tpRead(id);
      that.tpModel.component = that.tpModel.component.substring(3);
      if (!that.tpModel) return that.tpModelReset(1);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async tpRead(id) {
      let that = this;
      try {
        let result = await that.api.read({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async tpUpdate() {
      let that = this;
      try {
        let result = await that.api.update(that.tpModel);
        if (result.code === 200) that.$hint({ msg: "更新成功" });
        else that.$hint({ msg: "更新失败", type: "error" });
        that.tpModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async tpDelete(id) {
      let that = this;
      that.$toast({ msg: "确认删除吗？" });
      that.bus.$on("toastConfirm", async function () {
        try {
          let result = await that.api.delete({ id });
          if (result.code === 200) {
            that.tpQueryAll();
            return that.$hint({ msg: "删除成功" });
          }
          that.$hint({ msg: "删除失败" });
        } catch (e) {
          console.error(e);
          that.$hint({ msg: "删除失败" });
        }
      });
    },
  },

  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="scss">
.v-dialog--active {
  box-shadow: none !important;
}
</style>