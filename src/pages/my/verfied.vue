<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="实名认证" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        ul(v-show="false")
          li(class="clearfix")
            label 真实姓名
            span 张超
          li(class="clearfix" style="border-bottom:1px solid #ededed;")
            label 身份证号
            span(class="ell") 23348494848484494848484
        .template
          .positive
            .img
            .tip 上传身份证正面照（人像面）
          .negative
            .img
            .tip 上传身份证背面照（国徽面）
          .scanning
            .img
            .tip(style="color:#1f76e2") 点击启动人脸识别
</template>

<script>
// 310 160
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
  ul{
    margin-top:15px;
    background:#fff;
  }
  li{
    padding:15px;
    border-top:1px solid #ededed;
    label{
      float:left;
      width:30%;
      text-align: left;
      line-height: 20px;
      color:#333;
      overflow: hidden;
    }
    span{
      float: right;
      width:70%;
      text-align: right;
      line-height: 20px;
      color:#333;
      overflow: hidden;
    }
  }
  .positive,.negative,.scanning{
    margin:15px auto;
    width:305px;
    height: 175px;
    border:1px solid #ededed;
    background:#fff;
    .img{
      margin:30px auto 10px;
      width:155px;
      height: 80px;
    }
    .tip{
      font-size:14px;
      color:#44464f;
      text-align: center;
    }
  }
  .positive{
    .img{
      background:url(../../assets/imgs/bg-positive.png);
      background-size: 100% 100%;
    }
  }
  .negative{
    .img{
      background:url(../../assets/imgs/bg-negtive.png);
      background-size: 100% 100%;
    }
  }
  .scanning{
    .img{
      background:url(../../assets/imgs/bg-scanner.png);
      background-size: 100% 100%;
    }
  }
}
</style>

