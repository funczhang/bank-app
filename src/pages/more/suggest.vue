<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px")
      x-header(slot="header" title="意见反馈" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content  
        masker(style="border-radius: 2px;" color="#000" :opacity="0.5" fullscreen=true v-show="false")
          div(slot="content" class="msg-box")
        ul(class="classify clearfix")
          li
            check-icon(:value.sync="isConfirm")
            span 提个建议
          li
            check-icon(:value.sync="isConfirm")
            span 出错误啦
          li
            check-icon(:value.sync="isConfirm")
            span 不好用
          li
            check-icon(:value.sync="isConfirm")
            span 其他
        x-textarea(v-model="value" show-counter=true placeholder="您的反馈帮助我们成长" :rows=7 style="padding:10px")
        .btn-submit 提交
</template>

<script>
import { ViewBox, XHeader, Group, PopupPicker, XInput, CheckIcon, Masker, XTextarea } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    PopupPicker,
    XInput,
    CheckIcon,
    Masker,
    XTextarea
  },
  data () {
    return {
      index: 0,
      isConfirm: false,
      value: ''
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.content{
  .classify{
    padding:15px 30px;
    li{
      padding:5px 0;
      float: left;
      width:50%;
      font-size:15px;
      color:#333;
    }
  }
  ::-webkit-input-placeholder{
    font-size:15px;
    color: #999;
  }
  .weui-cell:before{
    border-top:none;
  }
  .btn-submit{
    display: block;
    margin:50px auto;
    width:80%;
    height: 40px;
    border-radius: 20px;
    background:#1f76e2;
    box-shadow: 0px 0px 20px rgba(39,128,237,.5);
    font-size:15px;
    color:#fff;
    line-height: 40px;
    text-align: center;
  }
}
</style>

