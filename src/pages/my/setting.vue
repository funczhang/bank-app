<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="40px" body-padding-bottom="0")
      x-header(slot="header" title="个人设置" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;padding-bottom:0;color:#000;")
      .content(style="margin-top:15px;")
        group(style="background:green;")
          cell(title="账户资料" is-link link="/verfied")
            img(src="../../assets/imgs/icon-setting-data.png" style="width:16px;height:18px;" slot="icon")
          cell(title="我的密码" is-link style="margin-top:15px;border-bottom:none;" link="/managePwd")
            img(src="../../assets/imgs/icon-setting-pwd.png" style="width:16px;height:18px;" slot="icon")
          cell(title="更换手机号" is-link link="/changePhone")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:13px;height:16px;" slot="icon")
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group, PopupPicker, XInput, CheckIcon, Masker, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group,
    PopupPicker,
    XInput,
    CheckIcon,
    Masker,
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
.weui-tab .vux-header{
  border-bottom:1px solid #ededed;
}
  .weui-tab .weui-cell:before{
    border-top:none;
  }
 .weui-tab .weui-cell{
    padding:10px 15px;
    background: #fff; 
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
  .vux-cell-primary{
    padding:10px 15px;
    background: #fff;
  }
  .weui-cell__hd img{
    position: relative;
    top:2px;
    margin-right:10px;
    width:30px;
    height:30px;
  }
}
.weui-tab .weui-cells{
  background:#f5f5f5;
}
  .weui-tab .vux-tap-active{
    // padding-bottom:0;
  }
</style>

