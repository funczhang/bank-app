import fly from '../utils/hybrid.js'
//  通用数据请求
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

// 数据请求 返回字符串
export const initRequest = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    data.path = data.path || ''
    data.params = data.params || {}
    fly.data({
      action: 'baseComponents.init_request',
      callback: true,
      args: [{'path': data.path, 'params': data.params}]
    }).done(response => {
      if (typeof response === 'string') {
        let data = eval('(' + response + ')')
        resolve(data)
      } else {
        resolve(response)
      }
      resolve(response)
    }).fail(response => {
      reject(response)
    })
  })
}

