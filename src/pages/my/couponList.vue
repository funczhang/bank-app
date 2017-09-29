<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="优惠券" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;border-bottom:1px solid #ededed;")
      .content 
        ul(class="card-list")
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-unuse.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-used.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-unuse.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-used.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-used.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
          li(class="clearfix")
            img(src="../../assets/imgs/bg-coupon-unuse.png")
            .left ¥200
            .right 
              h5 利率抵用券
                span (APP专享优惠券)
              p 2017/05/03-2017/05/20
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
      index: 0
    }
  },
  mounted () {
  },
  methods: {
    addBankCard () {
      this.$router.push('/addCard')
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
    margin-top:15px;
    padding:10px 20px;
    background:#fff;
    li{
      position: relative;
      margin:0 auto 15px;
      height:90px;
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
        padding:30px 0;
        width:32%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        overflow: hidden;
      }
      .right{
        float:left;
        padding:20px 3%;
        width:60%;
        overflow: hidden;
        h5{
          height:25px;
          font-size:15px;
          line-height: 25px;
        }
        p{
          height:25px;
          font-size:12px;
          line-height: 25px;
        }
        span{
          font-size:12px;
          line-height: 1.5;
        }
      }
      
    }
  }
}
</style>

