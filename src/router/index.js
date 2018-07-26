import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const Home = () => import('pages/home/home')
const Oauth = () => import('pages/oauth/oauth')
const Radar = () => import('pages/radar/radar')
const Overview = () => import('pages/overview/overview')
const Ranking = () => import('pages/ranking/ranking')
const AI = () => import('pages/ai-analyse/ai-analyse')
const CustomerList = () => import('pages/customer-list/customer-list')
const CustomerDetail = () => import('pages/customer-detail/customer-detail')
const CustomerData = () => import('pages/customer-data/customer-data')
const CapacityModel = () => import('pages/capacity-model/capacity-model')
const BusinessCard = () => import('pages/business-card/business-card')
const PageError = () => import('pages/page-error/page-error')
const Mine = () => import('pages/mine/mine')
const ManageMember = () => import('pages/manage-member/manage-member')
const AddMember = () => import('pages/add-member/add-member')
const ManageProduct = () => import('pages/manage-product/manage-product')
const ManageActivity = () => import('pages/manage-activity/manage-activity')
const NewGoods = () => import('pages/new-goods/new-goods')
const NewActivity = () => import('pages/new-activity/new-activity')
const ChooseGoods = () => import('pages/choose-goods/choose-goods')
const IncomeDetails = () => import('pages/income-details/income-details')
const SalesDetails = () => import('pages/sales-details/sales-details')
const OrderList = () => import('pages/order-list/order-list')
const MineAssets = () => import('pages/mine-assets/mine-assets')
const WithDraw = () => import('pages/with-draw/with-draw')
const BankCard = () => import('pages/bank-card/bank-card')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/oauth'
    // },
    {
      path: '/oauth',
      component: Oauth
    },
    {
      path: '/page-error',
      component: PageError,
      meta: {
        title: '异常'
      }
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'radar',
          component: Radar,
          meta: {
            title: '雷达'
          },
          children: [
            {
              path: 'overview',
              component: Overview,
              meta: {
                title: '总览'
              },
              children: [
                {
                  path: 'customer-list',
                  component: CustomerList,
                  meta: {
                    title: '客户列表'
                  },
                  children: [
                    {
                      path: 'customer-detail',
                      component: CustomerDetail,
                      meta: {
                        title: '客户详情'
                      },
                      children: [
                        {
                          path: 'customer-data',
                          component: CustomerData,
                          meta: {
                            title: '客户资料'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'ranking',
              component: Ranking,
              meta: {
                title: '排行榜'
              },
              children: [
                {
                  path: 'customer-list',
                  component: CustomerList,
                  meta: {
                    title: '客户'
                  },
                  children: [
                    {
                      path: 'customer-detail',
                      component: CustomerDetail,
                      meta: {
                        title: '客户详情'
                      },
                      children: [
                        {
                          path: 'customer-data',
                          component: CustomerData,
                          meta: {
                            title: '客户资料'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'ai-analyse',
              component: AI,
              meta: {
                title: 'AI分析'
              },
              children: [
                {
                  path: 'capacity-model',
                  component: CapacityModel,
                  meta: {
                    title: '能力模型'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'mine',
          component: Mine,
          meta: {
            title: '我的'
          },
          children: [
            {
              path: 'manage-member',
              component: ManageMember,
              meta: {
                title: '成员管理'
              },
              children: [
                {
                  path: 'add-member',
                  component: AddMember,
                  meta: {
                    title: '添加成员'
                  }
                }
              ]
            }, {
              path: 'income-details',
              component: IncomeDetails,
              meta: {
                title: '收入明细'
              }
            }, {
              path: 'sales-details',
              component: SalesDetails,
              meta: {
                title: '销售明细'
              }
            }, {
              path: 'order-list',
              component: OrderList,
              meta: {
                title: '订单明细'
              }
            }, {
              path: 'mine-assets',
              component: MineAssets,
              meta: {
                title: '我的资产'
              },
              children: [{
                path: 'with-draw',
                component: WithDraw,
                meta: {
                  title: '提现'
                }
              }, {
                path: 'bank-card',
                component: BankCard,
                meta: {
                  title: '绑定银行卡'
                }
              }]
            },
            {
              path: 'manage-product',
              component: ManageProduct,
              meta: {
                title: '我的产品'
              },
              children: [
                {
                  path: 'new-goods',
                  component: NewGoods,
                  meta: {
                    title: '新建商品'
                  }
                }
              ]
            },
            {
              path: 'manage-activity',
              component: ManageActivity,
              meta: {
                title: '活动管理'
              },
              children: [
                {
                  path: 'new-activity',
                  component: NewActivity,
                  meta: {
                    title: '新建活动'
                  },
                  children: [
                    {
                      path: 'choose-goods',
                      component: ChooseGoods,
                      meta: {
                        title: '选择商品'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/customer-detail',
      component: CustomerDetail,
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/customer-data',
      component: CustomerData,
      meta: {
        title: '客户资料'
      }
    },
    {
      path: 'business-card',
      component: BusinessCard,
      meta: {
        title: '名片'
      }
    }
  ]
})

const DEFAULT_TITLE = '总览'
const DEFAULT_ROUTE = '/radar'
const OAUTH_ROUTE = '/oauth'

route.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  if (to.path === '/') {
    const token = storage.get('token', '')
    if (token) {
      next(DEFAULT_ROUTE)
    } else {
      next(OAUTH_ROUTE)
    }
  }
  next()
})

export default route
