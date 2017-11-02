<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="更换手机号" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入新的手机号" type="number" style="border-bottom:none;" v-model="phone")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
          x-input(placeholder="请输入验证码" type="number" v-model="code" :show-clear="false")
            img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
            button(class="btn-send-code" slot="right" @click="sendTextCode('05', 'changePhone')" ref="changePhone") 发送验证码
        .btn-submit(class="btn-submit" @click="submit") 提交 
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
      phone: '',
      code: '',
      time: 60
    }
  },
  mounted () {
    // 清除计时器
    // window.clearInterval(window.setTime)
  },
  methods: {
    sendTextCode (type, id) {
      // 发送验证码
      this.setBtnDisabled(id)
      this.getCode(type)
    },
    getCode (type) {
      // 验证码请求
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        path: path,
        action: 'init_request',
        params: {
          cellphone: self.phone,
          smsType: type, // 05表示更换手机号
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
    },
    submit () {
      // 更换手机号
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/resetCellphone.do'
      let data = {
        path: path,
        action: 'changephone_request',
        params: {
          userToken: self.$store.state.userInfo.token,
          newphone: self.phone,
          verifyCode: self.code,
          channel: self.$store.state.channel
        }
      }
      // 更换手机号
      if (self.isPhoneCorrect(self.phone)) {
        if (self.code !== '') {
          this.$vux.loading.show({
            text: 'Loading'
          })
          self.$store.dispatch('normalRequest', data).then(response => {
            // let response = JSON.parse(res)
            if (response.response === 'success') {
              self.$vux.toast.text('手机号码更换成功，请重新登录')
              self.phone = ''
              self.code = ''
              self.$router.replace('/login')
            } else {
              self.$vux.toast.text(response.data)
            }
            self.$vux.loading.hide()
          })
        } else {
          self.$vux.toast.text('请输入验证码')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
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
 .weui-cell__hd img{
   position: relative;
   top:3px;
   margin-right:0.5rem;
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
}
</style>

