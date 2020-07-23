import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    menu:[
          {
            name:'角色管理',
            path:'/role',
            icon:'iconfont iconhrstaff',
            sort:'0',
          },
           {
            name:'势力介绍',
            path:'/force',
            icon:'iconfont iconbasesettingCityCate',
            sort:'1',
          },
          {
            name:'关于雪中',
            path:'',
            icon:'iconfont iconbasesettingCityCate',
            sort:'2',
          }
        ]
  },
  mutations,
  getters,
  actions
})

export default store;