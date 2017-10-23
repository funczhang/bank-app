<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        img(class="icon-title" src="../../assets/imgs/icon-logo.png" slot="overwrite-title")
        img(class="icon-email" src="../../assets/imgs/icon-email.png" slot="right" @click="jumpTo('inform')")
      scroller(ref="myScroller" :lock-x="true" height="-96" :scrollbarY="true" :bounce="true" :use-pulldown="true" :use-pullup="false" :pulldown-config="pulldownConfig" @on-pulldown-loading="onPulldownLoading")
        .content
          swiper(:list="imglist" v-model="index" :auto="true" :loop="true")
          .inform
            .label(class="fl")
              img(src="../../assets/imgs/icon-inform.png")
              span(class="line")
            .news(class="fl")
              i(v-show="informList.length !== 0")
              //- span(style="display:inline-block;width:80%;" class="ell") 兴盛e贷APP上线啦！
              marquee(style="height:1.5rem;")
                marquee-item(v-for="item in informList" :key="item.id") {{item.content}}
              //- marquee(style="height:1.5rem;")
              //-   marquee-item(v-for="item in 10" :key="item.id") {{'你好的冯绍峰的沙发斯蒂芬斯蒂芬是否是地方撒发放'}}
          ul(class="btn-area clearfix")
            li(@click="jumpTo('BankCardList')")
              img(src="../../assets/imgs/icon-account.png") 
              span 我的银行卡
            li(@click="jumpTo('MyLoan')") 
              img(src="../../assets/imgs/icon-loan.png") 
              span 我的贷款
            li(@click="jumpTo('MyRepayment')") 
              img(src="../../assets/imgs/icon-pay.png") 
              span 我的还款
            li(@click="jumpTo('MyGuarantee')") 
              img(src="../../assets/imgs/icon-guarantee.png") 
              span 我的担保
          .btn-loan
            div
              img(src="../../assets/imgs/icon-title.png")
              p 授信金额(元) {{' ' + minAmount + '万~' + maxAmount + '万'}}
              p 授信期限(月) {{' ' + creditTerm}}
              a(href="javascript:void(null)" class="btn-apply" @click="jumpTo('goApply')") 去申请
          ul(class="btn-classify clearfix")
            li(class="btn-payment" @click="unOpen")
              span 生活缴费
            li(class="btn-invest" @click="unOpen")
              span 投资理财
            li(class="btn-activity" @click="unOpen")
              span 热门活动 
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, Swiper, Marquee, MarqueeItem, Scroller } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Swiper,
    Marquee,
    MarqueeItem,
    Scroller
  },
  data () {
    return {
      imglist: [],
      informList: [],
      index: 0,
      minAmount: '',
      maxAmount: '',
      creditTerm: '',
      pulldownConfig: {
        content: '下拉刷新~',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新~',
        upContent: '释放刷新~',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      }
    }
  },
  mounted () {
    // 显示
    this.$vux.loading.show({
      text: 'Loading'
    })
    // 获取设备信息和token
    this.getBaseInfo()
    this.getPicList()
    this.applyInfo()
    this.init()
    // 隐藏
    setTimeout(() => {
      this.$vux.loading.hide()
    }, 0)
  },
  activated () {
  },
  methods: {
    onPulldownLoading () {
      let self = this
      self.getBaseInfo()
      self.getPicList()
      self.applyInfo()
      self.init()
      self.$nextTick(() => {
        //   // 视图更新完成后停止刷新或加载动作
        self.$refs.myScroller.donePulldown()
        self.$refs.myScroller.reset({
          top: 0
        })
      })
    },
    toInform () {
      // let token = this.$store.state.userInfo.token
      // if (token !== '') {
      this.$router.push('/inform')
      // } else {
      //   this.$vux.toast.text('请登录后查看公告哦~')
      // }
    },
    jumpTo (page) {
      switch (page) {
        case 'inform': this.isLoginAndVerfied() === true ? this.$router.push('/inform') : null
          break
        case 'goApply': this.isLoginAndVerfied() === true ? this.goApply() : null
          break
        case 'BankCardList': this.isLoginAndVerfied() === true ? this.$router.push('/bankCardList') : null
          break
        case 'MyLoan': this.isLoginAndVerfied() === true ? this.$router.push('/loan') : null
          break
        case 'MyRepayment': this.isLoginAndVerfied() === true ? this.$router.push('/repaymentRecord') : null
          break
        case 'MyGuarantee': this.isLoginAndVerfied() === true ? this.$router.push('/myGurantee') : null
          break
      }
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
      let data = {
        action: 'get_request'
      }
      // 获取设备信息
      self.$store.dispatch('normalRequest', data).then(res => {
        // 存用户信息
        self.$store.commit('INIT_USER_INFO', res)
      })
    },
    getPicList () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/homePageInit.do'
      let data = {
        action: 'init_request',
        path: path
      }
      self.$store.dispatch('initRequest', data).then(res => {
        // alert(res)
        // 这里使用json.parse无法处理 ？？？
        let arr = []
        let data = eval('(' + res + ')')
        // alert(data)
        if (data.response === 'success') {
          self.imglist = []
          self.minAmount = data.data.minAmount
          self.maxAmount = data.data.maxAmount
          self.creditTerm = data.data.creditTerm
          self.informList = data.data.noticeList
          arr = data.data.carouselList
          arr.forEach((element) => {
            self.imglist.push({img: self.$store.state.baseUrl + element})
          })
        } else {
          self.$vux.toast.text('首页轮播数据获取失败~')
        }
      })
    },
    init () {
      let self = this
      // 退出进程，给我原生数据库信息
      window.toLogin = (res) => {
        // alert('111111')
        let data = JSON.parse(JSON.stringify(res))
        self.$store.state.userInfo.avatar = ''
        self.$store.commit('INIT_USER_INFO', data)
        self.$router.replace('/login')
      }
    },
    goApply () {
      if (this.$store.state.canApply === 1) { // 1可以申请 2不可申请
        this.$router.push('/loan')
        this.$store.state.tabItem = 1
      } else {
        // alert(this.$store.state.applyState)
        // 不可申请
        switch (this.$store.state.applyState) {
          case 0: this.$vux.toast.text('申请相关信息获取失败，请退出重新登录~')
            break
          case 1: this.$router.push('/quotaEvaluations')
            break
          case 2: this.$router.push('/fail')
            break
          case 3: this.$router.push('/sign')
            break
          case 4: this.$router.push('/sign')
            break
          case 5: this.$router.push('/sign')
            break
          case 6: this.$router.push('/fail')
            break
        }
      }
    },
    applyInfo () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/applyPageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('initRequest', data).then(res => {
        // alert(res)
        let data = JSON.parse(res)
        self.$store.state.canApply = data.data.canApply
        self.$store.state.applyNo = data.data.applyNo
        switch (data.data.explain) {
          case '1': self.$store.state.applyState = 1; self.page = '/quotaEvaluation' // 额度评估
            break
          case '2': self.$store.state.applyState = 2; self.page = '/fail' // 审批未通过
            break
          case '3': self.$store.state.applyState = 3; self.page = '/sign' // 签约等待
            break
          case '4': self.$store.state.applyState = 4; self.page = '/sign' // 签约
            break
          case '5': self.$store.state.applyState = 5; self.page = '/success' // 签约完成
            break
          case '6': self.$store.state.applyState = 6; self.page = '/fail' // 签约超时
            break
        }
        // alert(self.$store.state.applyState)
      })
    },
    isLoginAndVerfied () {
      let token = this.$store.state.userInfo.token
      let isAuth = this.$store.state.userInfo.isAuth
      if (token !== '') {
        if (isAuth !== '') {
          return true
        } else {
          this.$router.push('/verfied')
        }
      } else {
        this.$router.push('/login')
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
  // body{
  //   background:#fff;
  // }
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
        top:0.1rem;
        padding:0 0.75rem;
        width:2.5rem;
        height:0.75rem;
        vertical-align: middle;
      }
      i{
        position: relative;
        top:-0.55rem;
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
      position: relative;
      padding:0 0.75rem;
      background:#fff;
      div{
        padding:0.5rem 0;
        width:100%;
        height:5.15rem;
        background:url(../../assets/imgs/bg-apply.png);
        background-size:100% 100%;
      }
      p{
        margin-left: 1rem;
        font-size:0.55rem;
        color:#333;
        line-height: 2;
      }
      img{
        margin-left: 1rem;
        width:9.125rem;
        height:0.85rem;
      }
      .btn-apply{
        position: relative;
        top:-1.7rem;
        left:55%;
        display: inline-block;
        width:3.625rem;
        height:1.5rem;
        background:#f32f2f;
        font-size:0.65rem;
        line-height: 1.6rem;
        border-radius: 0.75rem;
        text-align: center;
        color:#fff;
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
  .vux-marquee {
    margin-left:1rem;
    display:inline-block;
    width:80%;
  }
  .vux-slider{
    background:#f5f5f5;
  }
  .vux-marquee-box li{
    height: 1.5rem;
    font-size:0.65rem;
    line-height: 1.7rem;
    color:#333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .vux-slider > .vux-indicator, 
  .vux-slider .vux-indicator-right{
    left:50%;
    margin-left:-1.2rem;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot, 
  .vux-slider .vux-indicator-right > a > .vux-icon-dot{
    background:#65bfff;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, 
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
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

