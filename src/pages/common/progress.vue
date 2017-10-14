<template lang="pug">
.template
  .progerss(v-if="state === 1")  
    //-  1-待准入
    img(src="../../assets/imgs/progress01.png")
    div
      span(class="first") 已申请
      span 待审批 
      span 待签约
      span(class="last") 待完成
  .progerss(v-if="state === 2") 
    //- 2-准入拒绝
    img(src="../../assets/imgs/progress02.png")
    div
      span(class="first") 已申请
      span 审批未通过
      span 未签约
      span(class="last") 已失败
  .progerss(v-if="state === 3")  
    //- 3-待签约
    img(src="../../assets/imgs/progress03.png")
    div
      span(class="first") 已申请
      span 已审批
      span 待签约
      span(class="last") 待完成
  .progerss(v-if="state === 4")  
    //- 4-已签约（显示历史申请页面）
    img(src="../../assets/imgs/progress04.png")
    div
      span(class="first") 已申请
      span 已审批
      span 已签约
      span(class="last") 已完成
  .progerss(v-if="state === 5") 
    //- 5-签约超时
    img(src="../../assets/imgs/progress03.png")
    div
      span(class="first") 已申请
      span 已审批
      span 未签约
      span(class="last") 已失败
  .progerss(v-if="state === 6") 
    //- 6-添加担保人，担保人待处理
    img(src="../../assets/imgs/progress03.png")
    div
      span(class="first") 已申请
      span 已审批
      span 担保人处理中
      span(class="last") 待完成
  .progerss(v-if="state === 7") 
    //- 7-担保人签约，申请人待签约
    img(src="../../assets/imgs/progress03.png")
    div
      span(class="first") 已申请
      span 已审批
      span 已担保待签约
      span(class="last") 待完成
</template>
<script>
  export default {
    props: ['state']
  }
</script>
<style lang="less">
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
</style>
