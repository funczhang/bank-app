<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0")
      x-header(slot="header" title="我的授信" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        img(class="icon-refresh" src="../../assets/imgs/icon-refresh.png" slot="right") 
      .content
        template(v-for="item in creditList")
          ul(class="record")
            li(class="clearfix") 
              label 申请人 
              span {{item.applyName}}
            li(class="clearfix")  
              label 授信额度 
              span {{item.loanAmount}}
            li(class="clearfix")  
              label 授信时间 
              span(style="color:#f32f2f;") {{item.applyTime}}
            li(class="clearfix")  
              label 审批利率(月) 
              span {{item.contLl}}%
            li(class="clearfix") 
              label 合同号 
              span(style="color:#f32f2f;") {{item.contractNumber}}
            li(class="clearfix") 
              label 合同期限 
              span(style="color:#f32f2f;") {{item.contterm}}
            li(class="clearfix") 
              label 申请状态 
              span {{status}}
      .content(v-show="creditList.length ===0")
        img(class="empty" src="../../assets/imgs/icon-no-apply.png")
        .tip 您暂无授信记录哦~
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller, Group } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group
  },
  data () {
    return {
      index: 0,
      creditList: []
    }
  },
  computed: {
    // creditList () {
    //   return this.$store.state.creditList
    // },
    status () {
      let applyState = this.$store.state.applyState
      let status = null
      switch (applyState) {
        case 1: status = '额度评估中'
          break
        case 2: status = '审批未通过'
          break
        case 3: status = '担保人处理中'
          break
        case 4: status = '待签约'
          break
        case 5: status = '签约审批中'
          break
        case 6: status = '签约超时'
          break
        case 7: status = '签约中'
          break
      }
      return status
    }
  },
  mounted () {
    this.initView()
  },
  methods: {
    initView () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getCreditList.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          self.creditList = data.data.creditList
        } else {
          self.$vux.toast.text(data.data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.icon-refresh{
    width:1rem;
    height:1rem;
  }
.content{
  .record{
    padding:0.75rem 1.25rem;
    margin-top:0.75rem;
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
    background:#fff;
    li{
      label{
        float: left;
        width:30%;
        overflow: hidden;
        font-size:0.75rem;
        color:#666;
        line-height: 2;
      }
      span{
        float: left;
        width:70%;
        overflow: hidden;
        font-size:0.75rem;
        color:#000;
        line-height: 2;
      }
    }
  }
  .empty{
    display: block;
    margin:5rem auto 3rem;
    width:10rem;
    height:6rem;
  }
  .tip{
    padding:1rem;
    font-size:0.75rem;
    color:#999;
    line-height: 1.5;
    text-align: center;
  }
}
</style>

