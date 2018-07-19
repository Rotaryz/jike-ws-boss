<template>
  <transition name="slide">
    <div class="manage-box">
      <div class="product-tab">
        <div class="tab-box" @click="changeTab(1)">已上架</div>
        <div class="tab-box" @click="changeTab(0)">已下架</div>
        <div class="line" :style="'transform:translate3d('+ (100 * (1 - menuIdx)) + '%, 0, 0)'">
          <div class="line-box"></div>
        </div>
      </div>
      <scroll  ref="scroll"
               :data="itemlist"
               :probeType="probeType"
               :pullUpLoad="pullUpLoadObj"
               :showNoMore="false"
               :listenScroll="listenScroll"
               @pullingUp="onPullingUp">
        <div class="product-top"></div>
        <div class="up-box" v-if="menuIdx * 1 === 1">
          <ul class="up-list">
            <li class="up-list-item" v-for="(item, index) in upList" v-bind:key="index">
              <div class="up-list-bottom">
                <img :src="item.image_url" alt="" class="img_url">
                <div class="bottom-right">
                  <div class="title">{{item.title}}</div>
                  <div class="info-box">
                    <div class="info-left">
                      <div class="info-text">
                        <div class="price-box">
                          <div class="price">现价：¥{{item.platform_price}}</div>
                          <div class="line-price">¥{{item.original_price}}</div>
                        </div>
                        <div class="price-text">销   量：{{item.sale_count}}</div>
                      </div>
                    </div>
                    <img src="./icon-operate@2x.png" v-if="showIndex !== index || !showBox" alt="" class="info-img" @click="showChoose(index)">
                    <img src="./icon-operate_pressed@2x.png" alt="" class="info-img" @click="showChoose(index)" v-if="showBox && showIndex === index">
                  </div>
                </div>
              </div>
              <div class="up-list-big-choose" >
                <div class="up-list-choose" :class="showBox && showIndex === index ? 'up-list-choose-active' : ''">
                  <div class="choose-box">
                    <img src="./icon-compile@2x.png" alt="" class="box-top">
                    <p class="box-top-text">编辑</p>
                  </div>
                  <div class="choose-box" @click="downProductBtn(item)">
                    <img src="./icon-shelves@2x.png" alt="" class="box-top">
                    <p class="box-top-text">下架</p>
                  </div>
                  <div class="choose-box" @click="delProductBtn(item)">
                    <img src="./icon-delete@2x.png" alt="" class="box-top">
                    <p class="box-top-text">删除</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="up-box" v-if="menuIdx * 1 === 0">
          <ul class="up-list">
            <li class="up-list-item" v-for="(item, index) in downList" v-bind:key="index">
              <div class="up-list-bottom">
                <img :src="item.image_url" alt="" class="img_url">
                <div class="bottom-right">
                  <div class="title">{{item.title}}</div>
                  <div class="info-box">
                    <div class="info-left">
                      <div class="info-text">
                        <div class="price-box">
                          <div class="price">现价：¥{{item.platform_price}}</div>
                          <div class="line-price">¥{{item.original_price}}</div>
                        </div>
                        <div class="price-text">销   量：{{item.sale_count}}</div>
                      </div>
                    </div>
                    <img src="./icon-operate@2x.png" v-if="showIndex !== index || !showBox" alt="" class="info-img" @click="showChoose(index)">
                    <img src="./icon-operate_pressed@2x.png" alt="" class="info-img" @click="showChoose(index)" v-if="showBox && showIndex === index">
                  </div>
                </div>
              </div>
              <div class="up-list-big-choose" >
                <div class="up-list-choose" :class="showBox && showIndex === index ? 'up-list-choose-active' : ''">
                  <div class="choose-box">
                    <img src="./icon-compile@2x.png" alt="" class="box-top">
                    <p class="box-top-text">编辑</p>
                  </div>
                  <div class="choose-box">
                    <img src="./icon-shelves@2x.png" alt="" class="box-top">
                    <p class="box-top-text">下架</p>
                  </div>
                  <div class="choose-box">
                    <img src="./icon-delete@2x.png" alt="" class="box-top">
                    <p class="box-top-text">删除</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
      <div class="sumbit-btn">新建商品</div>
      <toast ref="toast"></toast>
      <confirm-msg ref="confirm" @confirm="msgConfirm" @cancel="msgCancel"></confirm-msg>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Product} from 'api'
  import {ERR_OK} from 'common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'

  export default {
    name: 'porduct-list',
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        itemlist: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        menuIdx: 1,
        showBox: false,
        upPage: 1,
        upMore: false,
        downPage: 1,
        downMore: false,
        upList: [],
        downList: [],
        showIndex: '',
        type: 0,
        curItem: {}
      }
    },
    created() {
      this.getNewUpList()
      this.getNewDownList()
    },
    methods: {
      getNewUpList () {
        Product.getProductList(1, this.upPage).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.upList = res.data
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreUpList() {
        if (this.upMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Product.getProductList(1, this.upPage).then((res) => {
          if (res.error === ERR_OK) {
            this.upList.push(...res.data)
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
        this.upPage++
        if (this.upList.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      getNewDownList () {
        Product.getProductList(0, this.downPage).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.downList = res.data
            this._isDownList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreDownList() {
        if (this.downMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Product.getProductList(0, this.downPage).then((res) => {
          if (res.error === ERR_OK) {
            this.downList.push(...res.data)
            this._isDownList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isDownList(res) {
        this.downPage++
        if (this.downList.length >= res.meta.total * 1) {
          this.downMore = true
        }
      },
      changeTab(index) {
        this.menuIdx = index
      },
      showChoose(index) {
        if (this.showIndex !== index) {
          this.showBox = true
        } else {
          this.showBox = !this.showBox
        }
        this.showIndex = index
      },
      msgConfirm() {},
      msgCancel() {},
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      onPullingUp() {
        if (this.menuIdx === 1) {
          this.getMoreUpList()
        } else {
          this.getMoreDownList()
        }
      },
      delProductBtn(item) {},
      downProductBtn(item) {
        this.type = 0
      },
      upProductBtn(item) {}
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    components: {
      Toast,
      Scroll,
      ConfirmMsg
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
  .manage-box
    fill-box()
    z-index: 21
    bottom: 45px
  .product-tab
    position: fixed
    z-index: 21
    width: 100%
    background: $color-white-fff
    left: 0
    top: 0
    height: 45px
    layout(row)
    .tab-box
      width: 50%
      line-height: 45px
      text-align: center
      font-size: $font-size-16
      font-family: $font-family-regular
      color: $color-20202E
    .line
      position: absolute
      width: 50%
      height: 3px
      left: 0
      bottom: 0
      transition: all .3s
      .line-box
        background: $color-20202E
        height: 3px
        width: 40px
        margin: 0 auto

  .product-top
    padding-top: 45px
  .up-box
    padding: 15px
    .up-list-item
      background: $color-white-fff
      border-radius: 2px
      box-shadow: 0 4px 12px 0 rgba(43,43,145,0.08)
      border: 1px solid rgba(32,32,46,0.10)
      padding-left: 10px
      position: relative
      margin-bottom: 15px
      .up-list-top
        height: 45px
        line-height: 45px
        layout(row)
        justify-content: space-between
        padding-right: 10px
        border-bottom: 0.5px solid rgba(0,0,0,.1)
        .top-left
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-20202E
      .up-list-bottom
        padding: 15px 10px 15px 0
        align-items: center
        layout(row)
        .img_url
          display: block
          border-radius: 2px
          width: 70px
          height: 70px
          margin-right: 10px
        .bottom-right
          flex: 1
          overflow: hidden
          .title
            font-size: $font-size-14
            font-family: $font-family-regular
            color: $color-20202E
            no-wrap()
          .info-box
            layout(row)
            margin-top: 15px
            position: relative
            .info-left
              layout(row)
            .price-box
              layout(row)
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
            .price-text
              color: $color-888888
              font-family: $font-family-regular
              font-size: $font-size-12
              margin-top: 4px
            .price-right
              margin-right: 0
          .info-img
            width: 40px
            display: block
            height: 22px
            position: absolute
            right: 0
            bottom: 0
      .up-list-big-choose
        height: 52px
        overflow: hidden
        position:absolute
        right: 55px
        bottom: 7px
        width: 163.5px
      .up-list-choose
        position:absolute
        height: 52px
        width: 0px
        right: 8px
        bottom: 0
        background: rgba(32,32,46,0.80)
        border-radius: 2px
        layout(row)
        align-items: center
        padding: 0
        transition: all 0.5s
        &:after
          content: ''
          position: absolute
          right: -7.5px
          top: 0
          bottom: 0
          width:0
          height:0
          border-top:8px solid transparent
          border-bottom:8px solid transparent
          border-left:0px solid rgba(32,32,46,0.80)
          margin:  auto
        .choose-box
          flex: 1
          layout()
          justify-content: center
        .box-top
          display: block
          width: 16px
          height: 16px
          margin: auto
        .box-top-text
          white-space :nowrap
          margin-top: 5.5px
          font-size: $font-size-10
          font-family: $font-family-regular
          color: $color-white-fff
          text-align: center
      .up-list-choose-active
        width: 155.5px
        padding: 10px
        &:after
          border-left:8px solid rgba(32,32,46,0.80)
  .sumbit-btn
    position: fixed
    z-index: 21
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

</style>
