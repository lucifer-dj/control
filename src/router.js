import Vue from 'vue'
import Router from 'vue-router'

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
          name: 'role',
          path: '/role',
          component: () => import('./pages/view/role.vue')
        },
        {
          name: 'place',
          path: '/place',
          component: () => import('./pages/view/place.vue')
        },
        {
          name: 'xabout',
          path: '/xabout',
          component: () => import('./pages/view/xabout.vue')
        },
        {
          name: 'xpage',
          path: '/xpage',
          component: () => import('./pages/view/xpage.vue')
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