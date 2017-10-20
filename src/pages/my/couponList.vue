<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="优惠券" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;border-bottom:1px solid #ededed;")
      .content 
        transition-group(v-show="couponList.length !== 0" class="card-list" tag="ul"  name="bounceInUp" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutLeft")
          li(class="clearfix" v-for="item in couponList" key="item.id")
            img(v-show="item.status === 0" src="../../assets/imgs/bg-coupon-unuse.png")
            img(v-show="!item.status === 0" src="../../assets/imgs/bg-coupon-used.png")
            .left ¥{{item.couponAmount}}
            .right 
              h5 {{item.couponType === 1 ? '利息优惠券' : '其他'}}
                span ({{item.description}})
              p {{item.effectiveTime}}-{{item.invalidDate}}
          
</template>

<script>
import { ViewBox, XHeader, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker
  },
  data () {
    return {
      index: 0,
      isUsed: false,
      couponList: []
    }
  },
  mounted () {
    this.initCouponList()
  },
  methods: {
    initCouponList () {
      let self = this
      let path = this.$store.state.baseUrl + '/app/xsyd/getCoupons.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          this.couponList = res.data
        } else {
          this.$vux.toast.text('优惠券列表获取失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
}
.content{
  padding:0.1px;
  background:#f5f5f5;
  .card-list{
    margin-top:0.75rem;
    padding:0.5rem 1rem;
    background:#fff;
    li{
      position: relative;
      margin:0 auto 0.75rem;
      height:4.5rem;
      overflow: hidden;
      img {
        position: absolute;
        z-index: 0;
        width:100%;
        height:100%;
      }
      .left,.right{
        position: relative;
        z-index: 1;
        color:#fff;
      }
      .left{
        float:left;
        padding:1.5rem 0;
        width:32%;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        overflow: hidden;
      }
      .right{
        float:left;
        padding:1rem 3%;
        width:60%;
        overflow: hidden;
        h5{
          height:1.25rem;
          font-size:0.75rem;
          line-height: 1.25rem;
        }
        p{
          height:1.25rem;
          font-size:0.6rem;
          line-height: 1.25rem;
        }
        span{
          font-size:0.6rem;
          line-height: 1.5;
        }
      }
      
    }
  }
}
</style>

