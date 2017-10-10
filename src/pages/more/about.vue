<template lang="pug">
  div(style="height:100%")
    view-box(ref="viewBox" body-padding-top="46px")
      x-header(slot="header" title="更多" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        .imgbg
          img(src="../../assets/imgs/icon-main.png")
        .version
          span 版本号：v1.0
        group
          cell(title="版本更新" is-link style="margin-top:15px;border-bottom:none" link="/myGurantee")
</template>
<script>
import { ViewBox, XHeader, Masker, Group, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Group,
    Cell
  }
}
</script>
<style lang="less" scoped>
.content{
  .imgbg{
    img{
      width: 211px;
      height: 87px;
      margin:60px auto;
      display: block;
    }
  }
  .version{
    span{
      text-align: center;
      margin:0px auto;
      display: block;
    }
  }
}
.weui-tab .weui-cell:before{
    border-top:none;
}
.weui-tab .weui-cell{
  padding:16px 15px;
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
.weui-cells .weui-cell .vux-tap-active .weui-cell_access{
  margin-top: 125px; 
}
</style>



