<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="我的用信" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        template(v-for="x in 3")
          ul(class="record")
            li(class="clearfix") 
              label 合同号 
              span 2018987656788333
            li(class="clearfix")  
              label 借款人 
              span 张超
            li(class="clearfix")  
              label 借款号 
              span(style="color:#f32f2f;") 2018987656788333
            li(class="clearfix")  
              label 月利率 
              span 4.537%
            li(class="clearfix") 
              label 用款金额 
              span(style="color:#f32f2f;") 12,000,00元
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
    padding:15px 25px;
    margin-top:15px;
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
    background:#fff;
    li{
      label{
        float: left;
        width:30%;
        overflow: hidden;
        font-size:15px;
        color:#666;
        line-height: 2;
      }
      span{
        float: left;
        width:70%;
        overflow: hidden;
        font-size:15px;
        color:#000;
        line-height: 2;
      }
    }
  }
}
</style>

