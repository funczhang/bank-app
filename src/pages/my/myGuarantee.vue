<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="我的担保" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
        img(class="icon-refresh" src="../../assets/imgs/icon-refresh.png" slot="right")
      .content
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 我为他人担保
          tab-item(@on-item-click="handler(1)") 他人为我担保
        .for-other(v-show="isForOther")
          .applyer
            p(class="clearfix")
              label 申请人
              span 张超
            p(class="clearfix")
              label 申请时间
              span 2019-09-12 19:00:21
          .amount
            p(class="title") 申请金额(元)
            p(class="account") 10,000.00
        .for-me(v-show="!isForOther")
          .amount
            p(class="title") 申请金额(元)
            p(class="account") 10,000.00
          .applyer
            p(class="clearfix")
              label 申请人
              span 张超
            p(class="clearfix")
              label 申请时间
              span 2019-09-12 19:00:21
          .guaranteer(style="border-bottom:none;")
            p(class="clearfix")
              label 担保人姓名
              span 张超
            p(class="clearfix")
              label 担保人手机
              span 13245654323
            p(class="clearfix")
              label 担保人身份证号
              span 345665433252627288   
</template>

<script>
// 219 187
import { ViewBox, XHeader, Masker, Tab, TabItem } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Tab,
    TabItem
  },
  data () {
    return {
      index: 0,
      isForOther: true
    }
  },
  mounted () {
  },
  methods: {
    handler (flag) {
      if (flag === 0) {
        this.isForOther = true
      } else {
        this.isForOther = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
  .vux-header{
  border-bottom:1px solid #ededed;
}
  .icon-refresh{
    width:1rem;
    height:1rem;
  }
  .content{
    padding:0.1px;
    background:#f5f5f5;
    .for-me,.for-other{
      margin-top:0.75rem;
      padding:0 0.75rem;
      background:#fff;
      border-top:1px solid #ededed;
      border-bottom:1px solid #ededed;
    }
    .amount{
      padding:0.75rem 0;
      border-bottom:1px solid #ededed;
      .title{
        font-size:0.75rem;
        color:#333;
        text-align: center;
        line-height: 1.5;
      }
      .account{
        font-size:1rem;
        color:#f32f2f;
        font-weight: bold;
        text-align: center;
        line-height: 1.5;
      }
    }
    .applyer,.guaranteer{
      padding:0.75rem 0;
      border-bottom:1px solid #ededed;
      label{
        float:left;
        width:35%;
        font-size:0.75rem;
        color:#666;
        text-align: left;
        line-height: 1.5;
        verflow: hidden;
      }
      span{
        float:right;
        width:65%;
        font-size:0.75rem;
        color:#333;
        text-align: right;
        line-height: 1.5;
        overflow: hidden;
      }
    }
    .guaranteer{

    }
}
}
</style>

