<template lang="pug">
  div(id="app")
    loading(:show="isLoading")
    //- transition(name="custom-classes-transition" :enter-active-class="'animated ' + direction")
    transition(name="custom-classes-transition")
      router-view
    transition(name="custom-classes-transition")
      router-view(name="tabbar")
</template>
<script>
// 普惠金融项目 主入口
import { mapGetters } from 'vuex'
import { Loading, ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading
  },
  data () {
    return {
      direction: 'slideInLeft'
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
      // 'direction'
    ])
  },
  watch: {
    $route (to, from) {
      if (to.path === '/' || to.path === '/checkLoan') {
        this.direction = 'slideInLeft'
      } else if (to.path === '/my' || to.path === '/more') {
        this.direction = 'slideInRight'
      } else {
        this.direction = 'fadeIn'
      }
    }
  },
  mounted () {
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
