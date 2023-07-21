import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'
Vue.config.productionTip = false
axios.defaults.baseURL='http://127.0.0.1:8000'
new Vue({
  vuetify,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
