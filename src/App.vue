<template lang="pug">
  div(id="app")
    router-view
    router-view(name="tabbar")
</template>
<script>
// 普惠金融项目
import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  activated () {
  }
}
</script>
<style lang="less">
#app {
  height:100%;
}
</style>
