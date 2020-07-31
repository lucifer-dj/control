import Vue from 'vue';
import LoadingComponent from './loading.vue';
import vuetify from 'vuetify';
let LoadingConstructor = Vue.extend(LoadingComponent);

let l = undefined;

LoadingConstructor.prototype.close = function(){
	if(l) l=undefined;
	setTimeout(()=>{
		if(this.$el && this.$el.parentNode){
			this.$el.parentNode.removeChild(this.$el)
		}
		this.$destroy();
	},0)
}

let loading = (options = {})=>{
	if(l) return l
	let opts = {
		msg:'',
		...options
	}
	const instance = new LoadingConstructor({
		el:document.createElement('div'),
		data: opts,
		vuetify: new vuetify()
	})
	let parent = instance.$('.v-application')
  
  parent.appendChild(instance.$el)
  Vue.nextTick(()=>{
    instance.bool = true
  })
  l = instance;
  // instance.close();
  return instance
}

export default loading