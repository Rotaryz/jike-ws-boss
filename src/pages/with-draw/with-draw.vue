<template>
  <transition :name="slide">
    <div class="withDraw">
      <Scroll>
        <div class="withDraw-head">
          <router-link tag="div" class="withDraw-headTxt-box" :to="url">
            <span v-if="money.withdrawal_info" class="withDraw-headTxt" :class="{'withDraw-headTxtActive': money.withdrawal_info.bank}">{{money.withdrawal_info.bank ? money.withdrawal_info.bank : '添加银行卡'}}</span>
            <span v-if="money.withdrawal_info" class="withDraw-headTxt withDraw-headTxtActive">{{money.withdrawal_info.user_name ? money.withdrawal_info.user_name : ''}}</span>
            <img v-if="money.withdrawal_info" src="./icon-pressed@2x.png" class="list-way">
          </router-link>
        </div>
        <div class="draw-box">
          <div class="withDraw-headTxt">提现金额</div>
          <div class="withDraw-inputBox">
            <div class="withDraw-inputBo-left">
              <span class="withDraw-inputBox-txt">¥</span>
              <input type="number" bindinput="moneyChange" class="withDraw-inputBox-input" v-model="drawMoney" />
            </div>
            <!--<image v-if="imageUrl" :src="imageUrl + '/c-image/mine/icon-my_money_close.png'" class="withDraw-inputBox-btn" @click="clear"></image>-->
          </div>
          <div class="withDraw-hint">
            <span class="withDraw-hint">可提现金额 <span class="withDraw-hint-money">¥{{money.remaining}}</span></span>
          </div>
        </div>

        <div class="tip">微信按提现金额0.1%收取手续费，最低1元，最高10元。</div>
        <div class="withDraw-btn" @click="submitMoney">提现
        </div>
        <Toast ref="toast"></Toast>
      </Scroll>
    </div>
  </transition>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { ERR_OK } from 'common/js/config'
  import { Assets } from 'api'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import { mapGetters } from 'vuex'

  export default {
    name: 'with-draw',
    data () {
      return {
        drawMoney: '',
        coverShow: false,
        packetTotal: '',
        isPhone: 0,
        serviceCharge: '',
        money: {}
      }
    },
    computed: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      url () {
        let url = this.money.withdrawal_info && this.money.withdrawal_info.id ? `bank-card?id=${this.money.withdrawal_info.id}` : 'bank-card'
        return url
      }
    },
    created () {
      this._load()
    },
    methods: {
      submitMoney () {
        // if (this.isPhone !== 1) {
        //   // 无手机号码
        //   this.$invoke('PhoneTest', 'bindPhone')
        //   return
        // }
        if (!this.money.can_withdrawal) {
          this.$refs.toast.show('请绑定银行卡')
          return
        }
        if (this.drawMoney === '') {
          this.$refs.toast.show('请输入提现金额')
          return
        }
        if (this.drawMoney * 1 > this.money.remaining * 1) {
          this.$refs.toast.show('账户余额不足')
          return
        }
        if (this.drawMoney * 1 < 10000) {
          this.$refs.toast.show('提现金额不能小于10000元')
          return
        }
        this._drawMoney()
      },
      _load () {
        Assets.showMoney().then((res) => {
          if (res.error === ERR_OK) {
            this.money = res.data
          }
        })
      },
      _drawMoney () {
        let data = {money: this.drawMoney}
        Assets.customerWithdrawalMoney(data).then((res) => {
          if (res.error === ERR_OK) {
            this.mine.remaining -= this.drawMoney
            setTimeout(() => {
              this.$router.back()
            }, 500)
          }
          this.$refs.toast.show(res.message)
        })
      }
    },
    components: {
      Toast,
      Scroll
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .withDraw
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 80
    overflow: hidden
    background: $color-background

    .withDraw-head
      padding-top: 10px
    .withDraw-headTxt-box
      height: 55px
      box-sizing: border-box
      padding: 0 26px 0 15px
      display: flex
      justify-content: space-between
      position: relative
      background: $color-white
    .withDraw-headTxt
      line-height: 55px
      font-family: $font-family-regular
      font-size: $font-size-14
      color: $color-888888
    .withDraw-headTxtActive
      color: $color-20202E
    .list-way
      width: 6px
      height: 12px
      col-center()
      right: 15px
    .draw-box
      box-sizing: border-box
      padding: 0 15px
      background: $color-white
      margin-top: 10px
      .withDraw-headTxt
        color: $color-20202E
        line-height: 1
        padding: 18px 0 3px
      .withDraw-head-money
        font-family: PingFangSC-Medium
        font-size: $font-size-medium-x
        color: $color-button
        margin-left: 10px
        margin-right: 5px

    .withDraw-inputBox
      display: flex
      align-items: center
      padding-bottom: 6px
      border-bottom-1px()
      justify-content: space-between
      .withDraw-inputBo-left
        display: flex
        align-items: center

        .withDraw-inputBox-txt
          font-size: 40px
          color: $color-20202E

        .withDraw-inputBox-input
          height: 100%
          width: 83%
          box-sizing: border-box
          margin-left: 10px
          font-family: DINAlternate-Bold !important
          font-size: 40px
          color: $color-20202E

      .withDraw-inputBox-btn
        width: 10px
        height: 10px
        padding: 10px

    .withDraw-hint
      display: flex
      justify-content: space-between
      height: 50px
      align-items: center
      font-size: $font-size-14
      color: $color-888888
      font-family: $font-family-regular
      .withDraw-hint-money
        margin-left: 6px
        color: $color-20202E

    .withDraw-btn
      width: 92vw
      height: 43px
      background: $color-20202E
      margin: 20px auto
      border-radius: 2px
      line-height: 43px
      text-align: center
      font-family: $font-family-regular
      font-size: $font-size-16
      color: $color-white

    .withDraw-btn.disab
      opacity: 0.5

    .withDraw-time
      font-size: $font-size-10
      color: $color-text-d
      text-align: center
      margin-top: 10px

  .withDraw-successCover
    position: fixed
    width: 100vw
    height: 100vh
    background: $color-mask-bgc
    left: 0
    top: 0
    right: 0
    bottom: 0

    .withDraw-success
      width: 250px
      height: 220px
      border-radius: 4px
      background: $color-highlight-background
      position: fixed
      margin: auto
      left: 0
      top: 0
      right: 0
      bottom: 0

      .withDraw-success-img
        width: 217px
        height: 106.5px
        position: absolute
        top: -75px
        left: 16.5px

      .withDraw-success-top
        height: 105.5px
        background: $color-prize-bc
        border-radius: 4px 4px 0 0
        color: $color-yellow
        font-size: $font-size-large-m
        text-align: center
        line-height: 120px

      .withDraw-success-bottom
        display: flex
        flex-direction: column
        align-items: center
        font-size: $font-size-12

        .withDraw-success-bottom-txt
          color: #868590
          line-height: 54px

        .withDraw-success-bottom-btn
          border: 1px solid #dddddd
          width: 230px
          height: 40px
          line-height: 40px
          text-align: center
          border-radius: 2px

    .withDraw-success-closeBtn
      width: 23px
      height: 23px
      margin-top: 60px

  .tip
    margin-top: 15px
    text-indent: 15px
    font-size: $font-size-12
    font-family: $font-family-regular
    color: $color-888888

  .service-charge
    margin-bottom: 5px
    font-size: $font-size-12
    color: $color-text-d
</style>