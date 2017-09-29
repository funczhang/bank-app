<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的贷款" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        .template(v-show="!isLoanFinsh")
          //- 贷款未完成有进度
          group(style="margin-top:15px")
            cell(title="申请进度" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/sign")  
          .progerss
            img(src="../../assets/imgs/progress01.png")
            div
              span(class="first") 待申请
              span 待审批
              span 待签约
              span(class="last") 待完成
        .template(v-show="!isLoanFinsh")
          //- 贷款已完成无进度
          group(style="margin-top:15px")
            cell(title="我的授信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/giveCreditRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 授信额度（元）
                  p(class="value" style="color:#f32f2f") 10.0万
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") 4.234%
                li 
                  p(class="title") 授信期限(月)
                  p(class="value" style="color:#1f76e2;") 24
        group(style="margin-top:15px")
          cell(title="我的用信" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/useCreditRecord") 
        .module
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 用信额度（元）
                p(class="value" style="color:#f32f2f") 8.0万
              li(class="mid")
                p(class="title") 利率（月）
                p(class="value" style="color:#1f76e2;") 4.234%
              li 
                p(class="title") 截止日期
                p(class="value" style="color:#1f76e2;") 2018/12/31
        group(style="margin-top:15px")
          cell(title="我的还款" is-link=true style="padding:12px 15px;font-size:15px;color:#222;" link="/repaymentRecord") 
          .module
            .module-content
              ul(class="clearfix")
                li 
                  p(class="title") 已还额度（元）
                  p(class="value" style="color:#f32f2f") 10.0万
                li(class="mid")
                  p(class="title") 利率（月）
                  p(class="value" style="color:#1f76e2;") 4.234%
                li 
                  p(class="title") 还款日期
                  p(class="value" style="color:#1f76e2;") 每月20号
</template>

<script>
// 219 187
import { ViewBox, XHeader, Group, Cell } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    Cell
  },
  data () {
    return {
      index: 0,
      isLoanFinsh: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:0.1px;
  background:#f5f5f5;
  .progerss{
    padding:10px 15px;
    height:50px;
    background:#257eeb;
    img{
      width:100%;
    }
    span{
      float:left;
      width:30%;
      text-align: center;
      font-size:14px;
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
      padding:15px 0;
      width:94%;
      margin:0 auto;
    }
    li{
      float: left;
      width:33%;
    }
    .title{
      padding:10px 0;
      font-size:13px;
      color:#666;
      text-align: center;
    }
    .value{
      padding:5px 0 10px;
      font-size:18px;
      font-weight: bold;
      text-align: center;
    }
    .mid{
      border-left:1px solid #ededed;
      border-right:1px solid #ededed;
    }
  }
}
</style>

