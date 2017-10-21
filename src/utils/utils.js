export default {
  install (Vue, options) {
    Vue.prototype.countTime = function (id) {
      let time = 10
      window.setTime = setInterval(() => {
        console.log(time)
        if (time > 0) {
          time--
          document.getElementById(id).innerHTML = time
          // document.getElementById(id).style.color = '#999'
          // // console.log(document.getElementById(id).style.color)
          // document.getElementById(id).style.border = '1px solid #999'
          // document.getElementById(id).disabled = true
        } else {
          time = 60
          document.getElementById(id).innerHTML = '发送验证码'
          document.getElementById(id).style.color = '#1f76e2'
          document.getElementById(id).style.border = '1px solid #1f76e2'
          document.getElementById(id).disabled = false
          window.clearInterval(window.setTime)
        }
      }, 1000)
    }
    Vue.prototype.getTextCode = function (params, id) {
      let time = 60
      document.getElementById(id).style.color = '#999'
      document.getElementById(id).style.border = '1px solid #999'
      document.getElementById(id).disabled = true
      let setTime = setInterval((id) => {
        if (time > 0) {
          time--
          document.getElementById(id).innerHTML = time
        } else {
          time = 60
          document.getElementById(id).innerHTML = '发送验证码'
          document.getElementById(id).style.color = '#1f76e2'
          document.getElementById(id).style.border = '1px solid #1f76e2'
          document.getElementById(id).disabled = false
          window.clearInterval(setTime)
        }
      }, 1000)
    }
  }
}
