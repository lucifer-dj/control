<template>
  <v-col cols="12" class="d-flex">
    <v-sheet
      width="148"
      height="148"
      @click="$refs.file.click()"
      class="sheet mx-2"
      v-ripple="{class: 'success--text'}"
    >
      <span>请选择图片</span>
    </v-sheet>
    <v-sheet class="mx-2">
      <img
        :src="path"
        :style="`width:${size.w};height:${size.h};`"
        class="img"
        v-if="path.length>0"
      />
    </v-sheet>
    <input type="file" ref="file" @change="getFile" v-show="false" />
  </v-col>
</template>
<script>
import * as api from "@api";
export default {
  name: "upload",
  data: () => ({
    path: "",
  }),
  methods: {
    getFile() {
      let that = this;
      let file = that.$refs.file.files[0];
      that.path = URL.createObjectURL(file);
      that.$emit("input", file);
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    type: String,
    value: null,
    src: null,
  },
  mounted() {
    if (this.src) this.path = this.src;
  },
  beforeDestroy() {
    URL.revokeObjectURL(this.path);
    this.path = "";
  },
  computed: {
    size() {
      let obj = {
        card: {
          w: "148px",
          h: "148px",
        },
        line: {
          w: "auto",
          h: "148px",
        },
      };
      return obj[this.type];
    },
  },
};
</script>
<style lang="less" scoped>
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