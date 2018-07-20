<template>
  <div class="navigation">
    <router-link tag="div" class="navigation-item" to="/radar">
      <i class="icon icon-radar"></i>
      <span class="title">雷达</span>
    </router-link>
    <router-link tag="div" class="navigation-item" to="/mine">
      <i class="icon icon-mine"></i>
      <span class="title">我的</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'navigation'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .navigation
    position: fixed
    bottom: 0
    left: 0
    right: 0
    display: flex
    height: 50px
    background: $color-white
    .navigation-item
      flex: 1
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .icon
        display: block
        width: 22px
        height: 22px
        margin-bottom: 5px
        background-size: 22px 22px
        &.icon-radar
          bg-image('./icon-radar_tabbar')
        &.icon-mine
          bg-image('./icon-my_tabbar')
      .title
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-20202E
      &.router-link-active
        .icon-radar
          bg-image('./icon-radar_selected')
        .icon-mine
          bg-image('./icon-my_selected')
</style>
