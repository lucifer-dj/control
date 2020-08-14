import Vue from 'vue'
import Router from 'vue-router'
import cfg from './plugins/cfg'

const originPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}
const originReplace = Router.prototype.replace;
Router.prototype.replace = function (location) {
  return originReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./pages/home.vue'),
      redirect: '/index',
      children: [{
          name: 'index',
          path: '/index',
          component: () => import('./pages/view/index.vue')
        },
        {
          name: 'column',
          path: '/column',
          component: () => import('./pages/other/column.vue')
        },
        {
          name: 'page',
          path: '/page',
          component: () => import('./pages/other/page.vue')
        },
        {
          name: 'role',
          path: '/role',
          component: () => import('./pages/view/role.vue')
        },
        {
          name: 'faction',
          path: '/faction',
          component: () => import('./pages/view/faction.vue')
        },
        {
          name: 'about',
          path: '/about',
          component: () => import('./pages/view/about.vue')
        },
        {
          name: 'config',
          path: '/config',
          component: () => import('./pages/view/config.vue')
        },
        {
          name: 'banner',
          path: '/banner',
          component: () => import('./pages/view/banner.vue')
        },
        {
          name: 'introduce',
          path: '/t',
          component: () => import('./pages/view/introduce.vue')
        }, {
          name: 'year',
          path: '/year',
          component: () => import('./pages/view/year.vue')
        },
        {
          name: 'realm',
          path: '/realm',
          component: () => import('./pages/view/realm.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/register.vue')
    }
  ]
})