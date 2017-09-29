<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="注册" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        group(style="margin-top:15px;")
          x-input(placeholder="请输入手机号" style="border-bottom:none;")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:13px;height:18px;" slot="label")
          x-input(placeholder="请输入短信验证" style="")
            img(src="../../assets/imgs/icon-key.png" style="width:18px;height:18px;" slot="label")
        group(style="margin-top:15px;")
          x-input(placeholder="请输入密码" style="border-bottom:none;")
            img(src="../../assets/imgs/icon-pwd.png" style="width:16px;height:20px;" slot="label")
          x-input(placeholder="请再次输入密码" style="")
            img(src="../../assets/imgs/icon-pwd.png" style="width:16px;height:20px;" slot="label")
        .clear
        .btn-submit 提交
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
      index: 0
    }
  },
  mounted () {
  },
  methods: {
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

