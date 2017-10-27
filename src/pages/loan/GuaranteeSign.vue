<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="签约" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        .tip()
          img(src="../../assets/imgs/icon-sign.png")
          p {{msg}}
        .module
          .module-head 审批结果
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 授信额度（元）
                p(class="value" style="color:#f32f2f") {{lineCredit}}
              li(class="mid")
                p(class="title") 审批利率（月）
                p(class="value" style="color:#1f76e2;") {{applyRate}}‰
              li 
                p(class="title") 授信期限（月）
                p(class="value" style="color:#1f76e2;") {{timeLimit}}
        .module
          .module-head 申请人信息
          ul(class="people-module-content")
            li
              .option(class="clearfix")  
                label 申请人
                span {{requestName}} 
            li
              .option(class="clearfix")  
                label 身份证号
                span {{requestIdcard}} 
            li
              .option(class="clearfix")  
                label 手机号码
                span {{requestPhone}}
          .btn-area(class="clearfix")
            a(href="javascript:void(null)" class="btn-submit fl" @click="sign") 签约
            a(href="javascript:void(null)" class="btn-cancel fr" @click="giveUpSign") 下次再说
</template>

<script>
// 219 187
import { ViewBox, XHeader } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader
  },
  data () {
    return {
      index: 0,
      msg: '', // 提示信息
      timeLimit: '', // 授信期限
      lineCredit: '', // 授信额度
      applyRate: '', // 授信利率
      requestName: '', // 申请人姓名
      requestPhone: '', // 申请人号码
      requestIdcard: '' // 申请人身份证
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
  },
  methods: {
    giveUpSign () {
       // 放弃签约
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/giveUpSignContract.do'
      let data = {
        action: 'jump_web_refuse',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$route.query.applyNo // 申请编号
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        this.$router.replace('/myGurantee')
      })
    },
    sign () {
      // 签约
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/contract.html?userToken=' + self.$store.state.userInfo.token + '&applyId=' + self.$route.query.applyNo
      let data = {
        action: 'jump_web_sign',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$route.query.applyNo,
          type: '2', // 1申请人 2担保人
          cardNo: '',
          url: self.$store.state.baseUrl + '/app/xsyd/signContract.do',
          name: '签约合同'
        }
      }
      this.$store.state.signInfo = data.params
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          this.$router.replace('/myGurantee')
        }
      })
    },
    initPage () {
       // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/assSigningInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token,
          applyId: self.$route.query.applyNo
        }
      }
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          self.msg = data.data.message
          self.timeLimit = data.data.timeLimit // 授信期限
          self.lineCredit = data.data.lineCredit // 授信额度
          self.applyRate = data.data.loanInterestRate // 利率
          self.requestName = data.data.applyName
          self.requestPhone = data.data.applyPhone
          self.requestIdcard = data.data.applyIdCard
        } else {
          this.$vux.toast.text('签约接口数据初始化失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
// padding:0.5rem 0.25rem;
// border-bottom:1px solid #ededed;
.content{
  padding:0.1px;
  .people-module-content{
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
    .tip{
      padding:0.75rem 0;
      margin:0 auto;
      width:94%;
      font-size:0.6rem;
      color:#f32f2f;
      line-height: 1.5;
    }
    ul{
      padding:0.75rem 0;
      width:94%;
      margin:0 auto;
      border-bottom:1px solid #ededed;
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
      // float: left;
      margin:0 auto;
      width:100%;
    }
    .coupon-count{
      span{
        float:left;
        line-height: 1.2rem;
        color:#333;
      }
      .count{
        margin-left:0.5rem;
        width:4.25rem;
        height:1.2rem;
        border:1px solid #1f76e2;
        border-radius: 0.6rem;
        line-height: 1.2rem;
        font-size:0.7rem;
        text-align: center;
        color:#1f76e2;
      }
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
    .pretty-rate{
      padding:0.5rem 0;
      .title{
        font-size:0.7rem;
      }
      p{
        text-align: center;
      }
      .rate{
        font-size:0.9rem;
        font-weight: bold;
        color:rgb(31, 118, 226)
      }
    }
  }
  .btn-area{
    padding:1.5rem 0;
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
    top:0;
    margin:0 auto;
    margin-top:7rem;
    // margin-top:-5.85rem;
    width:80%;
    background:#fff;
    border-radius: 3px;
    .head{
      padding: 0.5rem 0.75rem;
      height:1.1rem;
      background:#1f76e2;
      box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
      font-size:0.85rem;
      line-height: 1.1rem;
      text-align: center;
      color:#fff;
      border-radius: 3px 3px 0 0;
      img{
        position: absolute;
        top:0.6rem;
        right:0.75rem;
        width:0.7rem;
        height:0.7rem;
      }
    }
    .icon-card{
      padding:0.5rem 0.25rem;
      width:1.15rem;
      height: 0.85rem;
      vertical-align: middle;
    }
    .line{
      padding:0.3rem 0;
      margin:0 auto;
      width:100%;
      border-bottom:1px solid #ededed;
      background:url(../../assets/imgs/icon-arrow.png) no-repeat right;
      background-size:0.4rem 0.85rem;
    }
    .weui-cell:before{
      border-top:none;
    }
    .content{
      // height: 6rem;
      // overflow-x: hidden;
      // overflow-y: scroll;
      padding:0.5rem 0.75rem 1rem;
      .card{
        padding:0.5rem 0.25rem;
        border-bottom:1px solid #ededed;
      }
    }
  .btn-area{
    padding:1rem 0 0;
    background:#fff;
    a{
      display: block;
    }
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
  padding:0.75rem 0;
  border-bottom:1px solid #ededed;
}
.weui-tab .weui-label{
  width:30% !important;
}
</style>

