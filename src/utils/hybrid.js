/**
 * [当前系统判断]
 * @param  {[type]}
 * @return {[type]}   [description]
 */
var os = (function () {
  var agent = navigator.userAgent
  var os = 'android'
  if (agent.indexOf('iPhone') !== -1 || agent.indexOf('iPad') !== -1) {
    os = 'ios'
  }
  return os
})()

/**
 * [发送请求]
 * @param  {[type]}
 * @return {[type]}   [description]
 */
var sendRequest = {
  android: function (action, callback, args) {
    var requestData = action
    requestData = typeof action === 'string' ? action.split('.') : action
    requestData.push(callback)
    // debugger
    return prompt('iflytek:' + JSON.stringify(requestData), JSON.stringify(args))
  },
  ios: function (action, callback, args) {
    var requestData = action
    requestData = typeof action === 'string' ? action.split('.') : action
    requestData.push(callback)
    // debugger
    return prompt('iflytek:' + JSON.stringify(requestData), JSON.stringify(args))
  },
  forios: function (action, callback, args) {
    var iframe = document.createElement('iframe')
    action = typeof action === 'string' ? action.split('.') : action
    action.push(callback)
    args && action.push(args)
    iframe.setAttribute('src', 'iflytek:' + '?' + JSON.stringify(action))
    iframe.setAttribute('style', 'display:none')
    iframe.setAttribute('height', '0')
    iframe.setAttribute('width', '0')
    iframe.setAttribute('frameborder', '0')
    document.body.appendChild(iframe)
    iframe.parentNode.removeChild(iframe)
    iframe = null
  }
}
/**
 * 实现链式操作
 */
var CallbackObject = function () {
  var that = this
  this.done = function (callback) {
    if (callback) {
      that._done = callback
    }
    return that
  }

  this.fail = function (callback) {
    if (callback) {
      that._fail = callback
    }
    return that
  }
}

var fly = {}
/**
 * 获取时间戳
 */
fly._now = Date.now || function () {
  return new Date().getTime()
}
fly._judge = function (result, obj) {
  var resultO = result
  if (resultO) {
    if (typeof resultO === 'string') {
      if (resultO.indexOf('{') === 0 ||
        resultO.indexOf('[') === 0) {
        resultO = eval('(' + result + ')')
        if (resultO.code === 'Error') {
          obj._fail && obj._fail(resultO)
          return
        }
      }
    } else if (resultO.code === 'Error') {
      obj._fail && obj._fail(resultO)
      return
    }
    obj._done && obj._done(resultO.message)
  } else {
    obj._fail && obj._fail()
  }
}
fly._request = function (options, obj) {
  options = options || {}
  var action = options.action.split('.')
  // var callback = options.callback ? ('fly' + fly._now()) : ''
  var args = options.args || ['']
  var callback = args[0].callback ? args[0].callback : ('fly' + fly._now())
  var timeout = options.timeout || 5000
  var timeoutFlag = true
  // Android同步方式返回数据
  if (os === 'android' && !options.callback) {
    var result
    setTimeout(function () {
      // debugger
      result = sendRequest.android(action, callback, args)
      fly._judge(result, obj)
    }, 0)
  } else {
    // 非同步返还数据（有可能是安卓异步返回数据有可能是ios返还数据
    window[callback] = function (result) {
      timeoutFlag = false
      setTimeout(function () {
        fly._judge(result, obj)
        window.callback = undefined
      }, 0)
    }
    setTimeout(function () {
      if (timeoutFlag) {
        // alert('数据请求超时,服务器无响应！')
      }
    }, timeout)
    sendRequest[os](action, callback, args)
    // TODO 加定时器 若一定时间没有执行完则报错
  }
}
/**
 * 数据请求
 */
fly.data = function (options) {
  var obj = new CallbackObject()
  fly._request({
    action: options.action,
    args: options.args,
    callback: options.callback
  }, obj)
  return obj
}
/**
 * error请求(调用安卓toast弹框)
 */
fly.error = function (options) {
  var obj = new CallbackObject()
  fly._request({
    action: 'BaseComponents.error',
    args: options.args,
    callback: options.callback
  }, obj)
  return obj
}

/**
 * 点击请求
 */
fly.click = function (options) {
  var obj = new CallbackObject()
  fly._request({
    action: options.action,
    args: options.args,
    callback: options.callback
  }, obj)
  return obj
}
/**
 * 检测是不是在移动平台中打开页面
 */
// fly.checkMobilePlatform = function(options) {
//     var agent = navigator.userAgent
//     if (agent.indexOf('iflytek_mmp') != -1) {
//         return
//     }
//     return true
// }

// fly.pageTip = function(content) {
//     fly.request({
//         action: 'dataDetailComponent.showTip',
//         args: [content]
//     })
// }

/**
 * [getQueryString 解决url中中文乱码]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
fly.getQueryString = function (key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  var result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : ''
}

export default fly
