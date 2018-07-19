<template>
  <div class="manage-item">
    <div class="manage-left">
      <img src="./pic-defaultavatar@2x.png" alt="" class="left-img">
      <div class="left-text">
        <div class="name">李牧</div>
        <div class="phone">13512345678</div>
      </div>
    </div>
    <div class="manage-right">
      <div class="right-choose" @click="chooseBtn" :class="bgChoose ? '' : 'right-choose-active'">
        <div class="choose-btn" :class="choose ? 'choose-btn-active' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'manage-item',
    data() {
      return {
        choose: false,
        bgChoose: false
      }
    },
    methods: {
      chooseBtn() {
        this.choose = !this.choose
        setTimeout(() => {
          this.bgChoose = !this.bgChoose
        }, 300)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .manage-item
    padding: 15px 15px 15px 15px
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)
    width: 100%
    layout(row)
    justify-content: space-between
    align-items: center
    .manage-left
      layout(row)
      align-items: center
      .left-img
        display: block
        width: 45px
        height: 45px
        margin-right: 10px
      .name
        color: $color-20202E
        font-family: $font-family-regular
        font-size: $font-size-16
      .phone
        color: $color-888888
        font-family: $font-family-regular
        font-size: $font-size-14
        margin-top: 10px

  .right-choose
    position: relative
    background: #56BA15
    height: 24px
    width: 45px
    padding: 1px
    border-radius: 100px
    .choose-btn
      background: #fff
      height: 22px
      width: 22px
      border-radius: 50%
      position: absolute
      top: 0
      bottom: 0
      margin: auto 0
      left: 2px
      transition: all .5s
    .choose-btn-active
      left: 20px

  .right-choose-active
    background: #ddd

  .manage-i
    width: 1px
</style>
