<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px" bgColor="#fff")
      x-header(slot="header" title="" :left-options="{showBack:false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        img(class="icon-title" src="../../assets/imgs/icon-logo.png" slot="overwrite-title")
        img(class="icon-email" src="../../assets/imgs/icon-email.png" slot="right" @click="jumpTo('inform')")
      //- scroller(ref="myScroller" height="-96" :lock-x="true" :use-pulldown="true" :use-pullup="true" :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" @on-pulldown-loading="onPulldownLoading")
      .content
        swiper(:list="imglist" dots-position="center" v-model="index" :auto="true" :loop="true")
        .inform
          .label(class="fl")
            img(src="../../assets/imgs/icon-inform.png")
            span(class="line")
          .news(class="fl")
            i(v-show="informList.length !== 0")
            marquee(style="height:1.5rem;")
              marquee-item(v-for="item in informList" :key="item.id") {{item.headingTitle}}
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
        .btn-loan(@click="jumpTo('goApply')")
          div
            img(src="../../assets/imgs/icon-title.png")
            p 授信金额(元) {{' ' + minAmount + '万~' + maxAmount + '万'}}
            p 授信期限(月) {{' ' + creditTerm}}
            a(href="javascript:void(null)" class="btn-apply") 去申请
        ul(class="btn-classify clearfix")
          li(class="btn-payment" @click="guid")
            span 信贷引导
          li(class="btn-invest" @click="unOpen")
            span 投资理财
          li(class="btn-activity" @click="unOpen")
            span 热门活动 
</template>

<script>
import { ViewBox, XHeader, Swiper, Marquee, MarqueeItem, Scroller } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Swiper,
    Marquee,
    MarqueeItem,
    Scroller
  },
  data () {
    return {
      imglist: [], // 轮播图列表
      informList: [], // 通知列表
      index: 0,
      minAmount: '',
      maxAmount: '',
      creditTerm: '',
      pulldownConfig: { // 下拉配置
        content: '下拉刷新',
        height: 60,
        autoRefresh: true,
        downContent: '下拉刷新',
        upContent: '释放刷新',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      pullupConfig: { // 上拉配置
        content: 'Pull Up To Refresh',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: true,
        downContent: '-我也是有底线的哦-',
        upContent: '-我也是有底线的哦-',
        loadingContent: '-我也是有底线的哦-',
        clsPrefix: ''
      }
    }
  },
  mounted () {
    // 获取设备信息和token
    this.getBaseInfo() // 获取设备信息
    this.getPicList() // 获取轮播图和通知通告
    // this.applyInfo() // 获取当前申请状态信息
    this.init() // 全局函数给原生调用
  },
  activated () {
  },
  methods: {
    onPulldownLoading () {
      // 下拉函数
      let self = this
      // self.getBaseInfo()
      self.getPicList()
      // self.applyInfo()
      self.$nextTick(() => {
        // 视图更新完成后停止刷新或加载动作
        // self.$refs.myScroller.donePulldown()
      })
    },
    toInform () {
      // 通知通告
      if (this.isLogin()) {
        if (this.isVerfied()) {
          this.$router.push('/inform')
        } else {
          this.$vux.toast.text('请实名认证后查看公告')
        }
      } else {
        this.$vux.toast.text('请登录后查看公告')
      }
    },
    jumpTo (page) {
      // 跳转页面
      if (this.isLoginAndVerfied()) {
        switch (page) {
          case 'inform': this.toInform()
            break
          case 'goApply': this.goApply()
            break
          case 'BankCardList': this.$router.push('/bankCardList')
            break
          case 'MyLoan': this.goLoan()
            break
          case 'MyRepayment': this.$router.push('/repaymentRecord')
            break
          case 'MyGuarantee': this.$router.push('/myGurantee')
            break
        }
      }
    },
    goLoan () {
      this.$router.push('/checkLoan')
      this.$store.state.tabItem = 1
    },
    guid () {
      this.$router.push('/guid')
    },
    unOpen () {
      // 显示
      this.$vux.toast.show({
        type: 'text',
        text: '暂未开通,敬请期待'
      })
    },
    getBaseInfo () {
      // 获取设备信息和用户基本信息
      let self = this
      let data = {
        action: 'get_request'
      }
      // 获取设备信息
      self.$store.dispatch('normalRequest', data).then(res => {
        // 存用户信息
        self.$store.commit('INIT_USER_INFO', res)
        self.applyInfo()
      })
    },
    getPicList () {
      // 获取轮播图
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/homePageInit.do'
      let data = {
        action: 'init_request',
        path: path
      }
      // 这里后台数据有问题 用json.parse无法正常解析
      self.$store.dispatch('initRequest', data).then(data => {
        // alert('')
        // alert('data----' + JSON.stringify(data))
        // alert('00000000----' + JSON.stringify(res))
        // 这里使用json.parse无法处理 ？？？
        let arr = []
        // let data = eval('(' + res + ')')
        if (data.response === 'success') {
          self.imglist = []
          self.minAmount = data.data.minAmount
          self.maxAmount = data.data.maxAmount
          self.creditTerm = data.data.creditTerm
          self.informList = data.data.noticeList
          arr = data.data.carouselList
          arr.forEach((element) => {
            self.imglist.push({img: self.$store.state.baseUrl + '/app/fileUpload/showImage?id=' + element})
          })
        } else {
          self.$vux.toast.text(data.data)
        }
      })
    },
    init () {
      let self = this
      // 退出进程，给我原生数据库信息
      window.toLogin = (res) => {
        self.getUserInfo()
        self.$router.replace('/login')
      }
      window.setUserInfo = (res) => {
        self.getUserInfo()
        self.$router.replace('/myData')
      }
    },
    goApply () {
      if (this.$store.state.canApply === 1) { // 1可以申请 2不可申请
        this.$router.push('/loan')
        // this.$store.state.tabItem = 1
      } else {
        // 不可申请
        switch (this.$store.state.applyState) {
          case 0: this.applyInfo() // 这里有问题
            break
          case 1: this.$router.push('/quotaEvaluation') // 额度评估
            break
          case 2: this.$router.push('/fail') // 审批未通过
            break
          case 3: this.$router.push('/sign') // 签约等待
            break
          case 4: this.$router.push('/sign') // 签约
            break
          case 5: this.$vux.toast.text('您有一笔授信申请正在处理中,无法再次申请') // 签约完成
            break
          case 6: this.$router.push('/fail') // 签约超时
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
      self.$store.dispatch('normalRequest', data).then(data => {
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
      })
    },
    isLoginAndVerfied () {
      if (this.isLogin()) {
        if (this.isVerfied()) {
          return true
        } else {
          // 跳转实名认证
          this.toVerfiedPage()
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 首页tab切换
html, body {
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
        top:0;
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
        padding-top:0.9rem;
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
          margin-bottom:0.9rem;
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
        line-height: 1.5rem;
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
      top: 7px;
      width:100%;
      height:1.1rem;
      vertical-align: middle;
    }
    .icon-email{
      // top:0.1rem;
      right:0.25rem;
      width:1.2rem;
      height:0.9rem;
    }
  }
}

</style>

