<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的贷款" :left-options="{showBack:false,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content(v-show="hasApply")
        .template(v-show="!isLoanFinsh")
          //- 贷款未完成有进度
          group(style="margin-top:15px")
            cell(title="申请进度" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/sign")  
          rate(:state="step")
          //- .progerss
          //-   img(src="../../assets/imgs/progress01.png")
          //-   div
          //-     span(class="first") 待申请
          //-     span 待审批
          //-     span 待签约
          //-     span(class="last") 待完成
        .template(v-show="!isLoanFinsh")
          //- 贷款已完成无进度
          group(style="margin-top:15px")
            cell(title="我的授信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/giveCreditRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 授信额度（元）
                  p(class="value" style="color:#f32f2f") {{creditList[0].loanAmount}}
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") {{creditList[0].contLl}}%
                li 
                  p(class="title") 授信期限(月)
                  p(class="value" style="color:#1f76e2;") {{creditList[0].contterm}}
        group(style="margin-top:15px")
          cell(title="我的用信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/useCreditRecord") 
        .module
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 用信额度（元）
                p(class="value" style="color:#f32f2f") {{spendList[0].payAmount}}
              li(class="mid")
                p(class="title") 利率（月）
                p(class="value" style="color:#1f76e2;") {{spendList[0].payMonthRate}}%
              li 
                p(class="title") 截止日期
                p(class="value" style="color:#1f76e2;") {{spendList[0].payTime}}
        group(style="margin-top:15px")
          cell(title="我的还款" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/repaymentRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 已还额度（元）
                  p(class="value" style="color:#f32f2f") {{repaymentList[0].repAmount}}
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") {{repaymentList[0].repMonthRate}}%
                li 
                  p(class="title") 还款日期
                  p(class="value" style="color:#1f76e2;") {{repaymentList[0].repTime}}
      .content(v-show="!hasApply")
        img(class="empty" src="../../assets/imgs/icon-no-apply.png")
        .tip 您暂无申请记录哦~
        a(href="javascript:void(null)" class="btn-apply" @click="goApply") 去申请

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
      applystate: 1,
      status: '',
      spendList: [{payAmount: '--', repMonthRate: '--', payTime: '--'}],
      repaymentList: [{repAmount: '--', payMonthRate: '--', repTime: '--'}],
      creditList: [{loanAmount: '--', contLl: '--', contterm: '--'}]
    }
  },
  mounted () {
    this.initView()
  },
  filters: {
  },
  computed: {
    step () {
      let status = this.$store.state.applyState
      if (status === '') {
        return ''
      } else {
        return parseInt(status)
      }
    }
    // spendList () {
    //   if (this.$store.state.spendList.length !== 0) {
    //     return this.$store.state.spendList
    //   }
    // },
    // repaymentList () {
    //   if (this.$store.state.spendList.length !== 0) {
    //     return this.$store.state.repaymentList
    //   }
    // },
    // creditList () {
    //   if (this.$store.state.spendList.length !== 0) {
    //     return this.$store.state.creditList
    //   }
    // }
  },
  methods: {
    initView () {
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/myLoanInit.do'
      let data = {
        path: path,
        params: {
          // token: this.$store.state.userInfo.token
          token: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4'
        }
      }
      // 初始化我的贷款
      self.$store.dispatch('initRequest', data).then(res => {
        let data = JSON.parse(res)
        alert('111')
        alert(res)
        if (data.response === 'success') {
          // 没有贷款进度的情况
          if (data.data.status !== '') {
            self.hasApply = true
            self.status = self.$store.state.applyState = data.data.status
            // alert(self.status)
          } else {
            self.hasApply = false
          }
          if (data.data.spendList.length !== 0) {
            self.spendList = self.$store.state.spendList = data.data.spendList
          }
          if (data.data.repaymentList.length !== 0) {
            self.repaymentList = self.$store.state.repaymentList = data.data.repaymentList
          }
          if (data.data.creditList.length !== 0) {
            self.creditList = self.$store.state.creditList = data.data.creditList
          }
        } else {
          this.$vux.toast.text('我的贷款页面初始化失败~')
        }
      })
    },
    goApply () {
      this.$router.push('/loan')
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

