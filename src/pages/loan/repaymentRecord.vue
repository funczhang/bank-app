<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的还款" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        template(v-for="x in 3")
          ul(class="record")
            li(class="clearfix") 
              label 借据号 
              span 2018987656788333
            li(class="clearfix")  
              label 借款人 
              span 张超
            li(class="clearfix")  
              label 月利率 
              span(style="color:#f32f2f;") 4.356%
            li(class="clearfix")  
              label 还款账号 
              span 123455666
            li(class="clearfix") 
              label 用款金额 
              span(style="color:#f32f2f;") 12,000,00元
            li(class="clearfix") 
              label 还款利息 
              span(style="color:#f32f2f;") 23,000,00元
            li(class="clearfix") 
              label 用款时间 
              span 2018-08-27 23:01:01
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group
  },
  data () {
    return {
      index: 0
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
  .record{
    padding:0.75rem 1.25rem;
    margin-top:0.75rem;
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
    background:#fff;
    li{
      label{
        float: left;
        width:30%;
        overflow: hidden;
        font-size:0.75rem;
        color:#666;
        line-height: 2;
      }
      span{
        float: left;
        width:70%;
        overflow: hidden;
        font-size:0.75rem;
        color:#000;
        line-height: 2;
      }
    }
  }
}
</style>

