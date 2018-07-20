<template>
  <transition name="slide">
    <div class="manage-box">
      <div class="scroll-wrapper">
        <scroll ref="scroll"
                :data="itemlist"
                :probeType="probeType"
                :pullUpLoad="pullUpLoadObj"
                :showNoMore="false"
                :listenScroll="listenScroll"
                @pullingUp="onPullingUp">
          <div class="choose-box"  v-if="list.length !== 0">
            <div class="title">选择商品</div>
            <ul class="choose-list">
              <li class="list-item"  v-for="(item, index) in list" v-bind:key="item.id" @click="chooceItem(item, index)">
                <div class="item-left">
                  <img :src="item.image_url" alt="" class="item-img">
                  <div class="item-info">
                    <div class="title">{{item.title}}</div>
                    <div class="price-box">
                      <div class="price">现价：¥{{item.platform_price}}</div>
                      <div class="line-price">¥{{item.original_price}}</div>
                    </div>
                    <div class="sell-count">销量：{{item.sales_volume}}</div>
                  </div>
                </div>
                <div class="item-right">
                  <div class="item-icon" v-if="chooseIndex * 1 !== index"></div>
                  <img src="./icon-pitchup@2x.png" alt="" class="item-right-true" v-if="chooseIndex * 1 === index">
                </div>
              </li>
            </ul>
          </div>
          <section class="exception-box" v-if="list.length === 0">
            <exception errType="nodata"></exception>
          </section>
        </scroll>
      </div>
      <div class="sumbit-btn" :class="chooseIndex >=  0 ? '' : 'sumbit-no-btn'" @click="saveBack">完成</div>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import {Activity} from 'api'
  import {ERR_OK} from 'common/js/config'
  import Exception from 'components/exception/exception'

  export default {
    name: 'choose-goods',
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        itemlist: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        name: '',
        phone: '',
        id: null,
        page: 1,
        list: [],
        chooseIndex: -1,
        curItem: {}
      }
    },
    created() {
      this.id = this.$route.query.id
      console.log(this.id)
      if (this.id * 1 === 1) {
        this.getGrouponGoodsList()
      } else {
        this.getBargainGoodsList()
      }
    },
    methods: {
      ...mapMutations({ // 同步
        saveInfo: 'GOODSINFO'
      }),
      getGrouponGoodsList() {
        this.page = 1
        Activity.getGrouponServeList(this.page).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.list = res.data
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getGrouponMoreUpList() {
        if (this.upMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Activity.getGrouponServeList(this.page).then((res) => {
          if (res.error === ERR_OK) {
            this.list.push(...res.data)
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      getBargainGoodsList() {
        this.page = 1
        Activity.getBargainServeList(this.page).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.list = res.data
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getBargainMoreUpList() {
        if (this.upMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Activity.getBargainServeList(this.page).then((res) => {
          if (res.error === ERR_OK) {
            this.list.push(...res.data)
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isUpList(res) {
        this.page++
        if (this.list.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      onPullingUp() {
        if (this.id * 1 === 1) {
          this.getGrouponMoreUpList()
        } else {
          this.getBargainMoreUpList()
        }
      },
      chooceItem(item, index) {
        this.chooseIndex = index
        this.curItem = item
      },
      saveBack() {
        this.saveInfo(this.curItem)
        this.$emit('getInfo')
        this.$router.back()
      }
    },
    components: {
      Toast,
      Exception,
      Scroll
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .exception-box
    padding-top: 70px
  .manage-box
    fill-box()
    z-index: 51
    .scroll-wrapper
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 45px
      overflow: hidden
  .choose-box
    padding: 15px
    .title
      font-size: $font-size-16
      color: $color-20202E
      font-family: $font-family-regular
  .sumbit-btn
    position: fixed
    z-index: 51
    height: 45px
    background: $color-20202E
    width: 100%
    left: 0
    text-align: center
    line-height: 45px
    color: $color-white-fff
    font-family: $font-family-meddle
    font-size: $font-size-16
    bottom: 0
  .list-item
    margin-top: 15px
    background: $color-white-fff
    layout(row)
    align-items: center
    justify-content:space-between
    .item-left
      layout(row)
      align-items: center
      flex: 1
      padding: 10px
      overflow: hidden
      border-right: 0.5px dashed rgba(0,0,0,.1)
      .item-img
        display: block
        width: 70px
        height: 70px
        margin-right: 10px
      .item-info
        flex: 1
        overflow: hidden
        .title
          color: $color-20202E
          font-family: $font-family-regular
          font-size: $font-size-14
          no-wrap()
        .price-box
          layout(row)
          margin-top: 15px
          .price
            color: $color-888888
            font-family: $font-family-regular
            font-size: $font-size-12
            margin-right: 4px
          .line-price
            color: $color-ccc
            font-family: $font-family-regular
            font-size: $font-size-12
            text-decoration: line-through
        .sell-count
          color: $color-888888
          font-family: $font-family-regular
          font-size: $font-size-12
          margin-top: 4px
    .item-right
      width: 80px
      position: relative
      .item-icon
        position: absolute
        width: 20px
        height: 20px
        border: 0.5px solid #ccc
        border-radius: 50%
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
      .item-right-true
        display: block
        position: absolute
        width: 20px
        height: 20px
        border-radius: 50%
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
  .sumbit-no-btn
    background: #888
</style>
