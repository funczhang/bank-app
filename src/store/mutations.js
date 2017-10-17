import * as types from './constants.js'
export default {
  [types.UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [types.INIT_USER_INFO] (state, data) {
    // alert('init-info:' + JSON.stringify(data))
    state.userInfo.isAuth = data.isAuth
    state.userInfo.name = data.name
    state.imei = data.imei
    state.isOpenGesture = data.isOpenGesture // 手势密码
    state.userInfo.id = data.id
    state.userInfo.idCard = data.idCard
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
    state.imei = data.imei
    state.userInfo.token = data.token
  },
  [types.INIT_HEAD_IMG] (state, data) {
    state.userInfo.avatar = data.avatar
  }
}

