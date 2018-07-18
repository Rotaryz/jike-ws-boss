<template>
  <transition :name="slide">
    <article class="customer-list">
      <div v-if="dataArray.length">
        <div class="progress" :style="progressStyle"></div>
        <div class="title">{{titleTxt}}</div>
        <div class="info-bar">全部 {{dataArray.length}} 位</div>
        <section class="content">
          <scroll ref="scroll"
                  bcColor="#fff"
                  :data="dataArray"
                  :pullUpLoad="pullUpLoadObj"
                  @pullingUp="onPullingUp"
          >
            <div class="user-card-box" v-for="(item,index) in dataArray" :key="index" @click="toCustomerDetail">
              <user-card :cardInfo="item" :idx="index" :useType="useType"></user-card>
            </div>
          </scroll>
        </section>
      </div>
      <section class="exception-box" v-if="isEmpty">
        <exception errType="customer"></exception>
      </section>
      <toast ref="toast"></toast>
      <router-view @refresh="refresh"></router-view>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from 'common/js/config'
  import Exception from 'components/exception/exception'
  import {mapGetters} from 'vuex'
  import {Rank} from 'api'

  const progressInfo = [
    ['#57BA15', `预计成交率0-50%`],
    ['#F9B43C', `预计成交率51-80%`],
    ['#F9863C', `预计成交率81-99%`],
    ['#F9543D', `预计成交率100%`]
  ]
  const LIMIT = 10
  export default {
    name: 'CustomerList',
    data() {
      return {
        progress: 0,
        dataArray: [],
        isEmpty: false,
        page: 1,
        limit: LIMIT,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        pageUrl: '', // 父级路由
        parentId: '', // 父级的ID
        useType: 'overview', // 排行榜客户
        isAll: false
      }
    },
    created() {
      this._getParams()
      this._rqGetStaffList()
    },
    methods: {
      refresh() {
        this.resetReqParams()
        this._rqGetStaffList()
      },
      resetReqParams() {
        this.page = 1
        this.limit = LIMIT
        this.isAll = false
      },
      _getParams() {
        this.parentId = this.$route.query.id
        this.pageUrl = this.$route.query.pageUrl
        this.progress = this.$route.query.progress || 0
        console.log(this.progress)
        const useType = this.$route.query.useType
        useType && (this.useType = useType)
      },
      toCustomerDetail(item) {
        const id = item.id
        const pageUrl = this.pageUrl + `/customer-detail`
        this.$router.push({path: pageUrl, query: {id, pageUrl}})
      },
      _rqGetStaffList() {
        // tab类型 1：按客户数，2：跟进客户数，3：咨询客户数，4：按成交率 - 1
        // 事件类型： all yesterday week month - all
        // 成功率类型 1： 0~50% 2：51%~80% 3：81~99%，4：100% - 0
        const data = {
          merchant_id: 0,
          employee_id: 0,
          page: 1,
          limit: LIMIT
        }
        Rank.getStaffList(data).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray = res.data
            this.isEmpty = !this.dataArray.length
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      onPullingUp() {
        // 更新数据 todo
        console.info('pulling up and load data')
        // let page = ++this.page
        // let limit = this.limit
        // const data = {order_by: '', page, limit}
        // Client.getCusomerList(data).then(res => {
        //   if (res.error === ERR_OK) {
        //     if (res.data && res.data.length) {
        //       let newArr = this.dataArray.concat(res.data)
        //       this.dataArray = newArr
        //     } else {
        //       this.$refs.scroll.forceUpdate()
        //     }
        //   } else {
        //     this.$refs.toast.show(res.message)
        //   }
        // })
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    computed: {
      titleTxt() {
        const index = this.progressIndex
        return progressInfo[index][1]
      },
      progressIndex() {
        const progress = this.progress * 1
        if (Math.max(progress, 50) <= 50) return 0
        if (Math.max(progress, 80) <= 80) return 1
        if (Math.max(progress, 99) <= 99) return 2
        return 3
      },
      progressStyle() {
        const index = this.progressIndex
        return `background-color:${progressInfo[index][0]}`
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      ...mapGetters(['ios']),
      slide() {
        return this.ios ? '' : 'slide'
      }
    },
    components: {
      UserCard,
      Scroll,
      Toast,
      Exception
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .exception-box
    padding-top: 137px

  .customer-list
    fill-box()
    layout(column, block, nowrap)
    background-color: $color-white-fff
    z-index: 10
    .progress
      height: 5px
    .title
      font-family: $font-family-meddle
      font-size: $font-size-16
      color: $color-20202E
      height: 45px
      line-height: 45px
      text-align: center
    .info-bar
      font-family: $font-family-regular
      font-size: $font-size-12
      color: $color-888888
      height: 24px
      padding-left: 15px
      line-height: 24px
      background-color: $color-F0F2F5
    .content
      flex: 1
      overflow: hidden
      .user-card-box
        height: 75px
        padding-left: 15px
</style>
