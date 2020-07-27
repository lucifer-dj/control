<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    //做一个进入时的验证
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
