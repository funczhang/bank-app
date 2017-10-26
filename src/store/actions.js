import fly from '../utils/hybrid.js'
// 初始化用户信息
export const normalRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    data.path = data.path || ''
    data.params = data.params || {}
    fly.data({
      action: 'baseComponents.' + data.action,
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      if (typeof response === 'string') {
        let a = JSON.parse(response)
        resolve(a)
      } else {
        resolve(response)
      }
    }).fail(response => {
      reject(response)
    })
  })
}

// 通用获取信息请求
export const initRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    data.path = data.path || ''
    data.params = data.params || {}
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

