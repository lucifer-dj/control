import Vue from 'vue';
import SettingComponent from './setting.vue'
const SettingConstructor  = Vue.extend(SettingComponent);
let s = undefined;
// SettingConstructor.prototype.close = function(){
//   if(s){
//     s=undefined;
//     this.state = false;
//     setTimeout(()=>{
//       if(this.$el && this.$el.parentNode) {
//         this.$el.parentNode.removeChild(this.$el)
//       }
//       this.$destroy();
//     },0)
//   }
// }

// const setting = ()=>{
//   if(s){
//     return s;
//   }
//   let opts = {
//     state: false,
//   }
//   let instance = new SettingConstructor({
//     el: document.createElement('div'),
//     data: opts
//   })
//   let parent = document.querySelector('#app')
//   parent.appendChild(instance.$el);
//   Vue.nextTick(()=>{
//     instance.state = true;
//   })
//   s = instance;
//   return instance;
// }
export default SettingConstructor
