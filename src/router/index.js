import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage', // 主页
      components: {
        'default': resolve => require(['../pages/home/index.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/inform', // 通知公告
      name: 'Inform',
      components: {
        'default': resolve => require(['../pages/home/inform.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/quotaEvaluation', // 额度评估中
      name: 'QuotaEvaluation',
      components: {
        'default': resolve => require(['../pages/loan/quotaEvaluation.vue'], resolve)
      }
    },
    {
      path: '/fail', // 申请失败
      name: 'Fail',
      components: {
        'default': resolve => require(['../pages/loan/loanFail.vue'], resolve)
      }
    },
    {
      path: '/success', // 申请成功
      name: 'Success',
      components: {
        'default': resolve => require(['../pages/loan/loanSuccess.vue'], resolve)
      }
    },
    {
      path: '/sign', // 签约
      name: 'Sign',
      components: {
        'default': resolve => require(['../pages/loan/signed.vue'], resolve)
      }
    },
    {
      path: '/checkLoan', // 查看我的贷款信息
      name: 'CheckLoan',
      components: {
        'default': resolve => require(['../pages/loan/checkLoan.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/useCreditRecord', // 查看我的用信信息
      name: 'UseCreditRecord',
      components: {
        'default': resolve => require(['../pages/loan/useCreditRecord.vue'], resolve)
      }
    },
    {
      path: '/repaymentRecord', // 查看我的还款信息
      name: 'RepaymentRecord',
      components: {
        'default': resolve => require(['../pages/loan/repaymentRecord.vue'], resolve)
      }
    },
    {
      path: '/giveCreditRecord', // 查看我的授信信息
      name: 'GiveCreditRecord',
      components: {
        'default': resolve => require(['../pages/loan/giveCreditRecord.vue'], resolve)
      }
    },
    {
      path: '/more', // 更多模块主页
      name: 'More',
      components: {
        'default': resolve => require(['../pages/more/index.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/loan', // 贷款主页
      name: 'Loan',
      components: {
        'default': resolve => require(['../pages/loan/index.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/my', // 我的模块
      name: 'My',
      components: {
        'default': resolve => require(['../pages/my/index.vue'], resolve),
        'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    },
    {
      path: '/myGurantee', // 我的模块
      name: 'MyGuarantee',
      components: {
        'default': resolve => require(['../pages/my/myGuarantee.vue'], resolve)
      }
    },
    {
      path: '/handleGuarantee', // 我的模块
      name: 'HandleGuarantee',
      components: {
        'default': resolve => require(['../pages/my/handleGuarantee.vue'], resolve)
      }
    },
    {
      path: '/bankCardList', // 我的模块
      name: 'BankCardList',
      components: {
        'default': resolve => require(['../pages/my/bankCardList.vue'], resolve)
      }
    },
    {
      path: '/addCard', // 我的模块
      name: 'AddCard',
      components: {
        'default': resolve => require(['../pages/my/addCard.vue'], resolve)
      }
    },
    {
      path: '/verfied', // 我的模块
      name: 'Verfied',
      components: {
        'default': resolve => require(['../pages/my/verfied.vue'], resolve)
      }
    },
    {
      path: '/setting', // 我的模块
      name: 'Setting',
      components: {
        'default': resolve => require(['../pages/my/setting.vue'], resolve)
      }
    },
    {
      path: '/managePwd', // 我的模块
      name: 'ManagePwd',
      components: {
        'default': resolve => require(['../pages/my/managePwd.vue'], resolve)
      }
    },
    {
      path: '/changePhone', // 我的模块
      name: 'ChangePhone',
      components: {
        'default': resolve => require(['../pages/my/changePhone.vue'], resolve)
      }
    },
    {
      path: '/couponList', // 我的模块
      name: 'CouponList',
      components: {
        'default': resolve => require(['../pages/my/couponList.vue'], resolve)
      }
    },
    {
      path: '/login', // 我的模块
      name: 'Login',
      components: {
        'default': resolve => require(['../pages/my/login.vue'], resolve)
      }
    },
    {
      path: '/register', // 我的模块
      name: 'Register',
      components: {
        'default': resolve => require(['../pages/my/register.vue'], resolve)
      }
    },
    {
      path: '/suggest', // 我的模块
      name: 'Suggest',
      components: {
        'default': resolve => require(['../pages/more/suggest.vue'], resolve)
      }
    },
    {
      path: '/iframe', // 内嵌页面
      name: 'Iframe',
      components: {
        'default': resolve => require(['../pages/common/iframe.vue'], resolve)
        // 'tabbar': resolve => require(['../pages/common/tabbar.vue'], resolve)
      }
    }
  ]
})
