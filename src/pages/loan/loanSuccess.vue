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
        .module
          .module-head 审批结果
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 授信额度(元)
                p(class="value" style="color:#f32f2f") 10.0万
              li(class="mid")
                p(class="title") 审批利率(月)
                p(class="value" style="color:#1f76e2;") 4.234%
              li 
                p(class="title") 授信期限(月)
                p(class="value" style="color:#1f76e2;") 24
        .module
          .module-head 银行卡信息
          .module-content
            .line(class="clearfix") 
              img(class="icon-card fl" src="../../assets/imgs/icon-card.png")
              span(class="fl" style="font-size:14px;color:#333;line-height:37px;") 卡号
              span(class="fr" style="font-size:14px;color:#333;line-height:37px;") 11111111111111111
        .check-contract
          a(href="javascript:void(null)") 查看合同
</template>

<script>
// 219 187
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

