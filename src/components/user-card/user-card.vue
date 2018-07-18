<template>
  <article class="user-card">
    <!--ai分析 员工列表-->
    <div class="card-box" v-if="useType === 'ai'">
      <div class="rank one" v-if="idx===0"></div>
      <div class="rank two" v-else-if="idx===1"></div>
      <div class="rank three" v-else-if="idx===2"></div>
      <div class="rank" v-else>{{idx+1}}</div>
      <img class="user-logo" :src="cardInfo.avatar" alt="">
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="name">{{cardInfo.position}}</div>
        </div>
        <div class="info-box">
          <div class="number">{{cardInfo.number}}</div>
          <div class="number">销售力</div>
        </div>
      </section>
    </div>
    <!--overview总览 客户列表-->
    <div class="card-box" v-if="useType === 'overview'">
      <img class="user-logo" :src="cardInfo.image_url" alt="">
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="number">AI预计成交率{{cardInfo.conversion_rate}}%</div>
        </div>
        <div class="info-box">
          <div class="green">{{cardInfo.name}}</div>
          <div class="number">跟进阶段{{96}}%</div>
        </div>
      </section>
    </div>
    <!--rank-list 排行客户工列表-->
    <div class="card-box" v-if="useType === 'rank-customer-list'">
      <img class="user-logo" :src="cardInfo.image_url" alt="">
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="number">AI预计成交率{{cardInfo.conversion_rate}}%</div>
        </div>
        <div class="info-box">
          <div class="number">{{cardInfo.name}}</div>
          <div class="number"></div>
        </div>
      </section>
    </div>
    <!--ranking 排行榜员工列表-->
    <div class="card-box" v-if="useType === 'ranking'">
      <div class="rank one" v-if="idx===0"></div>
      <div class="rank two" v-else-if="idx===1"></div>
      <div class="rank three" v-else-if="idx===2"></div>
      <div class="rank" v-else>{{idx+1}}</div>
      <img class="user-logo" :src="cardInfo.avatar" alt="">
      <section class="user-info-ranking">
        <div class="info-box-ranking">
          <div class="name">{{cardInfo.name}}</div>
          <div class="txt">{{cardInfo.position}}</div>
        </div>
        <div class="rank-number">{{cardInfo.number}}</div>
      </section>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cardInfo: Object,
      useType: String,
      idx: Number
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .user-card
    height: 100%
    .card-box
      height: 100%
      box-sizing: border-box
      padding: 15px 0
      border-bottom: 0.5px solid $color-col-line
      layout(row, block, nowrap)
      .rank
        background-size: 24px 24px
        background-position: center center
        background-repeat: no-repeat
        height: 100%
        width: 30px
        layout()
        justify-content: center
        align-items: center
        font-family: DINCondensed-Bold
        font-size: $font-size-20
        color: $color-ccc
        &.one
          background-image: url("./icon-goldmedal@3x.png")
        &.two
          background-image: url("./icon-silvermedal@3x.png")
        &.three
          background-image: url("./icon-coppermedal@3x.png")
      .user-logo
        width: 45px
        height: 45px
        margin-left: 3px
        margin-right: 15px
      .user-info
        layout()
        height: 100%
        justify-content: space-around
        padding-right: 15px
        flex: 1
        .info-box
          font-family: $font-family-regular
          font-size: $font-size-16
          color: $color-20202E
          layout(row, block, nowrap)
          justify-content: space-between
          .number
            font-size: $font-size-12
            color: $color-888888
          .green
            font-size: $font-size-12
            color: $color-56BA15
      .user-info-ranking
        layout(row, block, nowrap)
        height: 100%
        justify-content: space-between
        padding-right: 15px
        flex: 1
        .info-box-ranking
          flex: 1
          height: 100%
          layout()
          justify-content: space-around
          font-family: $font-family-regular
          font-size: $font-size-16
          color: $color-20202E
          .txt
            font-size: $font-size-12
            color: $color-888888

        .rank-number
          height: 100%
          layout()
          justify-content: center
          align-items: center
          font-family: DINCondensed-Bold
          font-size: 30px
          color: $color-20202E
          padding-top: 5px
</style>
