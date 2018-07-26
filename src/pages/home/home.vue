<template>
  <div class="home" @touchmove.prevent>
    <router-view/>
    <navigation></navigation>
  </div>
</template>
<script type="text/ecmascript-6">
  import Navigation from 'components/navigation/navigation'

  const COMPONENT_NAME = 'home'

  export default {
    name: COMPONENT_NAME,
    components: {
      Navigation
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .home
    position: relative
    z-index: 0
</style>
