<template>
  <div class="navigation border-top-1px">
    <div class="item" @click="changeRoute(0)">
      <i class="icon icon-radar" :class="{active: current === 0}"></i>
      <span class="title">雷达</span>
    </div>
    <div class="item" @click="changeRoute(1)">
      <i class="icon icon-mine" :class="{active: current === 1}"></i>
      <span class="title">我的</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'navigation'

  const ROUTES = [
    '/radar',
    '/mine'
  ]

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        current: 0
      }
    },
    methods: {
      changeRoute(index) {
        if (this.current === index) {
          return
        }
        this.current = index
        const route = ROUTES[index]
        this.$router.push(route)
      }
    }
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
    .item
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
          &.active
            bg-image('./icon-radar_selected')
        &.icon-mine
          bg-image('./icon-my_tabbar')
          &.active
            bg-image('./icon-my_selected')
      .title
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-20202E
</style>
