<template>
  <div>
    <drawer></drawer>
    <app-head></app-head>
    <v-main>

      <router-view/>
 
      <v-footer fixed pedless >
        <v-spacer></v-spacer>
        &copy; {{new Date().getFullYear()}}
        <v-sheet tag="a" title="gitee" class="ml-5 text-decoration-none" color="rgba(0,0,0,0)" target="_blank" href="https://gitee.com/luciferdj/xzhdx">lucifer-dj</v-sheet>
      </v-footer>
    </v-main>
  </div>
</template>
<script>
export default {
  name:'home',
  data:()=>({
    menu:[
      {
        name:'项目管理',
        icon: 'iconfont iconfont-Nav07-reports',
        path:'/pro',
        child:[
          {
            name:'角色管理',
            path:'/role',
            icon:'iconfont-tuandui'
          },
           {
            name:'势力划分',
            path:'/force',
            icon:'iconfont-dizhi'
          },
          {
            name:'内容介绍',
            path:'/xcontent',
            icon:'iconfont-guanyu'
          }
        ]
      },
      {
        name:'页面设置',
        path: '/xpage',
        icon:'iconfont iconfont-Nav03-base',
        child:[
          {
            name:'首页轮播',
            path:'/banner',
            icon:'iconfont-hebing'
          }
        ]
      },
      {
        name:'其他设置',
        path: '/other',
        icon:'iconfont iconfont-basepermissionauthShop'
      }
    ],
    menuState:false,
    drawer: true
  }),
  components:{
    drawer:()=>import('./core/drawer'),
    'app-head':()=>import('./core/appHead')
  },
  methods:{
  },
}
</script>
<style lang="less" scoped>
</style>