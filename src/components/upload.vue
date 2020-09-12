<template>
  <v-col :cols="cols" class="d-flex">
    <v-sheet
      width="148"
      height="148"
      @click="$refs.file.click()"
      class="sheet mx-2"
      v-ripple="{class: 'success--text'}"
    >
      <span :style="theme.co_p">请选择图片</span>
    </v-sheet>
    <v-sheet class="mx-2">
      <img
        :src="path"
        :style="`width:${imgSize.w};height:${imgSize.h};`"
        class="img"
        v-if="path.length>0"
      />
    </v-sheet>
    <input type="file" ref="file" @change="getFile" v-show="false" :accept="fileType" />
  </v-col>
</template>
<script>
// import * as api from "@api";
export default {
  name: "upload",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    type: String, //展示形式
    value: null,
    src: {
      type: String,
      default: "",
    },
    cols: {
      type: String,
      default: "6",
    },
    accept: {
      type: String,
      default: "image",
    },
    size: {
      type: Number,
      default: 10, //单位mb
    },
  },
  data: () => ({
    path: "",
  }),
  methods: {
    getFile() {
      let that = this;
      let file = that.$refs.file.files[0];
      if (!that.checkFile(file)) return;
      that.path = URL.createObjectURL(file);
      that.$emit("input", file);
    },
    checkFile(file) {
      let that = this;
      let index = file.type.indexOf(that.accept);
      if (index === -1) {
        that.$hint({ msg: "上传文件格式错误", type: "error" });
        return false;
      }
      const limit = that.size * 1024 * 1024 < file.size;
      if (limit) {
        that.$hint({ msg: `上传文件不能超过${that.size}MB!`, type: "error" });
        return false;
      }
      return true;
    },
  },
  mounted() {},
  created() {
    if (this.src.length > 0) this.path = this.src;
  },
  beforeDestroy() {
    URL.revokeObjectURL(this.path);
    this.path = "";
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    imgSize() {
      let obj = {
        card: {
          w: "148px",
          h: "148px",
        },
        auto: {
          w: "auto",
          h: "148px",
        },
      };
      return obj[this.type];
    },
    fileType() {
      let that = this;
      if (this.accept === "image") return "image/jpeg,image/png";
      else if (this.accept === "video") return "*";
      else return "video/*,image/jpeg,image/png";
    },
  },
};
</script>
<style lang="scss" scoped>
.sheet {
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 148px;
  text-align: center;
  padding-top: 90px;
  span {
    font-size: 12px;
    color: #8c939d;
  }
  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 50%;
    width: 2px;
    height: 30px;
    background-color: #8c939d;
    transform: translate(-50%, -50%);
  }
  &::before {
    content: "";
    position: absolute;
    top: 40%;
    left: 50%;
    width: 30px;
    height: 2px;
    background-color: #8c939d;
    transform: translate(-50%, -50%);
  }
}
.img {
  border-radius: 6px;
  // max-width: calc(100% - 180px);
}
</style>