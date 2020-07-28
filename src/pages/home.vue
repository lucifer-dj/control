<template>
  <div class="box v-application-box">
    <v-navigation-drawer app :mini-variant.sync="menuState" v-model="drawer">
      <v-sheet height="60" width="100%">
        <!-- <v-img></v-img> -->
        <v-subheader class="justify-center text-uppercase h6" width="100%" >雪中</v-subheader>
      </v-sheet>
      <v-list>
        <v-list-group v-for="(item,idx) in menu" :key="idx" append-icon="iconfont-expand_more" no-action @click="replace(item)">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon :class="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(n,i) in item.child" :key="i" @click="replace(n)">
            <v-list-item-icon>
              <v-icon>{{n.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{n.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense text>
        <v-btn  depressed @click="commDrawer();">
          <v-icon>iconfont-goodsppecategory</v-icon>
        </v-btn> 
        <v-btn text class="ml-3" >浏览首页</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed title="退出" @click="logout">
          <v-icon>iconfont-zhuxiao</v-icon>
        </v-btn>
        <v-btn depressed title="设置" @click="showSide('setting')">
          <v-icon>iconfont-shezhi</v-icon>
        </v-btn>
         <v-btn depressed  title="我的信息" @click="showSide('user')">
          <v-icon>iconfont-yonghuming</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main class="v-main">
      <v-row align="stretch" height="100%">
        <v-col :cols="viewCols" class="v-col9">
          <router-view/>
        </v-col>
        <v-col :cols="sideCols" class="v-col3 pa-0 ma-0">
          <the-side :type="sideType" @close="closeSide"></the-side>
        </v-col>
      </v-row>
      <toast></toast>
      <!-- <v-footer fixed pedless >
        <v-spacer></v-spacer>
        &copy; {{new Date().getFullYear()}}
        <v-sheet tag="a" title="gitee" class="ml-5 text-decoration-none" color="rgba(0,0,0,0)" target="_blank" href="https://gitee.com/luciferdj/xzhdx">lucifer-dj</v-sheet>
      </v-footer> -->
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
    drawer: true,
    sideType: '',
    sideCols: 0,
    viewCols: 12
  }),
  methods:{
    commDrawer(){
      let that = this;
      console.log(that.$vuetify.breakpoint.xs)
      if(that.$vuetify.breakpoint.xs){
        // that.menuState=false;
        that.drawer = !that.drawer; 
        return;
      }
      that.menuState = !that.menuState;
    },
    replace(data){
      let that = this;
      let {path} = data;
      that.$router.replace(path)
    },
    closeSide(){
      let that = this;
      that.$nextTick(()=>{
        that.sideCols = 0;
        that.viewCols = 12;
      })
    },
    showSide(type){
      let that =this;
      that.$nextTick(()=>{
        that.sideCols = 3;
        that.viewCols = 9;
        that.sideType = type
      })
    },
    logout(){
      let that = this;
      that.$toast({text:'确认要退出吗？',bool:true})
      that.bus.$on('toastConfirm',function(){
        console.log('正在退出请稍后. . .')
      })
    }
  },
  mounted(){
    let that = this;
    //人物 势力 关于雪中 
    //主页 境界划分 
    let drawer_content = this.$(".v-navigation-drawer__content")
    drawer_content.classList.add("drawer"); //chrome
    drawer_content.style.scrollbarWidth = "none"; //firefox
    drawer_content.style.msOverflowStyle = "none"; //edge
   
  },
  components:{
    theSide:()=>import('@components/theSide.vue'),
    toast:()=>import('@components/toast.vue')
  }
}
</script>
<style lang="less" scoped>
  .box{
    position: relative;
    width: 100%;
    height: calc(100% - 48px);
  }
  .v-main{
    height: 100%;
  }
  .v-col3{
    position: relative;
    height: calc(100vh - 48px);
  }
  .v-col9{
    height: calc(100vh - 48px);
    overflow: auto;
    overflow-y: scroll;
    // padding-bottom: 48px;
  }
</style>