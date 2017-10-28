<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="信贷引导" :left-options="{showBack:true, backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        img(src="../../assets/imgs/guid-page.png" width="100%")
</template>

<script>
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
  }
}
</script>
<style lang="less">
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
</style>

