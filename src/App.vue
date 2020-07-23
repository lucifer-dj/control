<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  
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
</style>
