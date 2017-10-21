<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的贷款" :left-options="{showBack:false,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content(v-show="!canApply")
        .template(v-show="step !== 5")
          //- 贷款未完成有进度
          group(style="margin-top:15px")
            cell(title="申请进度" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" :link="page")  
          rate(:state="step")
        .template(v-show="step === 5")
          //- 贷款已完成无进度
          group(style="margin-top:15px")
            cell(title="我的授信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/giveCreditRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 授信额度（元）
                  p(class="value" style="color:#f32f2f") {{creditList.length === 0 ? '--' : creditList[0].loanAmount}}
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") {{creditList.length === 0 ? '--' : creditList[0].contLl}}%
                li 
                  p(class="title") 授信期限(月)
                  p(class="value" style="color:#1f76e2;") {{creditList.length === 0 ? '--' : creditList[0].contterm}}
        group(style="margin-top:15px")
          cell(title="我的用信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/useCreditRecord") 
        .module
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 用信额度（元）
                p(class="value" style="color:#f32f2f") {{spendList.length === 0 ? '--' : spendList[0].payAmount}}
              li(class="mid")
                p(class="title") 利率（月）
                p(class="value" style="color:#1f76e2;") {{spendList.length === 0 ? '--' : spendList[0].payMonthRate}}%
              li 
                p(class="title") 截止日期
                p(class="value" style="color:#1f76e2;") {{spendList.length === 0 ? '--' : spendList[0].payTime}}
        group(style="margin-top:15px")
          cell(title="我的还款" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/repaymentRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 已还额度（元）
                  p(class="value" style="color:#f32f2f") {{repaymentList.length === 0 ? '--' : repaymentList[0].repAmount}}
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") {{repaymentList.length === 0 ? '--' : repaymentList[0].repMonthRate}}%
                li 
                  p(class="title") 还款日期
                  p(class="value" style="color:#1f76e2;") {{repaymentList.length === 0 ? '--' : repaymentList[0].repTime}}
      .content(v-show="canApply")
        img(class="empty" src="../../assets/imgs/icon-no-apply.png")
        .tip 您暂无申请记录哦~
        a(href="javascript:void(null)" class="btn-apply" @click="isLoginAndVerfied") 去申请
</template>

<script>
import { ViewBox, XHeader, Group, Cell } from 'vux'
import progress from '../common/progress.vue'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    Cell,
    'rate': progress
  },
  data () {
    return {
      index: 0,
      isLoanFinsh: false,
      hasApply: true,
      canApply: true,
      page: ''
    }
  },
  mounted () {
    // let token = this.$store.state.userInfo.token
    // let isAuth = this.$store.state.userInfo.isAuth
    // token !== '' && isAuth !== '' ? this.initPage() : null
    // this.apply()
    // this.initView()
  },
  computed: {
    step () {
      // return 3
      let status = this.$store.state.applyState
      if (status === '') {
        return ''
      } else {
        return parseInt(status)
      }
    },
    spendList () {
      return this.$store.state.spendList
    },
    repaymentList () {
      return this.$store.state.repaymentList
    },
    creditList () {
      return this.$store.state.creditList
    }
  },
  methods: {
    initPage () {
      this.apply()
      this.initView()
    },
    isLoginAndVerfied () {
      let token = this.$store.state.userInfo.token
      let isAuth = this.$store.state.userInfo.isAuth
      if (token !== '') {
        if (isAuth !== '') {
          this.apply()
        } else {
          this.$router.push('/verfied')
        }
      } else {
        this.$router.push('/login')
      }
    },
    apply () {
      // 去申请初始化
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
        if (data.response === 'success') {
          if (data.data.canApply === 1) { // 1可以申请 2不可申请
            this.$router.push('/loan')
            this.$store.state.tabItem = 1
          } else {
          }
        } else {
          this.$vux.toast.text('获取申请接口数据失败')
        }
      })
    },
    getProgress (type) {
      let self = this
      // alert(type)
      switch (type) {
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
        case '6': self.$store.state.applyState = 5; self.page = '/fail' // 签约超时
          break
        case '7': self.$store.state.applyState = 5; self.page = '/sign' // 签约中
          break
      }
    },
    initView () {
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/myLoanInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      // 初始化我的贷款
      // this.$vux.loading.show({
      //   text: 'Loading'
      // })
      self.$store.dispatch('initRequest', data).then(res => {
        // alert(res)
        // this.$vux.loading.hide()
        let data = JSON.parse(res)
        if (data.response === 'success') {
          if (data.data.type === '') {
            self.canApply = true
          } else {
            self.canApply = false
            self.$store.state.spendList = data.data.spendList
            self.$store.state.repaymentList = data.data.repaymentList
            self.$store.state.creditList = data.data.creditList
            self.$store.state.applyNo = data.data.applyNum
            self.getProgress(data.data.type)
          }
        } else {
          this.$vux.toast.text('我的贷款页面初始化失败~')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  position: relative;
  padding:0.1px;
  background:#f5f5f5;
  .progerss{
    padding:0.5rem 0.75rem;
    height:2.5rem;
    background:#257eeb;
    img{
      width:100%;
    }
    span{
      float:left;
      width:30%;
      text-align: center;
      font-size:0.7rem;
      color:#fff;
    }
    .first{
      width:20%;
      text-align: left;
    }
    .last{
      width:20%;
      text-align: right;
    }
  }
  .module{
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
  }
  .module-content{
    background:#fff;
    ul{
      padding:0.75rem 0;
      width:94%;
      margin:0 auto;
    }
    li{
      float: left;
      width:33%;
    }
    .title{
      padding:0.5rem 0;
      font-size:0.65rem;
      color:#666;
      text-align: center;
    }
    .value{
      padding:0.25rem 0 0.5rem;
      font-size:0.9rem;
      font-weight: bold;
      text-align: center;
    }
    .mid{
      border-left:1px solid #ededed;
      border-right:1px solid #ededed;
    }
  }
  .empty{
    display: block;
    margin:5rem auto 3rem;
    width:10rem;
    height:6rem;
  }
  .tip{
    padding:1rem;
    font-size:0.75rem;
    color:#999;
    line-height: 1.5;
    text-align: center;
  }
  .btn-apply{
    display: block;
    margin:0 auto;
    width:60%;
    height:1.8rem;
    border-radius: 0.9rem;
    font-size:0.75rem;
    background:#1f76e2;
    color:#fff;
    text-align: center;
    line-height: 1.8rem;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
  }
}
</style>

