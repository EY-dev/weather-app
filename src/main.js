import Vue from 'vue'
import App from './App.vue'
import store from './store'
import wb from "./registerServiceWorker";
Vue.prototype.$workbox = wb;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
