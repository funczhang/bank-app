<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="密码管理" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler") 修改登录密码
          tab-item(@on-item-click="handler") 手势密码
        group(v-show="isChangePwd" style="margin-top:15px;")
          x-input(placeholder="请输入旧密码")
          x-input(placeholder="请输入新密码" style="margin-top:15px;border-bottom:none;")
          x-input(placeholder="请再次输入新密码")
        group(v-show="!isChangePwd")
          x-switch(title="手势密码" v-model="isOpenGesture" style="margin-top:15px;border-top:1px solid #ededed;")
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
      isOpenGesture: false
    }
  },
  mounted () {
  },
  methods: {
    handler () {
      this.isChangePwd = !this.isChangePwd
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
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
}
</style>

