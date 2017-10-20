<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="签订合同" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content
        .contract 合同内容
        a(href="javascript:void(null)" class="btn-know" @click="signContract") 确定
        masker(color="#000" :opacity="0.4" fullscreen=true v-show="isKnow" style="position:relative;")
          .box(slot="content")
            .head 签约提示
              img(src="../../assets/imgs/arrow-right.png" @click="showBindCard = false")
            .content
              p 您的签约已经提交，由于系统延迟，签约结果将会以短信的形式发送给您，请知晓
              .btn-area(class="clearfix")
                a(href="javascript:void(null)" class="btn-submit btn-card-certain" @click="isKnow = false") 我知道了
</template>

<script>
import { ViewBox, XHeader, Group, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    Masker
  },
  data () {
    return {
      isKnow: false
    }
  },
  mounted () {
    // debugger
    // alert(JSON.stringify(this.$store.state.signInfo))
  },
  computed: {
  },
  methods: {
    signContract () {
      // alert(this.couponId)
      // 页面初始化
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/signContract.do'
      let data = {
        action: 'init_request',
        path: path,
        params: self.$store.state.signInfo
      }
      self.$store.dispatch('initRequest', data).then(res => {
        alert(res)
        let data = JSON.parse(res)
        if (data.response === 'success') {
          this.isKnow = true
          this.$router.replace('/')
          this.$store.state.tabItem = 0
        }
      })
    },
    giveUpSisgnContract () {
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
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding:0.1px;
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
      p {
        padding:0.5rem 0;
        font-size:0.75rem;
        color:#666;
        line-height: 1.5;
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
  .contract{
    padding:1rem 0;
    text-align: center;
  }
  .btn-know{
    display: block;
    margin-left:15%;
    width:70%;
    height:1.8rem;
    background:#1f76e2;
    color:#fff;
    border-radius: 0.9rem;
    font-size:0.75rem;
    text-align: center;
    line-height: 1.8rem;
    box-shadow: 0px 0px 1rem rgba(39,128,237,.5);
  }
}
</style>

