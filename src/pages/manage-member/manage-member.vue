<template>
  <transition name="slide">
    <div class="manage-box">
      <scroll bcColor="#fff">
        <div class="manage-top">已开通账号数：5位</div>
        <ul class="manage-list">
          <li class="manage-list-item">
            <slide-view :useType="2" @grouping="groupingHandler" :item="item">
            </slide-view>
            <manage-item></manage-item>
          </li>
        </ul>
      </scroll>
      <div class="sumbit-btn">添加成员</div>
    </div>
    <router-view></router-view>
    <toast ref="toast"></toast>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import SlideView from 'components/slide-view/slide-view'
  import ManageItem from 'components/manage-item/manage-item'

  export default {
    name: 'manage-member',
    components: {
      Toast,
      Scroll,
      SlideView,
      ManageItem
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
  .manage-top
    background: #F0F2F5
    color: $color-20202E
    font-family: $font-family-regular
    font-size: $font-size-14
    padding: 10px 15px
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
  .manage-list
    padding-left: 15px

</style>
