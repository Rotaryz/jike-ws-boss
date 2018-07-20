<template>
  <article class="mine-all">
    <scroll>
      <div class="mine-top">
        <div class="mine-bg"></div>
        <div class="mine-box">
          <p>雅诗兰黛华南代理商</p>
          <div class="mine-imgurl">
            <img src="./pic-defaultavatar@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="order-box">
        <div class="order-con">
          <router-link tag="div" to="mine/sales-details" class="order-top">
            <div class="order-top-left">
              <div class="order-top-left-text">实际销售(元)</div>
              <div class="order-top-left-money">536.00</div>
            </div>
            <div class="order-top-right">
              <img src="./icon-presed@2x.png" alt="">
              <div class="right-jump"></div>
            </div>
          </router-link>
          <div class="order-bottom">
            <router-link tag="div" to="mine/income-details" class="add-box border-right-1px add-right">
              <div class="add-box-left ">
                <div class="title">累计收入(元)</div>
                <div class="number">64.00</div>
              </div>
              <div class="add-box-right">
                <img src="./icon-presed@2x.png" alt="">
                <div class="right-jump"></div>
              </div>
            </router-link>
            <router-link tag="div" to="mine/order-list" class="add-box add-left">
              <div class="add-box-left">
                <div class="title">成交订单(元)</div>
                <div class="number">64.00</div>
              </div>
              <div class="add-box-right">
                <img src="./icon-presed@2x.png" alt="">
                <div class="right-jump"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="jump-list">
        <div class="list-box">
          <router-link tag="div" to="mine/manage-member" class="list">
            <div class="list-left">
              <img src="./icon-member@2x.png" alt="" class="list-left-img">
              <p class="text">成员管理</p>
            </div>
            <img src="./icon-presed@2x.png" alt="" class="list-right">
          </router-link>
          <router-link tag="div" to="mine/mine-assets" class="list">
            <div class="list-left">
              <img src="./icon-property@2x.png" alt="" class="list-left-img">
              <p class="text">资产管理</p>
            </div>
            <img src="./icon-presed@2x.png" alt="" class="list-right">
          </router-link>
          <router-link  tag="div" to="mine/manage-product" class="list">
            <div class="list-left">
              <img src="./icon-member@2x.png" alt="" class="list-left-img">
              <p class="text">产品管理</p>
            </div>
            <img src="./icon-presed@2x.png" alt="" class="list-right">
          </router-link>
          <router-link tag="div" to="mine/manage-activity" class="list">
            <div class="list-left">
              <img src="./icon-activity@2x.png" alt="" class="list-left-img">
              <p class="text">活动管理</p>
            </div>
            <img src="./icon-presed@2x.png" alt="" class="list-right">
          </router-link>
          <div class="list">
            <div class="list-left">
              <img src="./icon-distribution@2x.png" alt="" class="list-left-img">
              <p class="text">分销管理</p>
            </div>
            <img src="./icon-presed@2x.png" alt="" class="list-right">
          </div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'

  export default {
    name: 'mine',
    data() {
      return {}
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

  .mine-all
    fill-box()
    z-index: 50
    bottom: 50px

  .mine-top
    padding: 54px 15px 0
    position: relative
    .mine-bg
      background: $color-20202E
      width: 100%
      height: 124.5px
      top: 0
      left: 0
      position: absolute
    .mine-box
      background: #fff
      position: relative
      padding: 54.5px 0 30px
      text-align: center
      font-size: $font-size-16
      color: $color-20202E
      font-family: $font-family-regular
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.08)
      border-radius: 2px
      .mine-imgurl
        width: 60px
        height: 60px
        position: absolute
        left: 0
        right: 0
        margin: 0 auto
        top: -20px
        img
          width: 100%
          height: 100%

  .order-box
    margin-top: 10px
    padding: 0 15px
    .order-con
      background: $color-white-fff
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.08)
      border-radius: 2px
      padding: 0 15px
      .order-top
        layout(row)
        justify-content: space-between
        align-items: center
        padding: 15px 0
        border-bottom: 0.5px solid rgba(0, 0, 0, .1)
        .order-top-left-text
          color: $color-text-88
          font-family: $font-family-regular
          font-size: $font-size-12
        .order-top-left-money
          color: $color-20202E
          font-family: 'DINAlternate-Bold'
          font-size: $font-size-32
          margin-top: 10px
        .order-top-right
          position: relative
          img
            width: 8px
            height: 16px
          .right-jump
            position: absolute
            width: 100px
            height: 100px
            top: -50px
            left: -50px

      .order-bottom
        padding: 15px 0
        layout(row)
        .add-box
          layout(row)
          align-items: center
          justify-content: space-between
          width: 50%
          .title
            color: $color-text-88
            font-family: $font-family-regular
            font-size: $font-size-12
          .number
            color: $color-20202E
            font-family: 'DINAlternate-Bold'
            font-size: $font-size-25
            margin-top: 10px
          .add-box-right
            position: relative
            img
              width: 8px
              height: 16px
            .right-jump
              position: absolute
              width: 50px
              height: 50px
              top: -25px
              left: -25px

        .add-right
          padding-right: 15px
        .add-left
          padding-left: 15px

  .jump-list
    padding: 0 15px
    margin-top: 10px
    padding-bottom: 20px
    .list-box
      background: $color-white-fff
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.08)
      border-radius: 2px
      padding-left: 15px
      .list
        layout(row)
        justify-content: space-between
        align-items: center
        height: 55px
        padding-right: 15px
        border-bottom: 0.5px solid rgba(0,0,0,.1)
        .list-left
          layout(row)
          align-items: center
          .list-left-img
            margin-right: 10px
            width: 18px
            height: 18px
            display: block
          .text
            color: $color-20202E
            font-family: $font-family-regular
            font-size: $font-size-14
        .list-right
          width: 8px
          height: 16px
  .z
    width: 100%
</style>
