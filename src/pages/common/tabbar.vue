<template lang="pug">
  tabbar(v-model="toTab")
    tabbar-item(@on-item-click="toPage(0)")
      img(slot="icon" src="../../assets/imgs/icon-home.png")
      img(slot="icon-active" src="../../assets/imgs/icon-home-active.png")
      span(slot="label") 首页
    tabbar-item(@on-item-click="toPage(1)")
      img(slot="icon" src="../../assets/imgs/icon-loan2.png")
      img(slot="icon-active" src="../../assets/imgs/icon-loan-active.png")
      span(slot="label") 贷款
    tabbar-item(@on-item-click="toPage(2)")
      img(slot="icon" src="../../assets/imgs/icon-my.png")
      img(slot="icon-active" src="../../assets/imgs/icon-my-active.png")
      span(slot="label") 我的
    tabbar-item(@on-item-click="toPage(3)")
      img(slot="icon" src="../../assets/imgs/icon-more.png")
      img(slot="icon-active" src="../../assets/imgs/icon-more-active.png")
      span(slot="label") 更多
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
    }
  },
  mounted () {
    // 判断当前路由控制tab
    let self = this
    let path = self.$route.path
    if (path === '/') {
      self.$store.state.tabItem = 0
    } else if (path === '/checkLoan') {
      self.$store.state.tabItem = 1
    } else if (path === '/my') {
      self.$store.state.tabItem = 2
    } else if (path === '/more') {
      self.$store.state.tabItem = 3
    }
  },
  computed: {
    toTab: {
      set (value) {
        this.$store.state.tabItem = value
      },
      get () {
        return this.$store.state.tabItem
      }
    }
  },
  activated () {
  },
  methods: {
    toPage (flag) {
      switch (flag) {
        case 0: this.$router.replace('/')
          break
        case 1: this.$router.replace('/checkLoan')
          break
        case 2: this.$router.replace('/my')
          break
        case 3: this.$router.replace('/more')
          break
      }
    }
  }
}
</script>
<style lang="less">
.weui-tabbar__item{
  .weui-tabbar__icon{
    img{
      position: relative;
      top:0.15rem;
      width:1rem;
      height:1rem;
    }
  }
}
</style>

