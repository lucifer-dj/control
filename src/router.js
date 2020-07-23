import Vue from 'vue'
import Router from 'vue-router'

const originPush = Router.prototype.push
Router.prototype.push = function(location) {
    return originPush.call(this, location).catch(err => err)
}
const originReplace = Router.prototype.replace;
Router.prototype.replace = function(location) {
    return originReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode:"history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('./pages/home.vue'),
      children:[
        {
          name:'project',
          path:'/pro',
          component:()=>import('./pages/view/column.vue')
        },
        {
          name:'role',
          path:'/role',
          component:()=>import('./pages/view/role.vue')
        }, 
        {
          name:'force',
          path:'/force',
          component:()=>import('./pages/view/force.vue')
        },
        {
          name:'xcontent',
          path:'/xcontent',
          component:()=>import('./pages/view/xcontent.vue')
        },
        {
          name:'xpage',
          path:'/xpage',
          component:()=>import('./pages/view/xpage.vue')
        },
        {
          name:'banner',
          path:'/banner',
          component:()=>import('./pages/view/banner.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./pages/login.vue')
    }
  ]
})
