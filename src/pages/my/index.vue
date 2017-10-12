<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="0" body-padding-bottom="50px")
      .container
        .header
          a(class="btn-code" href="javascript:void(null)")
          .head-img(@click="uploadHeadImg")
            //- img(src="../../assets/imgs/person.png")
            img(v-show="!hasHeadImg" src="../../assets/imgs/default-img.png")
            img(v-show="hasHeadImg" :src="'data:image/jpeg;base64,' + base64")
          p(v-show="isLogin" class="phone") {{ phoneNum }}
          p(v-show="!isLogin" class="phone" @click="login") 登录/注册
        .content
          group(style="background:green;")
            cell(title="我的担保" is-link link="/myGurantee")
              img(src="../../assets/imgs/icon-danbao.png" slot="icon")
            cell(title="银行卡" is-link style="margin-top:0.75rem;border-bottom:none;" link="/bankCardList")
              img(src="../../assets/imgs/icon-bank.png" slot="icon")
            cell(title="优惠券" is-link link="/couponList")
              img(src="../../assets/imgs/icon-juan.png" slot="icon")
            cell(title="个人设置" is-link style="margin-top:0.75rem;" link="/setting")
              img(src="../../assets/imgs/icon-setting.png" slot="icon")
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group, PopupPicker, XInput, CheckIcon, Masker, Cell } from 'vux'
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
    Masker,
    Cell
  },
  data () {
    return {
    }
  },
  mounted () {
    // 显示
    // this.$vux.loading.show({
    //   text: 'Loading'
    // })
    // setTimeout(() => {
    //   this.$vux.loading.hide()
    // }, 1000)
    // 隐藏
  },
  activated () {
    this.showUserInfo()
  },
  computed: {
    phoneNum () {
      return this.$store.state.userInfo.cellphone
    },
    isLogin () {
      // 判断是否登录 通过token
      return this.$store.state.userInfo.token !== ''
    },
    hasHeadImg () {
      return this.$store.state.userInfo.base64 !== ''
    },
    base64 () {
      return this.$store.state.userInfo.base64
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    showUserInfo () {
      // alert(JSON.stringify(this.$store.state.userInfo))
      let self = this
      let token = self.$store.state.userInfo.token
      // 绑定银行卡和头像接口
      let path = self.$store.state.baseUrl + '/app/xsyd/loginPageInit.do'
      let data = {
        path: path,
        params: {
          userToken: token
        }
      }
      if (token !== '') {
        // alert(this.$store.state.userInfo.cellphone)
        // 获取银行卡列表
        self.$store.dispatch('initRequest', data).then(res => {
          let data = JSON.parse(res)
          if (data.response === 'success') {
            self.$store.commit('INIT_BANKCARD_LIST', data.data)
          } else {
            // self.$vux.toast.text('初始化展示用户信息失败')
          }
        })
      } else {
        self.$vux.toast.text('请先登录哦~')
      }
    },
    uploadHeadImg () {
      // let self = this
      // let data = {
      //   path: '',
      //   params: {
      //   }
      // }
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
      top:50%;
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

