import * as types from './constants.js'
export default {
  [types.UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [types.INIT_USER_INFO] (state, data) {
    // alert(JSON.stringify(data))
    state.userInfo.isAuth = data.isAuth
    state.imei = data.imei
    state.isOpenGesture = data.isOpenGesture // 手势密码
    state.userInfo.id = data.id
    if (data.token !== '' || data.token !== undefined) {
      state.userInfo.token = data.token
    }
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
