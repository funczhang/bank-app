<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        img(class="icon-title" src="../../assets/imgs/icon-logo.png" slot="overwrite-title")
        img(class="icon-email" src="../../assets/imgs/icon-email.png" slot="right" @click="toInform")
      .content
        swiper(:list="imglist" v-model="index" :auto="true" :loop="true")
        .inform
          .label(class="fl")
            img(src="../../assets/imgs/icon-inform.png")
            span(class="line")
          .news(class="fl")
            i()
            span(style="display:inline-block;width:80%;" class="ell") 兴盛e贷APP上线啦！
        ul(class="btn-area clearfix")
          li(@click="toAccount")
            img(src="../../assets/imgs/icon-account.png") 
            span 我的银行卡
          li(@click="toLoan") 
            img(src="../../assets/imgs/icon-loan.png") 
            span 我的贷款
          li(@click="toRepay") 
            img(src="../../assets/imgs/icon-pay.png") 
            span 我的还款
          li(@click="toGuarantee") 
            img(src="../../assets/imgs/icon-guarantee.png") 
            span 我的担保
        .btn-loan
          div
            img(src="../../assets/imgs/bg-apply.png")
        ul(class="btn-classify clearfix")
          li(class="btn-payment" @click="unOpen")
            span 生活缴费
          li(class="btn-invest" @click="unOpen")
            span 投资理财
          li(class="btn-activity" @click="unOpen")
            span 热门活动 
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, Swiper } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Swiper
  },
  data () {
    return {
      imglist: [
        { url: '',
          img: 'https://static.vux.li/demo/1.jpg'
        },
        { url: '',
          img: 'https://static.vux.li/demo/2.jpg'
        },
        { url: '',
          img: 'https://static.vux.li/demo/3.jpg'
        },
        { url: '',
          img: 'https://static.vux.li/demo/1.jpg'
        }
      ],
      index: 0
    }
  },
  mounted () {
    // this.$vux.loading.show({
    //   text: 'Loading'
    // })
    // // 获取设备信息和token
    // this.getBaseInfo()
    // this.getPicList()
    // // 隐藏
    // setTimeout(() => {
    // this.$vux.loading.hide()
    // }, 0)
    this.init()
  },
  activated () {
    // 显示
    this.$vux.loading.show({
      text: 'Loading'
    })
    // 获取设备信息和token
    this.getBaseInfo()
    this.getPicList()
    // // 隐藏
    setTimeout(() => {
      this.$vux.loading.hide()
    }, 0)
  },
  methods: {
    toInform () {
      let token = this.$store.state.userInfo.token
      if (token !== '') {
        this.$router.push('/inform')
      } else {
        this.$vux.toast.text('请登录后查看公告哦~')
      }
    },
    toAccount () {
      this.$router.push('/bankCardList')
    },
    toLoan () {
      this.$router.push('/checkLoan')
    },
    toRepay () {
      this.$router.push('/repaymentRecord')
    },
    toGuarantee () {
      this.$router.push('/myGurantee')
    },
    unOpen () {
      // 显示
      this.$vux.toast.show({
        type: 'text',
        text: '该项暂未开通哦!'
      })
    },
    getBaseInfo () {
      let self = this
      let path = ''
      let data = {
        path: path,
        params: {
        }
      }
      // 获取设备信息
      self.$store.dispatch('getRequest', data).then(res => {
        let data = JSON.parse(res)
        // 存用户信息
        self.$store.commit('INIT_USER_INFO', data)
      })
    },
    getPicList () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getAppCarouseList.do'
      let data = {
        path: path,
        params: {
        }
      }
      self.$store.dispatch('initRequest', data).then(res => {
      })
    },
    init () {
      let self = this
      window.toLogin = (res) => {
        // alert(JSON.stringify(res))
        let data = JSON.parse(JSON.stringify(res))
        // alert('token:' + data.token)
        self.$store.commit('INIT_USER_INFO', data)
        // if (res instanceof Object) {
        //   // alert(JSON.stringify(res))
        //   self.$store.commit('INIT_USER_INFO', res)
        // } else {
        //   let data = JSON.parse(res)
        //   self.$store.commit('INIT_USER_INFO', data)
        // }
        self.$router.replace('/login')
      }
    }
  }
}
</script>
<style lang="less">
// 首页tab切换
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .content{
    .inform {
      height:1.5rem;
      background:#f5f5f5;
      .label{
        position: relative;
        width:23%;
        height:100%;
      }
      .line{
        display:inline-block;
        position:absolute;
        top:0.3rem;
        bottom:0.3rem;
        margin-right:0.3rem;
        border-left:1px solid #ededed;
      }
      .news{
        width:75%;
        height:100%;
      }
      img{
        position: relative;
        top:-0.1rem;
        padding:0 0.75rem;
        width:2.5rem;
        height:0.75rem;
        vertical-align: middle;
      }
      i{
        position: relative;
        top:-0.6rem;
        margin-right:0.25rem;
        width:0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        display: inline-block;
        background:#f32f2f;
      }
      span{
        display: inline-block;
        font-size:0.65rem;
        color:#333;
        line-height: 1.5rem;
        overflow: hidden;
      }
    }
    .btn-area {
      // border-top:1px solid #000;
      // border-bottom:1px solid #000;
      background:#fff;
      li {
        padding-top:1rem;
        float:left;
        width:25%;
        text-align: center;
        img {
          display: block;
          margin:0 auto;
          width:2.25rem;
          height:2.25rem;
        }
        span {
          display: block;
          margin-top:0.5rem;
          margin-bottom:1rem;
          text-align: center;
          font-size:0.65rem;
          color:#666;
        }
      }
    }
    .btn-loan{
      background:#fff;
      div{
        padding:0 0.75rem;
      }
      img{
        display: block;
        margin:0 auto;
        width:100%;
        height:5.5rem;
        border-radius: 3px;
      }
    }
    .btn-classify{
      padding-top:0.4rem;
      padding:0.4rem 0.75rem 0.75rem;
      background:#fff;
      li{
        float: left;
        width:30%;
        height:5.25rem;
        border-radius: 3px;
        span {
          display: block;
          padding-top:0.9rem;
          text-align: center;
          font-size:0.75rem;
          color:#333;
        }
      }
      .btn-payment{
        background:url(../../assets/imgs/bg-1.png);
        background-size:100% 100%;
      }
      .btn-invest{
        margin:0 5%;
        background:url(../../assets/imgs/bg-2.png);
        background-size:100% 100%;
      }
      .btn-activity{
        background:url(../../assets/imgs/bg-3.png);
        background-size:100% 100%;
      }
    }
  }
  .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
    left:50%;
    margin-left:-1.2rem;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot{
    background:#65bfff;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color:#fff;
  }
  .vux-header{
    .vux-header-title{
      font-size: 0.8rem;
      color:#333;
    }
    .vux-header-title > span
    img{
      position:relative;
      top:0;
    }
    .icon-title{
      position: relative;
      top:0.25rem;
      width:100%;
      vertical-align: middle;
    }
    .icon-email{
      right:0.25rem;
      width:0.9rem;
      height:0.7rem;
    }
  }
}
</style>

