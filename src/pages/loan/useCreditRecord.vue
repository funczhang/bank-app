<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="0" bgColor="#fff")
      x-header(slot="header" title="我的用信" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
      .content
        template(v-for="item in spendList")
          ul(class="record")
            li(class="clearfix") 
              label 合同号 
              span {{item.contractNo}}
            li(class="clearfix")  
              label 借款人 
              span {{item.borrName}}
            li(class="clearfix")  
              label 借款号 
              span(style="color:#f32f2f;") {{item.iousNo}}
            li(class="clearfix")  
              label 月利率 
              span {{item.payMonthRate}}‰
            li(class="clearfix") 
              label 用款金额 
              span(style="color:#f32f2f;") {{item.payAmount}}元
            li(class="clearfix") 
              label 用款时间 
              span {{item.payTime}}
      .empty-tip(v-show="spendList.length ===0")
        img(class="empty" src="../../assets/imgs/icon-no-apply.png")
        .tip 您暂无用信记录
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
      spendList: []
    }
  },
  computed: {
  },
  mounted () {
    this.initView()
  },
  methods: {
    initView () {
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getSpendList.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: self.$store.state.userInfo.token
        }
      }
      self.$store.dispatch('normalRequest', data).then(res => {
        if (res.response === 'success') {
          self.spendList = res.data.spendList
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
  padding:0.1px;
  background:#f5f5f5;
  .record{
    padding:0.75rem 1.25rem;
    margin:0.75rem 0;
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
}
.empty-tip{
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

