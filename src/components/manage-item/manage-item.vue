<template>
    <div class="manage-item">
      <div class="manage-left"></div>
      <div class="manage-right"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'manage-item'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
  .manage-item
    padding: 15px
  .manage-i
    width: 1px
</style>
