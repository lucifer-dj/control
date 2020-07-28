<template>
  <v-snackbar :value="true" top :timeout="time" :color="theme.color" elevation="0">
    <span :class="theme.font">{{msg}}</span>
  </v-snackbar>
</template>
<script>
export default {
  name:'hint',
  data:()=>({
    msg:"ssss",
    bool: true,
    time:3000,
    type:'success'
  }),
  methods:{
  },
  mounted(){
    if(this.time>0){
      this.close();
    }
  },
  computed:{
 
    theme(){
      let obj = {
        success:{
          color:'#e1f3d8',
          font: 'success--text'
        },
        error: {
          color: '#fef0f0',
          font: 'red--text'
        }
      }
      return obj[this.type]
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>