<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="43px")
      x-header(slot="header" title="内嵌页面" :left-options="{showBack:true}" style="width:100%;position:absolute;left:0;top:0;z-index:100;")
      .content
        iframe(src="http://www.baicu.com")
</template>

<script>
// import fly from '../../utils/hybrid.js'
import { ViewBox, XHeader } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader
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
<style lang="less">
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .content{
    height:100%;
    iframe {
      width:100%;
      height:100%;
    }
    .weui-tab__panel{
      padding-bottom:0 !important;
    }
  }
  .vux-header{
    .vux-header-title{
      font-size: 14px;
    }
    img{
      position:relative;
      top:0;
      left:-3px;
      width:20px;
      height:20px;
    }
  }
}
</style>

