<template>
  <v-container>
    <v-subheader>关于雪中</v-subheader>
    <v-subheader v-if="sonColumn.length>0">
      <span>子栏目:</span>
      <v-btn small class="mx-2" text v-for="(item,idx) in sonColumn" :key="idx">{{item.name}}</v-btn>
    </v-subheader>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea solo label="摘要" auto-grow v-model="aboutModel.description"></v-textarea>
          </v-col>
          <v-col cols="12">
            <span class="mb-3 d-block">请编辑内容</span>
            <editor v-model="aboutModel.content"></editor>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="100" class="mx-3" @click="aboutUpdate" :style="[theme.bg_p,theme.co]">确认修改</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import * as api from "@api";
export default {
  name: "about",
  inject: ["getSonColumn"],
  data: () => ({
    aboutModel: {},
    cid: -1,
    columnData: {},
    sonColumn: [],
  }),
  async mounted() {
    let that = this;
    if (Number(that.$route.query) !== -1) that.columnData = that.$route.query;
    that.aboutGet();
    that.sonColumn = await that.getSonColumn(that.columnData.id);
  },
  methods: {
    async aboutGet() {
      let that = this;
      try {
        let result = await api.aboutGet({}, that);
        that.aboutModel =
          result.code === 200 && result.data
            ? result.data
            : {
                content: "",
                description: "",
              };
      } catch (e) {
        console.log(e);
      }
    },
    async aboutUpdate() {
      let that = this;
      // if (!that.$u.checkObjectIsEmpty(that.imgFile)) {
      //   if (that.aboutModel.logo !== "") {
      //     let result0 = await api.deleteFile({ path: that.aboutModel.logo });
      //     console.log(result0);
      //   }
      //   let result1 = await api.upload(that.imgFile);
      //   that.aboutModel.logo = result1.code === 200 ? result1.data : "";
      // }
      try {
        let result = await api.aboutUpdate(that.aboutModel, that);
        that.$hint({ msg: "修改成功" });
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    editor: () => import("@components/editor.vue"),
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>