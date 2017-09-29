<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-bottom="50px")
      .container
        .header
          a(class="btn-code" href="javascript:void(null)")
          .head-img(src="head-img")
            //- img(src="../../assets/imgs/person.png")
            img(src="../../assets/imgs/default-img.png")
          p(v-show="false" class="phone") 152****3456
          p(class="phone" @click="login") 登录/注册
        .content
          group(style="background:green;")
            cell(title="我的担保" is-link link="/myGurantee")
              img(src="../../assets/imgs/icon-danbao.png" slot="icon")
            cell(title="银行卡" is-link style="margin-top:15px;border-bottom:none;" link="/bankCardList")
              img(src="../../assets/imgs/icon-bank.png" slot="icon")
            cell(title="优惠券" is-link link="/couponList")
              img(src="../../assets/imgs/icon-juan.png" slot="icon")
            cell(title="个人设置" is-link style="margin-top:15px;" link="/setting")
              img(src="../../assets/imgs/icon-setting.png" slot="icon")
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group, PopupPicker, XInput, CheckIcon, Masker, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group,
    PopupPicker,
    XInput,
    CheckIcon,
    Masker,
    Cell
  },
  data () {
    return {
      index: 0
    }
  },
  mounted () {
    // 显示
    // this.$vux.loading.show({
    //   text: 'Loading'
    // })
    // setTimeout(() => {
    //   this.$vux.loading.hide()
    // }, 1000)
    // 隐藏
  },
  methods: {
    login () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  .header{
    position: relative;
    padding:0.1px;
    height:150px;
    background:url(../../assets/imgs/bg-my.png);
    background-size: 100% 100%;
    .btn-code{
      position: absolute;
      display: block;
      right: 15px;
      top:15px;
      width:20px;
      height:20px;
      background:url(../../assets/imgs/icon-ma.png);
      background-size:20px 20px;
    }
    .head-img{
      position: relative;
      top:50%;
      margin:0 auto;
      margin-top:-40px;
      width:80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0px 0px 20px rgba(255,255,255,.5);
      overflow: hidden;
      background:#f5f5f5;
      img{
        width:100%;
        height:100%;
      }
    }
    .phone{
      position: relative;
      top:53%;
      margin:0 auto;
      width:50%;
      font-size:16px;
      color:#fff;
      text-align: center;
    }
  }
  .content{
  }
}
  .weui-tab .weui-cell:before{
    border-top:none;
  }
 .weui-tab .weui-cell{
    padding:10px 15px;
    background: #fff; 
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
  .vux-cell-primary{
    padding:10px 15px;
    background: #fff;
  }
  .weui-cell__hd img{
    position: relative;
    top:2px;
    margin-right:10px;
    width:30px;
    height:30px;
  }
}
.weui-tab .weui-cells{
  background:#f5f5f5 !important;
}
</style>

