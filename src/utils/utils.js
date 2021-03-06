export default {
  install (Vue, options) {
    Vue.prototype.setBtnDisabled = function (id) {
      let self = this
      // debugger
      let time = 60
      self.$refs[id].style.color = '#999'
      self.$refs[id].style.border = '1px solid #999'
      self.$refs[id].disabled = true
      // debugger
      window.setTime = setInterval(() => {
        if (time > 0) {
          time--
          self.$refs[id].innerHTML = time + 's后再试'
        } else {
          time = 60
          self.$refs[id].innerHTML = '发送验证码'
          self.$refs[id].style.color = '#1f76e2'
          self.$refs[id].style.border = '1px solid #1f76e2'
          self.$refs[id].disabled = false
          window.clearInterval(window.setTime)
        }
      }, 1000)
    }
    Vue.prototype.isLogin = function () {
      let token = this.$store.state.userInfo.token
      if (token !== '') {
        return true
      } else {
        return false
      }
    }
    Vue.prototype.isVerfied = function () {
      return this.$store.state.userInfo.isAuth
    }
    Vue.prototype.isPhoneCorrect = function (phoneNum) {
      let mPattern = /^(^0\d{3,4}-\d{7,8})$|^(^0\d{3,4}\d{7,8})$|^(1(3|4|5|7|8)[0-9]\d{8})$/
      if (phoneNum !== '') {
        if (mPattern.test(phoneNum)) {
          return true
        } else {
          this.$vux.toast.text('手机号码格式不正确')
          return false
        }
      } else {
        this.$vux.toast.text('号码不能为空')
        return false
      }
    }
    Vue.prototype.jumpWebShowContent = function (title, url) {
      let path = url
      let data = {
        action: 'jump_web_show',
        path: path,
        params: {
          name: title
        }
      }
      this.$store.dispatch('normalRequest', data).then(res => {
      })
    }
    Vue.prototype.mathchPwd = function (pwd) {
      let pattern = /^[a-zA-Z0-9]{6,10}$/
      if (pwd.trim().length !== 0) {
        if (pattern.test(pwd)) {
          return true
        } else {
          this.$vux.toast.text('密码格式错误，请重新输入')
          return false
        }
      } else {
        this.$vux.toast.text('密码不能为空')
        return false
      }
    }
    Vue.prototype.getUserInfo = function () {
      // 获取设备信息和用户基本信息
      let self = this
      let data = {
        action: 'get_request'
      }
      // 获取设备信息
      self.$store.dispatch('normalRequest', data).then(res => {
        // 存用户信息
        self.$store.commit('INIT_USER_INFO', res)
      })
    }
    Vue.prototype.toVerfiedPage = function () {
      let data = {
        action: 'jump_id_auth'
      }
      this.$store.dispatch('normalRequest', data).then(res => {
      })
    }
  }
}
