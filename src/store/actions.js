import fly from '../utils/hybrid.js'
// 初始化用户信息
export const initInfo = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [data.path, data.params]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 注册用户信息
export const register = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 获取验证码
export const getVerifyCode = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}

// 通过账户密码登录
export const loginByAccount = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.hand_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}

// 通过验证码登录
export const loginByVerifyCode = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.hand_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 修改登录密码
export const changePwdRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.hand_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 忘记登录密码
export const forgetPwdRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.hand_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 获取银行卡列表
export const getBankCardList = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 通用获取信息请求
export const initRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 通用原生信息请求
export const getRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.get_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
// 通用原生信息请求
export const photoRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.data({
      action: 'baseComponents.photo_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}
