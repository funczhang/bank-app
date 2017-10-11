import * as types from './constants.js'
export default {
  [types.INIT_USER_INFO] (state, data) {
    // alert(JSON.stringify(data))
    state.userInfo.isAuth = data.isAuth
    state.imei = data.imei
    state.userInfo.id = data.id
    state.userInfo.token = data.token
    state.userInfo.cellphone = data.cellPhone
  },
  [types.INIT_BANKCARD_LIST] (state, data) {
    if (data.user.bankCardList) {
      state.bankCardList = data.user.bankCardList
    }
    if (data.user.cellphone) {
      state.userInfo.cellphone = data.user.cellphone
    }
  },
  [types.INIT_DEVICE_INFO] (state, data) {
    if (data.imei) {
      state.imei = data.imei
    }
    if (data.token) {
      state.userInfo.token = data.token
    }
  }
}
