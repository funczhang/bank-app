<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" style="background:#fff;")
      x-header(slot="header" title="银行卡" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;border-bottom:1px solid #ededed;")
      .content 
        p(class="empty-tip" v-show="bankCardList.length ===0") 暂无绑定银行卡
        //- transition-group(v-show="bankCardList.length !== 0" class="card-list" tag="ul"  name="bounceInUp" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutLeft")
        ul(v-show="bankCardList.length !== 0" class="card-list")
          li(v-for="item in bankCardList" :key="item.id")
            //- swipeout(style="height:100%")
            //-   swipeout-item(transition-mode="follow" :threshold=".5" style="position:relative;z-index:0;height:100%")
            .item-content(slot="content" style="position:relative;z-index:0;padding:10px 10px px 3rem;")
              img(src="../../assets/imgs/bank-logo.png")
              .btn-del(@click="showDialog(item.bankcardNo)")
              h3() 兴化农商行
              .type 储蓄卡
              .card-num **** **** **** {{item.bankcardNo.substr(item.bankcardNo.length-4,item.bankcardNo.length-4)}}
                //- .item-menu(slot="right-menu" )
                  //- swipeout-button(@click.native="showDialog(item.bankcardNo)" type="warn" style="border-radius: 8px;") 删除
        .btn-add(@click="addBankCard") 
          .title 添加银行卡
      masker(color="#000" :opacity="0.4" fullscreen=true v-show="status" style="position:relative;")
        .box(slot="content")
          .head 解绑银行卡
            img(src="../../assets/imgs/arrow-right.png" @click="onCancel")
          .content
            p(class="card clearfix")
              span(style="float:left;width:90%;color:#999;font-size:0.75rem;text-align:center") 确定解绑该银行卡？
            .btn-area(class="clearfix")
              span( class="btn-submit btn-card-certain" @click="onConfirm") 确定
</template>

<script>
import { ViewBox, XHeader, Masker, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data () {
    return {
      index: 0,
      show: false,
      dcontent: '操作提示',
      status: false,
      cardNo: '',
      bankCardList: [{bankcardNo: '1111111111111111111'}]
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
  },
  methods: {
    onCancel () {
      this.status = false
    },
    onConfirm () {
      this.status = false
      this.unbindCard(this.cardNo)
    },
    showDialog (cardNo) {
      this.status = true
      this.cardNo = cardNo
    },
    addBankCard () {
      this.$router.push('/addCard')
    },
    unbindCard (cardNo) {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/unbindBankCard.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token,
          cardNo: cardNo
        }
      }
      this.$vux.loading.show({
        text: 'loading'
      })
      self.$store.dispatch('normalRequest', data).then(res => {
        this.$vux.loading.hide()
        if (res.response === 'success') {
          this.initData()
        } else {
          this.$vux.toast.text(res.data)
        }
      })
    },
    initData () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getAppBankCardList.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          self.bankCardList = res.data
        } else {
          this.$vux.toast.text(res.data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
  .vux-x-dialog .weui-dialog{
    border-radius: 16px
  }
}
.content{
  padding:0.1px;
  background:#f5f5f5;
  .empty-tip {
    padding:5rem 0;
    font-size:0.8rem;
    color:#999;
    text-align: center;
    background:#fff;
  }
  .card-list{
    margin-top:0.75rem;
    padding:0.75rem;
    background:#fff;
    li{
      position: relative;
      margin:0 auto 0.75rem;
      height:5.65rem;
      border-radius: 0.125rem;
      background:white;
      overflow: hidden;
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
      .item-content{
        padding:0.3rem 0;
        img{
          position: absolute;
          left:0.5rem;
          top:0.5rem;
          width:2rem;
          height:2rem;
        }
        padding-left:3rem;
        // background:url(../../assets/imgs/bank-logo.png);
        border-radius: 8px;
        background:-webkit-gradient(linear,100% 0%, 50% 0%, from(#378CF4), to(#2B7DE2));
      }
      h3{
        font-size:0.75rem;
        line-height: 2;
        color:#fff;
        font-weight: normal;
      }
      .card-num{
        font-size:1rem;
        line-height: 2;
        color:#fff;
        font-weight: normal;
      }
      .type{
         font-size:0.6rem;
        line-height: 2;
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
      height: 1rem;
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
// 遮罩
.box{
    position: relative;
    // top:50%;
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
    .content{
      padding:0.5rem 0.75rem 1rem;
      background:#fff;
      .card{
        margin-top: 1rem;
        padding:0.5rem 0.25rem;
      }
    }
  .btn-area{
    padding:1rem 0 0;
    background:#fff;
    span{
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
</style>

