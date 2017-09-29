<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="46px" body-padding-bottom="50px")
      x-header(slot="header" title="我的" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;")
        tab(slot="default" bar-active-color="transparent")
          tab-item(selected @on-item-click="onItemClick") 系统公告
          tab-item(@on-item-click="onItemClick") 活动公告
      .content  
        ul(class="inform-list")
          li(class="clearfix")
            .left
              img(src="../../assets/imgs/icon-inform-list.png")
            .right
              h3 活动公告
              p 尊敬的用户，由于最近上线需要，服务会在晚上7点以后停止，很抱歉给您带来不便，希望您能够谅解！
          li(class="clearfix")
            .left
              img(src="../../assets/imgs/icon-inform-list.png")
            .right
              h3 活动公告
              p 尊敬的用户，由于最近上线需要，服务会在晚上7点以后停止，很抱歉给您带来不便，希望您能够谅解！
          li(class="clearfix")
            .left
              img(src="../../assets/imgs/icon-inform-list.png")
            .right
              h3 活动公告
              p 尊敬的用户，由于最近上线需要，服务会在晚上7点以后停止，很抱歉给您带来不便，希望您能够谅解！  


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
      index: 0
    }
  },
  mounted () {
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
    }
  }
}
</script>
<style lang="less" scoped>
// 1f76e2
.weui-tab{
  .vux-header{
    .vux-header-title{
      font-size: 14px;
    }
    .vux-tab{
      position: relative;
      top:5px;
      border:1px solid #1f76e2;
      border-radius: 3px;
      height:30px;
    }
    .vux-tab .vux-tab-item{
      border:none;
      line-height: 30px;
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
    margin-top:15px;
    border-bottom:1px solid #ededed;
    li{
      border-top:1px solid #ededed;
      padding:20px 15px;
      background:#fff;
      h3{
        font-size:15px;
        font-weight: normal;
        color:#333;
      }
      p{
        font-size:13px;
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
      width:40px;
      height:40px;
    }
  }
}
</style>

