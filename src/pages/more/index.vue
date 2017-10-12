<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="更多" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        group
          cell(title="常见问题" is-link style="margin-top:15px;border-bottom:none" link="/myGurantee")
            img(src="../../assets/imgs/icon-usual-question.png" slot="icon")
          cell(title="咨询服务" is-link link="/bankCardList")
            img(src="../../assets/imgs/icon-consult-service.png" slot="icon")
          cell(title="给予评价" is-link link="/suggest" style="margin-top:15px;border-bottom:none")
            img(src="../../assets/imgs/icon-give-evaluate.png" slot="icon")
          cell(title="分享给好友" is-link link="/setting")
            img(src="../../assets/imgs/icon-share-friends.png" slot="icon")
          cell(title="意见反馈" is-link link="/suggest" style="margin-top:15px;border-bottom:none")
            img(src="../../assets/imgs/icon-suggest-feedback.png" slot="icon")
          cell(title="关于" is-link link="/about")
            img(src="../../assets/imgs/icon-about.png" slot="icon")
        .btn-exit(@click="exit") 退出
</template>

<script>
import { ViewBox, XHeader, Cell, Group, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    Masker,
    Cell
  },
  data () {
    return {
      index: 0
    }
  },
  mounted () {
  },
  methods: {
    exit () {
      // 退出登录
      let self = this
      let token = self.$store.state.userInfo.token
      let data = {
        action: 'exit_request',
        path: '',
        params: {
        }
      }
      if (token !== '') {
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        self.$store.dispatch('generalRequest', data).then(res => {
          let data = JSON.parse(res)
          // 存用户信息
          self.$store.commit('INIT_USER_INFO', data)
          // 隐藏
          this.$vux.loading.hide()
          this.$vux.toast.text('退出登录成功~')
          self.$router.replace('/my')
          self.$store.state.tabItem = 2
        })
      } else {
        this.$vux.loading.hide()
        this.$vux.toast.text('您未登录，无法退出哦~')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  .btn-exit{
    display: block;
    margin:2.5rem auto;
    width:80%;
    height: 2rem;
    border-radius: 1rem;
    background:#ffffff;
    font-size:0.75rem;
    color:#333;
    line-height: 2rem;
    text-align: center;
  }
}
.weui-tab .weui-cell:before{
    border-top:none;
  }
 .weui-tab .weui-cell{
    padding:0.5rem 0.75rem;
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
</style>

