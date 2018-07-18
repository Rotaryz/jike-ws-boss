import Vue from 'vue'
import Router from 'vue-router'
// import storage from 'storage-controller'

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
const MangageMember = () => import('pages/manage-member/manage-member')

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
      path: '/radar',
      component: Radar,
      meta: {
        title: '雷达'
      },
      children: [
        {
          path: '/overview',
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
          path: '/ranking',
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
          path: '/ai-analyse',
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
              },
              children: [
                {
                  path: 'business-card',
                  component: BusinessCard,
                  meta: {
                    title: '名片'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        title: '我的'
      },
      children: [
        {
          path: 'mangage-member',
          component: MangageMember,
          meta: {
            title: '成员管理'
          }
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
    }
  ]
})

const DEFAULT_TITLE = '总览'
// const DEFAULT_ROUTE = '/overview'
// const OAUTH_ROUTE = '/oauth'

route.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  // if (to.path === '/') {
  //   const token = storage.get('token', '')
  //   if (token) {
  //     next(DEFAULT_ROUTE)
  //   } else {
  //     next(OAUTH_ROUTE)
  //   }
  // }
  next()
})

export default route
