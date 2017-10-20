<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="登录" :left-options="{showBack:true,backText:'',preventGoBack:true}" @on-click-title="clickTitle" @on-click-back="backToMy" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 账号登录
          tab-item(@on-item-click="handler(1)") 短信登录
        .template(v-show="loginByAccount")
          group(style="margin-top:0.75rem;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;" v-model="phoneNum" type="number")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
            x-input(placeholder="请输入密码" v-model="pwd" type="password")
              img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
          a(class="btn-forgetpwd" href="javascript:void(null)" @click="forgetPwd") 忘记密码
        .template(v-show="!loginByAccount")
          group(style="margin-top:0.75rem;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;" v-model="phoneNum" type="number")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
            x-input(placeholder="请输入短信验证" v-model="verifyCode" :show-clear="showClear" type="number")
              img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
              button(class="btn-send-code" slot="right" id="code" @click="getCode") 发送验证码
        .template(style="background:#fff;")
          .clear
          .btn-login(@click="login") 登录
          .btn-register(@click="toRegister") 注册
          .warm-tip
            h3 温馨提示：
            p 您在借款申请过程中，“兴盛e贷”不会通过电话、短信、邮件等任何形式，以担保费，咨询费等任何名义向您收取费用。请您保管好个人信息，谨防诈骗。
           
</template>

<script>
import { ViewBox, XHeader, Masker, Tab, TabItem, Group, XInput, XSwitch, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Tab,
    TabItem,
    Group,
    XInput,
    XSwitch,
    Cell
  },
  data () {
    return {
      index: 0,
      loginByAccount: true,
      phoneNum: '',
      verifyCode: '',
      pwd: '',
      showClear: false,
      time: 60
    }
  },
  mounted () {
  },
  methods: {
    backToMy () {
      this.$router.go(-1)
    },
    clickTitle () {
    },
    handler (flag) {
      if (flag === 0) {
        this.loginByAccount = true
      } else {
        this.loginByAccount = false
      }
    },
    toRegister () {
      this.$router.push('/register')
    },
    login () {
      let self = this
      if (self.checkPhone(self.phoneNum)) {
        if (this.loginByAccount) {
          self.loginByAccountWays()
        } else {
          self.loginByVerifyCodeWays()
        }
      }
    },
    loginByAccountWays () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/login.do'
      let data = {
        action: 'hand_request',
        path: path,
        params: {
          cellphone: this.phoneNum,
          password: this.pwd,
          channel: this.$store.state.channel,
          imei: this.$store.state.imei
        }
      }
      if (self.pwd !== '') {
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        self.$store.dispatch('normalRequest', data).then(res => {
          // 存用户信息
          self.$store.commit('INIT_USER_INFO', res)
          // 隐藏
          this.$vux.loading.hide()
          this.phoneNum = ''
          this.verifyCode = ''
          this.pwd = ''
          this.$vux.toast.text('登录成功')
          self.$router.replace('/my')
        })
      } else {
        this.$vux.loading.hide()
        this.$vux.toast.text('密码不为空')
      }
      this.$vux.loading.hide()
    },
    loginByVerifyCodeWays () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/quickLogin.do'
      let data = {
        action: 'hand_request',
        path: path,
        params: {
          cellphone: this.phoneNum,
          verifyCode: this.verifyCode,
          channel: this.$store.state.channel,
          imei: this.$store.state.imei
        }
      }
      if (self.verifyCode !== '') {
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        self.$store.dispatch('normalRequest', data).then(res => {
          self.$store.commit('INIT_USER_INFO', res)
          // 隐藏
          this.$vux.loading.hide()
          this.$vux.toast.text('登录成功')
          this.phoneNum = ''
          this.verifyCode = ''
          this.pwd = ''
          self.$router.replace('/my')
        })
      } else {
        this.$vux.loading.hide()
        this.$vux.toast.text('验证码不为空')
      }
      this.$vux.loading.hide()
    },
    forgetPwd () {
      this.$router.push('forgotPwd')
    },
    getCode () {
      // 获取验证码
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: self.phoneNum,
          smsType: '04', // 登录
          channel: self.$store.state.channel
        }
      }
      if (self.checkPhone(self.phoneNum)) {
        self.$store.dispatch('normalRequest', data).then(res => {
          if (res.response === 'success') {
            self.$vux.toast.text('验证码已成功发送')
            document.getElementById('code').style.color = '#999'
            document.getElementById('code').style.border = '1px solid #999'
            document.getElementById('code').disabled = true
            self.setTime()
          } else {
            self.$vux.toast.text('验证码发送失败，请重试！')
          }
        })
      }
    },
    checkPhone (phoneNum) {
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
    },
    setTime () {
      let self = this
      let setTime = setInterval(() => {
        if (self.time > 0) {
          self.time --
          document.getElementById('code').innerHTML = self.time
        } else {
          self.time = 60
          document.getElementById('code').innerHTML = '发送验证码'
          document.getElementById('code').style.color = '#1f76e2'
          document.getElementById('code').style.border = '1px solid #1f76e2'
          document.getElementById('code').disabled = false
          window.clearInterval(setTime)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
  .weui-cell__hd{
    position: relative;
    img{
      position: relative;
      top:0.15rem;
      margin-right:0.5rem;
    }
  }
  .weui-cell{
    padding:0.75rem;
    border-bottom:1px solid #ededed;
  }
  .weui-label{
    font-size:0.7rem;
    color:#333;
  }
  .weui-input{
    font-size:0.7rem;
    color:#333; 
  }
  input[placeholder], [placeholder], *[placeholder] {
   font-size:0.7rem;
   color:#999;
 }
  .weui-cell:before{
    border-top:none;
  }
 .vux-x-input{
  padding:0.75rem;
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
  background:#fff;
}
 .vux-header{
  border-bottom:1px solid #ededed;
}
.vux-no-group-title{
  margin-top:0.75rem;
}
}

.content{
  // padding:0.1px;
  background:#f5f5f5;
  .btn-forgetpwd{
    float:right;
    margin:0.5rem 0.75rem;
    font-size:0.7rem;
    color:#1f76e2;
  }
  .btn-login{
    display: block;
    margin:1rem auto;
    width:80%;
    height: 2rem;
    border-radius: 1rem;
    background:#1f76e2;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
    font-size:0.75rem;
    color:#fff;
    line-height: 2rem;
    text-align: center;
  }
  .btn-register{
    display: block;
    margin:1rem auto;
    width:80%;
    height: 2rem;
    border-radius: 1rem;
    background:#fff;
    border:1px solid #1f76e2;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
    font-size:0.75rem;
    color:#1f76e2;
    line-height: 2rem;
    text-align: center;
  }
  .btn-send-code{
    width:4rem;
    height:1.25rem;
    border:1px solid #1f76e2;
    border-radius: 0.75rem;
    font-size:0.6rem;
    color:#1f76e2;
    line-height: 1.2rem;
    text-align: center;

  }
  .warm-tip{
    // position: absolute;
    // bottom:0;
    padding:1rem 0.75rem;
    h3{
      font-size:0.75rem;
      color:#333;
      line-height: 2;
    }
    p{
      font-size:0.65rem;
      color:#666;
      line-height: 1.5;
    }
  }
}
</style>

