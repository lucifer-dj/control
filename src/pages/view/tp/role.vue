<template>
  <v-container fiuld class="v-container">
    <v-subheader>角色管理</v-subheader>
    <v-subheader v-if="sonColumn.length>0">
      <span>子栏目:</span>
      <v-btn small class="mx-2" text v-for="(item,idx) in sonColumn" :key="idx">{{item.name}}</v-btn>
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;" :style="[theme.bg_p,theme.co]" class="mr-2">+添加新角色</v-btn>
        <v-btn text :style="[theme.bg_p,theme.co]">
          <v-icon small>iconfont-shanchu</v-icon>删除选中
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text :style="[theme.bg_p,theme.co]">
          <v-icon class="mr-2">iconfont-sousuo</v-icon>搜索
        </v-btn>
      </v-toolbar>

      <v-data-table disable-sort :items="items" :headers="headers" show-select>
        <!-- <template v-slot:item.id="{item}">{{item-key}}</template> -->
        <template
          v-slot:item.date="{item}"
        >{{$u.format.call(new Date(Number(item.date)), "yyyy-MM-dd")}}</template>
        <template v-slot:item.oper="{item}">
          <v-btn
            fab
            x-small
            depressed
            title="删除"
            class="mx-1"
            @click="deleteCase(item.id)"
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
            @click="roleEdit(item.id)"
            :style="[theme.bg_a,theme.co_p]"
          >
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
      <v-card class="d-flex align-center flex-column" v-if="dialog">
        <v-card-title class="justify-center text-h5">{{dialogType==='add'?'添加':'编辑'}}角色信息</v-card-title>
        <v-col cols="12" md="8">
          <v-card-text>
            <v-row>
              <upload type="card" v-model="imgFile" cols="6" :src="roleModel.avatar"></upload>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="角色名称" v-model="roleModel.name"></v-text-field>
                <v-select label="角色性别" v-model="roleModel.sex" :items="['男','女']"></v-select>
              </v-col>
              <v-col cols="6" height="100" class="px-10">
                <v-text-field label="角色境界" v-model="roleModel.realm"></v-text-field>
                <v-select label="势力划分" v-model="roleModel.faction" :items="['北凉','江南']"></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea label="人物描述" solo auto-grow v-model="roleModel.introduce"></v-textarea>
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
          >{{dialog==='add'?'提交':'确认修改'}}</v-btn>
          <v-btn
            width="100"
            class="mx-3"
            @click="roleModelReset(1);"
            :style="[theme.bg_p,theme.co]"
          >关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Api, upload, deleteFile } from "@api";
export default {
  name: "role",
  inject: ["getSonColumn"],
  data: () => ({
    dialog: false,
    dialogType: "add",
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "名称", value: "name", align: "center" },
      { text: "性别", value: "sex", align: "center" },
      { text: "境界", value: "realm", align: "center" },
      { text: "所属势力", value: "faction", align: "center" },
      { text: "日期", value: "date", align: "center" },
      { text: "操作", value: "oper", align: "center" },
    ],
    items: [],
    roleModel: {
      avatar: "",
      name: "",
      introduce: "",
      sex: "",
      faction: "",
      realm: "",
    },
    imgFile: {},
    columnData: { cid: -1 },
    sonColumn: [],
    api: new Api("role"),
  }),
  async mounted() {
    let that = this;
    if (Number(that.$route.query) !== -1) that.columnData = that.$route.query;
    that.roleQueryAll();
    that.sonColumn = await that.getSonColumn(that.columnData.id);
    console.log(that.sonColumn);
  },
  methods: {
    roleModelReset(type = null) {
      let that = this;
      that.roleModel = {
        avatar: "",
        name: "",
        introduce: "",
        sex: "",
        place: "",
        realm: "",
      };
      that.dialogType = "add";
      that.dialog = false;
      if (!type) that.roleQueryAll();
    },
    async roleQueryAll() {
      let that = this;
      try {
        let result = await that.api.queryAll(
          { where: { cid: that.columnData.cid }, offset: 0 },
          that
        );
        that.items = result.code === 200 ? result.data : [];
        that.items.forEach((item, idx) => {
          item.date = item.update ? item.update : item.start;
        });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    async submit(type) {
      let that = this;
      if (type === "edit") return that.roleUpdate();
      //假设验证通过了
      if (that.$u.checkObjectIsEmpty(that.imgFile)) {
        return that.$hint({ msg: "请选择上传的图片", type: "error" });
      }
      that.roleModel.start = new Date().valueOf();
      that.roleModel.avatar = "ceshi";
      try {
        let result0 = await upload(that.imgFile);
        that.roleModel.avatar = result0.code === 200 ? result0.data : "";
        that.roleModel.cid = that.columnData.cid;
        if (!result0) return that.$hint({ msg: "上传图片失败", type: "error" });
        let result = await that.api.add(that.roleModel, that);
        that.$hint({ msg: "添加成功" });
        that.roleModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async roleUpdate() {
      let that = this;
      if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
        let res = await upload(that.imgFile, that, that.roleModel.avatar);
        that.roleModel.avatar = res.code === 200 ? res.data : "";
        if (!res) return that.$hint({ msg: "上传图片失败", type: "error" });
      }
      try {
        that.roleModel.update = new Date().valueOf();
        let result = await that.api.update(that.roleModel, that);
        that.$hint({ msg: "修改成功" });
        that.roleModelReset();
      } catch (e) {
        console.log(e);
      }
    },
    async roleRead(id) {
      let that = this;
      try {
        let result = await that.api.read({ id }, that);
        return result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async roleEdit(id) {
      let that = this;
      that.roleModel = await that.roleRead(id);
      that.dialogType = "edit";
      that.dialog = true;
    },
    async roleDelete(id) {
      let that = this;
      that.$toast({ msg: "确认要删除这位角色吗？" });
      that.bus.$on("toastConfirm", async function () {
        let result = await that.roleRead(id);
        if (result.avatar) {
          let result0 = await deleteFile({ path: result.avatar });
        }
        try {
          let result1 = await that.api.delete({ id }, that);
          that.$hint({ msg: "成功删除一条数据" });
          that.roleQueryAll();
        } catch (e) {
          console.log(e);
        }
      });
    },
  },
  components: {
    upload: () => import("@components/upload.vue"),
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="less" scoped>
</style>