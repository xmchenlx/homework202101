import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
// store
import store from './store'

Vue.config.productionTip = false

import './common/css/reset.css'

Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
