<template>
  <transition name="slide">
    <div class="manage-box">
      <div class="scroll-wrapper">
        <scroll ref="scroll"
                bcColor="#fff"
                :data="itemlist"
                :probeType="probeType"
                :pullUpLoad="pullUpLoadObj"
                :showNoMore="false"
                :listenScroll="listenScroll"
                @pullingUp="onPullingUp">
          <div class="manage-top">已开通账号数：{{total}}位</div>
          <ul class="manage-list">
            <li class="manage-list-item" v-for="(item, index) in itemlist" v-bind:key="item.id">
              <slide-view :useType="3" :item="item" @del="delHandler">
                <manage-item :memberitem="item" @openRararBtn="openRararBtn" slot="content"></manage-item>
              </slide-view>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="sumbit-btn" @click="jumpAddMember">添加成员</div>
      <confirm-msg ref="confirm" @confirm="msgConfirm" @cancel="msgCancel"></confirm-msg>
      <toast ref="toast"></toast>
      <router-view @refresh="refresh"></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Member} from 'api'
  import {ERR_OK} from 'common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import SlideView from 'components/slide-view/slide-view'
  import ManageItem from 'components/manage-item/manage-item'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { mapGetters } from 'vuex'

  export default {
    name: 'manage-member',
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        itemlist: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        item: {},
        page: 1,
        noMore: false,
        total: 0,
        nowItem: {}
      }
    },
    created() {
      this.getNewMemberList()
    },
    methods: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      refresh() {
        this.getNewMemberList()
      },
      delHandler(index, item) {
        this.nowItem = item
        console.log(this.nowItem)
        this.$refs.confirm.show()
      },
      msgConfirm() {
        const idx = this.itemlist.findIndex(val => val.id === this.nowItem.id)
        this.itemlist.splice(idx, 1)
        this.total--
        Member.delMember(this.nowItem.id).then(res => {
          if (res.error === ERR_OK) {
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      msgCancel() {
      },
      getNewMemberList() {
        this.page = 1
        Member.getMemberList(this.page).then(res => {
          if (res.error === ERR_OK) {
            this.itemlist = res.data
            this.total = res.meta.total
            this._isMemberList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreFlowList() {
        if (this.noMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Member.getMemberList(this.page).then((res) => {
          if (res.error === ERR_OK) {
            this.itemlist.push(...res.data)
            this._isMemberList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      openRararBtn(item, index) {
        console.log(item, 1111, index)
        Member.openRarar(item.id, index).then(res => {
          if (res.error === ERR_OK) {
            console.log(res.message)
          }
        })
      },
      _isMemberList(res) {
        this.page++
        if (this.itemlist.length >= res.meta.total * 1) {
          this.noMore = true
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      onPullingUp() {
        this.getMoreFlowList()
      },
      jumpAddMember() {
        let path = `manage-member/add-member`
        this.$router.push(path)
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    components: {
      Toast,
      Scroll,
      SlideView,
      ManageItem,
      ConfirmMsg
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
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
    z-index: 21
    overflow: hidden
    .scroll-wrapper
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      overflow: hidden

  .manage-top
    background: #F0F2F5
    color: $color-20202E
    font-family: $font-family-regular
    font-size: $font-size-14
    padding: 10px 15px

  .sumbit-btn
    position: absolute
    z-index: 31
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

  .manage-list
    padding-left: 15px

    .manage-list-item
      layout(row)
      height: 75px
      align-items: center
      justify-content: space-between
      border-bottom: 0.5px solid $color-col-line

</style>
