<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" bgColor="#fff")
      x-header(slot="header" title="申请失败" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        rate(:state="state")  
        .tip
          img(src="../../assets/imgs/icon-fail.png")
          p 真遗憾！您的申请由于{{tip}},故申请失败！如有疑问，请到就近网点咨询或拨打咨询电话
            a(href="tel:400400400") 400-xxxx-xxxx
</template>

<script>
import progress from '../common/progress'
import { ViewBox, XHeader, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    'rate': progress
  },
  data () {
    return {
      index: 0,
      tip: ''
    }
  },
  computed: {
    state () {
      return this.$store.state.applyState
    }
  },
  mounted () {
    this.getWrongInfo()
  },
  methods: {
    getWrongInfo () {
       // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/applyPageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      // 初始化我的贷款
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          if (data.data.explain === '6') {
            self.tip = '未签约（签约超时）'
          } else if (data.data.explain === '2') {
            self.tip = '授信审批未通过'
          }
        } else {
          this.$vux.toast.text(data.data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  // position: relative;
  padding:0.1px;
  background:#f5f5f5;
  // .progerss{
  //   position: absolute;
  //   margin-top:0.75rem;
  //   padding:0.5rem 0.75rem;
  //   height:2.5rem;
  //   background:#257eeb;
  //   img{
  //     padding-bottom:0.25rem;
  //     width:100%;
  //   }
  //   span{
  //     float:left;
  //     width:30%;
  //     text-align: center;
  //     font-size:0.7rem;
  //     color:#fff;
  //   }
  //   .first{
  //     width:20%;
  //     text-align: left;
  //   }
  //   .last{
  //     width:20%;
  //     text-align: right;
  //   }
  // }
  .tip{
    position: absolute;
    top:6rem;
    bottom:0;
    background:#fff;
    img{
      display: block;
      margin:0 auto;
      padding:1rem;
      width:5.4rem;
      height:4.5rem;
    }
    p{
      padding:0 1.5rem 1rem;
      font-size:0.65rem;
      color:#333;
      line-height: 1.5;
      text-align: center;

    }
    a{
      font-size:0.65rem;
      color:#1f76e2;
    }
  }
}
</style>

