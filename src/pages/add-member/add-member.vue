<template>
  <transition name="slide">
    <div class="manage-box">
      <scroll>
        <div class="add-box">
          <div class="add-list">
            <div class="left">成员姓名</div>
            <input class="right-input" type="text" v-model="name" placeholder="请输入姓名" maxlength="10">
          </div>
          <div class="add-list">
            <div class="left">绑定微信手机号</div>
            <input class="right-input" type="number" v-model="phone" placeholder="请输入手机号" maxlength="10">
          </div>
        </div>
      </scroll>
      <div class="sumbit-btn" :class="name.length !== 0 && name.length !== 0 ? '' : 'sumbit-no-btn'">保存</div>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: 'manage-member',
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

  .add-box
    background: $color-white-fff
    padding-left: 15px
  .add-list
    layout(row)
    height: 55px
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)
    align-items: center
    .left
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
      width: 125px
    .right-input
      display: block
      height: 54px
      flex: 1
      line-height: 54px
      width: 90%
      border: none
      font-size: $font-size-medium
      color: #20202e
      font-family: $font-family-regular
      outline:none
    .right-input::-webkit-input-placeholder
      color: #ccc
    .right-input::-ms-input-placeholder
      color: #ccc
    .right-input::-moz-placeholder
      color: #ccc
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

  .sumbit-no-btn
    background: #888
</style>
