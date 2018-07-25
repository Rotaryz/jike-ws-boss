<template>
  <div class="manage-item">
    <div class="manage-left">
      <img :src="memberitem.avatar" alt="" class="left-img" v-if="memberitem.avatar.length !== 0">
      <img src="./pic-default_people@2x.png" alt="" class="left-img" v-if="memberitem.avatar.length === 0">
      <div class="left-text">
        <div class="name">{{memberitem.name}}</div>
        <div class="phone">{{memberitem.mobile}}</div>
      </div>
    </div>
    <div class="manage-right">
      <div class="right-choose" @click="chooseBtn(memberitem)"
           :class="memberitem.ai_radar_status === 1 ? '' : 'right-choose-active'">
        <div class="choose-btn" :class="memberitem.ai_radar_status === 1 ? 'choose-btn-active' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      memberitem: Object,
      default: {}
    },
    name: 'manage-item',
    data() {
      return {
        choose: 1,
        bgChoose: 1
      }
    },
    methods: {
      chooseBtn(item) {
        if (this.memberitem.ai_radar_status === 1) {
          this.memberitem.ai_radar_status = 0
        } else {
          this.memberitem.ai_radar_status = 1
        }
        console.log(item)
        this.$emit('openRararBtn', item, this.memberitem.ai_radar_status)
      }
    },
    computed: {
      itemAvatar () {
        if (this.memberitem.avatar.length === 0) {
          this.memberitem.avatar = './pic-defaultavatar@2x.png'
        }
        return this.memberitem.avatar
      }
    }
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
    padding: 15px 15px 15px 15px
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)
    width: 100%
    layout(row)
    justify-content: space-between
    align-items: center
    .manage-left
      layout(row)
      align-items: center
      flex: 1
      overflow: hidden
      .left-img
        display: block
        width: 45px
        height: 45px
        margin-right: 10px
      .left-text
        flex: 1
        overflow: hidden
        .name
          width: 100%
          color: $color-20202E
          font-family: $font-family-regular
          font-size: $font-size-16
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .phone
          color: $color-888888
          font-family: $font-family-regular
          font-size: $font-size-14
          margin-top: 10px

  .right-choose
    position: relative
    background: #56BA15
    height: 24px
    width: 45px
    padding: 1px
    border-radius: 100px
    .choose-btn
      background: #fff
      height: 22px
      width: 22px
      border-radius: 50%
      position: absolute
      top: 0
      bottom: 0
      margin: auto 0
      left: 2px
      transition: all .5s
    .choose-btn-active
      left: 20px

  .right-choose-active
    background: #ddd

  .manage-i
    width: 1px
</style>
