<template>
  <div class="radar">
    <tab></tab>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'radar'

  export default {
    name: COMPONENT_NAME,
    created() {
      this.$router.replace('/radar/overview')
    },
    components: {
      Tab
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .radar
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 50px
</style>
