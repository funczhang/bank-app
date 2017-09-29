import Vue from 'vue'
import { AjaxPlugin, LoadingPlugin, ToastPlugin } from 'vux'
import qs from 'qs'
// import VueResource from 'vue-resource'
// import store from '../store'
// Vue.use(VueResource)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
const axios = AjaxPlugin.$http
const $vux = Vue.$vux
export function post (url, params) {
  // $vux.loading.show({
  //   text: 'Loading'
  // })
  return new Promise((resolve, reject) => {
    // const userInfo = store.state.userInfo
    if (!params) {
      params = {}
    }
    // params = Object.assign(params, {
    //   UniqueID: userInfo.UniqueID,
    //   Name: userInfo.Name,
    //   AccountName: userInfo.AccountName,
    //   Email: userInfo.Email,
    //   Roles: userInfo.Roles
    // })
    axios.post(url, qs.stringify(params))
      .then(response => {
        // $vux.loading.hide()
        const res = response.data
        resolve(res)
        // if (res.flag) {
        //   resolve(res)
        // } else {
        //   // $vux.toast.show({
        //   //   type: 'warn',
        //   //   text: res.msg
        //   // })
        //   reject(res)
        // }
      })
      .catch((error) => {
        // const code = error.response.status
        // let msg = ''
        // if (code === 504) {
        //   msg = '请求超时'
        // } else if (code === 404) {
        //   msg = '地址错误'
        // } else if (code === 200) {
        //   msg = error.msg
        // } else {
        //   msg = code
        // }
        // $vux.loading.hide()
        // $vux.toast.show({
        //   type: 'warn',
        //   text: msg
        // })
        reject(error)
      })
  })
}

export function postNoLoading (url, params) {
  return new Promise((resolve, reject) => {
    // const userInfo = store.state.userInfo
    if (!params) {
      params = {}
    }
    /* params = Object.assign(params, {
      token: userInfo.token,
      userId: userInfo.userCode
    }) */
    // url = location.origin + '/freeride/' + url.replace('api/', '')
    axios.post(url, qs.stringify(params))
      .then(response => {
        const res = response.data
        resolve(res)
        // if (res.flag) {
        //   resolve(res)
        // } else {
        //   // $vux.toast.show({
        //   //   type: 'warn',
        //   //   text: res.msg
        //   // })
        // }
      })
      .catch((error) => {
        const code = error.response.status
        let msg = ''

        if (code === 504) {
          msg = '请求超时'
        } else if (code === 404) {
          msg = '地址错误'
        } else if (code === 200) {
          msg = error.msg
        } else {
          msg = code
        }
        $vux.toast.show({
          type: 'warn',
          text: msg
        })
      })
  })
}
