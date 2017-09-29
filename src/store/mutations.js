import * as types from './constants.js'
export default {
  [types.INIT_USER_INFO] (state, data) {
    state.userInfo.name = data.name
  }
}
