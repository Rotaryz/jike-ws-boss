<template>
  <div class="ro-bank-card">
    <div class="white">
      <div class="ro-bank-card-item">
        <div class="ro-bank-card-name">持卡人</div>
        <input type="text" placeholder="持卡人姓名" class="ro-bank-content" placeholder-style="font-size: 14px;font-family: PingFangSC-Regular; color: #ccc" v-model="cardName" />
      </div>
      <div class="ro-bank-card-item">
        <div class="ro-bank-card-name">银行卡号</div>
        <input type="number" placeholder="输入银行卡号" placeholder-style="font-size: 14px;font-family: PingFangSC-Regular; color: #ccc" maxlength="23" v-model="cardNum" class="ro-bank-content" id="band-card" />
      </div>
      <div class="ro-bank-card-item" @click="_showPicker">
        <div class="ro-bank-card-name">开户行</div>
        <div class="ro-bank-content" :class="bank === '选择开户银行' ? 'ro-bank-content-place' : ''">{{bank}}</div>
        <img class="ro-bank-card-icon" src="./icon-pressed@2x.png">
      </div>
    </div>
    <div class="ro-bank-card-btn-box">
      <div class="ro-bank-card-btn" :class="{'ro-bank-card-disable':!submit}" @click="_bankCards">保存</div>
    </div>
    <picker ref="picker" @select="select" :data="bankList" :selectedIndex="[bankIdx]"></picker>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
  import { ERR_OK } from 'common/js/config'
  import { Assets } from 'api'
  import Toast from 'components/toast/toast'
  import Picker from 'components/picker/picker'
  import Scroll from 'components/scroll/scroll'
  import { mapGetters } from 'vuex'

  export default {
    name: 'bank-card',
    data () {
      return {
        cardNum: '',
        cardName: '',
        bank: '选择开户银行',
        bankList: [],
        id: null,
        bankIdx: 0
      }
    },
    computed: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      submit () {
        return this.bank !== '选择开户银行' && this.cardName && this.cardNum
      }
    },
    created () {
      this._banksList()
      this.id = this.$route.query.id || null
      console.log(this.id)
      if (!this.id) {
        return
      }
      this._getBankCardDetail()
    },
    methods: {
      select (res, index, text) {
        this.bank = text[0]
      },
      _showPicker () {
        this.$refs.picker.show()
      },
      async _banksList () {
        let res = await Assets.getBankData()
        let json = this.infoRes(res)
        json = json.map((item) => {
          return {text: item.name}
        })
        this.bankList = [json]
      },
      async _getBankCardDetail () {
        const res = await Assets.bankCardDetail(this.id)
        if (res.error === ERR_OK) {
          const data = res.data
          this.cardName = data.user_name
          this.bank = data.bank ? data.bank : ''
          this.bankIdx = this.bankList.findIndex(item => item.name === this.bank)
          this.cardNum = data.withdrawal_card ? data.withdrawal_card : ''
          this.checkBtn()
        }
      },
      async _bankCards () {
        if (!this.cardName) {
          this.$refs.toast.show('持卡人不能为空')
          return
        }
        if (!this.cardNum) {
          this.$refs.toast.show('银行卡号不能为空')
          return
        }
        if (this.bank === '选择开户银行') {
          this.$refs.toast.show('开户行不能为空')
          return
        }
        let data = {
          user_name: this.cardName,
          bank: this.bank,
          withdrawal_card: this.cardNum
        }
        let res = {}
        if (this.id) {
          res = await Assets.putBankCards(this.id, data)
        } else {
          res = await Assets.bankCards(data)
        }
        if (res.error === ERR_OK) {
          this.$refs.toast.show('绑定成功')
          this.$router.back()
        } else {
          this.$refs.toast.show(res.message)
        }
      },
      getBank (e) {
        let index = e.target.value * 1
        this.bank = this.bankList[index].name
      },
      infoRes (res) {
        if (res.error === ERR_OK) {
          return res.data
        }
      }
    },
    components: {
      Toast,
      Scroll,
      Picker
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .ro-bank-card
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 50
    background: $color-background
    padding-top: 10px

  .white
    background: $color-white

  .ro-bank-card-item
    margin: 0 15px
    box-sizing: border-box
    height: 55px
    display: flex
    align-items: center
    border-bottom-1px()
    font-size: $font-size-14
    white-space: nowrap
    position: relative
    &:last-child
      border-none()
    .ro-bank-card-name
      min-width: 56px
      color: $color-888888
      font-family $font-family-regular
    .ro-bank-content
      height: 44.5px
      line-height: 44.5px
      width: 73.6vw
      color: $color-20202E
      font-family: $font-family-regular !important
    input.ro-bank-content
      width: 55vw
      font-size: $font-size-14
      font-family: $font-family-regular !important
      &::-webkit-input-placeholder
        color: #ccc
        font-family: $font-family-regular
    .ro-bank-content
      margin-left: 30px
    .ro-bank-content-place
      font-size: $font-size-14
      font-family: $font-family-regular !important
      color: #ccc
    .ro-bank-card-icon
      position: absolute
      col-center()
      right: 0
      height: 12px
      width: 6px

  .ro-bank-card-btn-box
    .ro-bank-card-btn
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
    .ro-bank-card-disable
      opacity: 0.5
</style>