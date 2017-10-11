<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="密码管理" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 修改登录密码
          tab-item(@on-item-click="handler(1)") 手势密码
        .template(v-show="isChangePwd")
          group(style="margin-top:0.75rem;")
            x-input(placeholder="请输入旧密码" v-model="oldPwd" type="password")
            x-input(placeholder="请输入新密码" v-model="newPwd" style="margin-top:0.75rem;border-bottom:none;" type="password")
            x-input(placeholder="请再次输入新密码" v-model="reNewPwd" type="password")
          .tip 密码必须为数字和字母组合，长度为6-12位
          .btn-submit(@click="changePwd") 提交
        group(v-show="!isChangePwd")
          x-switch(title="手势密码" v-model="isOpenGesture" style="margin-top:0.75rem;border-top:1px solid #ededed;")
          cell(v-show="isOpenGesture" title="修改手势密码" is-link)
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
      isChangePwd: true,
      isOpenGesture: false,
      oldPwd: '',
      newPwd: '',
      reNewPwd: '',
      gesturePwd: ''
    }
  },
  mounted () {
  },
  methods: {
    handler (flag) {
      if (flag === 0) {
        this.isChangePwd = true
      } else {
        this.isChangePwd = false
      }
    },
    changePwd () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/retrievePassword.do'
      let data = {
        path: path,
        params: {
          cellphone: this.$store.state.userInfo.cellphone,
          password: this.newPwd,
          verifyCode: this.code,
          channel: this.$store.state.channel,
          imei: this.$store.state.imeis
        }
      }
      if (self.oldPwd !== '') {
        if (self.newPwd !== '') {
          if (self.newPwd === self.reNewPwd) {
            // 修改密码
            self.$store.dispatch('changePwdRequest', data).then(res => {
            })
          } else {
            this.$vux.toast.text('两次新密码输入不一致')
          }
        } else {
          this.$vux.toast.text('新密码不能为空')
        }
      } else {
        this.$vux.toast.text('旧密码不能为空')
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
    margin:2rem auto;
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
  .tip{
    padding:0.5rem 0;
    font-size:0.65rem;
    color:#1f76e2;
    text-align: center;
  }
}
</style>

