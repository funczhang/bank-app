<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="签约" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content  
        .progerss
          img(src="../../assets/imgs/icon-progress.png")
          div
            span(class="first") 待申请
            span 待审批
            span 待签约
            span(class="last") 待完成
        .tip
          img(src="../../assets/imgs/icon-sign.png")
          p 您的申请已通过审批，请在2017年8月31号之前完成签约否则视为自动放弃签约！
        .tip(v-show="false")
          img(src="../../assets/imgs/icon-chuli.png")
          p(class="msg") 担保人正在处理，请稍后！
          .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit fl" @click="confirm") 撤销担保人
              a(href="javascript:void(null)" class="btn-cancel fr" @click="cancel") 更换担保人
        .module
          .module-head 审批结果
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 授信额度（元）
                p(class="value" style="color:#f32f2f") 10.0万
              li(class="mid")
                p(class="title") 审批利率（月）
                p(class="value" style="color:#1f76e2;") 4.234%
              li 
                p(class="title") 授信期限（月）
                p(class="value" style="color:#1f76e2;") 24
            .tip 注意：如果您觉得当前授信额度较低，可通过一下“添加担保人”或“芝麻信用分”获取更高额度；否则，可直接签约
        .module
          .module-head 获取更高额度
          .module-content
            ul(class="add clearfix" style="padding:20px 0 15px;")
              li(style="border-right:1px solid #ededed;") 
                img(src="../../assets/imgs/icon-addfriend.png")
                p(class="btn-guarantee") 添加担保人
              li 
                img(src="../../assets/imgs/icon-zhima.png")
                p(class="btn-zhima") 芝麻信用分
        .module
          .module-head 关联贷款抵用券
          .module-content 
            group
              popup-picker(title="抵用券" :data="list1" style="padding:12px 15px;background:#fff;")
                div(class="coupon-count" slot="title") 
                  span 抵用券
                  span(class="count") 还剩3张
        .module
          .module-head 银行卡信息
          .module-content
            .line(@click="bindCard") 
              img(class="icon-card" src="../../assets/imgs/icon-card.png")
              span(style="font-size:14px;color:#333;") 绑定银行卡
        .btn-area(class="clearfix")
          a(href="javascript:void(null)" class="btn-submit fl") 签约
          a(href="javascript:void(null)" class="btn-cancel fr") 下次再说
      masker(color="#000" :opacity="0.4" fullscreen=true v-show="false")
        .box(slot="content")
          .head 更换担保人
            img(src="../../assets/imgs/arrow-right.png" @click="isShow")
          .content
            group
              x-input(title="手机号码" placeholder="请输入")
              x-input(title="姓&#12288;&#12288;名" placeholder="请输入")
            .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit fl" @click="confirm") 确定
              a(href="javascript:void(null)" class="btn-cancel fr" @click="cancel") 取消
      masker(color="#000" :opacity="0.4" fullscreen=true v-show="status")
        .box(slot="content")
          .head 绑定银行卡
            img(src="../../assets/imgs/arrow-right.png" @click="isShow")
          .content
            p(class="card clearfix")
              span(style="float:left;width:90%;color:#999;") 1234567890876655
              check-icon(style="float:right;width:10%;" :value.sync="isSelectCard")
            p(class="card clearfix")
              span(style="float:left;width:90%;color:#999;") 1234567890876655
              check-icon(style="float:right;width:10%;" :value.sync="isSelectCard")
            .line(@click="bindCard") 
              img(class="icon-card" src="../../assets/imgs/icon-card.png")
              span(style="font-size:14px;color:#333;") 绑定银行卡
            .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit btn-card-certain" @click="confirm") 确定
</template>

