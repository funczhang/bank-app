<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="实名认证信息" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        ul
          li(class="clearfix")
            label 真实姓名
            span {{name}}
          li(class="clearfix" style="border-bottom:1px solid #ededed;")
            label 身份证号
            span(class="ell") {{idCard}}
        //- .template(v-show="!hasVerfied")
        //-   .positive
        //-     .img(@click="getPhoto")
        //-     .tip 上传身份证正面照（人像面）
        //-   .negative
        //-     .img
        //-     .tip 上传身份证背面照（国徽面）
        //-   .scanning
        //-     .img
        //-     .tip(style="color:#1f76e2") 点击启动人脸识别
</template>

<script>
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
  computed: {
    name () {
      return this.$store.state.userInfo.name
    },
    idCard () {
      return this.$store.state.userInfo.idCard
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
    margin-top:0.75rem;
    background:#fff;
  }
  li{
    padding:0.75rem;
    border-top:1px solid #ededed;
    label{
      float:left;
      width:30%;
      text-align: left;
      line-height: 1rem;
      color:#333;
      overflow: hidden;
      font-size: 0.75rem;
    }
    span{
      float: right;
      width:70%;
      text-align: right;
      line-height: 1rem;
      color:#666;
      overflow: hidden;
      font-size: 0.75rem;
    }
  }
  .positive,.negative,.scanning{
    margin:0.75rem auto;
    width:15.25rem;
    height: 8.75rem;
    border:1px solid #ededed;
    background:#fff;
    .img{
      margin:1.5rem auto 0.5rem;
      width:7.75rem;
      height: 4rem;
    }
    .tip{
      font-size:0.7rem;
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

