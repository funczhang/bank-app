<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="处理担保" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        .module
          .module-head 申请人信息
          ul(class="module-content")
            li
              .option(class="clearfix")  
                label 申请人
                span 张超 
            li
              .option(class="clearfix")  
                label 身份证号
                span 123456789977666
            li
              .option(class="clearfix")  
                label 手机号码
                span 123456789977666
        .module
          .module-head 申请信息
          ul(class="module-content")
            li
              .option(class="clearfix")  
                label 申请时间
                span 2017-08-08 10:00:00 
            li
              .option(class="clearfix")  
                label 借款金额(元)
                span(style="color:#f32f2f;") 12.2万
            li
              .option(class="clearfix")  
                label 借款期限(月)
                span 24
            li
            .option(class="clearfix")  
              label 借款用途(月)
              span 房产装修
        .confirm-area
          check-icon(:value.sync="isConfirm")
          span 我已经阅读并同意
          a(href="javascript:void(null)") 《综合查询授权书》
        .btn-area(class="clearfix")
          a(href="javascript:void(null)" class="btn-submit fl") 同意
          a(href="javascript:void(null)" class="btn-cancel fr") 拒绝
</template>

<script>
// 219 187
import { ViewBox, XHeader, Masker, CheckIcon } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    CheckIcon
  },
  data () {
    return {
      index: 0,
      isConfirm: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      // 别人为我担保
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/assurePageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$store.state.applyNo
        }
      }
      // 显示
      // this.$vux.loading.show({
      //   text: 'Loading'
      // })
      // 别人为我担保信息
      self.$store.dispatch('normalRequest', data).then(res => {
        alert(JSON.stringify(res))
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:0.1px;
  background:#f5f5f5;
    .module-head{
      padding:0.25rem 0.75rem;
      height:1.25rem;
      font-size:0.65rem;
      line-height: 1.25rem;
      color:#333;
    }
    .module-content{
      label {
        float:left;
        color:#666;
      }
      span {
        float:right;
        color:#666;
      }
      .option{
        margin:0 0.75rem;
        padding:0.75rem 0;
        font-size:0.7rem;
        color:#333;
        line-height: 1rem;
        border-bottom:1px solid #ededed;
      }
      background:#fff;
    }
    .confirm-area{
      margin-top:0.75rem;
    padding:0.5rem 0.75rem;
    background:#fff;
    font-size:0.7rem;
    line-height: 1.5;
    color:#666;
    a{
      color:#1f76e2;
    }
  }
  .btn-area{
    padding:1rem 0;
    background:#fff;
  }
  .btn-submit,.btn-cancel{
    width:40%;
    height:1.8rem;
    border-radius: 0.9rem;
    font-size:0.75rem;
    text-align: center;
    line-height: 1.8rem;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
  }
  .btn-submit{
    margin-left:5%;
    background:#1f76e2;
    color:#fff;
    // border:1px solid #fff;
  }
  .btn-cancel{
    margin-right:5%;
    background:#fff;
    color:#1f76e2;
    border:1px solid #1f76e2;
  }
}
</style>

