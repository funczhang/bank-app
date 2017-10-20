<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="签约" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        rate(:state="step")  
        //- .progerss
        //-   img(src="../../assets/imgs/progress02.png")
        //-   div
        //-     span(class="first") 已申请
        //-     span 已审批
        //-     span 待签约
        //-     span(class="last") 待完成
        .tip(v-show="!isHandlerAssure")
          img(src="../../assets/imgs/icon-sign.png")
          p {{msg}}
        .tip(v-show="isHandlerAssure")
          img(src="../../assets/imgs/icon-chuli.png")
          p(class="msg") 担保人{{initAssureName}}正在处理，请稍后！
          .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit fl" @click="revokeAssure") 撤销担保人
              a(href="javascript:void(null)" class="btn-cancel fr" @click="changeAssure") 更换担保人
        .module
          .module-head 审批结果
          .module-content
            ul(class="clearfix")
              li 
                p(class="title") 授信额度（元）
                p(class="value" style="color:#f32f2f") {{lineCredit}}
              li(class="mid")
                p(class="title") 审批利率（月）
                p(class="value" style="color:#1f76e2;") {{applyRate}}%
              li 
                p(class="title") 授信期限（月）
                p(class="value" style="color:#1f76e2;") {{timeLimit}}
            .pretty-rate(v-show="newRate !== ''") 
              p(class="title") 优惠后利率
              p(class="rate") {{newRate}}%
            .tip(v-show="!isHandlerAssure") 注意：如果您觉得当前授信额度较低，可通过一下“添加担保人”获取更高额度；否则，可直接签约
        .template(v-show="!isHandlerAssure")
          .module
            .module-head 获取更高额度
            .module-content
              ul(class="add clearfix" style="padding:20px 0 15px;")
                li(style="margin:0 auto;" @click="addAssure") 
                  img(src="../../assets/imgs/icon-addfriend.png")
                  p(class="btn-guarantee") 添加担保人
                //- li 
                //-   img(src="../../assets/imgs/icon-zhima.png")
                //-   p(class="btn-zhima") 芝麻信用分
          .module
            .module-head 关联贷款抵用券
            .module-content 
              group
                popup-picker(title="抵用券" @on-change="couponChange" :data="couponList" :columns="1" style="padding:12px 15px;background:#fff;")
                  div(class="coupon-count" slot="title") 
                    span 抵用券
                    span(class="count") 还剩{{couponList.length}}张
          .module
            .module-head 银行卡信息
            .module-content
              .line(@click="showBindCard = true" class="clearfix" style="padding:0.3rem 0;") 
                img(class="icon-card" src="../../assets/imgs/icon-card.png" @click="showBindCard = false")
                span(v-show="bindCardNo === ''" style="font-size:14px;color:#333;") 绑定银行卡
                span(v-show="bindCardNo !== ''" style="font-size:14px;color:#333;") {{bindCardNo}}
          .btn-area(class="clearfix")
            a(href="javascript:void(null)" class="btn-submit fl" @click="sign") 签约
            a(href="javascript:void(null)" class="btn-cancel fr" @click="giveUpSign") 下次再说
      masker(color="#000" :opacity="0.4" fullscreen=true v-show="addAssurePeople")
        .box(slot="content")
          .head 更换担保人
            img(src="../../assets/imgs/arrow-right.png" @click="addAssurePeople = false")
          .content
            group
              x-input(title="手机号码" placeholder="请输入手机号码" v-model="assurePhone")
              x-input(title="姓  名" placeholder="请输入姓名" v-model="assureName")
            .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit fl" @click="confirm") 确定
              a(href="javascript:void(null)" class="btn-cancel fr" @click="addAssurePeople = false") 取消
      masker(color="#000" :opacity="0.4" fullscreen=true v-show="showBindCard" style="position:relative;")
        .box(slot="content")
          .head 绑定银行卡
            img(src="../../assets/imgs/arrow-right.png" @click="showBindCard = false")
          .content
            group(title="选择绑定的银行卡")
              radio(:options="radio" :selected-label-style="{color: '#1f76e2'}" v-model="bindCardNo")
            //- p(class="card clearfix" v-for="(item, index) in bankcardList" @click="selectBankCard(index)")
            //-   span(style="float:left;width:90%;color:#999;") {{'**** **** **** ' + item.bankcardNo.substr(item.bankcardNo.length - 4,4)}}
            //-   check-icon(style="float:right;width:10%;" :value.sync="isSelectCard")
            .line(@click="toVertify") 
              img(class="icon-card" src="../../assets/imgs/icon-card.png")
              span(style="font-size:14px;color:#333;") 绑定银行卡
            .btn-area(class="clearfix")
              a(href="javascript:void(null)" class="btn-submit btn-card-certain" @click="showBindCard = false") 确定
