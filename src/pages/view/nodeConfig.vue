<template>
  <v-container>
    <v-subheader>节点设置</v-subheader>

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
                  <v-text-field label="标题" v-model="nodeModel.title"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="所属分类"
                    :items="columns"
                    item-text="name"
                    item-value="id"
                    v-model="nodeModel.cid"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="跳转网址" v-model="nodeModel.url"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="排序" v-model="nodeModel.order"></v-text-field>
                </v-col>
                <upload type="auto" :src="nodeModel.pic" v-model="imgFile" cols="6"></upload>
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
                @click="nodeModelReset(1)"
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
import { Api } from "@api";
export default {
  name: "nodeConfig",
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "节点名称", value: "call" },
      { text: "模板名称", value: "name" },
      { text: "父节点", value: "cid" },
      { text: "路劲", value: "v_path" },
      { text: "操作", value: "oper" },
    ],
    items: [],
    dialog: false,
    dialogType: "add",
    nodeModel: {
      title: "",
      call: "",
      name: "",
      icon: "",
      cid: "",
      component: "",
      v_path: "",
    },
    columns: [],
    imgFile: {},
    api: new Api("node"),
  }),
  methods: {
    nodeModelReset(type = null) {
      let that = this;
      that.nodeModel = {
        title: "",
        call: "",
        name: "",
        icon: "",
        cid: "",
        component: "",
        v_path: "",
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
      let res = await api.upload(that.imgFile, that);
      if (res.code !== 200)
        return that.$hint({ msg: "上传图片失败", type: "error" });
      that.nodeModel.pic = res.data;
      that.nodeModel.date = new Date().valueOf();
      try {
        let result = await api.bannerAdd(that.nodeModel, that);
        console.log(result);
        that.$hint({ msg: "添加成功" });
        that.nodeModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async editBanner(id) {
      let that = this;
      that.nodeModel = await that.bannerRead(id);
      if (!that.nodeModel) return that.nodeModelReset(1);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async bannerRead(id) {
      let that = this;
      try {
        let result = await api.bannerRead({ id });
        return result.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async bannerUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let result = await api.upload(that.imgFile, that, that.nodeModel.pic);
        that.nodeModel.pic =
          result.code === 200 ? result.data : that.nodeModel.pic;
        if (!result) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      that.nodeModel.date = new Date().valueOf();
      try {
        let result0 = await api.bannerUpdate(that.nodeModel);
        that.$hint({ msg: "更新成功" });
        that.nodeModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async bannerQueryAll() {
      let that = this;
      try {
        let result = await api.bannerQueryAll();
        that.items = result.code === 200 ? result.data : [];
      } catch (e) {
        console.log(e);
      }
    },
    async bannerDelete(id) {
      let that = this;
      that.$toast({ msg: "确认删除吗？" });
      that.bus.$on("toastConfirm", async function () {
        if (that.nodeModel.pic.length > 0) {
          try {
            let result = await api.deleteFile({ path: that.nodeModel.pic });
          } catch (e) {
            console.error(e);
          }
        }
        try {
          let result = await api.bannerDelete({ id });
          if (result.code === 200) {
            return that.$hint({ msg: "删除成功" });
            that.bannerQueryAll();
          }
          that.$hint({ msg: "删除失败" });
        } catch (e) {
          console.error(e);
          that.$hint({ msg: "删除失败" });
        }
      });
    },
    async columnQueryAll() {
      let that = this;
      try {
        let result = await api.columnQueryAll({}, that);
        that.columns.push({ name: "首页", id: "-1" });
        let arr = result.code === 200 ? result.data : [];
        that.columns = that.columns.concat(arr);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    columnByCid() {
      let that = this;
      let obj = {};
      that.columns.forEach((item, idx) => {
        obj[item.id] = item;
      });
      return obj;
    },
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  async mounted() {
    let that = this;
    let res = await that.api.queryAll();
    console.log(res);
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