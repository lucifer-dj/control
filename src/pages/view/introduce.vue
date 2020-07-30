<template>
  <div>
    <input type="file" @change="getFile" ref="file">
  </div>
</template>
<script>
import * as api from '@api'
export default {
  name:'introduce',
  data:()=>({
  }),
  methods:{
    async getFile(e){
      // console.log(e.files)
      console.log(this.$refs.file.files[0])
      let fm = new FormData();
      fm.append('file',this.$refs.file.files[0])
      try{
        let result = await api.upload(fm)
        console.log(result)
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>