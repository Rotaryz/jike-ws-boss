<template>
  <transition :name="slide">
    <article class="data-all">
      <scroll>
        <div class="data-box">
          <div class="client-top">
            <div class="cliten-bg"></div>
            <div class="cliten-box">
              <div class="cliten-con">
                <div class="cliten-img">
                  <div class="detail-img-box">
                    <div class="img">
                      <img :src="imgUrl" alt="" class="imgUrl">
                    </div>
                    <div class="label-right">
                      <div class="label-name">{{flow.nickname}}</div>
                      <div class="add-text">
                        {{flow.sources}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="data-con">
            <div class="data-top">
              <div class="data-list">
                <div class="left">姓名</div>
                <div class="right">
                  <div class="name" v-if="flow.real_name * 1 !== 0">{{flow.real_name}}</div>
                  <div class="no-active name"  v-if="flow.real_name * 1 === 0">未完善</div>
                </div>
              </div>
              <div class="data-list">
                <div class="left">手机号码</div>
                <div class="right">
                  <div class="name" v-if="flow.mobile * 1 !== 0">{{flow.mobile}}</div>
                  <div class="no-active name"  v-if="flow.mobile * 1 === 0">未完善</div>
                  <img v-if="flow.mobile.length > 0" src="./icon-telephone_khzl@2x.png" alt="" class="right-img-phone" @click="phoneCall()">
                </div>
              </div>
              <div class="data-list">
                <div class="left">微信号</div>
                <div class="right">
                  <div class="name" v-if="flow.wx_account * 1 !== 0">{{flow.wx_account}}</div>
                  <div class="no-active name"  v-if="flow.wx_account * 1 === 0">未完善</div>
                  <img v-if="flow.wx_account.length > 0" src="./icon-wechat_khzl@2x.png"  v-clipboard:copy="flow.wx_account" v-clipboard:success="onCopy" v-clipboard:error="onError" alt="" class="right-img-phone right-img-copy">
                </div>
              </div>
              <div class="data-list">
                <div class="left">性别</div>
                <div class="right">
                  <div class="selected-text" :class="sexSelected === '未完善' ? '':'active'">
                    {{sexSelected}}
                  </div>
                </div>
              </div>
              <div class="data-list">
                <div class="left">年龄</div>
                <div class="right">
                  <div class="name" v-if="flow.age * 1 !== 0">{{flow.age}}</div>
                  <div class="no-active name"  v-if="flow.age * 1 === 0">未完善</div>
                </div>
              </div>
              <div class="data-list">
                <div class="left">所在城市</div>
                <div class="right">
                  <div class="name" v-if="flow.city * 1 !== 0">{{flow.city}}</div>
                  <div class="no-active name"  v-if="flow.city * 1 === 0">未完善</div>
                </div>
              </div>
              <div class="data-list">
                <div class="left">从事职业</div>
                <div class="right">
                  <div class="name" v-if="flow.job * 1 !== 0">{{flow.job}}</div>
                  <div class="no-active name"  v-if="flow.job * 1 === 0">未完善</div>
                </div>
              </div>
              <div class="data-list">
                <div class="left">所属公司</div>
                <div class="right">
                  <div class="name" v-if="flow.company * 1 !== 0">{{flow.company}}</div>
                  <div class="no-active name"  v-if="flow.company * 1 === 0">未完善</div>
                </div>
              </div>
              <div class="data-list" v-if="false">
                <div class="left">屏蔽消息</div>
                <div class="right">
                  <div class="name">{{chooseText}}</div>
                  <div class="right-choose" @click="chooseBtn" :class="bgChoose ? '' : 'right-choose-active'">
                    <div class="choose-btn" :class="choose ? 'choose-btn-active' : ''"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="data-bottom">
              <div class="title">备注</div>
              <!--<div class="textarea-number">{{flow.note.length}}<span>/500</span></div>-->
              <div class="data-area">{{flow.note}}
                <div class="area-no-text" v-if="flow.note.length * 1 !== 0">未写备注</div>
              </div>
            </div>
          </div>
          <div class="btn-padding"></div>
          <toast ref="toast"></toast>
        </div>
      </scroll>
      <!--<div class="data-btn" @click="saveClientData()">保存</div>-->
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {ClientDetail} from 'api'
  import {ERR_OK} from '../../common/js/config'
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import VueClipboard from 'vue-clipboard2'
  import {mapGetters} from 'vuex'
  Vue.use(VueClipboard)

  export default {
    name: 'detail-data',
    data() {
      return {
        sexSelected: '未完善',
        options: [
          {text: '男', value: '男'},
          {text: '女', value: '女'}
        ],
        imgUrl: '',
        choose: false,
        bgChoose: false,
        chooseText: '屏蔽',
        text: '',
        flow: {
          nickname: '',
          real_name: '',
          mobile: '',
          age: null,
          wx_account: '',
          company: '',
          sex: '',
          country: '',
          city: '',
          job: '',
          note: '',
          message_is_abled: '',
          sources: ''
        },
        id: ''
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getClientData(this.id)
    },
    methods: {
      chooseBtn() {
        this.choose = !this.choose
        setTimeout(() => {
          this.bgChoose = !this.bgChoose
          if (this.choose) {
            this.chooseText = '不屏蔽'
          } else {
            this.chooseText = '屏蔽'
          }
        }, 300)
      },
      getClientData(id) {
        ClientDetail.getClientDetail(id).then((res) => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.imgUrl = res.data.image_url
            this.flow = res.data.flow
            if (res.data.flow.sex * 1 === 0) {
              this.sexSelected = '男'
            } else if (res.data.flow.sex * 1 === 1) {
              this.sexSelected = '女'
            }
          }
        })
      },
      saveClientData() {
        if (this.sexSelected === '男') {
          this.flow.sex = 0
        } else if (this.sexSelected === '女') {
          this.flow.sex = 1
        }
        ClientDetail.saveClientDetail(this.id, this.flow).then((res) => {
          if (res.error === ERR_OK) {
            this.$refs.toast.show(res.message)
            setTimeout(() => {
              this.$router.back()
            }, 500)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      phoneCall() {
        window.location.href = `tel:${this.flow.mobile}`
      },
      onCopy(e) {
        this.$refs.toast.show('复制成功')
      },
      onError(e) {
        console.log('无法复制文本！')
      }
    },
    computed: {
      ...mapGetters(['ios']),
      slide() {
        return this.ios ? '' : 'slide'
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
  .data-all
    fill-box()
    z-index: 70
  .client-top
    position: relative
    .cliten-bg
      position: absolute
      z-index: 1
      height: 73px
      background: #20202E
      width: 100%
      top: 0
      left: 0
    .cliten-box
      position: relative
      padding: 20px 15px 0
      width: 100%
      z-index: 2
      .cliten-con
        background: #fff
        width: 100%
        padding: 15px
        position: relative
        .cliten-img
          layout(row)
          justify-content: space-between
          align-items: center
          position: relative
          z-index: 1
          .detail-img-box
            layout(row)
            .img
              position: relative
              height: 0
              width: 60px
              height: 60px
              background: #333
              .imgUrl
                width: 100%
                height: 100%
                display: block
            .label-right
              margin-left: 10px
              .label-name
                font-size: $font-size-medium-x
                color: $color-text
                font-family: $font-family-meddle
                padding-top: 5px
                margin-bottom: 15px
              .add-text
                font-size: $font-size-small
                color: $color-text-88
                font-family: $font-family-meddle
  .data-con
    padding: 15px
    .data-top
      border: 0.5px solid rgba(32, 32, 46, .1)
      background: #fff
      padding-left: 15px
      .data-list
        layout(row)
        height: 45px
        border-bottom: 0.5px solid rgba(0, 0, 0, .1)
        align-items: center
        .left
          font-size: $font-size-medium
          color: $color-text-88
          font-family: $font-family-meddle
          width: 83px
        .name
          font-size: $font-size-medium
          color: #20202e
          font-family: $font-family-meddle
        .no-active
          color: #ccc
        .right
          flex: 1
          position: relative
          .right-selected
            position: absolute
            width: 100%
            height: 44px
            left: 0
            top: -12px
            opacity: 0
          .right-input
            height: 43px
            line-height: 43px
            width: 90%
            border: none
            font-size: $font-size-medium
            color: #20202e
            font-family: $font-family-meddle
            outline:none
          .right-input::-webkit-input-placeholder
            color: #ccc
          .right-input::-ms-input-placeholder
            color: #ccc
          .right-input::-moz-placeholder
            color: #ccc
          .selected-text
            font-size: $font-size-medium
            font-family: $font-family-meddle
            color: #ccc
          .active
            color: #20202e
          .right-img-phone
            position: absolute
            width: 22px
            height: 22px
            display: block
            right: 14px
            top: 0
            bottom: 0
            margin: auto 0
          .right-img-copy
            width: 20px
            height: 20px
          .right-choose
            position: absolute
            background: #56BA15
            height: 24px
            width: 45px
            right: 14px
            padding: 1px
            top: 0
            bottom: 0
            margin: auto 0
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
    .data-top:last-child
      border-bottom: 0
    .data-bottom
      margin-top: 10px
      border: 0.5px solid rgba(0, 0, 0, 0.1)
      padding: 15px
      background: #fff
      position: relative
      .title
        font-size: $font-size-medium
        color: $color-text-88
        font-family: $font-family-meddle
      .data-area
        margin-top: 10px
        width: 100%
        border: 0.5px solid rgba(0, 0, 0, 0.1)
        padding: 10px 15px
        font-size: $font-size-medium
        color: #20202e
        font-family: $font-family-meddle
        min-height: 185px
        line-height: 18px
        .area-no-text
          color: #ccc
      .textarea-number
        position: absolute
        bottom: 25px
        right: 25px
        font-size: $font-size-small
        font-family: $font-family-meddle
        color: #202020 e
        span
          color: #ddd

  .data-btn
    position: fixed
    height: 45px
    line-height: 45px
    left: 0
    bottom: 0
    width: 100%
    color: #fff
    background: #20202e
    text-align: center
    z-index: 11
    font-size: $font-size-medium-x
    font-family: $font-family-meddle

  .btn-padding
    height: 45px
</style>
