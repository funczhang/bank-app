<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="授信申请" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        .progerss
          img(src="../../assets/imgs/progress00.png")
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
              .option(class="clearfix")      
                group
                  popup-picker(title="申请用途" :data="loanUseList" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange")
        .get-more
          .module-head 获取更高额度
          .module-content
            ul(class="add clearfix" style="padding:20px 0 15px;")
              //- li(style="border-right:1px solid #ededed;") 
              //-   img(src="../../assets/imgs/icon-addfriend.png")
              //-   p(class="btn-guarantee") 添加担保人
              li 
                img(src="../../assets/imgs/icon-zhima.png")
                p(class="btn-zhima") 芝麻信用分
        .title(class="clearfix") 
          span(class="fl") 法律文书送达地址
          i(class="fl" @click="showMsg")
        .option
          group
            popup-picker(title="选择地址" :data="list2" v-model="value2")
          //- group        
          //-   x-input(title="具体地址" placeholder="填写具体地址")
        .confirm-area
          check-icon(:value.sync="isConfirm")
          span 我已经阅读并同意
          a(href="javascript:void(null)") 《综合查询授权书》
          a(href="javascript:void(null)") 《法律文书送达地址确认书》
        .btn-area(class="clearfix")
          button(class="btn-submit fl" @click="submit" :disabled="!isConfirm" :class="{active:!isConfirm}") 提交申请
          a(href="javascript:void(null)" class="btn-cancel fr" @click="cancel") 下次再说
      masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
        div(slot="content" class="msg-box")
          span 111
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group, PopupPicker, XInput, CheckIcon, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group,
    PopupPicker,
    XInput,
    CheckIcon,
    Masker
  },
  data () {
    return {
      index: 0,
      list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      value1: ['请选择用途'],
      value2: ['请选择地址'],
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
    showMsg () {
      alert('展示更多')
    },
    initView () {
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/creditApplyInit.do'
      let data = {
        path: path,
        params: {
          // token: this.$store.state.userInfo.token
          token: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4'
        }
      }
      // 贷款申请初始化
      self.$store.dispatch('initRequest', data).then(res => {
        let data = JSON.parse(res)
       // alert('dd  ' + data.data.loanUseList[0].name)
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
          this.$vux.toast.text('我的贷款页面初始化失败~')
        }
      })
    },
    submit () {
      alert('提交表单')
    },
    cancel () {
      alert('取消授信')
    }
  }
}
</script>
<style lang="less" scoped>
html, body {
  .content{
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
    margin-top:0.75rem;
    padding:0.75rem 0;
    border-bottom:1px solid #ededed;
    line-height: 1rem;
    background:#fff;
    span{
      padding-left:0.75rem;
      font-size:0.7rem;
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
  // .weui-tab{
  //   .vux-header .vux-header-title > span{
  //     color:#000;
  //   }
  // }
}
</style>

