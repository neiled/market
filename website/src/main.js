// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    theme: 'bubble',
    position: 'top-right',
    duration: 2300
})

Vue.use(Vuelidate)


Vue.config.productionTip = false

let accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : null
let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null

if (accessToken) {
  store.dispatch('user/setUserAndTokens', {token: accessToken, refreshToken: refreshToken})
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
