import * as types from './constants.js'
export default {
  [types.UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [types.INIT_USER_INFO] (state, data) {
    if (data.isAuth !== undefined) {
      state.userInfo.isAuth = data.isAuth
    }
    if (data.name !== undefined) {
      state.userInfo.name = data.name
    }
    if (data.imei !== undefined) {
      state.imei = data.imei
    }
    if (data.channel !== undefined) {
      state.channel = data.channel
    }
    if (data.isOpenGesture !== undefined) {
      state.isOpenGesture = data.isOpenGesture // 手势密码
    }
    if (data.id !== undefined) {
      state.userInfo.id = data.id
    }
    if (data.idCard !== undefined) {
      state.userInfo.idCard = data.idCard
    }
    if (data.token !== undefined) {
      state.userInfo.token = data.token
    }
    if (data.cellPhone !== undefined) {
      state.userInfo.cellphone = data.cellPhone
    }
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

