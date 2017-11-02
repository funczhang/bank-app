<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" bgColor="#fff")
      x-header(slot="header" title="注册" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入手机号" v-model="phone" style="border-bottom:none;" :max="15")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
          x-input(placeholder="请输入短信验证" v-model="code" :show-clear="showClear" :max="8")
            img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
            button(class="btn-send-code" slot="right" @click="sendTextCode('01', 'registerCode')" ref="registerCode") 发送验证码
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入密码" style="border-bottom:none;" v-model="pwd1" :min="6" :max="10" type="password")
            img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
          x-input(placeholder="请再次输入密码" v-model="pwd2" type="password" :min="6" :max="10")
            img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
        .tip *密码只能设置为数字/字母/数字字母组合，且长度为6-10位
        .confirm-area
          check-icon(:value.sync="isConfirm")
          span 我已经阅读并同意
          a(href="javascript:void(null)" @click="jumpRegisterWeb") 《用户注册协议》
        .clear
        .btn-area
          button(class="btn-submit" @click="rigister" :disabled="!isConfirm" :class="{active:!isConfirm}") 提交
        .warm-tip
          h3 温馨提示：
          p 您在借款申请过程中，“兴盛e贷”不会通过电话、短信、邮件等任何形式，以担保费，咨询费等任何名义向您收取费用。请您保管好个人信息，谨防诈骗。
           
</template>

<script>
import { ViewBox, XHeader, Masker, Tab, TabItem, Group, XInput, XSwitch, Cell, CheckIcon } from 'vux'
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
    Cell,
    CheckIcon
  },
  data () {
    return {
      index: 0,
      isConfirm: false,
      phone: '',
      code: '',
      pwd1: '',
      pwd2: '',
      showClear: false,
      time: 60
    }
  },
  mounted () {
  },
  methods: {
    jumpRegisterWeb () {
      let self = this
      let token = self.$store.state.userInfo.token
      let path = self.$store.state.baseUrl + '/app/xsyd/regAgreement.html?' + token
      let data = {
        action: 'jump_web_show',
        path: path,
        params: {
          name: '用户注册协议'
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
      })
    },
    rigister () {
      // 注册请求
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/register.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: self.phone,
          password: self.pwd1,
          verifyCode: self.code,
          channel: self.$store.state.channel,
          imei: self.$store.state.imei
        }
      }
      // 注册用户
      if (self.isPhoneCorrect(self.phone)) {
        if (self.code !== '') {
          if (self.mathchPwd(self.pwd1)) {
            if (self.pwd1 === self.pwd2) {
              this.$vux.loading.show({
                text: 'Loading'
              })
              self.$store.dispatch('normalRequest', data).then(response => {
                // let response = JSON.parse(res)
                if (response.response === 'success') {
                  this.$vux.toast.text('注册成功请登录')
                  this.phone = ''
                  this.code = ''
                  this.pwd1 = ''
                  this.pwd2 = ''
                  this.$router.replace('/login')
                } else {
                  this.$vux.toast.text(response.data)
                }
                this.$vux.loading.hide()
              })
            } else {
              this.$vux.toast.text('两次密码输入不一致')
            }
          }
        } else {
          this.$vux.toast.text('验证码不为空')
        }
      }
    },
    sendTextCode (type, id) {
      // 发送验证码
      this.setBtnDisabled(id)
      this.getCode(type)
    },
    getCode (type) {
      // 请求验证码
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: this.phone,
          smsType: type,
          channel: this.$store.state.channel
        }
      }
      if (self.isPhoneCorrect(self.phone)) {
        self.$store.dispatch('normalRequest', data).then(response => {
          if (response.response === 'success') {
            this.$vux.toast.text('验证码已成功发送')
          } else {
            this.$vux.toast.text(response.data)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tip{
  padding:0.5rem;
  font-size:0.65rem;
  color:#999;
  // text-align: center;
  background:#fff;
  // border-bottom:1px solid #ededed;
  }
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
  padding:0.1px;
  background:#f5f5f5;
  .btn-send-code{
    width:4rem;
    height:1.25rem;
    border:1px solid #1f76e2;
    border-radius: 0.75rem;
    font-size:0.6rem;
    color:#1f76e2;
    line-height: 1.25rem;
    text-align: center;
  }
  .btn-area{
    padding:0.1px;
    background:#fff;
  }
  .btn-submit{
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
  .active{
    background:#f5f5f5;
    color:#999;
    box-shadow: none;
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
    background:#fff;
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
  .confirm-area{
    padding:0.5rem;
    background:#fff;
    font-size:0.7rem;
    line-height: 1.5;
    color:#666;
    a{
      color:#1f76e2;
    }
  }
}
</style>

