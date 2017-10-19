<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="添加银行卡" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        .module-head 请添加持卡本人的银行卡
        group
          x-input(title="持卡人" placeholder="请输入持卡人" style="border-bottom:none;" v-model="name" type="text" disabled=true readonly=true)
          x-input(title="卡号" placeholder="请输入银行卡号" type="text" v-model="cardNum" :show-clear="false")
            img(src="../../assets/imgs/icon-camera.png" style="width:0.9rem;height:0.7rem;" slot="right" @click="addBankCard")
        .btn-add(@click="addCard") 提交
</template>

<script>
// 219 187
import { ViewBox, XHeader, Masker, Group, XInput } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Group,
    XInput
  },
  data () {
    return {
      index: 0,
      cardNum: '',
      name: ''
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    // name: {
    //   set (val) {

    //   },
    //   get () {
    //     return this.$store.state.userInfo.name
    //   }
    // }
  },
  methods: {
    init () {
      this.name = '张超'
    },
    addCard () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/bindBankCard.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token,
          chName: this.name,
          cardNo: this.cardNum
        }
      }
      if (this.cardNum === '') {
        this.$vux.toast.text('请输入银行卡号')
        return null
      }
      self.$store.dispatch('normalRequest', data).then(response => {
        if (response.response === 'success') {
          this.$vux.toast.text('绑定银行卡成功')
          this.cardNum = ''
          this.$router.replace('/bankCardList')
        } else {
          this.$vux.toast.text(response.data)
        }
      })
    },
    addBankCard () {
      alert('调取识别银行卡sdk')
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getAppBankCardList.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4'
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
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
  .btn-add{
    display: block;
    margin:1rem auto;
    width:80%;
    height: 2rem;
    border-radius: 1rem;
    background:#1f76e2;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
    font-size:0.75rem;
    color:#fff;
    line-height: 2rem;
    text-align: center;
  }
}
.weui-tab{
  .weui-cell__hd{
    position: relative;
    img{
      position: relative;
      top:0.15rem;
      margin-right:0.5rem;
    }
  }
  .weui-cell{
    padding:0.75rem;
    border-bottom:1px solid #ededed;
  }
  .weui-label{
    font-size:0.7rem;
    color:#333;
  }
  .weui-input{
    font-size:0.7rem;
    color:#333; 
  }
  input[placeholder], [placeholder], *[placeholder] {
   font-size:0.7rem;
   color:#999;
 }
  .weui-cell:before{
    border-top:none;
  }
 .vux-x-input{
  padding:0.75rem;
  border-top:1px solid #ededed;
  border-botstom:1px solid #ededed;
  background:#fff;
}
 .vux-header{
  border-bottom:1px solid #ededed;
}
.vux-no-group-title{
  margin-top:0.75rem;
}
}
</style>

