<template>
  <ck-editor v-model="edVal" :editor="ed" :config="editorConfig"></ck-editor>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";
// import * as api from "@api";
export default {
  name: "editor",
  model: {
    prop: "value",
    event: "ed_input",
  },
  data: () => ({
    ed: ClassicEditor,
    edVal: "",
    editorConfig: {
      placeholder: "请输入内容。。。",
      language: "zh-cn",
    },
  }),
  watch: {
    edval(val, old) {
      let that = this;
      if (val && val !== that.value) {
        that.$emit("ed_input", val);
      }
    },
    value(val, old) {
      if (!this.ed) return;
      if (val && val !== this.edVal) {
        this.edVal = this.value;
      }
      if (val === that.value) return;
      that.$emit("ed_input", val);
    },
  },
  props: {
    value: String,
  },
  methods: {},
  mounted() {
    let that = this;
  },
  components: {
    "ck-editor": CKEditor.component,
  },
  created() {
    that.edVal = that.value;
  },
};
</script>
<style lang="less" scoped>
</style>