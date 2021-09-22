import Vue from 'vue';
import '@/utils/serviceIntercept.js'
import ElementUI from 'element-ui'
import '@/assets/element/index.css'
import App from './App.vue'

Vue.use(ElementUI)
new Vue({
  render: (h) => h(App),
}).$mount('#app');
