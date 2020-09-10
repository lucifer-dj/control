import Vue from "vue";
import vuetify from "vuetify";
import HintComponent from "./hint.vue";
let HintConstructor = Vue.extend(HintComponent);
let h = undefined;

HintConstructor.prototype.close = function() {
  if (h) {
    h = undefined;
  }
  setTimeout(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, this.time);
};
const Hint = (options = {}) => {
  if (!options.time) options.time = 3000;
  if (h) {
    return h;
  }
  let opts = {
    msg: "",
    ...options,
  };
  let instance = new HintConstructor({
    el: document.createElement("div"),
    vuetify: new vuetify(),
    data: opts,
  });
  let parent = instance.$(".v-application");
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.bool = true;
  });
  h = instance;
  instance.close();
  return instance;
};
export default Hint;
