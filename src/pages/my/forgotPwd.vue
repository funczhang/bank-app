<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;s")
      x-header(slot="header" title="忘记密码" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:15px;")
          x-input(placeholder="请输入手机号" v-model="phone" style="border-bottom:none;")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:13px;height:18px;" slot="label")
          x-input(placeholder="请输入短信验证" v-model="code" :show-clear="showClear")
            img(src="../../assets/imgs/icon-key.png" style="width:18px;height:18px;" slot="label")
            .btn-send-code(slot="right" @click="getCode" id="code") 发送验证码
        group(style="margin-top:15px;")
          x-input(placeholder="请输入新密码" style="border-bottom:none;" v-model="pwd1" type="password" :max="max")
            img(src="../../assets/imgs/icon-pwd.png" style="width:16px;height:20px;" slot="label")
          x-input(placeholder="请再次输入新密码" v-model="pwd2" type="password" :max="max")
            img(src="../../assets/imgs/icon-pwd.png" style="width:16px;height:20px;" slot="label")
        .clear
        .btn-area
          button(class="btn-submit" @click="changePwd") 提交
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
    changePwd () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/retrievePassword.do'
      let data = {
        path: path,
        params: {
          cellphone: this.phone,
          password: this.pwd1,
          verifyCode: this.code,
          channel: this.$store.state.channel,
          imei: this.$store.state.imei
        }
      }
      // 注册用户
      if (self.checkPhone(self.phone)) {
        if (self.code !== '') {
          if (self.pwd1 !== '') {
            if (self.pwd1 === self.pwd2) {
              this.$vux.loading.show({
                text: 'Loading'
              })
              self.$store.dispatch('register', data).then(res => {
                let response = JSON.parse(res)
                if (response.response === 'success') {
                  this.$vux.toast.text('新密码设置成功，请重新登录~')
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
          } else {
            this.$vux.toast.text('密码不为空')
          }
        } else {
          this.$vux.toast.text('验证码不为空')
        }
      }
    },
    getCode () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        path: path,
        params: {
          cellphone: this.phone,
          smsType: '01',
          channel: this.$store.state.channel
        }
      }
      // 校验手机号码 self.checkPhone(self.phone)
      if (self.checkPhone(self.phone)) {
        self.$store.dispatch('getVerifyCode', data).then(res => {
          let response = JSON.parse(res)
          if (response.response === 'success') {
            this.$vux.toast.text('验证码已成功发送')
            document.getElementById('code').style.color = '#999'
            document.getElementById('code').style.border = '1px solid #999'
            document.getElementById('code').disabled = true
            this.setTime()
          } else {
            this.$vux.toast.text('验证码发送失败，请重试！')
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
        console.log(self.time)
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
      top:3px;
      margin-right:10px;
    }
  }
  .weui-cell{
    padding:15px;
    border-bottom:1px solid #ededed;
  }
  .weui-label{
    font-size:14px;
    color:#333;
  }
  .weui-input{
    font-size:14px;
    color:#333; 
  }
  input[placeholder], [placeholder], *[placeholder] {
   font-size:14px;
   color:#999;
 }
  .weui-cell:before{
    border-top:none;
  }
 .vux-x-input{
  padding:15px;
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
  background:#fff;
}
 .vux-header{
  border-bottom:1px solid #ededed;
}
.vux-no-group-title{
  margin-top:15px;
}
}

.content{
  padding:0.1px;
  background:#f5f5f5;
  .btn-send-code{
    width:80px;
    height:25px;
    border:1px solid #1f76e2;
    border-radius: 15px;
    font-size:12px;
    color:#1f76e2;
    line-height: 25px;
    text-align: center;
  }
  .btn-area{
    padding:0.1px;
    background:#fff;
  }
  .btn-submit{
    display: block;
    margin:20px auto;
    width:80%;
    height: 40px;
    border-radius: 20px;
    background:#1f76e2;
    box-shadow: 0px 0px 20px rgba(39,128,237,.5);
    font-size:15px;
    color:#fff;
    line-height: 40px;
    text-align: center;
  }
  .active{
    background:#f5f5f5;
    color:#999;
    box-shadow: none;
  }
  .btn-send-code{
    width:80px;
    height:25px;
    border:1px solid #1f76e2;
    border-radius: 15px;
    font-size:12px;
    color:#1f76e2;
    line-height: 25px;
    text-align: center;

  }
  .warm-tip{
    position: absolute;
    bottom:0;
    padding:20px 15px;
    h3{
      font-size:15px;
      color:#333;
      line-height: 2;
    }
    p{
      font-size:13px;
      color:#666;
      line-height: 1.5;
    }
  }
  .confirm-area{
    padding:10px;
    background:#fff;
    font-size:14px;
    line-height: 1.5;
    color:#666;
    a{
      color:#1f76e2;
    }
  }
}
</style>

