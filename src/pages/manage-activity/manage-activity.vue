<template>
  <transition :name="slide">
    <div class="manage-activity" @click="closeAll">
      <div class="product-tab">
        <div class="tab-box" @click="changeTab(0)">已上架</div>
        <div class="tab-box" @click="changeTab(1)">已下架</div>
        <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
          <div class="line-box"></div>
        </div>
      </div>
      <div class="scroll-wrapper">
        <scroll ref="scroll"
                :data="itemlist"
                :probeType="probeType"
                :pullUpLoad="pullUpLoadObj"
                :showNoMore="false"
                :listenScroll="listenScroll"
                @pullingUp="onPullingUp">
          <div class="product-top"></div>
          <div class="up-box-all">
            <div class="up-box" v-if="menuIdx * 1 === 0 && upList.length !== 0">
              <ul class="up-list">
                <li class="up-list-item" v-for="(item, index) in upList" v-bind:key="item.id">
                  <div class="up-list-top">
                    <div class="top-left" v-if="item.rule_id * 1 === 1">拼团特惠</div>
                    <div class="top-left" v-if="item.rule_id * 1 === 3">疯狂砍价</div>
                    <div class="top-left">距离本场结束：{{item.end_at}}</div>
                  </div>
                  <div class="up-list-bottom">
                    <img :src="item.goods_image_url" alt="" class="img_url">
                    <div class="bottom-right">
                      <div class="title">{{item.goods_title}}</div>
                      <div class="info-box">
                        <div class="info-left">
                          <div class="info-text">
                            <div class="price-text" v-if="item.rule_id * 1 === 1">团购价：¥{{item.group_price}}</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 3">低价：¥{{item.bottom_price}}</div>
                            <div class="price-text">销 量：{{item.sales_volume}}</div>
                          </div>
                          <div class="info-text">
                            <div class="price-text price-right">原价：¥{{item.goods_price}}</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 1">库存：无限量</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 3">库存：{{item.stock}}</div>
                          </div>
                        </div>
                        <img src="./icon-operate@2x.png" v-if="upIndex !== index || !upShowBox" alt="" class="info-img"
                             @click.stop="showChoose(index)">
                        <img src="./icon-operate_pressed@2x.png" alt="" class="info-img" @click.stop="showChoose(index)"
                             v-if="upShowBox && upIndex === index">
                      </div>
                    </div>
                  </div>
                  <div class="up-list-big-choose">
                    <div class="up-list-choose" :class="upShowBox && upIndex === index ? 'up-list-choose-active' : ''">
                      <div class="choose-box" @click="editProductBtn(item)">
                        <img src="./icon-compile@2x.png" alt="" class="box-top">
                        <p class="box-top-text">编辑</p>
                      </div>
                      <div class="choose-box" @click.stop="downProductBtn(item)">
                        <img src="./icon-offline@2x.png" alt="" class="box-top">
                        <p class="box-top-text">下架</p>
                      </div>
                      <div class="choose-box" @click.stop="delProductBtn(item, 3)">
                        <img src="./icon-delete@2x.png" alt="" class="box-top">
                        <p class="box-top-text">删除</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="up-box" v-if="menuIdx * 1 === 1 && downList.length !== 0">
              <ul class="up-list">
                <li class="up-list-item" v-for="(item, index) in downList" v-bind:key="item.id">
                  <div class="up-list-top">
                    <div class="top-left" v-if="item.rule_id * 1 === 1">拼团特惠</div>
                    <div class="top-left" v-if="item.rule_id * 1 === 3">疯狂砍价</div>
                    <div class="top-left">距离本场结束：{{item.end_at}}</div>
                  </div>
                  <div class="up-list-bottom">
                    <img :src="item.goods_image_url" alt="" class="img_url">
                    <div class="bottom-right">
                      <div class="title">{{item.goods_title}}</div>
                      <div class="info-box">
                        <div class="info-left">
                          <div class="info-text">
                            <div class="price-text" v-if="item.rule_id * 1 === 1">团购价：¥{{item.group_price}}</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 3">低价：¥{{item.bottom_price}}</div>
                            <div class="price-text">销 量：{{item.sales_volume}}</div>
                          </div>
                          <div class="info-text">
                            <div class="price-text price-right">原价：¥{{item.goods_price}}</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 1">库存：无限量</div>
                            <div class="price-text" v-if="item.rule_id * 1 === 3">库存：{{item.stock}}</div>
                          </div>
                        </div>
                        <img src="./icon-operate@2x.png" v-if="downIndex !== index || !downShowBox" alt=""
                             class="info-img" @click.stop="showDownChoose(index)">
                        <img src="./icon-operate_pressed@2x.png" alt="" class="info-img"
                             @click.stop="showDownChoose(index)" v-if="downShowBox && downIndex === index">
                      </div>
                    </div>
                  </div>
                  <div class="up-list-big-choose">
                    <div class="up-list-choose"
                         :class="downShowBox && downIndex === index ? 'up-list-choose-active' : ''">
                      <div class="choose-box" @click="editProductBtn(item)">
                        <img src="./icon-compile@2x.png" alt="" class="box-top">
                        <p class="box-top-text">编辑</p>
                      </div>
                      <div class="choose-box" @click.stop="upProductBtn(item)">
                        <img src="./icon-shelves@2x.png" alt="" class="box-top">
                        <p class="box-top-text">上架</p>
                      </div>
                      <div class="choose-box" @click.stop="delProductBtn(item, 4)">
                        <img src="./icon-delete@2x.png" alt="" class="box-top">
                        <p class="box-top-text">删除</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <section class="exception-box" v-if="menuIdx * 1 === 0 && upList.length === 0">
              <exception errType="nodata"></exception>
            </section>
            <section class="exception-box" v-if="menuIdx * 1 === 1 && downList.length === 0">
              <exception errType="nodata"></exception>
            </section>
          </div>
        </scroll>
      </div>
      <div class="sumbit-btn" @click="jumpNewActivity">新建活动</div>
      <toast ref="toast"></toast>
      <confirm-msg ref="confirm" @confirm="msgConfirm" @cancel="msgCancel"></confirm-msg>
      <router-view @refgetActivity="refgetActivity"></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Activity} from 'api'
  import {ERR_OK} from 'common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import Exception from 'components/exception/exception'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { mapGetters } from 'vuex'

  export default {
    name: 'manage-activity',
    data() {
      return {
        menuIdx: 0,
        listenScroll: true,
        probeType: 3,
        itemlist: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        upShowBox: false,
        upIndex: '',
        downShowBox: false,
        downIndex: '',
        upList: [],
        downList: [],
        showBox: false,
        upPage: 1,
        curItem: {},
        type: null,
        delType: null,
        rule_id: null
      }
    },
    created() {
      this.getNewUpActiveList()
      this.getNewDownActiveList()
    },
    methods: {
      refgetActivity() {
        this.menuIdx = 0
        this.getNewUpActiveList()
        this.getNewDownActiveList()
      },
      changeTab(index) {
        this.$refs.scroll.scrollTo(0, 0)
        this.menuIdx = index
      },
      getNewUpActiveList() {
        this.upPage = 1
        Activity.getActivityList(1, this.upPage).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.upList = res.data
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreUpActiveList() {
        if (this.upMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Activity.getActivityList(1, this.upPage).then((res) => {
          if (res.error === ERR_OK) {
            this.upList.push(...res.data)
            this._isUpList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isUpList(res) {
        this.upPage++
        if (this.upList.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      getNewDownActiveList() {
        this.downPage = 1
        Activity.getActivityList(0, this.downPage).then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.downList = res.data
            this._isDownList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreDownActiveList() {
        if (this.downMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        Activity.getActivityList(0, this.downPage).then((res) => {
          if (res.error === ERR_OK) {
            this.downList.push(...res.data)
            this._isDownList(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isDownList(res) {
        this.downPage++
        if (this.downList.length >= res.meta.total * 1) {
          this.downMore = true
        }
      },
      showChoose(index) {
        if (this.upIndex !== index) {
          this.upShowBox = true
        } else {
          this.upShowBox = !this.upShowBox
        }
        this.upIndex = index
      },
      closeAll() {
        this.downShowBox = false
        this.upShowBox = false
        this.upIndex = false
        this.downIndex = false
      },
      showDownChoose(index) {
        if (this.downIndex !== index) {
          this.downShowBox = true
        } else {
          this.downShowBox = !this.downShowBox
        }
        this.downIndex = index
      },
      downProductBtn(item) {
        this.type = 0
        this.curItem = item
        this.rule_id = item.rule_id
        console.log(item)
        this.$refs.confirm.show('确定下架该活动吗？')
      },
      upProductBtn(item) {
        this.type = 1
        this.curItem = item
        this.rule_id = item.rule_id
        console.log(item)
        this.$refs.confirm.show('确定上架该活动吗？')
      },
      delProductBtn(item, index) {
        this.type = 2
        this.delType = index
        console.log(index)
        this.curItem = item
        this.rule_id = item.rule_id
        this.$refs.confirm.show('确定删除该活动吗？')
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      onPullingUp() {
        if (this.menuIdx === 0) {
          this.getMoreUpActiveList()
        } else {
          this.getMoreDownActiveList()
        }
      },
      msgConfirm() {
        if (this.type === 0 && this.rule_id * 1 === 1) {
          Activity.grouponOffline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              const idx = this.upList.findIndex(val => val.id === this.curItem.id)
              this.upList.splice(idx, 1)
              this.upShowBox = false
              this.downList.unshift(this.curItem)
              this.$refs.toast.show('下架成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        } else if (this.type === 0 && this.rule_id * 1 === 3) {
          Activity.bargainOffline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              const idx = this.upList.findIndex(val => val.id === this.curItem.id)
              this.upList.splice(idx, 1)
              this.upShowBox = false
              this.downList.unshift(this.curItem)
              this.$refs.toast.show('下架成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        } else if (this.type === 1 && this.rule_id * 1 === 1) {
          Activity.grouponOnline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              const idx = this.downList.findIndex(val => val.id === this.curItem.id)
              this.downList.splice(idx, 1)
              this.downShowBox = false
              this.upList.unshift(this.curItem)
              this.$refs.toast.show('上架成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        } else if (this.type === 1 && this.rule_id * 1 === 3) {
          Activity.bargainOnline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              const idx = this.downList.findIndex(val => val.id === this.curItem.id)
              this.downList.splice(idx, 1)
              this.downShowBox = false
              this.upList.unshift(this.curItem)
              this.$refs.toast.show('上架成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        } else if (this.type === 2 && this.rule_id * 1 === 1) {
          Activity.deleteGrouponOnline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              if (this.delType * 1 === 3) {
                const idx = this.upList.findIndex(val => val.id === this.curItem.id)
                this.upList.splice(idx, 1)
              } else {
                const idx = this.downList.findIndex(val => val.id === this.curItem.id)
                this.downList.splice(idx, 1)
              }
              this.upShowBox = false
              this.downShowBox = false
              this.$refs.toast.show('删除成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        } else if (this.type === 2 && this.rule_id * 1 === 3) {
          Activity.deleteBargainOnline(this.curItem.id).then(res => {
            if (res.error === ERR_OK) {
              if (this.delType * 1 === 3) {
                const idx = this.upList.findIndex(val => val.id === this.curItem.id)
                this.upList.splice(idx, 1)
              } else {
                const idx = this.downList.findIndex(val => val.id === this.curItem.id)
                this.downList.splice(idx, 1)
              }
              this.upShowBox = false
              this.downShowBox = false
              this.$refs.toast.show('删除成功')
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        }
      },
      editProductBtn(item) {
        let path = `manage-activity/new-activity`
        this.$router.push({path, query: {id: item.id, rule_id: item.rule_id}})
      },
      msgCancel() {
      },
      jumpNewActivity() {
        let path = 'manage-activity/new-activity'
        this.$router.push(path)
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      }
    },
    components: {
      Toast,
      Scroll,
      ConfirmMsg,
      Exception
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

  .exception-box
    padding-top: 70px

  .manage-activity
    fill-box()
    z-index: 51
    .scroll-wrapper
      position: absolute
      top: 45px
      left: 0
      right: 0
      bottom: 45px
      overflow: hidden

  .product-tab
    position: fixed
    z-index: 21
    width: 100%
    background: $color-white-fff
    left: 0
    top: 0
    height: 45px
    layout(row)
    .tab-box
      width: 50%
      line-height: 45px
      text-align: center
      font-size: $font-size-16
      font-family: $font-family-regular
      color: $color-20202E
    .line
      position: absolute
      width: 50%
      height: 3px
      left: 0
      bottom: 0
      transition: all .3s
      .line-box
        background: $color-20202E
        height: 3px
        width: 40px
        margin: 0 auto


  .up-box
    padding: 15px 15px 0
    .up-list-item
      margin-bottom: 15px
      background: $color-white-fff
      border-radius: 2px
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.08)
      border: 1px solid rgba(32, 32, 46, 0.10)
      padding-left: 10px
      position: relative
      .up-list-top
        height: 45px
        line-height: 45px
        layout(row)
        justify-content: space-between
        padding-right: 10px
        border-bottom: 0.5px solid rgba(0, 0, 0, .1)
        .top-left
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-20202E
      .up-list-bottom
        padding: 15px 10px 15px 0
        align-items: center
        layout(row)
        .img_url
          display: block
          border-radius: 2px
          width: 70px
          height: 70px
          margin-right: 10px
        .bottom-right
          flex: 1
          overflow: hidden
          .title
            font-size: $font-size-14
            font-family: $font-family-regular
            color: $color-20202E
            no-wrap()
          .info-box
            layout(row)
            margin-top: 15px
            position: relative
            .info-left
              layout(row)
            .price-text
              font-size: $font-size-12
              font-family: $font-family-regular
              color: $color-text-88
              margin-right: 16px
              margin-bottom: 7px
            .price-right
              margin-right: 0
          .info-img
            width: 40px
            display: block
            height: 22px
            position: absolute
            right: 0
            bottom: 0
      .up-list-big-choose
        height: 52px
        overflow: hidden
        position: absolute
        right: 58px
        bottom: 0px
        width: 163.5px
      .up-list-choose
        position: absolute
        height: 52px
        width: 0px
        right: 8px
        bottom: 0
        background: rgba(32, 32, 46, 0.80)
        border-radius: 2px
        layout(row)
        align-items: center
        padding: 0
        transition: all 0.5s
        &:after
          content: ''
          position: absolute
          right: -7.5px
          top: 0
          bottom: 0
          width: 0
          height: 0
          border-top: 8px solid transparent
          border-bottom: 8px solid transparent
          border-left: 0px solid rgba(32, 32, 46, 0.80)
          margin: auto
        .choose-box
          flex: 1
          layout()
          justify-content: center
        .box-top
          display: block
          width: 16px
          height: 16px
          margin: auto
        .box-top-text
          white-space: nowrap
          margin-top: 5.5px
          font-size: $font-size-10
          font-family: $font-family-regular
          color: $color-white-fff
          text-align: center
      .up-list-choose-active
        width: 155.5px
        padding: 10px
        &:after
          border-left: 8px solid rgba(32, 32, 46, 0.80)

  .sumbit-btn
    position: fixed
    z-index: 21
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

</style>
