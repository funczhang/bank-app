<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="意见反馈" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        ul(class="classify clearfix")
          li
            .radio(@click="selectQType('1')" :class="{active: qType1}")
            span 提个建议
          li
            .radio(@click="selectQType('2')" :class="{active: qType2}")
            span 出错误啦
          li
            .radio(:class="{active: qType3}" @click="selectQType('3')")
            span 不好用
          li
            .radio(:class="{active: qType4}" @click="selectQType('4')")
            span 其他
        x-textarea(v-model="opinion" :show-counter="true" max=50 placeholder="您的反馈帮助我们成长" :rows=7 style="padding:10px")
        .btn-submit(@click="submit") 提交
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
      opinion: '',
      qType1: false,
      qType2: false,
      qType3: false,
      qType4: false,
      selectType: ''
    }
  },
  mounted () {
  },
  methods: {
    selectQType (type) {
      this.reset()
      this['qType' + type] = true
      this.selectType = type
    },
    reset () {
      this.qType1 = false
      this.qType2 = false
      this.qType3 = false
      this.qType4 = false
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
          qType: this.selectType,
          opinion: this.opinion
        }
      }
      // 显示
      this.$vux.loading.show({
        text: 'Loading'
      })
      if (this.selectType !== '') {
        if (this.opinion !== '') {
          self.$store.dispatch('normalRequest', data).then(res => {
            if (res.response === 'success') {
              this.$vux.toast.text('意见反馈成功')
              this.$router.replace('/more')
              this.$store.state.tabItem = 3
            } else {
              this.$vux.toast.text(res.data)
            }
            // 隐藏
            this.$vux.loading.hide()
          })
        } else {
          this.$vux.toast.text('请填写意见内容')
        }
      } else {
        this.$vux.toast.text('请选择一种意见类型')
      }
      this.$vux.loading.hide()
    }
  }
}
</script>
<style lang="less" scoped>
input:active{
  color:red;
}
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
    .radio{
      position: relative;
      top:-1px;
      display: inline-block;
      margin-right:0.3rem;
      width:1rem;
      height: 1rem;
      vertical-align: middle;
      background:url(../../assets/imgs/unselect-radio.png);
      background-size:100% 100%;
    }
    .active{
      background:url(../../assets/imgs/selected-radio.png);
      background-size:100% 100%;
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

