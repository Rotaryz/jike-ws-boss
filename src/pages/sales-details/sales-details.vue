<template>
  <transition :name="slide">

    <div class="assets-list">
      <Scroll
        class="assets"
        :bcColor="'#fff'"
        ref="scroll"
        :data="incomeList"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="_loadMore"
      >
        <div class="line"></div>
        <div class="list-item" v-for="(item, index) in incomeList" :key="index">
          <img :src="item.customer_data.image_url" class="assets-img">
          <div class="assets-content">
            <p class="assets-sn">
              <span class="assets-sn-num">订单编号: {{item.order_sn}}</span>
              <span class="assets-sn-price">{{item.total}}</span>
            </p>
            <p class="assets-buttom">
              <span class="assets-sn-time">{{item.created_at}}</span>
              <span class="assets-sn-text">{{item.status_str}}</span>
            </p>
          </div>
        </div>
      </Scroll>
      <toast ref="toast"></toast>
    </div>
  </transition>
</template>

<script>
  import { ERR_OK } from 'common/js/config'
  import { Assets } from 'api'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import { mapGetters } from 'vuex'
  const STATUS = ['待审核', '待审核', '待发货', '待收货', '已完成', '已完成']
  export default {
    name: 'sales-details',
    data () {
      return {
        incomeMore: true,
        incomeList: [],
        page: 1,
        status: STATUS,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    computed: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler () {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    async created () {
      this.page = 1
      this.incomeMore = true
      await this._getList()
    },
    methods: {
      rebuildScroll () {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      async _loadMore () {
        if (!this.incomeMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        await this._getList()
      },
      async _getList () {
        let res = await Assets.employeeOrder({page: this.page})
        if (!res.error === ERR_OK) {
          return
        }
        res = res.data
        if (this.page === 1) {
          this.incomeList = res
          return
        }
        if (!res.length && this.page !== 1) {
          this.$refs.scroll.forceUpdate()
          this.incomeMore = false
          return
        }
        this.incomeList = this.incomeList.concat(res)
      }
    },
    components: {
      Toast,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .assets-list
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 50
    background: $color-background
    .line
      margin-left: -4vw
      width: 100vw
      height: 10px
      background: $color-background
    .assets
      padding-left: 4vw
      box-sizing: border-box
    .list-item
      background: $color-white
      padding: 4vw 4vw 4vw 0
      box-sizing: border-box
      overflow: hidden
      height: 70px
      border-bottom-1px()
    .assets-img
      float: left
      height: 40px
      width: 40px
      border-radius: 50%
      margin-right: 10px
    .assets-content
      overflow: hidden
      .assets-sn, .assets-buttom
        display: flex
        justify-content: space-between
      .assets-sn
        color: $color-20202E
      .assets-buttom
        margin-top: 11px
        color: $color-888888
        font-size: $font-size-14
      .assets-sn-num
        font-size :$font-size-14
        no-wrap()
</style>
