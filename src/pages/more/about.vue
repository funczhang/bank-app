<template lang="pug">
  div(style="height:100%")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="关于" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        .imgbg
          img(src="../../assets/imgs/icon-main.png")
        .version
          span(style="font-size:0.75rem") 版本号：v1.0
        group
          cell(title="版本更新" is-link style="margin-top:15px;border-bottom:none")
            .child(slot="child" @click="updateVersion")
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
  },
  methods: {
    updateVersion () {
      // 页面初始化
      let self = this
      let data = {
        action: 'version_request'
      }
      // 版本更新
      self.$store.dispatch('normalRequest', data).then(res => {
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  .imgbg{
    img{
      width: 10.55rem;
      height: 4.35rem;
      margin:3rem auto;
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
  .child {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 99;
  }
}
.weui-tab .weui-cell:before{
    border-top:none;
}
.weui-tab .weui-cell{
  padding:0.8rem 0.75rem;
  background: #fff; 
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
  .vux-cell-primary{
    padding:0.5rem 0.75rem;
    background: #fff;
  }
  .weui-cell__hd img{
    position: relative;
    top:2px;
    margin-right:0.5rem;
    width:1.5rem;
    height:1.5rem;
  }
}
.weui-tab .weui-cells{
  background:#f5f5f5 !important;
}
.weui-cells .weui-cell .vux-tap-active .weui-cell_access{
  margin-top: 6.25rem; 
}
</style>



