import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
const state = {
  isLoading: true,
  direction: 'forward',
  baseUrl: 'http://194.168.1.154:8080', // 基础地址
  imglist: [], // 轮播图
  faceId: '人脸照片', // 人脸照片
  canApply: 0,
  userInfo: { // 用户信息
    isAuth: false,
    name: '',
    id: '', // 用户userId
    token: '', // 登录令牌
    cellphone: '', // 手机号码
    status: '', // 用户状态 1:正常 2:锁定
    avatarUploaded: '', // 是否上传头像 0:未上传 1:已上传
    avatar: '',
    idCard: ''
  },
  applyNo: '', // 本人申请编号
  loanInfo: {
    creditObj: {},
    repaymentObj: {},
    spendObj: {}
  },
  applyState: 0, // 申请进度
  spendList: [], // 我的用信
  repaymentList: [], // 我的还款
  creditList: [], // 我的授信
  isOpenGesture: false, // 是否开启手势密码
  tabItem: 0, // 当前tab选择
  channel: '', // 渠道 1:安卓手机APP 2:IOS版手机APP 3:网页
  imei: '', // 设备imei
  bankCardList: [], // 银行卡列表
  avatar: '', // 头像地址
  signInfo: { // 签约信息
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
