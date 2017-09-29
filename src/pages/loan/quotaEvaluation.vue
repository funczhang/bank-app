<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="额度评估" :left-options="{showBack:true}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content  
        .progerss
          img(src="../../assets/imgs/progress01.png")
          div
            span(class="first") 待申请
            span 待审批
            span 待签约
            span(class="last") 待完成
        .tip
          img(src="../../assets/imgs/icon-eavluating.png")
          p 您的申请已经处理，授信额度正在评估中，结果将以短信的方式通知您！
</template>

<script>
// 219 187
import { ViewBox, XHeader, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker
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
  padding:0.1px;
  background:#f5f5f5;
  .progerss{
    position: absolute;
    margin-top:15px;
    padding:10px 15px;
    height:50px;
    background:#257eeb;
    img{
      padding-bottom:5px;
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
  .tip{
    position: absolute;
    top:130px;
    bottom:0;
    background:#fff;
    img{
      display: block;
      margin:0 auto;
      padding:20px;
      width:108px;
      height:90px;
    }
    p{
      padding:0 30px 20px;
      font-size:13px;
      color:#333;
      line-height: 1.5;
      text-align: center;

    }
  }
}
</style>

