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
                span {{guaranteeInfo.applyName}} 
            li
              .option(class="clearfix")  
                label 身份证号
                span {{guaranteeInfo.applyIdCard}} 
            li
              .option(class="clearfix" style="border-bottom:none;")  
                label 手机号码
                span {{guaranteeInfo.applyPhone}} 
        .module
          .module-head 申请信息
          ul(class="module-content")
            li
              .option(class="clearfix")  
                label 申请时间
                span {{guaranteeInfo.applyTime}}  
            li
              .option(class="clearfix")  
                label 借款金额(元)
                span(style="color:#f32f2f;") {{guaranteeInfo.amount}} 
            li
              .option(class="clearfix")  
                label 借款期限(月)
                span {{guaranteeInfo.timeLimit}} 
            li
            .option(class="clearfix" style="border-bottom:none;")  
              label 借款用途
              span {{guaranteeInfo.useName}}
        .title(class="clearfix") 
          span(class="fl") 法律文书送达地址
        .option
          group
            popup-picker(title="所在地区" :data="areas" :columns="3" v-model="defaultAddress" placeholder="请选择地址")
        x-textarea(:max="30" style="font-size:0.75rem; color:#333" v-model="detailAddress" placeholder="请填写详细地址，不少于五个字" row=3)
        .confirm-area
          check-icon(:value.sync="isConfirm")
          span 我已经阅读并同意
          a(href="javascript:void(null)" @click="jumpWeb") 《个人授权协议书》
        .btn-area(class="clearfix")
          button(href="javascript:void(null)" class="btn-submit fl" :disabled="!isConfirm" :class="{active:!isConfirm}" @click="agreeAuth") 同意
          button(href="javascript:void(null)" class="btn-cancel fr" @click="cancleAuth") 拒绝
</template>

<script>
import { ViewBox, XHeader, CheckIcon, Group, PopupPicker, XTextarea } from 'vux'
import areas from '../../assets/json/areas'
export default {
  components: {
    ViewBox,
    XHeader,
    CheckIcon,
    Group,
    PopupPicker,
    XTextarea
  },
  data () {
    return {
      index: 0,
      isConfirm: false,
      guaranteeInfo: {
        timeLimit: '',
        amount: '',
        applyName: '',
        useName: '',
        applyTime: '',
        applyIdCard: '',
        applyPhone: ''
      },
      areas: areas.areas,
      defaultAddress: ['江苏省泰州市兴化市'],
      detailAddress: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    jumpWeb () {
      let url = this.$store.state.baseUrl + '/app/xsyd/credit.html?userToken=' + this.$store.state.userInfo.token
      this.jumpWebShowContent('个人授权协议书', url)
    },
    agreeAuth () {
      // 别人为我担保
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/determineAuth.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$route.query.applyNo.toString(),
          addStr: self.defaultAddress[0] + self.detailAddress
        }
      }
      if (self.detailAddress.trim().length >= 5) {
        self.$store.dispatch('normalRequest', data).then(res => {
          if (res.response === 'success') {
            this.$vux.toast.text('担保成功~')
            this.$router.replace('/myGurantee')
          } else {
            this.$vux.toast.text(res.data)
          }
        })
      } else {
        this.$vux.toast.text('请输入大于五个字的详细地址~')
      }
    },
    cancleAuth () {
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
      self.$store.dispatch('normalRequest', data).then(res => {
      })
    },
    initData () {
      // 别人为我担保
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/assurePageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$route.query.applyNo
        }
      }
      // 别人为我担保信息
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response) {
          self.guaranteeInfo.timeLimit = res.data.timeLimit
          self.guaranteeInfo.amount = res.data.amount
          self.guaranteeInfo.applyName = res.data.applyName
          self.guaranteeInfo.useName = res.data.useName
          self.guaranteeInfo.applyTime = res.data.applyTime
          self.guaranteeInfo.applyIdCard = res.data.applyIdCard
          self.guaranteeInfo.applyPhone = res.data.applyPhone
        } else {
          this.$vux.toast.text('担保信息获取失败，请退出重试~')
        }
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
      border-bottom:1px solid #ededed;
      border-top:1px solid #ededed;
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
  .active{
    background:#f5f5f5;
    color:#999;
    box-shadow: none;
  }
  .title{
    // margin-top:0.75rem;
    padding:0.5rem 0;
    border-bottom:1px solid #ededed;
    line-height: 1rem;
    // background:#fff;
    // color:#333;
    span{
      padding-left:0.75rem;
      font-size:0.65rem;
      color:#333;
    }
    i{
      position: relative;
      top:0.15rem;
      left:0.25rem;
      width:0.7rem;
      height: 0.7rem;
      background:url(../../assets/imgs/icon-more.png);
      background-size:100% 100%;
    }
  }
  .option{
     padding:0.75rem;
     border-bottom:1px solid #ededed;
     background:#fff;
  }
}
</style>

