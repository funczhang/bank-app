<template lang="pug">
  div(id="app")
    transition
      keep-alive
        router-view
    router-view(name="tabbar")
</template>
<script>
// 普惠金融项目 主入口
import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  mounted () {
    // alert('app mounted')
    console.log('app mounted')
    // let path = this.$route.path
    // console.log(path)
    // debugger
  },
  activated () {
    // alert('app activited')
    console.log('app activited')
  }
}
</script>
<style lang="less">
#app {
  height:100%;
}
</style>
