<template>
  <div id="app">
    <router-view/>
    <navigation></navigation>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from 'components/navigation/navigation'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {}
    },
    components: {
      Navigation
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    position: relative
    z-index: 0
</style>
