<template lang="pug">
  div(style="height:100%")
    view-box(ref="viewBox" body-padding-top="46px")
      x-header(slot="header" title="个人资料" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        group
          cell(title="头像" is-link style="margin-top:15px;border-bottom:none;")
            img(src="../../assets/imgs/default-head-photo.png" slot="default" class="right-img" @click="getPhoto")
          cell(title="登录手机号" value="18976542736")
          cell(title="实名认证" is-link link="/couponList" style="margin-top:15px;border-bottom:none")
</template>
<script>
import { ViewBox, XHeader, Masker, Group, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Group,
    Cell
  },
  data () {
    return {
      index: 0,
      noarrow: false
    }
  },
  methods: {
    getPhoto () {
     // window.alert('nihao')
      let self = this
      let data = {
        path: '',
        params: {
        }
      }
      self.$store.dispatch('photoRequest', data).then(res => {
        this.$store.state.userInfo.base64 = res
        this.$router.push('/my')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  .right-img{
    margin-right:0.5rem;
    width:1.8rem;
    height:1.8rem;

  }
}
.weui-tab .weui-cell:before{
    border-top:none;
}
.weui-tab .weui-cell{
  padding:0.8rem 0.75rem;
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
.weui-cells .weui-cell .vux-tap-active .weui-cell_access{
  margin-top: 6.25rem; 
}
</style>
