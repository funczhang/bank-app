<template lang="pug">
  div(id="app")
    router-view
    router-view(name="tabbar")
</template>
<script>
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
