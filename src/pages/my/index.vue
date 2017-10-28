<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="0" body-padding-bottom="50px")
      .container
        .header
          a(v-show="isLogin" class="btn-code" @click="shareCodePic" href="javascript:void(null)")
          .head-img(@click="uploadHeadImg")
            //- img(src="../../assets/imgs/person.png")
            img(v-show="!hasHeadImg" src="../../assets/imgs/default-img.png")
            img(v-show="hasHeadImg" :src="headImgSrc")
          p(v-show="isLogin" class="phone") {{ phoneNum.substr(0,3) + '****' + phoneNum.substr(phoneNum.length-4 ,4)}}
          p(v-show="!isLogin" class="phone" @click="login") 登录/注册
        .content
          group(style="background:green;")
            cell(title="我的担保" is-link)
              img(src="../../assets/imgs/icon-danbao.png" slot="icon")
              .child(slot="child" @click="toGuarantee")
            cell(title="银行卡" is-link style="margin-top:0.75rem;border-bottom:none;")
              img(src="../../assets/imgs/icon-bank.png" slot="icon")
              .child(slot="child" @click="toBankCardList")
            cell(title="优惠券" is-link )
              img(src="../../assets/imgs/icon-juan.png" slot="icon")
              .child(slot="child" @click="toCouponList")
            cell(title="个人设置" is-link style="margin-top:0.75rem;")
              img(src="../../assets/imgs/icon-setting.png" slot="icon")
              .child(slot="child" @click="toSetting")
        masker(color="#000" :opacity="0.4" fullscreen=true v-show="showHeadImg")
          .box(slot="content" @click="hideHeadImg")
            img(v-show="!hasHeadImg" src="../../assets/imgs/default-head-photo.png")
            img(v-show="hasHeadImg" :src="headImgSrc")
</template>

<script>
import { ViewBox, XHeader, Group, CheckIcon, Cell, Masker } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    CheckIcon,
    Masker,
    Cell
  },
  data () {
    return {
      showHeadImg: false
    }
  },
  mounted () {
    this.showUserInfo()
  },
  activated () {
  },
  computed: {
    phoneNum () {
      return this.$store.state.userInfo.cellphone
    },
    isLogin () {
      return this.$store.state.userInfo.token !== ''
    },
    hasHeadImg () {
      return this.$store.state.userInfo.avatar !== ''
    },
    headImgSrc () {
      return this.$store.state.baseUrl + this.$store.state.userInfo.avatar
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    showUserInfo () {
      let self = this
      let token = self.$store.state.userInfo.token
      // 绑定银行卡和头像接口
      let path = self.$store.state.baseUrl + '/app/xsyd/loginPageInit.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: token
        }
      }
      if (token !== '' && token !== undefined) {
        self.$store.dispatch('normalRequest', data).then(res => {
          res.response === 'success' ? self.$store.commit('INIT_HEAD_IMG', res.data) : self.$vux.toast.text('头像信息获取失败')
        })
      } else {
        self.$vux.toast.text('请先登录~')
      }
    },
    uploadHeadImg () {
      // this.showHeadImg = true
      this.$router.push('/myData')
    },
    hideHeadImg () {
      this.showHeadImg = false
    },
    shareCodePic () {
       // 分享二维码
      let self = this
      let data = {
        action: 'jump_qr_show'
      }
      self.$store.dispatch('normalRequest', data).then(res => {
      })
    },
    toGuarantee () {
      if (this.$store.state.userInfo.token === '') {
        this.$router.push('/login')
        this.$vux.toast.text('请先登录~')
        return
      }
      if (this.$store.state.userInfo.isAuth === true) {
        this.$router.push('/myGurantee')
      } else {
        this.$vux.toast.text('请先实名认证哦~')
      }
    },
    toBankCardList () {
      if (this.$store.state.userInfo.token === '') {
        this.$router.push('/login')
        this.$vux.toast.text('请先登录~')
        return
      }
      if (this.$store.state.userInfo.isAuth === true) {
        this.$router.push('/bankCardList')
      } else {
        this.$vux.toast.text('请先实名认证哦~')
      }
    },
    toCouponList () {
      if (this.$store.state.userInfo.token === '') {
        this.$router.push('/login')
        this.$vux.toast.text('请先登录~')
        return
      }
      if (this.$store.state.userInfo.isAuth === true) {
        this.$router.push('/couponList')
      } else {
        this.$vux.toast.text('请先实名认证哦~')
      }
    },
    toSetting () {
      if (this.$store.state.userInfo.token === '') {
        this.$router.push('/login')
        this.$vux.toast.text('请先登录~')
        return
      }
      this.$router.push('/setting')
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  .header{
    position: relative;
    padding:0.1px;
    height:7.5rem;
    background:url(../../assets/imgs/bg-my.png);
    background-size: 100% 100%;
    .btn-code{
      position: absolute;
      display: block;
      right: 0.75rem;
      top:0.75rem;
      width:1rem;
      height:1rem;
      background:url(../../assets/imgs/icon-ma.png);
      background-size:1rem 1rem;
    }
    .head-img{
      position: relative;
      top:47%;
      margin:0 auto;
      margin-top:-2rem;
      width:4rem;
      height: 4rem;
      border-radius: 50%;
      box-shadow: 0px 0px 1rem rgba(255,255,255,.5);
      overflow: hidden;
      background:#f5f5f5;
      img{
        width:100%;
        height:100%;
      }
    }
    .phone{
      position: relative;
      top:53%;
      margin:0 auto;
      width:50%;
      font-size:0.8rem;
      color:#fff;
      text-align: center;
    }
  }
  .content{
    .child{
      position: absolute;
      top:0;
      bottom:0;
      left: 0;
      right:0;
    }
  }
  .box{
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right:0;
    img{
      position: absolute;
      z-index: 99;
      top:50%;
      left:50%;
      display: block;
      width:5rem;
      height:5rem;
      margin:-2.5rem;
    }
  }
}
  .weui-tab .weui-cell:before{
    border-top:none;
  }
 .weui-tab .weui-cell{
    padding:0.5rem 0.75rem;
    background: #fff; 
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
  .vux-cell-primary{
    padding:0.5rem 0.75rem;
    background: #fff;
  }
  .weui-cell__hd img{
    position: relative;
    top:2px;
    margin-right:0.5rem;
    width:1.5rem;
    height:1.5rem;
  }
}
.weui-tab .weui-cells{
  background:#f5f5f5 !important;
}
</style>

