<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="签约完成" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content  
        .progerss
          img(src="../../assets/imgs/progress04.png")
          div
            span(class="first") 已申请
            span 已审批
            span 已签约
            span(class="last") 已完成
        .tip
          img(src="../../assets/imgs/icon-success.png")
          p 您的授信申请易完成，请使用
            a(href="javascript:void(null)") 手机银行
            span 进行用信
        .module
          .module-head 审批结果
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 授信额度(元)
                p(class="value" style="color:#f32f2f") {{lineCredit === '' ? '--' : lineCredit}}
              li(class="mid")
                p(class="title") 授信利率(月)
                p(class="value" style="color:#1f76e2;") {{loanInterestRate === '' ? '--' : loanInterestRate}}‰
              li 
                p(class="title") 授信期限(月)
                p(class="value" style="color:#1f76e2;") {{timeLimit === '' ? '--' : timeLimit}}
        .module
          .module-head 银行卡信息
          .module-content
            .line(class="clearfix") 
              img(class="icon-card fl" src="../../assets/imgs/icon-card.png")
              span(class="fl" style="font-size:14px;color:#333;line-height:37px;") 卡号
              span(class="fr" style="font-size:14px;color:#333;line-height:37px;") {{creditCardNo === '' ? '--' : creditCardNo}}
        .check-contract
          a(href="javascript:void(null)") 查看合同
</template>

<script>
// 219 187
import { ViewBox, XHeader } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader
  },
  data () {
    return {
      index: 0,
      lineCredit: '',
      loanInterestRate: '',
      timeLimit: '',
      creditCardNo: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
        // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/signComplete.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token,
          applyId: self.$store.state.applyNo
        }
      }
      // 初始化我的贷款
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          self.lineCredit = data.data.lineCredit
          self.loanInterestRate = data.data.loanInterestRate
          self.timeLimit = data.data.timeLimit
          self.creditCardNo = data.data.creditCardNo
        } else {
          self.$vux.toast.text(data.data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:0.1px;
  .progerss{
    margin-top:0.75rem;
    padding:0.5rem 0.75rem;
    height:2.5rem;
    background:#257eeb;
    img{
      padding-bottom:0.25rem;
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
  .tip{
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
    .msg{
      padding-bottom:0;
    }
    .btn-area{
      margin:0 auto;
      width:90%;
      // padding:15px 15px;
    }
  }
  .module-head{
      padding:0.25rem 0.75rem;
      height:1.25rem;
      font-size:0.65rem;
      line-height: 1.25rem;
      color:#333;
    }
  .module-content{
    background:#fff;
    ul{
      padding:0.75rem 0;
      width:94%;
      margin:0 auto;
      // border-bottom:1px solid #f0f0f0;
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
    .icon-card{
      padding:0.5rem 0.75rem;
      width:1.15rem;
      height: 0.85rem;
      vertical-align: middle;
    }
    .line{
      margin:0 auto;
      width:94%;
      border-bottom:1px solid #ededed;
    }
  }
  .check-contract{
    margin-top:0.75rem;
    padding:0.8rem 0.75rem;
    background:#fff;
    a{
      font-size:0.75rem;
      color:#1f76e2;
    }
  }
}
.weui-tab .weui-cell{
  padding:0.75rem 0;
  border-bottom:1px solid #ededed;
}
.weui-tab .weui-label{
  width:30% !important;
}
</style>

