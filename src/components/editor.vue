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
    if (that.value.length > 0) that.edVal = that.value;
  },
  components: {
    "ck-editor": CKEditor.component,
  },
};
</script>
<style lang="less" scoped>
</style>