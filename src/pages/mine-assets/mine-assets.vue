<template>
  <transition :name="slide">
    <div class="mine-assets">
      <div class="mine-bg"></div>
      <div class="assets-top">
        <img src="./pic-khxqbg@2x.png" class="assets-bg">
        <div class="assets-price">{{money.remaining}}</div>
        <p class="assets-tip">可提现(元)</p>
        <div class="assets-btn" @click="_getMoney">提现</div>
        <router-link class="assets-card" :to="url">绑定银行卡</router-link>
      </div>
      <scroll
        class="assets-list"
        v-if="height"
        :style="{'height': height - 224 + 'px'}"
        ref="scroll"
        :bcColor="'#fff'"
        :data="assetsList"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="_loadMore"
      >
        <div class="list-item" v-for="(item, index) in assetsList" :key="index">
          <img :src="item.image_url" class="assets-img">
          <div class="assets-content">
            <p class="assets-sn">
              <span class="assets-sn-num">订单编号: {{item.withdraw_sn}}</span>
              <span class="assets-sn-price">{{item.total}}</span>
            </p>
            <p class="assets-buttom">
              <span class="assets-sn-time">{{item.created_at}}</span>
              <span class="assets-sn-text">{{statusType[item.status]}}</span>
            </p>
          </div>
        </div>
      </scroll>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import { ERR_OK } from 'common/js/config'
  import { Assets } from 'api'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import { mapGetters } from 'vuex'

  const STATUSTYPE = ['待审核', '受理成功', '审核不通过', '提现成功', '提现失败']
  export default {
    name: 'mine-assets',
    data () {
      return {
        money: {},
        assetsList: [],
        page: 1,
        statusType: STATUSTYPE,
        assetsMore: true,
        id: '',
        height: 0,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    computed: {
      url () {
        let url = this.id ? `mine-assets/bank-card?id=${this.id}` : 'mine-assets/bank-card'
        return url
      },
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
    created () {
      this._showMoney()
      this._withdrawList()
    },
    mounted () {
      this.height = document.querySelector('.mine-assets').offsetHeight
    },
    methods: {
      rebuildScroll () {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      _getMoney () {
        if (!this.money.can_withdrawal) {
          this.$refs.toast.show('请绑定银行卡')
          return false
        }
        this.$router.push('mine-assets/with-draw')
      },
      _showMoney () {
        Assets.showMoney().then((res) => {
          if (res.error === ERR_OK) {
            this.money = {remaining: res.data.remaining, can_withdrawal: res.data.can_withdrawal}
            this.id = res.data.withdrawal_info.id || ''
          }
        })
      },
      _loadMore () {
        if (!this.assetsMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        this._withdrawList()
      },
      _withdrawList () {
        Assets.withdrawList({page: this.page}).then((res) => {
          if (res.error === ERR_OK) {
            if (this.page === 1) {
              this.assetsList = res.data
              return
            }
            if (!res.data.length && this.page !== 1) {
              this.$refs.scroll.forceUpdate()
              this.assetsMore = false
              return
            }
            this.assetsList = this.assetsList.concat(res.data)
          }
        })
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
  .mine-assets
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 50
    background: $color-background

  .mine-bg
    height: 63px
    background: $color-20202E

  .assets-top
    box-shadow: linear-gradient(-90deg, #DFEEFB 4%, #F1ECF9 95%)
    border-radius: 2px
    overflow: hidden
    width: 92vw
    margin: -50.5px auto 0
    background: $color-white
    height: 200px
    position: relative
    display: flex
    flex-direction: column
    align-items: center
    .assets-bg
      width: 100%
      height: 200px
      position: absolute
      top: 0
      left: 0
    .assets-price, .assets-tip, .assets-btn, .assets-card
      position: relative
      line-height: 1
      z-index: 10
    .assets-price
      color: $color-20202E
      margin-top: 25px
      font-size: 45px
      height: 45px
      font-family: DINAlternate-Bold
      position: relative
      &::before
        content: '¥'
        color: $color-20202E
        font-size: 30px
        position: absolute
        font-family: $font-family-regular
        z-index: 10
        bottom: 4px
        left: -22px
    .assets-tip
      margin-top: 7.5px
      color: $color-888888
      font-family: $font-family-regular
      font-size: $font-size-14
    .assets-btn
      margin-top: 20px
      width: 136px
      height: 32px
      line-height: 32px
      text-align: center
      font-size: $font-size-14
      background: $color-20202E
      color: $color-white
      border-radius: 2px
    .assets-card
      margin-top: 15px
      text-decoration: underline
      color: $color-20202E
      font-family: $font-family-regular
      font-size: $font-size-14

  .assets-list
    padding-left: 4vw
    box-sizing: border-box
    margin-top: 15px

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
      no-wrap()

</style>