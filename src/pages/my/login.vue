<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="74px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="登录" :left-options="{showBack:true,backText:'',preventGoBack:true}" @on-click-title="clickTitle" @on-click-back="backToMy" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 账号登录
          tab-item(@on-item-click="handler(1)") 短信登录
        div(style="background:#f5f5f5;height:20px;")
        .template(v-show="loginByAccount")
          group(style="margin-top:0.75rem;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;" v-model="phoneNum" :max="15")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
            x-input(placeholder="请输入密码" v-model="pwd" type="password" :min="6" :max="10")
              img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
          a(class="btn-forgetpwd" href="javascript:void(null)" @click="forgetPwd") 忘记密码
        .template(v-show="!loginByAccount")
          group(style="margin-top:0.75rem;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;" v-model="phoneNum" :max="15")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
            x-input(placeholder="请输入短信验证" v-model="verifyCode" :show-clear="showClear" :max="8")
              img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
              button(class="btn-send-code" slot="right" ref="textLogin" @click="sendTextCode('04', 'textLogin')") 发送验证码
        .template(style="background:#fff;")
          .clear
          .btn-login(@click="login") 登录
          .btn-register(@click="toRegister") 注册
          .warm-tip
            h3 温馨提示：
            p 您在借款申请过程中，“兴盛e贷”不会通过电话、短信、邮件等任何形式，以担保费，咨询费等任何名义向您收取费用。请您保管好个人信息，谨防诈骗。
      masker(color="#000" :opacity="0.6" fullscreen=true v-show="showDialog" style="position:relative;")
        .box(slot="content")
          .head 手机验证
            img(src="../../assets/imgs/arrow-right.png" @click="closeDialog")
          .content
           group(style="margin-top:0rem;")
            x-input(title="手机号码：" style="border-bottom:none;font-size:0.75rem" v-model="phoneNum" type="number" :show-clear="showClear")
            x-input(title="验 证 码：" v-model="verifyCode1" style="font-size:0.75rem" :show-clear="showClear" type="number")
              button(class="btn-send-code" slot="right" ref="secondLogin" @click="sendTextCode('00', 'secondLogin')") 获取验证码
            .btn-area(class="clearfix")
              span( class="btn-submit btn-card-certain" @click="secondLogin") 确定
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
      verifyCode1: '',
      pwd: '',
      showClear: false,
      time: 60,
      showDialog: false
    }
  },
  mounted () {
    // this.getBaseInfo()
  },
  methods: {
    getBaseInfo () {
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
    },
    closeDialog () {
      this.showDialog = false
    },
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
    sendTextCode (type, id) {
      // 发送验证码
      this.setBtnDisabled(id)
      this.getCode(type)
    },
    login () {
      let self = this
      if (self.isPhoneCorrect(self.phoneNum)) {
        if (self.loginByAccount) {
          self.loginByAccountWays()
        } else {
          self.loginByVerifyCodeWays()
        }
      }
    },
    secondLogin () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/twoAuthenticationLogin.do'
      let data = {
        action: 'hand_request',
        path: path,
        params: {
          cellphone: self.phoneNum,
          password: self.pwd,
          channel: self.$store.state.channel,
          imei: self.$store.state.imei,
          verifyCode: self.verifyCode1
        }
      }
      if (self.mathchPwd(self.pwd)) {
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
      }
      this.$vux.loading.hide()
    },
    loginByAccountWays () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/login.do'
      let data = {
        action: 'hand_request',
        path: path,
        params: {
          cellphone: self.phoneNum,
          password: self.pwd,
          channel: self.$store.state.channel,
          imei: self.$store.state.imei
        }
      }
      if (self.mathchPwd(self.pwd)) {
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        self.$store.dispatch('normalRequest', data).then(res => {
          // 存用户信息
          if (res.device !== 'different') {
            self.$store.commit('INIT_USER_INFO', res)
            // 隐藏
            this.$vux.loading.hide()
            this.phoneNum = ''
            this.verifyCode = ''
            this.pwd = ''
            this.$vux.toast.text('登录成功')
            self.$router.replace('/my')
          } else {
            this.showDialog = true
          }
        })
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
          cellphone: self.phoneNum,
          verifyCode: self.verifyCode,
          channel: self.$store.state.channel,
          imei: self.$store.state.imei
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
    getCode (type) {
      // 获取验证码
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: self.phoneNum,
          smsType: type, // 登录
          channel: self.$store.state.channel
        }
      }
      if (self.isPhoneCorrect(self.phoneNum)) {
        self.$store.dispatch('normalRequest', data).then(res => {
          if (res.response === 'success') {
            self.$vux.toast.text('验证码已成功发送')
          } else {
            self.$vux.toast.text(res.data)
          }
        })
      }
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
      top:0.2rem;
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
    margin-top:5rem;
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
.box{
    position: relative;
    margin:0 auto;
    margin-top:7rem;
    // margin-top:-5.85rem;
    width:80%;
    background:#fff;
    border-radius: 3px;
    .head{
      padding: 0.5rem 0.75rem;
      height:1.1rem;
      background:#1f76e2;
      box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
      font-size:0.85rem;
      line-height: 1.1rem;
      text-align: center;
      color:#fff;
      border-radius: 3px 3px 0 0;
      img{
        position: absolute;
        top:0.6rem;
        right:0.75rem;
        width:0.7rem;
        height:0.7rem;
      }
    }
    .content{
      background: white;
      padding: 0rem 0rem 1rem 0rem;
      .card{
        margin-top: 1rem;
        padding:0.5rem 0.25rem;
      }
    }
  .btn-area{
    padding:1rem 0 0;
    background:#fff;
    span{
      display: block;
    }
  }
  .btn-submit,.btn-cancel{
    width:40%;
    height:1.8rem;
    border-radius: 0.9rem;
    font-size:0.75rem;
    text-align: center;
    line-height: 1.8rem;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
  }
  .btn-submit{
    margin-left:5%;
    background:#1f76e2;
    color:#fff;
   // border:1px solid #fff;
  }
  .btn-card-certain{
    margin:0 auto;
    width:50%;
  }
  .btn-cancel{
    margin-right:5%;
    background:#fff;
    color:#1f76e2;
    border:1px solid #1f76e2;
  }
}
</style>

