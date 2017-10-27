<template lang="pug">
  div(style="height:100%;")
    view-box(ref="viewBox" body-padding-top="90px" body-padding-bottom="0")
      x-header(slot="header" title="我的担保" :left-options="{showBack:true,backText:''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;color:#000;")
      .content()
        tab(active-color="#1f76e2")
          tab-item(selected style="border-right:1px solid #ededed;" @on-item-click="handler(0)") 我为他人担保
          tab-item(@on-item-click="handler(1)") 他人为我担保
        scroller(ref="guaranteeScroller" height="-90" :lock-x="true" :use-pulldown="true" :pulldown-config="pulldownConfig" @on-pulldown-loading="onPulldownLoading")
          .template(v-show="isForOther")
            .for-other(v-for="item in myList")
              .applyer
                p(class="clearfix")
                  label 借款人
                  span {{item.manName}}
                p(class="clearfix")
                  label 身份证号
                  span {{item.idCard}}
                p(class="clearfix")
                  label 申请额度(元)
                  span(style="color:red;") {{item.amount}}
                p(class="clearfix to-guarantee" style="border-bottom:none;" @click="toGuarantee(item.statusNo, item.applyNo)")
                  label 状态名称 {{item.statusNo}}
                  span(style="margin-right:1rem;") {{item.statusName}}
            img(v-show="myList.length===0" src="../../assets/imgs/icon-empty.png")
            p(v-show="myList.length===0" style="padding:2rem 1rem;text-align:center;font-size:0.75rem;color:#999;") 没有我为他人担保信息
          .template(v-show="!isForOther")
            .for-me(v-for="item in othersList")
              //- .amount
              //-   p(class="title") 申请金额(元)
              //-   p(class="account") {{item.amount}}
              .applyer
                p(class="clearfix")
                  label 申请人
                  span {{item.manName}}
                p(class="clearfix")
                  label 申请金额
                  span(style="color:red;") {{item.amount}}
                p(class="clearfix")
                  label 申请时间
                  span {{item.applyTime}}
                p(class="clearfix")
                  label 担保人姓名
                  span {{item.assName}}
                p(class="clearfix")
                  label 担保人手机
                  span {{item.assPhone}}
                p(class="clearfix")
                  label 担保人身份证号
                  span {{item.assIdCard}}
                p(class="clearfix" style="border-bottom:none;")
                  label 状态名称
                  span {{item.statusName}}
            img(v-show="othersList.length===0" src="../../assets/imgs/icon-empty.png")
            p(v-show="othersList.length===0" style="padding:2rem 1rem;text-align:center;font-size:0.75rem;color:#999;") 没有他人为我担保信息
</template>

<script>
import { ViewBox, XHeader, Masker, Tab, TabItem, Scroller } from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Masker,
    Tab,
    TabItem,
    Scroller
  },
  data () {
    return {
      index: 0,
      status: {
        pullupStatus: 'default'
      },
      isForOther: true,
      myList: [],
      othersList: [],
      pulldownConfig: {
        content: '',
        height: 60,
        autoRefresh: true,
        downContent: '释放刷新~',
        upContent: '',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      }
    }
  },
  mounted () {
    // this.guaranteeForOther()
    // 调用两次解决内容显示不全的问题
    this.onPulldownLoading()
    this.onPulldownLoading()
    this.$nextTick(() => {
      //   // 视图更新完成后停止刷新或加载动作
      this.$refs.guaranteeScroller.reset({
        top: 0
      })
    })
  },
  methods: {
    handler (flag) {
      if (flag === 0) {
        this.isForOther = true
        this.guaranteeForOther()
      } else {
        this.isForOther = false
        this.guaranteeForMe()
      }
    },
    refresh () {
      if (this.isForOther) {
        this.guaranteeForOther()
      } else {
        this.guaranteeForMe()
      }
    },
    toGuarantee (status, applyNo) {
      if (status === '201') {
        // this.$router.push({path: 'HandleGuarantee'})
        this.$router.push({path: '/handleGuarantee', query: {applyNo: applyNo}})
      } else if (status === '203') {
        this.$router.push({path: '/GuaranteeSign', query: {applyNo: applyNo}})
      } else if (status === '204') {
        this.$vux.toast.text('担保已失效~')
      }
    },
    onPulldownLoading () {
      let self = this
      self.isForOther ? self.guaranteeForOther() : self.guaranteeForMe()
      self.$nextTick(() => {
        //   // 视图更新完成后停止刷新或加载动作
        self.$refs.guaranteeScroller.donePulldown()
        self.$refs.guaranteeScroller.reset({
          top: 0
        })
      })
    },
    guaranteeForOther () {
      // 我为别人担保
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/assureForOthers.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      // 我为他人担保信息
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          data.data.myList.length === 0 ? self.color = '#fff' : self.color = ''
          self.myList = data.data.myList
        } else {
          this.$vux.toast.text('我为他人担保接口返回信息有误~')
        }
        self.$refs.guaranteeScroller.reset({
          top: 0
        })
      })
    },
    guaranteeForMe () {
      // 别人为我担保
      let self = this
      let path = self.$store.state.baseUrl + '/app/xsyd/assureForMe.do'
      let data = {
        action: 'init_request',
        path: path,
        params: {
          token: this.$store.state.userInfo.token
        }
      }
      // 别人为我担保信息
      self.$store.dispatch('normalRequest', data).then(data => {
        if (data.response === 'success') {
          data.data.othersList.length === 0 ? self.color = '#fff' : self.color = ''
          self.othersList = data.data.othersList
        } else {
          this.$vux.toast.text('他人为我担保接口返回信息有误~')
        }
        self.$refs.guaranteeScroller.reset({
          top: 0
        })
        // this.$vux.loading.hide()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tab{
  .vux-header{
  border-bottom:1px solid #ededed;
}
  .icon-refresh{
    width:1rem;
    height:1rem;
  }
  .content{
    padding:0.1px;
    // background:#fff;
    .for-me,.for-other{
      margin-top:0.75rem;
      margin-bottom:0.75rem;
      padding:0 0.75rem;
      background:#fff;
      border-top:1px solid #ededed;
      border-bottom:1px solid #ededed;
    }
    .amount{
      padding:0.75rem 0;
      // border-bottom:1px solid #ededed;
      .title{
        font-size:0.75rem;
        color:#333;
        text-align: center;
        line-height: 1.5;
      }
      .account{
        font-size:1rem;
        color:#f32f2f;
        font-weight: bold;
        text-align: center;
        line-height: 1.5;
      }
    }
    .applyer,.guaranteer{
      .to-guarantee{
        background:url(../../assets/imgs/icon-arrow.png) no-repeat center right;
        background-size:0.375rem 0.625rem;
      }
      p{
        padding:0.6rem 0;
        border-bottom:1px solid #ededed;
      }
      // padding:0.75rem 0;
      // border-bottom:1px solid #ededed;
      label{
        float:left;
        width:35%;
        font-size:0.75rem;
        color:#666;
        text-align: left;
        line-height: 1.5;
        verflow: hidden;
      }
      span{
        float:right;
        width:50%;
        font-size:0.75rem;
        color:#333;
        text-align: right;
        line-height: 1.5;
        overflow: hidden;
      }
    }
    .guaranteer{
    }
    .template{
      img{
        display: block;
        margin:5rem auto 0;
        width:6.5rem;
        height:6.75rem;
      }
    }
}
}
</style>

