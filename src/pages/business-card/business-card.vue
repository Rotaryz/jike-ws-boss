<template>
  <transition :name="slide">
    <div class="share-card">
      <div class="card-con"></div>
      <div class="card-main">
        <div class="main-con">
          <div class="title">{{card.name}}</div>
          <img src="./pic-myshop@2x.png" alt="" class="title-img">
          <img :src="card.avatar" alt="" class="avatar-img">
          <img :src="card.qrcode" alt="" class="avatar-card">
          <div class="qrcode-text">长按识别二维码</div>
        </div>
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
      let data = {
        employee_id: id
      }
      Business.Myshop(data).then((res) => {
        this.card = res.data || {}
        if (this.card.position.length === 0) {
          this.showPosition = false
        }
        if (this.card.business_card_mobile.length === 0) {
          this.showMobile = false
        }
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
  *
    -webkit-box-sizing: border-box
    box-sizing: border-box

  .share-card
    min-height: 100vh
  .card-con
    padding-top: 31px

  .card-main
    width: 317px
    padding: 20px 20px 25px
    margin: auto
    background: url("./bg-shopcode@2x.png") no-repeat center center
    .main-con
      background: $color-white
      padding-top: 29px
      padding-bottom: 15px
      width: 275px
      margin: 0 auto
      layout()
      align-items: center
      .title
        font-family: $font-family-medium
        font-size: $font-size-18
        color: $color-20202E
      .title-img
        display: block
        width: 175px
        height: 16px
        margin-top: 13.5px
      .avatar-img
        display: block
        width: 235px
        height: 235px
        margin-top: 21px
      .avatar-card
        display: block
        width: 120px
        height: 120px
        padding: 20px
        -webkit-box-sizing: border-box
        box-sizing: border-box
      .qrcode-text
        font-family: $font-family-regular
        font-size: $font-size-12
        color: #7C7C8F
        margin-top: -10px
  .share-card
    background: $color-text
</style>
