<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        tab(slot="default" bar-active-color="transparent")
          tab-item(selected @on-item-click="onItemClick('0')") 系统公告
          tab-item(@on-item-click="onItemClick('1')") 活动公告
      scroller(ref="informScroller" :lock-x="true"  :bounce="true" :use-pulldown="true" :pulldown-config="pulldownConfig" @on-pulldown-loading="onPulldownLoading")
        .content  
          ul(v-show="isSystemInform" class="inform-list")
            li(class="clearfix" v-for="item in systemInform")
              .left
                img(src="../../assets/imgs/icon-system-inform.png")
              .right
                h3(class="clearfix") 
                  span(class="fl") 系统公告
                  span(class="fr") {{item.createTime}}
                p(style="margin-top:0.5rem;") {{item.content}}
            p(v-show="systemInform.length===0" class="empty-tip") 暂无系统公告~
          ul(v-show="!isSystemInform" class="inform-list")
            li(class="clearfix" v-for="item in userInform")
              .left
                img(src="../../assets/imgs/icon-inform-list.png")
              .right
                h3(class="clearfix") 
                  span(class="fl") 系统公告
                  span(class="fr") {{item.createTime}}
                p(style="margin-top:0.5rem;") {{item.content}}
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
      userInform: [],
      pulldownConfig: {
        content: '下拉刷新~',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新~',
        upContent: '释放刷新~',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      }
    }
  },
  mounted () {
    this.getInformList('0')
  },
  methods: {
    onPulldownLoading () {
      let self = this
      self.isSystemInform ? this.getInformList('0') : this.getInformList('1')
      self.$nextTick(() => {
        //   // 视图更新完成后停止刷新或加载动作
        self.$refs.informScroller.donePulldown()
        self.$refs.informScroller.reset({
          top: 0
        })
      })
    },
    onItemClick (index) {
      index === '0' ? this.isSystemInform = true : this.isSystemInform = false
      this.getInformList(index)
    },
    getInformList (type) {
      // 通知通告接口 无法解析出参
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/getAppNoticeList.do'
      let data = {
        path: path,
        params: {
          type: type
        }
      }
      // 显示
      this.$vux.loading.show({
        text: 'Loading'
      })
      self.$store.dispatch('normalRequest', data).then(res => {
        // alert(JSON.stringify(res))
        if (res.response === 'success') {
          type === '0' ? self.systemInform = res.data : self.userInform = res.data
        } else {
          this.$vux.toast.text('公告数据获取失败~')
        }
        this.$vux.loading.hide()
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

