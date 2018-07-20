<template>
  <div class="tab border-bottom-1px" v-show="tabMode === mode.show">
    <section class="line-wrapper" :style="tabStyle">
      <div class="line"></div>
    </section>
    <div class="tab-item" v-for="(item, index) in tabList" :key="index">
      <div class="item-container" @click="changeTab(item, index)">
        <p class="icon-text">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {tabMode} from 'common/js/constants'

  const COMPONENT_NAME = 'Tab'
  const TABS = [
    {text: '总览', path: '/radar/overview', id: 1},
    {text: '排行榜', path: '/radar/ranking', id: 2},
    {text: 'AI分析', path: '/radar/ai-analyse', id: 3}
  ]
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tabList: TABS,
        activeIndex: 0,
        mode: tabMode,
        tabTranslateX: 0
      }
    },
    created() {
    },
    methods: {
      changeTab(item, index) {
        if (index === this.activeIndex) {
          return
        }
        this.tabTranslateX = index * 100
        this.activeIndex = index
        this.$router.push(item.path)
      }
    },
    watch: {
      '$route'(to) {
        let path = to.path
        let routeArr = this.tabList.filter((item) => {
          return item.path === path
        })
        if (routeArr.length) {
          this.activeIndex = routeArr[0].id - 1
        }
      }
    },
    computed: {
      ...mapGetters([
        'tabMode'
      ]),
      tabStyle() {
        return `width:${100 / TABS.length}%;transform:translate3d(${this.tabTranslateX}%, 0, 0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .tab
    position: fixed
    top: 0
    width: 100vw
    height: 62px
    background: $color-20202E
    display: flex
    .tab-item
      position: relative
      flex: 1
      overflow: hidden
      height: 62px
      .item-container
        overflow: hidden
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        font-size: 0
        .icon
          width: 20px
          height: 20px
          margin-bottom: 3px
        .icon-text
          font-family: $font-family-regular
          font-size: $font-size-16
          color: $color-white-fff
    .line-wrapper
      position: absolute
      top: 0
      left: 0
      display: flex
      justify-content: center
      align-items: center
      height: 100%
      transition: all .3s
      transform: translate3d(0, 0, 0)
      .line
        width: 85px
        height: 32px
        background-color: $color-56BA15
        border-radius: 100px
</style>
