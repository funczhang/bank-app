<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="授信申请" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        .progerss
          img(src="../../assets/imgs/progress01.png")
          div
            span(class="first") 待申请
            span 待审批
            span 待签约
            span(class="last") 待完成
        .module
          .module-head 借款人信息
          ul(class="module-content")
            li
              .option(class="clearfix")  
                label 申请人
                span {{name}}
            li
              .option(class="clearfix" style="border-bottom:none;")  
                label 身份证号
                span {{idCard}}
        .module
          .module-head 借款信息
          ul(class="module-content")
            li
              .option(class="clearfix")  
                label 申请期限
                span {{applyTerm}}个月
            li
              .option(class="clearfix" style="border-bottom:none;")      
                group
                  popup-picker(title="申请用途" placeholder="请选择用途" :data="loanUseList" v-model="usedFor")
        //- .get-more
        //-   .module-head 获取更高额度
        //-   .module-content
        //-     ul(class="add clearfix" style="padding:20px 0 15px;")
        //-       //- li(style="border-right:1px solid #ededed;") 
        //-       //-   img(src="../../assets/imgs/icon-addfriend.png")
        //-       //-   p(class="btn-guarantee") 添加担保人
        //-       li 
        //-         img(src="../../assets/imgs/icon-zhima.png")
        //-         p(class="btn-zhima") 芝麻信用分
        .title(class="clearfix") 
          span(class="fl" style="color:#333;") 法律文书送达地址
        .option
          group
            popup-picker(title="选择地址" :data="areas" :columns="3" placeholder="请选择地址" v-model="defaultAddr")
        x-textarea(:max="30" style="font-size:0.75rem; color:#333;border-bottom:1px solid #ededed;" v-model="detailAddress" placeholder="请填写详细地址，不少于五个字" row=3)
        .confirm-area
          check-icon(:value.sync="isConfirm")
          span 我已经阅读并同意
          a(href="javascript:void(null)" @click="jumpWeb(1)") 《个人授权协议书》
          a(href="javascript:void(null)" @click="jumpWeb(2)") 《法律文书送达地址确认书》
        .btn-area(class="clearfix")
          button(class="btn-submit fl" @click="jumpAgree" :disabled="!isConfirm" :class="{active:!isConfirm}") 提交申请
          a(href="javascript:void(null)" class="btn-cancel fr" @click="cancel") 下次再说
</template>

<script>
import { ViewBox, XHeader, Group, PopupPicker, CheckIcon, XTextarea } from 'vux'
import areas from '../../assets/json/areas'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    PopupPicker,
    CheckIcon,
    XTextarea
  },
  data () {
    return {
      index: 0,
      areas: areas.areas,
      usedFor: [''],
      defaultAddr: ['江苏省泰州市兴化市'],
      detailAddress: '',
      isConfirm: false,
      name: '',
      listad: [],
      loanUseList: [],
      applyTerm: '',
      idCard: ''
    }
  },
  mounted () {
    this.initView()
  },
  methods: {
    jumpWeb (type) {
      if (type === 1) {
        let url = this.$store.state.baseUrl + '/app/xsyd/credit.html?userToken=' + this.$store.state.userInfo.token
        this.jumpWebShowContent('个人授权协议书', url)
      } else {
        let url = this.$store.state.baseUrl + '/app/xsyd/lawAddress.html?userToken=' + this.$store.state.userInfo.token
        this.jumpWebShowContent('法律文书送达地址确认书', url)
      }
    },
    initView () {
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/creditApplyInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      // 贷款申请初始化
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          if (data.data.idCard !== '') {
            self.idCard = data.data.idCard
            self.name = data.data.name
          }
          if (data.data.loanUseList.length !== 0) {
            // 遍历取申请用途列表的的name值
            for (var i = 0; i < data.data.loanUseList.length; i++) {
              self.listad[i] = data.data.loanUseList[i].name
            }
            // 构建双重数组结构
            self.loanUseList.push(self.listad)
          }
          if (data.data.applyTerm !== '') {
            self.applyTerm = data.data.applyTerm
          }
        } else {
          this.$vux.toast.text(data.data)
        }
      })
    },
    jumpAgree () {
      let self = this
      let token = self.$store.state.userInfo.token
      let path = self.$store.state.baseUrl + '/app/xsyd/loanUseforAgreement.html?userToken=' + token
      let data = {
        action: 'jump_web_sign',
        path: path,
        params: {
          token: this.$store.state.userInfo.token,
          usedFor: this.usedFor[0],
          lowAddress: this.defaultAddr[0] + this.detailAddress,
          zmxyFlag: '1',
          url: self.$store.state.baseUrl + '/app/xsyd/submitApply.do',
          name: '申请授权'
        }
      }
      if (data.params.usedFor !== '') {
        if (this.detailAddress.trim().length >= 5) {
          self.$store.dispatch('normalRequest', data).then(data => {
            if (data.response === 'success') {
              this.$vux.toast.text('授信信息提交成功~')
              this.$router.replace('/quotaEvaluation')
            } else {
              this.$vux.toast.text(data.data)
            }
          })
        } else {
          this.$vux.toast.text('请填写大于五个字详细地址~')
        }
      } else {
        this.$vux.toast.text('请选择借款用途~')
      }
    },
    cancel () {
      this.$vux.toast.text('取消授信~')
    }
  }
}
</script>
<style lang="less" scoped>
html, body {
  .content{
    // position: relative;
    .progerss{
      margin-top:0.75rem;
      padding:0.5rem 0.75rem;
      height:2.5rem;
      background:#1f76e2;
      img{
        padding-bottom:0.25rem;
        width:100%;
      }
      span{
        float:left;
        width:30%;
        text-align: center;
        font-size:0.7rem;
        color:rgba(255,255,255,.8);
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
    .module-head{
      padding:0.25rem 0.75rem;
      height:1.25rem;
      font-size:0.65rem;
      line-height: 1.25rem;
      color:#333;
    }
    .module-content{
      border-top:1px solid #ededed;
      border-bottom:1px solid #ededed;
      label {
        float:left;
        color:#666;
      }
      span {
        float:right;
        color:#666;
      }
      li {
        // padding:15px;
        // line-height: 20px;
        // border-bottom:1px solid #f5f5f5;
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
  }
  .title{
    // margin-top:0.75rem;
    padding:0.5rem 0;
    border-bottom:1px solid #ededed;
    line-height: 1rem;
    // background:#fff;
    span{
      padding-left:0.75rem;
      font-size:0.65rem;
      color:#666;
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
  .confirm-area{
    padding:0.5rem 0.75rem;
    background:#fff;
    font-size:0.75rem;
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
  .get-more{
    ul{
      padding:0.75rem 0;
      // width:94%;
      margin:0 auto;
      border-bottom:1px solid #ededed;
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
    .btn-guarantee,.btn-zhima{
      padding-top:0.5rem;
      color:#333;
      font-size:0.65rem;
      text-align: center;
    }
    .add img{
      display: block;
      margin:0 auto;
      width:1.25rem;
      height:1.25rem;
    }
    .add li{
      margin:0 auto;
    }
  }
  .active{
    background:#f5f5f5;
    color:#999;
    box-shadow: none;
  }
}
</style>

