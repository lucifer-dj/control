<template>
<div v-if="bool">
  <v-overlay z-index="1000">
    <v-card light class="px-5 py-2">
      <v-card-title v-if="title.length>0">{{title}}</v-card-title>
      <v-card-text class="text-h6">
        {{text}}
      </v-card-text>
      <v-card-actions class='d-flex'>
        <v-btn @click="confirm" color="#e1f3d8" class="success--text">确认</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="close()" color="#fef0f0" class="red--text">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</div>

</template>
<script>
export default {
  name:'toast',
  data:()=>({
    text:"",
    bool: false,
    title: ''
  }),
  methods:{
    confirm(){
      let that = this;
      that.bus.$emit('toastConfirm')
      that.close();
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>