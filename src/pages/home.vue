<template>
  <div>
    <v-navigation-drawer app :mini-variant.sync="menuState" v-model="drawer">
      <v-sheet height="60" width="100%">
        <!-- <v-img></v-img> -->
        <v-subheader class="justify-center text-uppercase h6" width="100%" >雪中</v-subheader>
      </v-sheet>
      <v-list>
        <v-list-group v-for="(item,idx) in menu" :key="idx"  no-action @click="replace(item)">
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
              <v-icon :class="n.icon"></v-icon>
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
          <v-icon class="iconfont icongoodsppecategory"></v-icon>
        </v-btn> 
        <v-btn text class="ml-3" >浏览首页</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed title="退出">
          <v-icon class="iconfont iconzhuxiao"></v-icon>
        </v-btn>
        <v-btn depressed title="设置">
          <v-icon class="iconfont iconshezhi"></v-icon>
        </v-btn>
         <v-btn depressed  title="我的信息">
          <v-icon class="iconfont iconyonghuming"></v-icon>
        </v-btn>
    </v-app-bar>

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
        icon: 'iconfont iconNav07-reports',
        path:'/pro',
        child:[
          {
            name:'角色管理',
            path:'/role',
            icon:'iconfont icontuandui'
          },
           {
            name:'势力划分',
            path:'/force',
            icon:'iconfont icondizhi'
          },
          {
            name:'内容介绍',
            path:'/xcontent',
            icon:'iconfont iconguanyu'
          }
        ]
      },
      {
        name:'页面设置',
        path: '/xpage',
        icon:'iconfont iconNav03-base',
        child:[
          {
            name:'首页轮播',
            path:'/banner',
            icon:'iconfont iconhebing'
          }
        ]
      },
      {
        name:'其他设置',
        path: '/other',
        icon:'iconfont iconbasepermissionauthShop'
      }
    ],
    menuState:false,
    drawer: true
  }),
  methods:{
    commDrawer(){
      let that = this;
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
    }
  },
  mounted(){
    //人物 势力 关于雪中 
    //主页 境界划分 
    let drawer_content = document.querySelector(
      ".v-navigation-drawer__content"
    );

    drawer_content.classList.add("drawer"); //chrome
    drawer_content.style.scrollbarWidth = "none"; //firefox
    drawer_content.style.msOverflowStyle = "none"; //edge
  }
}
</script>
<style lang="less" scoped>

   
</style>