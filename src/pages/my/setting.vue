<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="40px" body-padding-bottom="0")
      x-header(slot="header" title="个人设置" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;padding-bottom:0;color:#000;")
      .content(style="margin-top:0.75rem;")
        group(style="background:green;")
          cell(title="账户资料" is-link link="/mydata")
            img(src="../../assets/imgs/icon-setting-data.png" style="width:0.8rem;height:0.9rem;" slot="icon")
          cell(title="我的密码" is-link style="margin-top:0.75rem;border-bottom:none;" link="/managePwd")
            img(src="../../assets/imgs/icon-setting-pwd.png" style="width:0.8rem;height:0.9rem;" slot="icon")
          cell(title="更换手机号" is-link link="/changePhone")
            img(src="../../assets/imgs/icon-setting-phone.png" style="width:0.65rem;height:0.8rem;" slot="icon")
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
      index: 0
    }
  },
  mounted () {
    // this.getBaseInfo()
  },
  methods: {
    getBaseInfo () {
      // 获取设备信息和用户基本信息
      let self = this
      let data = {
        action: 'get_request'
      }
      // 获取设备信息
      self.$store.dispatch('normalRequest', data).then(res => {
        alert('2222222' + JSON.stringify(res))
        // 存用户信息
        self.$store.commit('INIT_USER_INFO', res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab .vux-header{
  border-bottom:1px solid #ededed;
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
  background:#f5f5f5;
}
  .weui-tab .vux-tap-active{
    // padding-bottom:0;
  }
</style>

