<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;s")
      x-header(slot="header" title="忘记密码" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入手机号" :max="15" v-model="phone" style="border-bottom:none;")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
          x-input(placeholder="请输入短信验证" :max="6" v-model="code" :show-clear="showClear")
            img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
            button(class="btn-send-code" slot="right" @click="sendTextCode('02', 'forgetCode')" ref="forgetCode") 发送验证码
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入新密码" style="border-bottom:none;" :min="6" :max="10" v-model="pwd1" type="password")
            img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
          x-input(placeholder="请再次输入新密码" v-model="pwd2" type="password" :min="6" :max="10")
            img(src="../../assets/imgs/icon-pwd.png" style="width:0.8rem;height:1rem;" slot="label")
        .clear
        .btn-area
          button(class="btn-submit" @click="changePwd") 提交
</template>

<script>
import { ViewBox, XHeader, Group, XInput, XSwitch } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    XInput,
    XSwitch
  },
  data () {
    return {
      index: 0,
      max: 20,
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
    sendTextCode (type, id) {
      // 发送验证码
      this.setBtnDisabled(id)
      this.getCode(type)
    },
    changePwd () {
      let self = this
      // 忘记密码接口
      let path = self.$store.state.baseUrl + '/app/xsyd/retrievePassword.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: self.phone,
          newpass: self.pwd1,
          verifyCode: self.code,
          channel: self.$store.state.channel
        }
      }
      // 校验
      if (self.isPhoneCorrect(self.phone)) {
        if (self.code !== '') {
          if (self.mathchPwd(self.pwd1)) {
            if (self.pwd1 === self.pwd2) {
              self.$vux.loading.show({
                text: 'Loading'
              })
              self.$store.dispatch('normalRequest', data).then(response => {
                if (response.response === 'success') {
                  self.$vux.toast.text('新密码设置成功，请重新登录')
                  self.phone = ''
                  self.code = ''
                  self.pwd1 = ''
                  self.pwd2 = ''
                  self.$router.replace('/login')
                } else {
                  self.$vux.toast.text(response.data)
                }
                self.$vux.loading.hide()
              })
            } else {
              self.pwd1 = ''
              self.pwd2 = ''
              self.$vux.toast.text('两次密码输入不一致')
            }
          }
        } else {
          self.$vux.toast.text('验证码不为空')
        }
      }
    },
    getCode (type) {
      // 获取验证码
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          cellphone: self.phone,
          smsType: type, // 02表示找回密码
          channel: self.$store.state.channel
        }
      }
      // 校验手机号码 self.checkPhone(self.phone)
      if (self.isPhoneCorrect(self.phone)) {
        self.$store.dispatch('normalRequest', data).then(response => {
          // let response = JSON.parse(res)
          if (response.response === 'success') {
            self.$vux.toast.text('验证码已成功发送')
          } else {
            self.$vux.toast.text(response.data)
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
      top:3px;
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
    position: absolute;
    bottom:0;
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

