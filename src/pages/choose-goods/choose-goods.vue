<template>
  <transition name="slide">
    <div class="manage-box">
      <scroll>
        <div class="choose-box">
          <div class="title">选择商品</div>
          <ul class="choose-list">
            <li class="list-item">
              <div class="item-left">
                <img src="" alt="" class="item-img">
                <div class="item-info">
                  <div class="title">卡修复精卡诗新双重菁纯卡修复精卡诗新双重菁纯…</div>
                  <div class="price-box">
                    <div class="price">现价：¥100.00</div>
                    <div class="line-price">¥200.00</div>
                  </div>
                  <div class="sell-count">销量：999</div>
                </div>
              </div>
              <div class="item-right">
                <div class="item-icon"></div>
                <img src="./icon-pitchup@2x.png" alt="" class="item-right-true">
              </div>
            </li>
          </ul>
        </div>
      </scroll>
      <div class="sumbit-btn" :class="name.length !== 0 && name.length !== 0 ? '' : 'sumbit-no-btn'">完成</div>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: 'choose-goods',
    data() {
      return {
        name: '',
        phone: ''
      }
    },
    methods: {},
    components: {
      Toast,
      Scroll
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
    z-index: 51
    bottom: 45px
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
        background: red
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
        border: 0.5px solid #ccc
        border-radius: 50%
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
  .sumbit-no-btn
    background: #888
</style>
