<template>
  <transition name="slide">
    <div class="manage-box">
      <scroll>
        <div class="add-box">
          <div class="add-list select-box">
            <div class="left">活动类型</div>
            <div class="select-right">
              <select v-model='selectedType' class="right-selected">
                <option v-for="option in optionsType" v-bind:value="option.value">
                  {{ option.value }}
                </option>
              </select>
              <div class="select-text" :class="selectedType === '请选择' ? '':'active'">{{selectedType}}</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
          <div class="add-list">
            <div class="left">活动名称</div>
            <input class="right-input" type="text" placeholder="请输入" maxlength="20">
          </div>
          <div class="add-list select-box">
            <div class="left">选择商品</div>
            <div class="select-right">
              <div class="select-text">请选择</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
          <div class="add-list">
            <div class="left">现价</div>
            <div class="left-price">请选择商品</div>
          </div>
          <div class="add-list select-box"   v-if="selectedType !== '拼团特惠'">
            <div class="left">添加数量</div>
            <div class="select-right">
              <select v-model='selectedNumber' class="right-selected">
                <option v-for="option in optionsNumber" v-bind:value="option.value">
                  {{ option.value }}
                </option>
              </select>
              <div class="select-text" :class="selectedNumber === '请选择' ? '':'active'">{{selectedNumber}}</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
          <div class="add-list">
            <div class="left">活动时间</div>
            <div class="left-titme">2018-5-16</div>
            <div class="to">至</div>
            <div class="select-right" @click="setDate">
              <div class="select-text" v-if="date.length === 0">结束时间</div>
              <div class="selecet-data" v-if="date.length !== 0">{{date}}</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
        </div>
        <div class="add-line"></div>
        <div class="add-box" v-if="selectedType !== '拼团特惠'">
          <div class="add-list">
            <div class="left">底价</div>
            <input class="right-input" type="number" placeholder="请输入" maxlength="10">
          </div>
          <div class="add-list select-box">
            <div class="left">砍价次数</div>
            <div class="select-right">
              <select v-model='selectedCount' class="right-selected">
                <option v-for="option in optionsCount" v-bind:value="option.value">
                  {{ option.value }}
                </option>
              </select>
              <div class="select-text" :class="selectedCount === '请选择' ? '':'active'">{{selectedCount}}</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
        </div>
        <div class="add-box" v-if="selectedType === '拼团特惠'">
          <div class="add-list">
            <div class="left">团购价</div>
            <input class="right-input" type="number" placeholder="成团后的商品价格" maxlength="10">
          </div>
          <div class="add-list select-box">
            <div class="left">成团有效期</div>
            <div class="select-right">
              <select v-model='selectedTime' class="right-selected">
                <option v-for="option in optionsTime" v-bind:value="option.value">
                  {{ option.value }}
                </option>
              </select>
              <div class="select-text" :class="selectedTime === '请选择' ? '':'active'">{{selectedTime}}</div>
              <img src="./icon-presed@2x.png" alt="" class="selcet-img">
            </div>
          </div>
        </div>
        <div class="add-line"></div>
        <div class="goods-deduct">
          <div class="goods-left">商品提成</div>
          <input type="number" placeholder="" class="goods-number" maxlength="2">
          <div class="icon">%</div>
          <div class="text">按成交价计算</div>
        </div>
        <div class="add-line"></div>
        <div class="add-item-des"  v-if="selectedType !== '拼团特惠'">
          <div class="title">1.什么是疯狂砍价？</div>
          <div class="text">疯狂砍价是由商家发起的一种营销类活动，商家可添加商品，设置能砍到的底价和砍到底价所需次数。用户若想以底价购买该商品，可邀请好友一起砍价，每次砍价金额随机。</div>
          <div class="title">2.砍掉后的价格是否对所有用户有效？</div>
          <div class="text">是的。所有用户可对同一个商品进行砍价，并享有砍掉后的商品价格，如商品A现价100元，当某用户砍掉2元后，所有人看到的现价更新为98元，并可在98元的基础上再进行砍价，直到砍到底价为止。</div>
          <div class="title">3.未砍到底价时，用户能否购买？</div>
          <div class="text">能购买，如商品A现价100元，底价10元，当被砍到80元时，若某用户认为已达自己的可接受价位，即可下单购买（为突出商品稀有性，建议商家添加的数量在1-3个）。</div>
          <div class="title">4.用户一次能购买几件商品？</div>
          <div class="text">同一个用户一次下单只能购买一件商品。</div>
          <div class="title">5.砍价商品设置错了怎么办？</div>
          <div class="text">商家可在砍价列表页删除该商品，删除后所有用户不能对该商品进行砍价，已下单但未支付的用户不能再进行支付，已支付的用户不受影响。</div>
        </div>
        <div class="add-item-des"  v-if="selectedType === '拼团特惠'">
          <div class="title">1.什么是团购？</div>
          <div class="text">由商家发起的一种促销活动，商家可添加商品，设置成团价格、成团人数和成团有效期等信息。消费者可发起拼团活动或参与他人发起的拼团活动，若在有效期内若拼团成功，则可以成团价（较优惠的价格）购买商品或服务。目的是以部分优惠吸引多人购买，增加销售额。</div>
          <div class="title">2.活动需要多少个用户才能拼团成功？</div>
          <div class="text">平台统一设置为2人团，即两个用户即可成团。</div>
        </div>
      </scroll>
      <div class="sumbit-btn">发布</div>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import Calendar from 'vue2-datepick'

  Vue.use(Calendar)

  export default {
    name: 'new-activity',
    data() {
      return {
        selectedType: '请选择',
        optionsType: [
          {text: '1', value: '拼团特惠'},
          {text: '0', value: '疯狂砍价'}
        ],
        selectedNumber: '请选择',
        optionsNumber: [
          {value: 1},
          {value: 2},
          {value: 3}
        ],
        selectedCount: '请选择',
        optionsCount: [
          {value: 30},
          {value: 50},
          {value: 70},
          {value: 100}
        ],
        selectedTime: '请选择',
        optionsTime: [
          {value: '24小时'},
          {value: '48小时'}
        ],
        date: ''
      }
    },
    methods: {
      setDate() {
        this.$picker.show({
          type: 'datePicker',
          endTime: '2020-08-08',
          onOk: (date) => {
            this.date = date
          }
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
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .manage-box
    fill-box()
    z-index: 41
    bottom: 45px

  .add-box
    padding-left: 15px
    background: $color-white-fff

  .add-list
    layout(row)
    height: 50px
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)
    align-items: center
    padding-right: 15px
    .left
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
      width: 86px
    .left-titme
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
    .to
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
      margin: 0 25px
    .left-price
      font-size: $font-size-14
      color: $color-ccc
      font-family: $font-family-regular
    .right-selected
      position: absolute
      width: 100%
      height: 44px
      left: 0
      top: -12px
      opacity: 0
    .select-right
      layout(row)
      align-items: center
      position: relative
      .select-text
        font-size: $font-size-14
        color: $color-ccc
        font-family: $font-family-regular
      .selecet-data
        font-size: $font-size-14
        color: $color-20202E
        font-family: $font-family-regular
      .active
        color: $color-20202E
      .selcet-img
        width: 7px
        height: 14px
        display: block
        margin-left: 5px
    .right-input
      display: block
      height: 40px
      flex: 1
      line-height: 40px
      border: none
      font-size: $font-size-medium
      color: #20202e
      font-family: $font-family-regular
      outline: none
    .right-input::-webkit-input-placeholder
      color: #ccc
    .right-input::-ms-input-placeholder
      color: #ccc
    .right-input::-moz-placeholder
      color: #ccc

  .select-box
    justify-content: space-between

  .top-img-title
    padding: 18px 0 15px
    color: $color-text-88
    font-family: $font-family-regular
    font-size: $font-size-14

  .top-img-des
    padding: 15px 0 18px
    color: $color-ccc
    font-family: $font-family-regular
    font-size: $font-size-14
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)

  .sumbit-btn
    position: fixed
    z-index: 51
    height: 45px
    background: $color-20202E
    width: 100%
    left: 0
    text-align: center
    line-height: 45px
    color: $color-white-fff
    font-family: $font-family-meddle
    font-size: $font-size-16
    bottom: 0

  .top-img-list
    layout(row)
    .top-img-item
      width: 55px
      height: 55px
      background: #333
      border-radius: 3px
      margin-right: 15px

  .add-line
    height: 10px
    background: #F0F2F5

  .goods-deduct
    background: $color-white-fff
    height: 50px
    layout(row)
    padding-left: 15px
    align-items: center
    .goods-left
      font-size: $font-size-14
      color: $color-text-88
      font-family: $font-family-regular
      margin-right: 29px
    .icon
      font-size: $font-size-14
      color: $color-text-88
      font-family: $font-family-regular
      margin-right: 10px
    .text
      font-size: $font-size-12
      color: $color-text-88
      font-family: $font-family-regular
      margin-right: 10px
    .goods-number
      width: 66.5px
      height: 32px
      border: 1px solid #ccc
      border-radius: 2px
      text-align: center
      margin-right: 8px

  .add-item-des
    padding: 0 15px 30px
    background: $color-white-fff
    .title
      font-size: $font-size-14
      color: $color-20202E
      font-family: $font-family-regular
      padding: 20px 0 10px
    .text
      font-size: $font-size-14
      color: $color-888888
      font-family: $font-family-regular
      line-height: 20px
      text-align:justify
  .sumbit-no-btn
    background: #888
</style>
