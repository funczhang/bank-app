<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="签约" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content  
        .progerss
          img(src="../../assets/imgs/progress04.png")
          div
            span(class="first") 待申请
            span 待审批
            span 待签约
            span(class="last") 待完成
        .tip
          img(src="../../assets/imgs/icon-success.png")
          p 您的授信申请易完成，请使用
            a(href="javascript:void(null)") 手机银行
            span 进行用信
</template>

<script>
import { ViewBox, XHeader, PopupPicker, Group, Masker, XInput } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    PopupPicker,
    Group,
    Masker,
    XInput
  },
  data () {
    return {
      index: 0,
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']]
    }
  },
  mounted () {
  },
  methods: {
    isShow () {
      alert('隐藏弹窗')
    },
    confirm () {
      alert('确定')
    },
    cancel () {
      alert('取消')
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
}
.weui-tab .weui-cell{
  padding:0.75rem 0;
  border-bottom:1px solid #ededed;
}
.weui-tab .weui-label{
  width:30% !important;
}
</style>

