<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的还款" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        template(v-for="item in repaymentList")
          ul(class="record")
            li(class="clearfix") 
              label 借据号 
              span {{item.iousNo}}
            li(class="clearfix")  
              label 借款人 
              span {{item.repName}}
            li(class="clearfix")  
              label 月利率 
              span(style="color:#f32f2f;") {{item.repMonthRate}}‰
            li(class="clearfix")  
              label 还款账号 
              span {{item.repCradNo}}
            li(class="clearfix") 
              label 还款金额 
              span(style="color:#f32f2f;") {{item.repAmount}}元
            li(class="clearfix") 
              label 还款利息 
              span(style="color:#f32f2f;") {{item.repRateAmo}}元
            li(class="clearfix") 
              label 还款时间 
              span {{item.repTime}}
      .content(v-show="repaymentList.length ===0")
        img(class="empty" src="../../assets/imgs/icon-no-apply.png")
        .tip 您暂无还款记录哦~
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
      repaymentList: []
    }
  },
  computed: {
    // repaymentList () {
    //   return this.$store.state.repaymentList
    // }
  },
  mounted () {
    this.initView()
  },
  methods: {
    initView () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getRepaymentList.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          this.repaymentList = res.data.repaymentList
        } else {
          self.$vux.toast.text(res.data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
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

