<template>
  <div class="navigation" v-if="showNav">
    <router-link tag="div" class="navigation-item" to="/radar" v-if="!showJump">
      <i class="icon icon-radar"></i>
      <span class="title">雷达</span>
    </router-link>
    <div class="navigation-item" v-if="showJump">
      <i class="icon icon-radar"></i>
      <span class="title">雷达</span>
    </div>
    <router-link tag="div" class="navigation-item" to="/mine">
      <i class="icon icon-mine"></i>
      <span class="title">我的</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'navigation'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        showNav: true,
        showJump: true
      }
    },
    watch: {
      '$route'(to) {
        let path = to.path
        if (path === '/mine' || path === '/radar/overview' || path === '/radar/ranking' || path === '/radar/ai-analyse') {
          this.showNav = true
        } else {
          this.showNav = false
        }
        if (path === '/radar/overview' || path === '/radar/ranking' || path === '/radar/ai-analyse') {
          this.showJump = true
        } else {
          this.showJump = false
        }
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
    z-index: 2
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
