<template lang="pug">
  div(style="height:100%")
    view-box(ref="viewBox" body-padding-top="46px")
      x-header(slot="header" title="个人资料" :left-options="{showBack:true, backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        group
          cell(title="头像" is-link style="margin-top:0.75rem;border-bottom:none;")
            .child(slot="child" @click="getPhoto")
            img(v-show="!hasHeadImg" src="../../assets/imgs/default-head-photo.png" slot="default" class="right-img" @click="getPhoto")
            //- img(v-show="!hasHeadImg" src="../../assets/imgs/default-head-photo.png" @click="getPhoto" slot="default" class="right-img")
            img(v-show="hasHeadImg" :src="headImgSrc" slot="default" class="right-img")
          cell(title="登录手机号" :value="phoneNum")
          cell(title="实名认证" is-link link="/verfied" style="margin-top:0.75rem;border-bottom:none")
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
  computed: {
    phoneNum () {
      return this.$store.state.userInfo.cellphone
    },
    hasHeadImg () {
      return this.$store.state.userInfo.avatar !== ''
    },
    headImgSrc () {
      // alert(this.$store.state.userInfo.avatar)
      return this.$store.state.baseUrl + this.$store.state.userInfo.avatar
    }
  },
  methods: {
    getPhoto () {
      let self = this
      let data = {
        action: 'photo_request'
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        self.getHeadImg()
      })
    },
    getHeadImg () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/loginPageInit.do?' + new Date().getTime()
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(data => {
        // alert(JSON.stringify(data))
        // let data = JSON.parse(res)
        this.$store.state.userInfo.avatar = data.data.avatar
        // this.$router.push('/my')
        // data.response === 'success' ? self.$store.commit('INIT_HEAD_IMG', data.data) : null
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
    border-radius: 50%;
    overflow: hidden;
  }
  .child{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
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
