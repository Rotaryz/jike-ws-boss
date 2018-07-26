<template>
  <transition :name="slide">
    <div class="share-card">
      <div class="share-box">
        <p class="peo-name">{{card.name}}</p>
        <p class="peo-position">{{card.position}}</p>
        <p class="buss-name">{{card.department}}</p>
        <img class="qr-code" :src="card.qrcode" alt="">
        <p class="tip">长按识别图中小程序码</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import {Business} from 'api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'share-card',
    data() {
      return {
        card: {}
      }
    },
    created() {
      let id = this.$route.query.id
      console.log(id)
      let data = {
        employee_id: id
      }
      Business.Myqrcode(data).then((res) => {
        this.card = res.data || {}
        console.log(res)
      })
    },
    computed: {
      ...mapGetters(['ios']),
      slide() {
        return this.ios ? '' : 'slide'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .share-card
    background: $color-text
    .share-box
      display: flex
      flex-direction: column
      align-items: center
      height: 108.8vw
      width: 92vw
      background: $color-white
      margin: 20px auto
      .qr-code
        margin-top: 29px
        width: 56.53%
      .buss-name
        margin-top: 15px
        font-family: $font-family-regular
        font-size: $font-size-medium
        color: $color-text-88
      .peo-name
        margin-top: 30px
        font-family: PingFangSC-Semibold
        font-size: $font-size-large-xx
        color: $color-text
      .peo-position
        font-family: $font-family-medium
        font-size: $font-size-medium
        color: $color-text
        margin-top: 10px
      .tip
        margin-top: 15px
        font-family: $font-family-regular
        font-size: $font-size-small
        color: $color-text-88
</style>
