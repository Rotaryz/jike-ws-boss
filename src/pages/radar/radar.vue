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
    components: {
      Tab
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

</style>
