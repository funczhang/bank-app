<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="登录" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 账号登录
          tab-item(@on-item-click="handler(1)") 短信登录
        .template(v-show="loginByAccount")
          group(style="margin-top:15px;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:13px;height:18px;" slot="label")
            x-input(placeholder="请输入密码" style="")
              img(src="../../assets/imgs/icon-pwd.png" style="width:16px;height:20px;" slot="label")
          a(class="btn-forgetpwd" href="javascript:void(null)" @click="forgetPwd") 忘记密码
          .clear
          .btn-login 登录
          .btn-register(@click="toRegister") 注册
        .template(v-show="!loginByAccount")
          group(style="margin-top:15px;")
            x-input(placeholder="请输入手机号" style="border-bottom:none;")
              img(src="../../assets/imgs/icon-setting-phone.png" style="width:13px;height:18px;" slot="label")
            x-input(placeholder="请输入短信验证" style="")
              img(src="../../assets/imgs/icon-key.png" style="width:18px;height:18px;" slot="label")
              .btn-send-code(slot="right") 发送验证码
          .clear
          .btn-login 登录
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
      loginByAccount: true
    }
  },
  mounted () {
  },
  methods: {
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
    forgetPwd () {
      this.$router.push('/managePwd')
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
  .btn-forgetpwd{
    float:right;
    margin:10px 15px;
    font-size:14px;
    color:#1f76e2;
  }
  .btn-login{
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
  .btn-register{
    display: block;
    margin:20px auto;
    width:80%;
    height: 40px;
    border-radius: 20px;
    background:#fff;
    border:1px solid #1f76e2;
    box-shadow: 0px 0px 20px rgba(39,128,237,.5);
    font-size:15px;
    color:#1f76e2;
    line-height: 40px;
    text-align: center;
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
}
</style>

