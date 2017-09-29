import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/states'
import Vuex from 'vuex'
import './assets/styles/base.css'
import { ToastPlugin, LoadingPlugin } from 'vux'
// const FastClick = require('fastclick')
import FastClick from 'fastclick'
// Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
