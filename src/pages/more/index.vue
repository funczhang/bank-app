<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="更多" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
      masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
        div(slot="content" class="msg-box")
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group, PopupPicker, XInput, CheckIcon, Masker } from 'vux'
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
    Masker
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
}
</style>

