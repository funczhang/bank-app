<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="银行卡" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;border-bottom:1px solid #ededed;")
      .content 
        p(class="empty-tip" v-show="bankCardList.length ===0") 暂无绑定银行卡
        ul(v-show="bankCardList.length !== 0" class="card-list")
          li(v-for="item in bankCardList")
            .btn-del(@click="unbindCard")
            h3 兴化农商行
            .type 储蓄卡
            .card-num **** **** **** 6316
          li
            .btn-del
            h3 兴化农商行
            .type 储蓄卡
            .card-num **** **** **** 6316
        .btn-add(@click="addBankCard") 
          .title 添加银行卡
</template>

<script>
import { ViewBox, XHeader, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker
  },
  data () {
    return {
      index: 0
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    bankCardList () {
      return this.$store.state.bankCardList
    }
  },
  methods: {
    addBankCard () {
      this.$router.push('/addCard')
    },
    unbindCard () {
      alert('绑定银行卡')
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/unbindBankCard.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: 'e2e9e2dc-07c6-41f0-9b80-0486a1c0f5b4',
          cardNo: this.cardNum
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
      })
    },
    initData () {
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
        // let data = JSON.parse(res)
        // alert(res)
        if (res.response === 'success') {
          self.$store.state.bankCardList = res.data
        } else {
          this.$vux.toast.text('获取银行卡列表数据失败')
        }
        // alert(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
}
.content{
  padding:0.1px;
  // background:#f5f5f5;
  .empty-tip {
    padding:5rem 0;
    // margin-bottom:1rem;
    font-size:0.8rem;
    color:#999;
    text-align: center;
  }
  .card-list{
    margin-top:0.75rem;
    padding:0.75rem;
    background:#fff;
    li{
      position: relative;
      margin:0 auto 0.75rem;
      padding:0.5rem;
      height:5.65rem;
      border-radius: 0.125rem;
      overflow: hidden;
      background:url(../../assets/imgs/bg-card.png);
      background-size:100% 100%;
      .btn-del{
        position: absolute;
        right: 0.5rem;
        top:0.5rem;
        width:1.25rem;
        height:1.25rem;
        background:url(../../assets/imgs/icon-del.png);
        background-size:100% 100%;
      }
      h3{
        font-size:0.75rem;
        line-height: 1.5;
        color:#fff;
        font-weight: normal;
      }
      .card-num{
        font-size:1rem;
        line-height: 1.5;
        color:#fff;
        font-weight: normal;
      }
      .type{
         font-size:0.6rem;
        line-height: 1.5;
        color:#fff;
        font-weight: normal;
      }
    }
  }
  .btn-add{
    padding:0.75rem 0;
    height:1rem;
    background:#f5f5f5;
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
    .title{
      font-size:0.75rem;
      color:#333;
      text-align: center;
      background:url(../../assets/imgs/icon-add.png) no-repeat 30% center;
      background-size:1rem 1rem;
    }
    img{

    }
    span{

    }
  }
}
</style>