</template>

<script>
// 219 187
import progress from '../common/progress.vue'
import { ViewBox, XHeader, PopupPicker, Group, Masker, XInput, CheckIcon, Radio } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    PopupPicker,
    Group,
    Masker,
    XInput,
    CheckIcon,
    Radio,
    'rate': progress
  },
  data () {
    return {
      index: 0,
      isAddStatus: '1',
      radio: [],
      newRate: '',
      couponId: '', // 优惠券id
      isSelectCard: false,
      addAssurePeople: false,
      showBindCard: false,
      bindCardNo: '', // 绑定银行卡账号
      initAssureName: '',
      initAssurePhone: '',
      msg: '', // 提示信息
      timeLimit: '', // 授信期限
      lineCredit: '', // 授信额度
      applyRate: '', // 授信利率
      couponList: [], // 优惠券列表
      couponNum: 0,
      coupon: '',
      bankcardList: [], // 银行卡列表
      assureName: '', // 担保人姓名
      assurePhone: '', // 担保号码
      assureIdcard: '' // 担保人身份证
    }
  },
  mounted () {
    this.initPage()
    // this.addAssure()
  },
  computed: {
    step () {
      return this.$store.state.applyState
    },
    isHandlerAssure () {
      // alert(this.$store.state.applyState)
      return this.$store.state.applyState === 3
    }
  },
  methods: {
    confirm () {
      // 页面初始化
      let self = this
      // let path = 'http://192.168.2.105:8080/app/xsyd/addOrUpdateAssure.do'
      let path = self.$store.state.baseUrl + '/app/xsyd/addOrUpdateAssure.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          assureName: self.assureName,
          assurePhone: self.assurePhone,
          applyId: self.$store.state.applyNo,
          type: self.isAddStatus // 1添加 2更换
        }
      }
      if (self.assureName !== '') {
        if (self.assurePhone !== '') {
          self.$store.dispatch('normalRequest', data).then(data => {
            // alert(JSON.stringify(data))
            self.addAssurePeople = false
            if (data.response === 'success') {
              self.assureName = ''
              self.assurePhone = ''
              self.updateAddAssureStatus()
              // this.$router.replace('/sign')
            } else {
              self.isAddStatus === '1' ? this.$vux.toast.text('添加担保人失败~') : this.$vux.toast.text('更换担保人失败~')
            }
          })
        } else {
          this.$vux.toast.text('请输入姓名~')
        }
      } else {
        this.$vux.toast.text('请输入号码~')
      }
    },
    toVertify () {
      this.showBindCard = false
      this.$router.replace('/addCard')
    },
    giveUpSign () {
       // 放弃签约
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/giveUpSignContract.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$store.state.applyNo, // 申请编号
          image: self.$store.state.faceId // 人脸照片
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        alert(JSON.stringify(res))
      })
    },
    couponChange (value) {
      if (value) {
        // alert(value)
        this.couponId = value[0]
        this.getNewRate(value)
      }
    },
    getNewRate (value) {
       // 获取新利率
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/computeRateByCoupon.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token,
          apprAmount: self.lineCredit, // 审批金额
          apprRate: self.applyRate, // 审批利率
          apprTerm: self.timeLimit, // 审批期限
          couponId: value[0] // 优惠券id
        }
      }
      // alert(JSON.stringify(data.params))
      self.$store.dispatch('initRequest', data).then(res => {
        let data = JSON.parse(res)
        if (data.response === 'success') {
          self.newRate = data.data
        }
        // alert(self.newRate)
      })
    },
    sign () {
      // alert(this.couponId)
      // 页面初始化
      let self = this
      // let path = self.$store.state.baseUrl + '/app/xsyd/signContract.do'
      let data = {
        // action: 'init_request',
        // path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$store.state.applyNo,
          image: self.$store.state.faceId,
          type: '1', // 1申请人 2担保人
          couponId: self.couponId,
          newRate: self.newRate,
          cardNo: self.bindCardNo
        }
      }
      this.$store.state.signInfo = data.params
      self.$router.push({path: '/signContract'})
      // alert(JSON.stringify(data.params))
      // self.$store.dispatch('initRequest', data).then(res => {
      //   alert(res)
      //   let data = JSON.parse(res)
      //   if (data.response === 'success') {
      //     this.$router.replace('/signContract')
      //   }
      // })
    },
    bindCard () {
      self.showBindCard = false
    },
    addAssure () {
      this.isAddStatus = '1'
      this.addAssurePeople = true
    },
    changeAssure () {
      this.isAddStatus = '2'
      this.addAssurePeople = true
    },
    getProgress (type) {
      let self = this
      // alert(type)
      switch (type) {
        case '1': self.$store.state.applyState = 1; self.page = '/quotaEvaluation' // 额度评估
          break
        case '2': self.$store.state.applyState = 2; self.page = '/fail' // 审批未通过
          break
        case '3': self.$store.state.applyState = 3; self.page = '/sign' // 签约等待
          break
        case '4': self.$store.state.applyState = 4; self.page = '/sign' // 签约
          break
        case '5': self.$store.state.applyState = 5; self.page = '/success' // 签约完成
          break
        case '6': self.$store.state.applyState = 5; self.page = '/fail' // 签约超时
          break
      }
    },
    updateAddAssureStatus () {
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/applyPageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('initRequest', data).then(res => {
        // alert(res)
        let data = JSON.parse(res)
        if (data.response === 'success' && data.data.canApply !== 1) {
          self.getProgress(data.data.explain)
        } else {
          this.$vux.toast.text('获取申请接口数据失败')
        }
      })
    },
    revokeAssure () {
      // 撤销担保人
      let self = this
      // let path = 'http://192.168.2.105:8080/app/xsyd/revokeAssure.do'
      let path = self.$store.state.baseUrl + '/app/xsyd/revokeAssure.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token,
          applyId: self.$store.state.applyNo
        }
      }
      this.$vux.loading.show({
        text: 'Loading'
      })
      self.$store.dispatch('initRequest', data).then(res => {
        let data = JSON.parse(res)
        if (data.response === 'success') {
          self.updateAddAssureStatus()
        } else {
          this.$vux.toast.text('撤销担保人失败~')
        }
        this.$vux.loading.hide()
      })
    },
    initPage () {
       // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/applicantSignPageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token,
          applyId: this.$store.state.applyNo
          // token: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4'
        }
      }
      // alert(JSON.stringify(data.params))
      // 初始化我的贷款
      self.$store.dispatch('normalRequest', data).then(data => {
        // alert(JSON.stringify(data))
        if (data.response === 'success') {
          // alert(data.data.loanInterestRate)
          self.msg = data.data.message
          self.timeLimit = data.data.timeLimit // 授信期限
          self.lineCredit = data.data.lineCredit // 授信额度
          self.applyRate = data.data.loanInterestRate // 授信利率
          // self.couponList = data.data.couponList // 优惠券列表
          // self.bankcardList = data.data.bankcardList // 银行卡列表
          // self.assureName = data.data.assureName // 担保人姓名
          // self.assureIdcard = data.data.assureIdcard // 担保人身份证
          self.initAssureName = data.data.assureName
          data.data.couponList.forEach(function (element) {
            self.couponList.push({ name: element.couponAmount, value: element.id, parent: 0 })
          })
          data.data.bankcardList.forEach(function (element) {
            self.radio.push({ key: element.bankcardNo, value: element.bankcardNo })
          })
          // alert(JSON.stringify(self.couponList))
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

