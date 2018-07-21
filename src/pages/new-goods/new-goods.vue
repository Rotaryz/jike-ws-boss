<template>
  <transition name="slide">
    <div class="manage-box">
      <div class="scroll-wrapper">
        <scroll>
          <div class="add-box">
            <div class="add-list">
              <div class="left">商品标题</div>
              <input v-model="goodsData.title" class="right-input" type="text" placeholder="请输入" maxlength="20">
              <div class="add-number">{{goodsData.title.length}}/20</div>
            </div>
            <div class="add-list">
              <div class="left">商品副标题</div>
              <input v-model="goodsData.subtitle" class="right-input" type="text" placeholder="请输入" maxlength="50">
              <div class="add-number">{{goodsData.subtitle.length}}/50</div>
            </div>
            <div class="top-img-title">封面图片</div>
            <ul class="top-img-list">
              <li class="top-img-item" v-for="(item, index) in goodsData.goods_banner_images" :key="index">
                <img class="img-item" :src="item.image_url">
                <div class="close-icon" @click.stop="_delImage(index)" v-if="showEdit">
                  <img class="close-icon" src="./icon-del@2x.png">
                </div>
              </li>
              <li class="top-img-item" v-if="goodsData.goods_banner_images.length < 5 && showEdit">
                <img class="img-item" src="./icon-addpic@2x.png">
                <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*" multiple>
              </li>
              <li class="top-img-item" v-for="(item, index) in (4 - saclLength)" v-if="showEdit">
                <img class="img-item" src="./icon-addpicc@2x.png">
              </li>
            </ul>
            <div class="top-img-des">可添加5张图片(尺寸:750x400,大小2M以下)</div>
            <div class="add-list">
              <div class="left">原价</div>
              <input v-if="showEdit" v-model="goodsData.platform_price" class="right-input" type="number"
                     placeholder="请输入" maxlength="50">
              <div class="edit-price" v-if="!showEdit">{{goodsData.platform_price}}</div>
            </div>
            <div class="add-list">
              <div class="left">现价</div>
              <input v-if="showEdit" v-model="goodsData.original_price" class="right-input" type="number"
                     placeholder="请输入" maxlength="50">
              <div class="edit-price" v-if="!showEdit">{{goodsData.original_price}}</div>
            </div>
          </div>
          <div class="add-line"></div>
          <div class="add-box">
            <div class="top-img-title">详情图片</div>
            <ul class="top-img-list">
              <li class="top-img-item" v-for="(item, index) in goodsData.goods_images" :key="index">
                <img class="img-item" :src="item.image_url">
                <div class="close-icon" @click.stop="_delDetailImage(index)" v-if="showEdit">
                  <img class="close-icon" src="./icon-del@2x.png">
                </div>
              </li>
              <li class="top-img-item" v-if="goodsData.goods_images.length < 15 && showEdit">
                <img class="img-item" src="./icon-addpic@2x.png">
                <input type="file" class="image-file" @change="_fileDetailImage($event)" accept="image/*" multiple>
              </li>
            </ul>
            <div class="top-img-des">可添加15张图片(尺寸:750x400,大小2M以下)</div>
          </div>
          <div class="add-line"></div>
          <div class="goods-deduct">
            <div class="goods-left">商品提成</div>
            <input type="number" v-if="showEdit" v-model="goodsData.commission_rate" placeholder="" class="goods-number"
                   maxlength="2">
            <div class="edit-price" v-if="!showEdit">{{goodsData.commission_rate}}</div>
            <div class="icon">%</div>
            <div class="text">按成交价计算</div>
          </div>
        </scroll>
      </div>
      <div class="sumbit-btn" @click="sumbitGoods">发布</div>
      <toast ref="toast"></toast>
      <confirm-msg ref="confirm" @confirm="msgConfirm" @cancel="msgCancel"></confirm-msg>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Product} from 'api'
  import {ERR_OK} from 'common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { mapGetters } from 'vuex'

  export default {
    name: 'new-goods',
    data() {
      return {
        id: null,
        showEdit: true,
        goodsData: {
          title: '',
          subtitle: '',
          platform_price: '',
          original_price: '',
          goods_banner_images: [],
          goods_images: [],
          commission_rate: '',
          is_online: 1,
          image_id: '',
          total_stock: '-1'
        }
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) {
        Product.geDetailProduct(this.id).then(res => {
          this.goodsData = res.data
          this.showEdit = false
        })
      }
      console.log(this.id)
    },
    methods: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      async _fileImage(e) {
        // let param = this._infoImage(e.target.files[0])
        await this._moreImage(e.target.files)
      },
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      _upLoad(item) {
        Product.upLoadImage(item).then((res) => {
          if (res.error === ERR_OK) {
            let imageItem = {type: 1, image_id: res.data.id, image_url: res.data.url}
            this.goodsData.goods_banner_images.push(imageItem)
            this.goodsData.goods_banner_images = this.goodsData.goods_banner_images.slice(0, 9)
          }
        })
      },
      async _moreImage(arr) {
        // let image = {}
        // let sequence = Promise.resolve()
        for (let item of arr) {
          item = this._infoImage(item)
          await this._upLoad(item)
        }
      },
      _delImage(index) {
        this.goodsData.goods_banner_images.splice(index, 1)
      },
      async _fileDetailImage(e) {
        // let param = this._infoDetailImage(e.target.files[0])
        await this._moreDetailImage(e.target.files)
      },
      _infoDetailImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      _upDetailLoad(item) {
        Product.upLoadImage(item).then((res) => {
          if (res.error === ERR_OK) {
            let imageItem = {type: 1, image_id: res.data.id, image_url: res.data.url}
            this.goodsData.goods_images.push(imageItem)
            console.log(this.goodsData.goods_images)
            this.goodsData.goods_images = this.goodsData.goods_images.slice(0, 9)
          }
        })
      },
      async _moreDetailImage(arr) {
        // let image = {}
        // let sequence = Promise.resolve()
        for (let item of arr) {
          item = this._infoDetailImage(item)
          await this._upDetailLoad(item)
        }
      },
      _delDetailImage(index) {
        this.goodsData.goods_images.splice(index, 1)
      },
      msgConfirm() {
        Product.newProduct(this.goodsData).then((res) => {
          if (res.error === ERR_OK) {
            this.$refs.toast.show('发布成功')
            this.$emit('refget')
            setTimeout(() => {
              this.$router.back()
            }, 500)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      msgCancel() {
      },
      sumbitGoods() {
        if (this.goodsData.title.length === 0) {
          this.$refs.toast.show('请输入商品标题')
          return
        }
        if (this.goodsData.goods_banner_images.length === 0) {
          this.$refs.toast.show('请上传封面图片')
          return
        }
        if (this.goodsData.platform_price.length === 0 || this.goodsData.platform_price <= 0) {
          this.$refs.toast.show('请输入商品原价大于零')
          return
        }
        if (this.goodsData.original_price.length === 0 || this.goodsData.original_price <= 0) {
          this.$refs.toast.show('请输入商品现价大于零')
          return
        }
        if (this.goodsData.goods_images.length === 0) {
          this.$refs.toast.show('请上传详情图片')
          return
        }
        if (this.goodsData.commission_rate < 5 || this.goodsData.commission_rate > 15 || this.goodsData.commission_rate.length === 0) {
          this.$refs.toast.show('商品提成，可设置5-15之间')
          return
        }
        this.goodsData.image_id = this.goodsData.goods_banner_images[0].image_id
        console.log(this.goodsData.image_id)
        if (this.showEdit) {
          this.$refs.confirm.show('商品发布后将立刻上线？')
        } else {
          Product.changeProduct(this.id, this.goodsData).then((res) => {
            if (res.error === ERR_OK) {
              this.$refs.toast.show('修改成功')
              this.$emit('refget')
              setTimeout(() => {
                this.$router.back()
              }, 500)
            } else {
              this.$refs.toast.show(res.message)
            }
          })
        }
      }
    },
    computed: {
      saclLength() {
        if (this.goodsData.goods_banner_images.length > 4) {
          this.goodsData.goods_banner_images.length = 4
        }
        return this.goodsData.goods_banner_images.length
      }
    },
    components: {
      Toast,
      Scroll,
      ConfirmMsg
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
    .scroll-wrapper
      position: absolute
      top: 0px
      left: 0
      right: 0
      bottom: 45px
      overflow: hidden

  .add-box
    padding-left: 15px
    background: $color-white-fff

  .add-list
    layout(row)
    height: 50px
    border-bottom: 0.5px solid rgba(0, 0, 0, .1)
    align-items: center
    position: relative
    padding-right: 50px
    .add-number
      font-size: $font-size-12
      color: $color-ccc
      font-family: $font-family-regular
      position: absolute
      right: 15px
      top: 0
      height: 50px
      line-height: 50px
    .left
      font-size: $font-size-medium
      color: $color-text-88
      font-family: $font-family-regular
      width: 86px
    .edit-price
      font-size: $font-size-medium
      color: #20202e
      font-family: $font-family-regular
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
      outline: none
    .edit-price
      width: 66.5px
      height: 32px
      line-height: 32px
      border: 1px solid #ccc
      border-radius: 2px
      text-align: center
      margin-right: 8px

  .sumbit-no-btn
    background: #888
</style>
