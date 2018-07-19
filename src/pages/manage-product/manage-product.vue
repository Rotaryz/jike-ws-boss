<template>
  <transition name="slide">
    <div class="manage-box">
      <div class="product-tab">
        <div class="tab-box" @click="changeTab(0)">已上架</div>
        <div class="tab-box" @click="changeTab(1)">已下架</div>
        <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
          <div class="line-box"></div>
        </div>
      </div>
      <scroll>
        <div class="product-top"></div>
        <div class="up-box">
          <ul class="up-list">
            <li class="up-list-item">
              <div class="up-list-bottom">
                <img src="./pic-defaultavatar@2x.png" alt="" class="img_url">
                <div class="bottom-right">
                  <div class="title">卡诗（KERASTASE）新双重菁新双重菁纯修…</div>
                  <div class="info-box">
                    <div class="info-left">
                      <div class="info-text">
                        <div class="price-text">团购价：¥100.00</div>
                        <div class="price-text">销   量：999</div>
                      </div>
                      <div class="info-text">
                        <div class="price-text price-right">原价：¥100.00</div>
                        <div class="price-text">库存：999</div>
                      </div>
                    </div>
                    <img src="./icon-operate@2x.png" alt="" class="info-img" @click="showChoose">
                  </div>
                </div>
              </div>
              <div class="up-list-big-choose" >
                <div class="up-list-choose" :class="showBox ? 'up-list-choose-active' : ''">
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
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: 'porduct-list',
    data() {
      return {
        menuIdx: 0,
        showBox: false
      }
    },
    methods: {
      changeTab(index) {
        this.menuIdx = index
      },
      showChoose() {
        this.showBox = !this.showBox
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
            .price-text
              font-size: $font-size-12
              font-family: $font-family-regular
              color: $color-text-88
              margin-right: 16px
              margin-bottom:7px
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
        right: 65px
        bottom: 0
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
