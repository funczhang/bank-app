<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="更换手机号" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:0.75rem;")
          x-input(placeholder="请输入新的手机号" style="border-bottom:none;" v-model="phone")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.9rem;" slot="label")
          x-input(placeholder="请输入验证码" v-model="code" :show-clear="false")
            img(src="../../assets/imgs/icon-key.png" style="width:0.9rem;height:0.9rem;" slot="label")
            button(class="btn-send-code" slot="right" @click="getCode" id="code") 发送验证码
        .btn-submit(class="btn-submit" @click="submit") 提交 
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
      phone: '',
      code: '',
      time: 60
    }
  },
  mounted () {
  },
  methods: {
    getCode () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getVerifyCode.do'
      let data = {
        path: path,
        params: {
          cellphone: this.phone,
          smsType: '05', // 05表示更换手机号
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
    submit () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/resetCellphone.do'
      let data = {
        path: path,
        params: {
          userToken: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4',
          newphone: this.phone,
          verifyCode: this.code,
          channel: this.$store.state.channel
        }
      }
      // 注册用户
      if (self.checkPhone(self.phone)) {
        if (self.code !== '') {
          this.$vux.loading.show({
            text: 'Loading'
          })
          self.$store.dispatch('register', data).then(res => {
            let response = JSON.parse(res)
            if (response.response === 'success') {
              this.$vux.toast.text('新密码设置成功，请重新登录~')
              this.phone = ''
              this.code = ''
              this.$router.replace('/login')
            } else {
              this.$vux.toast.text(response.data)
            }
            this.$vux.loading.hide()
          })
        } else {
          this.$vux.toast.text('验证码不为空')
        }
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

