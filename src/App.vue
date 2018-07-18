<template>
  <div id="app">
    <tab></tab>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {}
    },
    components: {
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
