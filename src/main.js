import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/states'
import Vuex from 'vuex'
import './assets/styles/base.css'
import './assets/styles/animate.min.css'
import { ToastPlugin, LoadingPlugin } from 'vux'
import FastClick from 'fastclick'
// router.beforeEach(function (to, from, next) {
//   // alert('to:' + JSON.stringify(to))
//   // alert('from:' + JSON.stringify(from))
//   // alert('next:' + JSON.stringify(next))
// })
import util from './utils/utils'
Vue.use(util)
router.afterEach(function (to) {
  store.commit('UPDATE_LOADING', false)
})
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(Vuex)
Vue.prototype.setTime = () => {
  alert('settime')
}
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
