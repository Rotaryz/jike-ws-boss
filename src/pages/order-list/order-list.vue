<template>
  <transition :name="slide">

    <div scroll-y class="order-list" @scrolltolower="_loadMore">
      <Scroll
        ref="scroll"
        :data="orderList"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="_loadMore"
      >
        <div class="order-item" v-for="(item, index) in orderList" :key="index">
          <div class="order-top">
            <img v-if="item.customer_data" :src="item.customer_data.image_url" class="order-img">
            <span v-if="item.customer_data" class="order-name">{{item.customer_data.nickname}}</span>
            <span class="order-status">{{item.status_str}}</span>
          </div>
          <div class="order-center">
            <div class="order-content" v-for="(items, idx) in item.order_details" :key="idx">
              <img :src="items.goods_image_url" class="order-pic">
              <div class="order-detail">
                <p class="order-title">{{items.goods_title}}</p>
                <p class="order-msg">
                  <span class="order-msg-item">¥{{items.price}}</span>
                  <span class="order-msg-item">x {{items.num}}</span>
                </p>
              </div>
            </div>
            <div class="order-time-box">
              <p class="order-time">{{item.created_at}}</p>
              <div class="order-money">
                总计:<span class="order-price">{{item.total}}</span>
              </div>
            </div>
          </div>
          <div class="add-box" v-if="item.status_str === '已完成'">
            <div class="order-add-name">{{item.address.receiver_name}} {{item.address.receiver_mobile}}</div>
            <div class="order-add-detail">{{item.address.receiver_full_address}}</div>
          </div>
          <div class="order-bottom">
            订单编号:{{item.order_sn}}
          </div>
        </div>
      </Scroll>
      <toast ref="toast"></toast>
    </div>
  </transition>
</template>

<script>
  import { ERR_OK } from 'common/js/config'
  import { Customer } from 'api'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import { mapGetters } from 'vuex'

  export default {
    name: 'order-list',
    data () {
      return {
        orderList: [],
        page: 1,
        orderMore: true,
        status: '',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '',
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
      this.orderMore = true
      this.orderList = []
      await this._getOrderList()
    },
    methods: {
      rebuildScroll () {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      // _goDetail (item) {
      //   if (!this.isMine) {
      //     return
      //   }
      //   let url = `/pages/order-detail/order-detail?id=${item.id}`
      //   this.$router.push(url)
      // },
      async _loadMore () {
        if (!this.orderMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        await this._getOrderList()
      },
      async _getOrderList () {
        let data = {page: this.page}
        let res = await Customer.customerOrder(data)
        if (res.error !== ERR_OK) {
          return
        }
        res = res.data
        if (this.page === 1) {
          this.orderList = res
          return
        }
        if (!res.length && this.page !== 1) {
          this.$refs.scroll.forceUpdate()
          this.orderMore = false
          return
        }
        this.orderList = this.orderList.concat(res)
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
  .order-list
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 50
    background: $color-background

  .order-item
    padding-left: 15px
    background: $color-white
    margin-top: 10px
    .order-top
      display: flex
      align-items: center
      height: 40px
      position: relative
      border-bottom-1px()
      .order-img
        height: 25px
        width: 25px
        background: $color-col-line
        border-radius: 50%
      .order-name
        margin-left: 6px
        color: $color-20202E
        font-size: $font-size-14
        font-family: $font-family-meddle
      .order-status
        position: absolute
        right: 15px
        col-center()
        color: $color-56
        font-size: $font-size-14
        font-family: $font-family-regular
    .order-center
      height: 138px
      box-sizing: border-box
      padding: 15px 15px 15px 0
      border-bottom-1px()
      .order-content
        overflow: hidden
        .order-pic
          height: 75px
          width: 75px
          float: left
          border-radius: 2px
        .order-detail
          height: 75px
          overflow: hidden
          position: relative
          .order-title
            margin-left: 10px
            font-family: $font-family-regular
            font-size: $font-size-14
            color: $color-20202E
            line-height: 18px
          .order-msg
            padding-left: 10px
            box-sizing: border-box
            font-size: $font-size-14
            font-family: $font-family-regular
            color: $color-888888
            display: flex
            justify-content: space-between
            position: absolute
            bottom: 2px
            line-height: 1
            width: 100%
      .order-time-box
        display: flex
        margin-top: 19px
        justify-content: space-between
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-888888
        line-height: 1
        align-items: flex-end
        .order-money
          color: $color-20202E
        .order-price
          margin-left: 12.5px
          font-size: $font-size-20
          color: $color-20202E
          position: relative
          &:after
            position: absolute
            content: '¥'
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-20202E
            left: -8.5px
            bottom: 5px
    .order-add-name
      margin: 10px 0
      font-size: $font-size-14
      color: $color-20202E
      font-family: $font-family-medium
      no-wrap()
    .order-add-detail
      no-wrap()
      font-family :$font-family-regular
      font-size: $font-size-14
      color :$color-888888
      padding-bottom: 10px
      border-bottom-1px()

  .order-bottom
    line-height: 40.5px
    font-size: $font-size-14
    font-family: $font-family-regular
    color: $color-888888
</style>