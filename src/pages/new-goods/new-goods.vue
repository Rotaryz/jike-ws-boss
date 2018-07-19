<template>
  <transition name="slide">
    <div class="manage-box">
      <scroll>
        <div class="add-box">
          <div class="add-list">
            <div class="left">商品标题</div>
            <input class="right-input" type="text" placeholder="请输入" maxlength="50">
          </div>
          <div class="add-list">
            <div class="left">商品标题</div>
            <input class="right-input" type="text" placeholder="请输入">
          </div>
          <div class="top-img-title">封面图片</div>
          <ul class="top-img-list">
            <li class="top-img-item" v-for="(item, index) in image" :key="index">
              <img class="img-item" :src="item.image_url">
              <div class="close-icon" @click.stop="_delImage(index)">
                <img class="close-icon" src="./icon-del@2x.png">
              </div>
            </li>
            <li class="top-img-item" v-if="image.length < 5">
              <img class="img-item" src="./icon-addpic@2x.png">
              <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*" multiple>
            </li>
            <li class="top-img-item" v-for="(item, index) in (4 - saclLength)">
              <img class="img-item" src="./icon-addpicc@2x.png">
            </li>
          </ul>
          <div class="top-img-des">可添加5张图片(尺寸:750x400,大小2M以下)</div>
          <div class="add-list">
            <div class="left">原价</div>
            <input class="right-input" type="number" placeholder="请输入" maxlength="50">
          </div>
          <div class="add-list">
            <div class="left">现价</div>
            <input class="right-input" type="number" placeholder="请输入" maxlength="50">
          </div>
        </div>
        <div class="add-line"></div>
        <div class="add-box">
          <div class="top-img-title">详情图片</div>
          <ul class="top-img-list">
            <li class="top-img-item" v-for="(item, index) in image" :key="index">
              <img class="img-item" :src="item.image_url">
              <div class="close-icon" @click.stop="_delImage(index)">
                <img class="close-icon" src="./icon-del@2x.png">
              </div>
            </li>
            <li class="top-img-item" v-if="image.length < 15">
              <img class="img-item" src="./icon-addpic@2x.png">
              <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*" multiple>
            </li>
          </ul>
          <div class="top-img-des">可添加15张图片(尺寸:750x400,大小2M以下)</div>
        </div>
        <div class="add-line"></div>
        <div class="goods-deduct">
          <div class="goods-left">商品提成</div>
          <input type="number" placeholder="" class="goods-number" maxlength="2">
          <div class="icon">%</div>
          <div class="text">按成交价计算</div>
        </div>
      </scroll>
      <div class="sumbit-btn">发布</div>
      <toast ref="toast"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import {ERR_OK} from '../../common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: 'new-goods',
    data() {
      return {
        image: []
      }
    },
    methods: {
      async _fileImage(e) {
        // let param = this._infoImage(e.target.files[0])
        await this._moreImage(e.target.files)
      },
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      // _upLoad(item) {
      //   UpLoad.upLoadImage(item).then((res) => {
      //     if (res.error === ERR_OK) {
      //       let imageItem = {type: 1, detail_id: res.data.id, image_url: res.data.url}
      //       this.image.push(imageItem)
      //       this.image = this.image.slice(0, 9)
      //     }
      //   })
      // },
      async _moreImage(arr) {
        // let image = {}
        // let sequence = Promise.resolve()
        for (let item of arr) {
          item = this._infoImage(item)
          // await this._upLoad(item)
          this.image.push(item)
          console.log(this.image)
        }
      },
      _delImage(index) {
        this.image.splice(index, 1)
      }
    },
    computed: {
      saclLength() {
        if (this.image.length > 4) {
          this.image.length = 4
        }
        return this.image.length
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
    .left
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
      width: 86px
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

  .top-img-title
    padding: 18px 0 0
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
      border-radius: 3px
      margin-right: 15px
      position: relative
      margin-top: 15px
      .img-item
        display: block
        width: 100%
        height: 100%
      .image-file
        opacity: 0
        height: 76%
        width: 76%
        all-center()
      .close-icon
        height: 16.5px
        width: 16.5px
        line-height: 16.5px
        text-align: center
        background: rgba(0, 0, 0, 0.20)
        color: $color-white
        font-size: $font-size-small-s
        position: absolute
        right: 0px
        top: 3px
        background: $color-background

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

  .sumbit-no-btn
    background: #888
</style>
