<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="意见反馈" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        ul(class="classify clearfix")
          li(@click="selectQType(0)")
            check-icon(:value.sync="qType[0]")
            span 1提个建议
          li(@click="selectQType(1)")
            check-icon(:value.sync="qType[1]")
            span 2出错误啦
          li(@click="selectQType(2)")
            check-icon(:value.sync="qType[2]")
            span 3不好用
          li(@click="selectQType(3)")
            check-icon(:value.sync="qType[3]")
            span 4其他
        x-textarea(v-model="opinion" show-counter=true placeholder="您的反馈帮助我们成长" :rows=7 style="padding:10px")
        .btn-submit 提交
</template>

<script>
import { ViewBox, XHeader, Group, CheckIcon, Masker, Checker, XTextarea, CheckerItem, Radio } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    CheckIcon,
    Masker,
    Checker,
    XTextarea,
    CheckerItem,
    Radio
  },
  data () {
    return {
      index: 0,
      qType: [false, false, false, false],
      opinion: ''
    }
  },
  mounted () {
  },
  methods: {
    selectQType (num) {
      for (let i = 0; i < 4; i++) {
        num === i ? this.qType[i] = true : this.qType[i] = false
      }
    },
    submit () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/feedback.do'
      let token = self.$store.state.userInfo.token
      let data = {
        action: 'init_request',
        path: path,
        params: {
          userToken: token,
          qType: '',
          opinion: ''
        }
      }
      // 显示
      this.$vux.loading.show({
        text: 'Loading'
      })
      self.$store.dispatch('normalRequest', data).then(res => {
        // 隐藏
        this.$vux.loading.hide()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  .classify{
    padding:0.75rem 1.5rem;
    li{
      padding:0.25rem 0;
      float: left;
      width:50%;
      font-size:0.75rem;
      color:#333;
    }
  }
  ::-webkit-input-placeholder{
    font-size:0.75rem;
    color: #999;
  }
  .weui-cell:before{
    border-top:none;
  }
  .btn-submit{
    display: block;
    margin:2.5rem auto;
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
</style>