<script>
// 219 187
import { ViewBox, XHeader, PopupPicker, Group, Masker, XInput, CheckIcon } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    PopupPicker,
    Group,
    Masker,
    XInput,
    CheckIcon
  },
  data () {
    return {
      index: 0,
      status: false,
      isSelectCard: false,
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']]
    }
  },
  mounted () {
  },
  methods: {
    isShow () {
      this.status = false
    },
    confirm () {
      alert('确定')
    },
    cancel () {
      alert('取消')
    },
    bindCard () {
      this.status = true
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:0.1px;
  .progerss{
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
      padding:5px 15px;
      height:25px;
      font-size:13px;
      line-height: 25px;
      color:#333;
    }
  .module-content{
    background:#fff;
    .tip{
      padding:15px 0;
      margin:0 auto;
      width:94%;
      font-size:12px;
      color:#f32f2f;
      line-height: 1.5;
    }
    ul{
      padding:15px 0;
      width:94%;
      margin:0 auto;
      border-bottom:1px solid #ededed;
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
    .btn-guarantee,.btn-zhima{
      padding-top:10px;
      color:#333;
      font-size:13px;
      text-align: center;
    }
    .add img{
      display: block;
      margin:0 auto;
      width:25px;
      height:25px;
    }
    .add li{
      float: left;
      width:49%;
    }
    .coupon-count{
      span{
        float:left;
        line-height: 24px;
        color:#333;
      }
      .count{
        margin-left:10px;
        width:85px;
        height:24px;
        border:1px solid #1f76e2;
        border-radius: 12px;
        line-height: 24px;
        font-size:14px;
        text-align: center;
        color:#1f76e2;
      }
    }
    .icon-card{
      padding:10px 15px;
      width:23px;
      height: 17px;
      vertical-align: middle;
    }
    .line{
      margin:0 auto;
      width:94%;
      border-bottom:1px solid #ededed;
    }
  }
  .btn-area{
    padding:20px 0;
    background:#fff;
  }
  .btn-submit,.btn-cancel{
    width:40%;
    height:36px;
    border-radius: 18px;
    font-size:15px;
    text-align: center;
    line-height: 36px;
    box-shadow: 0px 0px 20px rgba(39,128,237,.5);
  }
  .btn-submit{
    margin-left:5%;
    background:#1f76e2;
    color:#fff;
  }
  .btn-cancel{
    margin-right:5%;
    background:#fff;
    color:#1f76e2;
    border:1px solid #1f76e2;
  }
}
// 遮罩
.box{
    position: relative;
    top:50%;
    margin:0 auto;
    margin-top:-117px;
    width:80%;
    background:#fff;
    border-radius: 3px;
    .head{
      padding: 10px 15px;
      height:22px;
      background:#1f76e2;
      box-shadow: 0px 0px 20px rgba(39,128,237,.5);
      font-size:17px;
      line-height: 22px;
      text-align: center;
      color:#fff;
      border-radius: 3px 3px 0 0;
      img{
        position: absolute;
        top:12px;
        right:15px;
        width:14px;
        height:14px;
      }
    }
    .icon-card{
      padding:10px 5px;
      width:23px;
      height: 17px;
      vertical-align: middle;
    }
    .line{
      margin:0 auto;
      width:100%;
      border-bottom:1px solid #ededed;
      background:url(../../assets/imgs/icon-arrow.png) no-repeat right;
      background-size:8px 13px;
    }
    .weui-cell:before{
      border-top:none;
    }
    .content{
      padding:10px 15px 20px;
      .card{
        padding:10px 5px;
        border-bottom:1px solid #ededed;
      }
    }
  .btn-area{
    padding:20px 0 0;
    background:#fff;
    a{
      display: block;
    }
  }
  .btn-submit,.btn-cancel{
    width:40%;
    height:36px;
    border-radius: 18px;
    font-size:15px;
    text-align: center;
    line-height: 36px;
    box-shadow: 0px 0px 20px rgba(39,128,237,.5);
  }
  .btn-submit{
    margin-left:5%;
    background:#1f76e2;
    color:#fff;
    // border:1px solid #fff;
  }
  .btn-card-certain{
    margin:0 auto;
    width:50%;
  }
  .btn-cancel{
    margin-right:5%;
    background:#fff;
    color:#1f76e2;
    border:1px solid #1f76e2;
  }
}
.weui-tab .weui-cell{
  padding:15px 0;
  border-bottom:1px solid #ededed;
}
.weui-tab .weui-label{
  width:30% !important;
}
</style>

