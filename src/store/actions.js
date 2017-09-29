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
// 根据身份证号获取公司信息
export const getCompany = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    fly.request({
      action: 'oneCardComponents.data',
      callback: 'one_card_company',
      args: ['one_card_company', data]
    }).done(response => {
      if (response) {
        resolve(response)
      } else {
        console.warn('公司信息返回为空')
      }
    }).fail(response => {
      reject(response)
    })
  })
}
