<template lang="pug">
  tabbar(v-model="toTab")
    tabbar-item(on-item-click="toPage(0)" link="/")
      img(slot="icon" src="../../assets/imgs/icon-home.png")
      img(slot="icon-active" src="../../assets/imgs/icon-home-active.png")
      span(slot="label") 首页
    tabbar-item(on-item-click="toPage(1)" link="/loan")
      img(slot="icon" src="../../assets/imgs/icon-loan2.png")
      img(slot="icon-active" src="../../assets/imgs/icon-loan-active.png")
      span(slot="label") 贷款
    tabbar-item(on-item-click="toPage(2)" link="/my")
      img(slot="icon" src="../../assets/imgs/icon-my.png")
      img(slot="icon-active" src="../../assets/imgs/icon-my-active.png")
      span(slot="label") 我的
    tabbar-item(on-item-click="toPage(3)" link="/more")
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
      toTab: this.$store.state.tabItem
    }
  },
  mounted () {
    let path = this.$route.path
    // debugger
    if (path === '/') {
      this.toTab = 0
    } else if (path === '/loan') {
      this.toTab = 1
    } else if (path === '/my') {
      this.toTab = 2
    } else if (path === '/more') {
      this.toTab = 3
    }
  },
  activated () {
    console.log('111')
  },
  methods: {
    loan () {
      console.log('1111')
    },
    toPage (flag) {
      if (flag === 0) {
        this.$router.push('/')
      } else if (flag === 1) {
        this.$router.push('/loan')
      } else if (flag === 2) {
        this.$router.push('/my')
      } else if (flag === 3) {
        this.$router.push('/more')
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
      top:3px;
      width:20px;
      height:20px;
    }
  }
}
</style>

