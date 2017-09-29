<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="我的授信" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        img(class="icon-refresh" src="../../assets/imgs/icon-refresh.png" slot="right") 
      .content
        template(v-for="x in 3")
          ul(class="record")
            li(class="clearfix") 
              label 申请人 
              span 张超
            li(class="clearfix")  
              label 授信额度 
              span 10.0万元
            li(class="clearfix")  
              label 授信时间 
              span(style="color:#f32f2f;") 2018-1=08-27 23：01：01
            li(class="clearfix")  
              label 审批利率(月) 
              span 4.356%
            li(class="clearfix") 
              label 合同号 
              span(style="color:#f32f2f;") 233232343432323
            li(class="clearfix") 
              label 合同期限 
              span(style="color:#f32f2f;") 24
            li(class="clearfix") 
              label 申请状态 
              span 待客户经理调查
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
.icon-refresh{
    width:20px;
    height:20px;
  }
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

