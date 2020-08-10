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
          name: 'project',
          path: '/pro',
          component: () => import('./pages/view/column.vue')
        },
        {
          name: 'tpCase',
          path: '/tp/case',
          component: () => import('./pages/view/tp/case.vue')
        },
        {
          name: 'tpProduct',
          path: '/tp/product',
          component: () => import('./pages/view/tp/product.vue')
        },
        {
          name: 'tpPage',
          path: '/tp/page',
          component: () => import('./pages/view/tp/page.vue')
        },
        {
          name: 'siteConfig',
          path: '/siteConfig',
          component: () => import('./pages/view/siteConfig.vue')
        },
        {
          name: 'banner',
          path: '/banner',
          component: () => import('./pages/view/banner.vue')
        },
        {
          name: 'other',
          path: '/other',
          component: () => import('./pages/view/other.vue')
        },
        {
          name: 'introduce',
          path: '/t',
          component: () => import('./pages/view/introduce.vue')
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