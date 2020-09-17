<template>
  <ck-editor v-model="edVal" :editor="ed" :config="editorConfig"></ck-editor>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { component as CkeditorComponent } from "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";
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
    edVal(val, old) {
      let that = this;
      if (val && val !== that.value) {
        that.$emit("ed_input", val);
      }
    },
    value(val, old) {
      let that = this;
      if (!that.ed) return;
      if (val && val !== that.edVal) {
        that.edVal = that.value;
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
    "ck-editor": CkeditorComponent,
  },
  created() {
    let that = this;
    that.edVal = that.value;
  },
};
</script>
<style lang="scss" >
.ck-editor__editable {
  min-height: 200px;
}
</style>