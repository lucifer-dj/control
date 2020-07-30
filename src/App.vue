<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>
import * as api from '@api'
export default {
  name: 'App',
  mounted(){
    //做一个进入时的验证
    let that = this;
    that.loginAuto();
  },
  watch:{
    $route(to,from){
      console.log(`从  ${from.path}  =>   ${to.path}  `)
    }
  },
  methods:{
    async loginAuto(){
      let that = this;
      let token = localStorage.getItem('token')
      if(token && token.length>0){
        try{
          let result = await api.loginAuto({a:'a'})
          that.$hint({msg:result.data.msg,type:'success'})
        }catch(e){
          console.log(e)
          that.$hint({msg:'验证token失败，跳转到登陆',type:'error'})
        }
      }else{
        that.$hint({msg:'没有token，跳转到登陆',type:'error'})
      }
    }
  }
}
</script>

<style lang="less">
*{margin:0;padding:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
.v-navigation-drawer__content::-webkit-scrollbar{
  display:none !important;
}
.v-main>.v-main__wrap{
  height: 100%;
}
html{
  overflow-y: hidden;
}
::-webkit-scrollbar{
    height: 8px;
    width: 8px;
}
::-webkit-scrollbar-corner{
  background: #f8f8f8;
}
::-webkit-scrollbar-button{
  // background-color: #222;
}
::-webkit-scrollbar-thumb {
    border-radius: 9px;
    border: solid 6px #C8C6C4;
    background-clip: content-box;
    cursor:pointer;
    &:hover{
     background-color: #98A3A6;
    }
}
::-webkit-scrollbar-track {
  background-color: transparent;
} 

</style>
