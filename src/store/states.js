import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
const state = {
  isLoading: true,
  direction: 'forward',
  baseUrl: 'http://192.168.2.200:8080',
  imglist: [],
  faceId: '人脸照片',
  userInfo: {
    isAuth: '',
    name: '张超',
    id: '', // 用户userId
    token: '', // 登录令牌
    cellphone: '', // 手机号码
    channel: '', // 渠道 1:安卓手机APP  2:IOS版手机APP  3:网页
    status: '', // 用户状态 1:正常 2:锁定
    avatarUploaded: '', // 是否上传头像 0:未上传 1:已上传
    base64: '',
    avatar: ''
  },
  applyNo: '', // 申请编号
  loanInfo: {
  },
  applyState: '', // 申请进度
  spendList: [], // 我的用信
  repaymentList: [], // 我的还款
  creditList: [], // 我的授信
  isOpenGesture: false,
  tabItem: 0,
  channel: '1', // 渠道 1:安卓手机APP 2:IOS版手机APP 3:网页
  imei: '111111', // 设备imei
  bankCardList: [], // 银行卡列表
  avatar: '', // 头像地址
  signInfo: {
    token: '',
    applyId: '',
    image: '',
    type: '', // 申请人 担保人
    couponId: '',
    newRate: '',
    cardNo: ''
  }
}
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
