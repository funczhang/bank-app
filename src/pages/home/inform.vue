<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        tab(slot="default" bar-active-color="transparent")
          tab-item(selected @on-item-click="onItemClick") 系统公告
          tab-item(@on-item-click="onItemClick") 活动公告
      .content  
        ul(v-show="isSystemInform" class="inform-list")
          li(class="clearfix" v-for="item in systemInform")
            .left
              img(src="../../assets/imgs/icon-system-inform.png")
            .right
              h3 系统公告
              p {{item.content + item.createTime + item.createUser}}
          p(v-show="systemInform.length===0" class="empty-tip") 暂无系统公告~
        ul(v-show="!isSystemInform" class="inform-list")
          li(class="clearfix" v-for="item in userInform")
            .left
              img(src="../../assets/imgs/icon-inform-list.png")
            .right
              h3 活动公告
              p {{item.content + item.createTime + item.createUser}}
          p(v-show="userInform.length===0" class="empty-tip") 暂无用户公告~

</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Scroller } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Scroller
  },
  data () {
    return {
      index: 0,
      isSystemInform: true,
      systemInform: [],
      userInform: []
    }
  },
  mounted () {
    this.getInformList()
  },
  activated () {
    // this.getInformList()
  },
  methods: {
    onItemClick (index) {
      index === 0 ? this.isSystemInform = true : this.isSystemInform = false
    },
    getInformList () {
      // 通知通告接口 无法解析出参
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/homePageInit.do'
      let data = {
        path: path
      }
      self.$store.dispatch('initRequest', data).then(res => {
        let arr = []
        let data = eval('(' + res + ')')
        if (data.response === 'success') {
          arr = data.data.noticeList
          arr.forEach((element) => {
            element.type === 0 ? this.systemInform.push(element) : this.userInform.push(element)
          })
        } else {
          this.$vux.toast.text('系统公告数据获取失败~')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
// 1f76e2
.weui-tab{
  .vux-header{
    .vux-header-title{
      font-size: 0.7rem;
    }
    .vux-tab{
      position: relative;
      top:0.25rem;
      border:1px solid #1f76e2;
      border-radius: 3px;
      height:1.5rem;
    }
    .vux-tab .vux-tab-item{
      border:none;
      line-height: 1.5rem;
      color:#1f76e2;
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
      background:#1f76e2;
      color:#fff;
    }
  }
}
.content{
  .inform-list{
    margin-top:0.75rem;
    border-bottom:1px solid #ededed;
    li{
      border-top:1px solid #ededed;
      padding:1rem 0.75rem;
      background:#fff;
      h3{
        font-size:0.75rem;
        font-weight: normal;
        color:#333;
      }
      p{
        font-size:0.65rem;
        color:#666;
      }
    }
    .left{
      float:left;
      width:15%;
    }
    .right{
      float:left;
      width:80%;
    }
    img{
      width:2rem;
      height:2rem;
    }
  }
  .empty-tip {
    font-size:0.8rem;
    text-align: center;
    padding:3rem 0;
    color:#999;
  }
}
</style>

