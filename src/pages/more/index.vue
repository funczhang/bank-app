<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="更多" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        group
          cell(title="常见问题" is-link style="margin-top:15px;border-bottom:none" link="/about")
            img(src="../../assets/imgs/icon-danbao.png" slot="icon")
          cell(title="咨询服务" is-link link="/bankCardList")
            img(src="../../assets/imgs/icon-bank.png" slot="icon")
          cell(title="给予评价" is-link link="/couponList" style="margin-top:15px;border-bottom:none")
            img(src="../../assets/imgs/icon-juan.png" slot="icon")
          cell(title="分享给好友" is-link link="/setting")
            img(src="../../assets/imgs/icon-setting.png" slot="icon")
          cell(title="意见反馈" is-link link="/myGurantee" style="margin-top:15px;border-bottom:none")
            img(src="../../assets/imgs/icon-setting.png" slot="icon")
          cell(title="意见反馈" is-link link="/myGurantee")
            img(src="../../assets/imgs/icon-setting.png" slot="icon")
        .btn-exit 退出
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Cell, Group, PopupPicker, XInput, CheckIcon, Masker } from 'vux'
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
.content{
  .btn-exit{
    display: block;
    margin:50px auto;
    width:80%;
    height: 40px;
    border-radius: 20px;
    background:#ffffff;
    font-size:15px;
    color:#333;
    line-height: 40px;
    text-align: center;
  }
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
  background:#f5f5f5 !important;
}
</style>

