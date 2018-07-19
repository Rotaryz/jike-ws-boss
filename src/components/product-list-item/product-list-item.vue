<template>
  <div class="item-box">
    <div class="item-up"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'manage-product-item'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
  .item-up
    background: $color-white-fff
    box-shadow: 0 4px 12px 0 rgba(43,43,145,0.08)
    border-radius: 2px
    padding-left: 15px
  .z
    width: 10px
</style>
