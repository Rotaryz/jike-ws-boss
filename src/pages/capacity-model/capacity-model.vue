<template>
  <transition :name="slide">
    <div class="client-detail">
      <scroll ref="scroll"
              :data="actionList"
              :probeType="probeType"
              :bcColor="bcColor"
              :listenScroll="listenScroll"
              @scroll="scroll"
              :showNoMore="false"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <div class="client-top" ref="eleven">
          <div class="cliten-bg"></div>
          <div class="cliten-box">
            <div class="cliten-con">
              <div class="cliten-img">
                <div class="detail-img-box">
                  <div class="img">
                    <img :src="clientData.avatar" alt="">
                  </div>
                  <div class="label-right">
                    <div class="label-name">{{clientData.name}}</div>
                    <div class="label-box">
                      <div class="full-name">{{clientData.position}}</div>
                    </div>
                  </div>
                </div>
                <div class="detail-jump" @click="toBusinessCard">
                  <img class="jump-img" src="./icon-pressed@2x.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="select-tab select-client">
          <div class="tab" v-for="(item, index) in tabList" v-bind:key="index" @click="switchTab(index)">{{item}}
          </div>
          <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
            <div class="chilen-line"></div>
          </div>
        </div>
        <div class="capacity" v-if="menuIdx * 1 === 0">
          <div class=""></div>
          <div class=""></div>
          <div class=""></div>
          <div class=""></div>
          <div class=""></div>
          <div class="six-box">
            <div class="six-model-box">
              <div id="six-model"></div>
            </div>
          </div>
          <div class="six-title">
            <div class="six-top">
              <div class="left">销售力综合排名</div>
              <div class="right">{{dataRank.sales_force}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">获客能力排名</div>
              <div class="right">{{dataRank.customer_competence}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">销售能力排行</div>
              <div class="right">{{dataRank.order_force}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">客户互动力排名</div>
              <div class="right">{{dataRank.customer_interaction}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">产品推动力排名</div>
              <div class="right">{{dataRank.product_drive}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">客户跟进力排行</div>
              <div class="right">{{dataRank.customer_followup}}</div>
            </div>
            <div class="six-bottom">
              <div class="left">活动推动力排行</div>
              <div class="right">{{dataRank.activity_drive}}</div>
            </div>
          </div>
        </div>
        <div class="ai-box" v-if="menuIdx * 1 === 1">
          <div class="data-top">
            <div class="cliten-box">
              <div class="data-number-box">
                <img class="cliten-con-bg" src="./bg-customer_details@2x.png" alt="">
                <div class="data-tab">
                  <div class="tab" v-for="(item, index) in tabMoreList" v-bind:key="index"
                       :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)">{{item.text}}
                  </div>
                </div>
                <div class="data-list">
                  <div class="list-box">
                    <div class="number">{{allDatas.customer_sum}}</div>
                    <div class="text">客户总数</div>
                  </div>
                  <div class="list-box">
                    <div class="number">{{allDatas.order_sum}}</div>
                    <div class="text">订单总数</div>
                  </div>
                  <div class="list-box">
                    <div class="number">{{allDatas.order_finish_sum}}</div>
                    <div class="text">成交总数</div>
                  </div>
                  <div class="list-box">
                    <div class="number">{{allDatas.goods_visits_sum}}</div>
                    <div class="text">产品访问数</div>
                  </div>
                  <div class="list-box">
                    <div class="number">{{allDatas.activity_visits_sum}}</div>
                    <div class="text">活动访问数</div>
                  </div>
                  <div class="list-box">
                    <div class="number">{{allDatas.live_logs_sum}}</div>
                    <div class="text">动态访问数</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pie-box ">
            <div id="mySuccess"></div>
            <div class="title-box">
              <div class="title">成交率漏斗</div>
              <div class="sub-title">(每小时更新)</div>
            </div>
            <div class="bottom-des">
              <div class="tab">
                <div class="icon"></div>
                <div class="text">0-50%</div>
              </div>
              <div class="tab">
                <div class="icon two"></div>
                <div class="text">51-80%</div>
              </div>
              <div class="tab">
                <div class="icon thr"></div>
                <div class="text">81-99%</div>
              </div>
              <div class="tab">
                <div class="icon four"></div>
                <div class="text">100%</div>
              </div>
            </div>
          </div>
          <div class="pie-box">
            <div id="myPie"></div>
            <div class="title-box">
              <div class="title">客户兴趣占比</div>
              <div class="sub-title">(每小时更新)</div>
            </div>
            <div class="pie-list">
              <div class="list">
                <div class="icon one"></div>
                <div class="text">个人</div>
              </div>
              <div class="list">
                <div class="icon two"></div>
                <div class="text">商品</div>
              </div>
              <div class="list">
                <div class="icon thr"></div>
                <div class="text">拼团</div>
              </div>
              <div class="list">
                <div class="icon four"></div>
                <div class="text">砍价</div>
              </div>
            </div>
          </div>
          <div class="pie-box line-box">
            <div id="myLine"></div>
            <div class="title-box">
              <div class="title">近7日客户活跃度</div>
              <div class="sub-title">(每小时更新)</div>
            </div>
          </div>
          <div class="pie-box bar-box">
            <div id="myBar"></div>
            <div class="title-box">
              <div class="title">客户与我的互动</div>
              <div class="sub-title">(每天0点更新)</div>
            </div>
          </div>
        </div>
        <div class="visitor-box" v-if="menuIdx * 1 === 2">
          <div class="box-list" v-if="actionList.length * 1 !== 0">
            <div class="msgs-item" v-for="(item, index) in actionList" :key="index">
              <div class="item-time" v-if="item.is_showtime">{{item.created_at | timeFormat}}</div>
              <div class="msg-item-content">
                <img :src="item.image_url" class="msgs-left">
                <div class="msgs-right">
                  <div class="msgs-container">
                    <p class="msgs-p" v-show="item.event_no * 1 === 10000">{{item.nickname}}通过扫描他人分享的名片海报<span class="green">查看</span>了<span class="green">你的名片</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10001">{{item.nickname}}通过点击他人分享的名片链接<span class="green">查看</span>了<span class="green">你的名片</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10002">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了<span class="green">你的名片</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10003">{{item.nickname}}给你<span class="green">点了</span><span class="green">赞</span>，看来认可你</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10004">{{item.nickname}}<span class="green">取消</span>给你点的<span class="green">赞</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10005">{{item.nickname}}<span class="green">转发</span>了你的<span class="green">名片</span>，你的人脉圈正在裂变</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10006">{{item.nickname}}<span class="green">保存</span>了你的<span class="green">名片海报</span>，看来TA对你感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10007">{{item.nickname}}<span class="green">拨打</span>了你的<span class="green">手机</span>，请记录跟进内容</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10008">{{item.nickname}}<span class="green">保存</span>了你的<span class="green">电话</span>，可以考虑主动沟通</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10009">{{item.nickname}}<span class="green">复制</span>了你的<span class="green">邮箱</span>，请留意邮件</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 10010">{{item.nickname}}<span class="green">浏览</span>了你的<span class="green">地址</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20002">{{item.nickname}}正在对砍价活动<span class="green">{{item.title  | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20003">{{item.nickname}}正在对商品<span class="green">{{item.title  | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20004">{{item.nickname}}正在对拼团活动<span class="green">{{item.title  | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20006">{{item.nickname}}通过扫描他人分享的商品海报<span class="green">查看</span>了<span class="green">你的商品</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20007">{{item.nickname}}通过点击他人分享的商品链接<span class="green">查看</span>了<span class="green">你的商品</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20008">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了<span class="green">你的商品</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20009">{{item.nickname}}正在<span class="green">购买</span>拼团活动<span class="green">{{item.title  | titleCut}}</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20010">{{item.nickname}}提交了拼团活动<span class="green">{{item.title  | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20011">{{item.nickname}}提交了拼团活动<span class="green">{{item.title  | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span>，并完成了支付</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20012">{{item.nickname}}正在参与砍价活动<span class="green">{{item.title  | titleCut}}</span>，成功砍掉<span class="green">{{item.total}}元</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20013">{{item.nickname}}转发了砍价活动<span class="green">{{item.title  | titleCut}}</span>，你的活动正在裂变</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20014">{{item.nickname}}通过他人分享的链接<span class="green">查看</span>了砍价活动<span class="green">{{item.title  | titleCut}}</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20015">{{item.nickname}}正在<span class="green">购买</span>砍价活动<span class="green">{{item.title  | titleCut}}</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20016">{{item.nickname}}提交了砍价活动<span class="green">{{item.title  | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20017">{{item.nickname}}提交了砍价活动<span class="green">{{item.title  | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span>，并完成了支付</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20018">{{item.nickname}}<span class="green">转发</span>了你的商品<span class="green">{{item.title  | titleCut}}</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20019">{{item.nickname}}<span class="green">保存</span>了你的商品<span class="green">{{item.title  | titleCut}}</span>的海报图片</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20020">{{item.nickname}}提交了商品<span class="green">{{item.title  | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span>，并完成了支付</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 30001">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了你发布的<span class="green">动态</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 30002">{{item.nickname}}给你发布的动态<span class="green">点了</span><span class="green">赞</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 30003">{{item.nickname}}<span class="green">评论</span>了你发布的<span class="green">动态</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 40001">{{item.nickname}}主动<span class="green">添加</span>了<span class="green">收货地址</span>，该客户有望成交</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 50001">{{item.nickname}}正在向你<span class="green">咨询</span>，请做好准备应答</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60001">{{item.nickname}}通过扫描他人分享的小店海报<span class="green">访问</span>了<span class="green">你的小店</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60002">{{item.nickname}}通过扫描他人分享的小店链接<span class="green">访问</span>了<span class="green">你的小店</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60003">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了<span class="green">你的海报</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60004">{{item.nickname}}<span class="green">转发</span>了你的<span class="green">小店</span>，你的人脉圈正在裂变</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 20021">{{item.nickname}}正在<span class="green">查看</span>你的<span class="green">商城</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60005">{{item.nickname}}<span class="green">保存</span>了你的<span class="green">小店海报</span>，看来TA对你感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60006">{{item.nickname}}正在<span class="green">查看</span>你的<span class="green">名片</span>，看来TA对你感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60007">{{item.nickname}}给你的名片<span class="green">点了</span><span class="green">赞</span>，看来认可你</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60008">{{item.nickname}}正在<span class="green">查看</span>拼团活动<span class="green">{{item.title  | titleCut}}</span>，可能对该活动感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60009">{{item.nickname}}给拼团活动<span class="green">{{item.title  | titleCut}}</span>点了<span class="green">赞</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60010">{{item.nickname}}正在<span class="green">查看</span>砍价活动<span class="green">{{item.title  | titleCut}}</span>，可能对该活动感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60011">{{item.nickname}}给砍价活动<span class="green">{{item.title  | titleCut}}</span>点了<span class="green">赞</span></p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60012">{{item.nickname}}正在<span class="green">查看</span>商品<span class="green">{{item.title  | titleCut}}</span>，可能对该活动感兴趣</p>
                    <p class="msgs-p" v-show="item.event_no * 1 === 60013">{{item.nickname}}给商品<span class="green">{{item.title  | titleCut}}</span>点了<span class="green">赞</span></p>
                  </div>
                  <!--<img src="./icon-pressed@2x.png" class="msgs-rt">-->
                </div>
              </div>
            </div>
          </div>
          <section class="exception-box" v-if="actionList.length * 1 === 0">
            <exception errType="nodata"></exception>
          </section>
        </div>
      </scroll>
      <div class="select-tab" v-if="showTab">
        <div class="tab" v-for="(item, index) in tabList" v-bind:key="index" @click="switchTab(index)">{{item}}</div>
        <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
          <div class="chilen-line"></div>
        </div>
      </div>
      <router-view></router-view>
      <toast ref="toast"></toast>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  import {ClientDetail, Echart} from 'api'
  import storage from 'storage-controller'
  import {ERR_OK} from '../../common/js/config'
  import Toast from 'components/toast/toast'
  import Scroll from 'components/scroll/scroll'
  import Exception from 'components/exception/exception'
  import utils from 'common/js/utils'

  export default {
    name: 'CapacityModel',
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        bcColor: '#F0F2F5',
        tabList: ['能力模型', '数据分析', '来访记录'],
        showMode: true,
        tabMoreList: [
          {
            text: '全部',
            value: 'all'
          },
          {
            text: '昨天',
            value: 'yesterday'
          },
          {
            text: '7天',
            value: 'week'
          },
          {
            text: '30天',
            value: 'month'
          }
        ],
        showBox: true,
        barIndex: null,
        menuIdx: 0,
        dataEcharts: false,
        tabNumber: 0,
        clientData: {
          avatar: '',
          name: ''
        },
        flow: {},
        id: '',
        actionPage: 1,
        actionList: [],
        noActionMore: false,
        mobile: '',
        list: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: ' ',
        pullUpLoadNoMoreTxt: ' ',
        page: 1,
        twoList: [],
        tabhighgt: 216,
        highgt: 216,
        pageUrl: '',
        labelList: [],
        pieData: [
          {value: 1, name: '对我感兴趣'},
          {value: 1, name: '对产品感兴趣'},
          {value: 1, name: '对公司感兴趣'}
        ],
        ationLine: {
          x: [],
          y: []
        },
        barData: {
          x: [],
          y: []
        },
        sixData: {},
        showTab: false,
        allDatas: {},
        successData: [],
        dataRank: {},
        actionMore: false
      }
    },
    created() {
      this.id = this.$route.query.id
      this.pageUrl = this.$route.query.pageUrl
      this.getClientId(this.id)
      this.getActionLineData()
      this.getPieData()
      this.getBarData()
      this.getSixData()
      this.getSuccessData()
      this.getAllDataObj('all')
      this.getNewActionList(this.id)
      this.getDataRank()
    },
    mounted() {
      this.highgt = this.$refs.eleven.offsetHeight
      this.tabhighgt = this.$refs.eleven.offsetHeight
    },
    beforeDestroy() {
      this.$emit('refresh')
    },
    methods: {
      ...mapActions([
        'setCurrent'
      ]),
      scroll(pos) {
        let hightPx = pos.y * -1
        if (hightPx >= this.highgt) {
          this.showTab = true
        } else {
          this.showTab = false
        }
      },
      drawPie() {
        let myChart = this.$echarts.init(document.getElementById('myPie'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          color: ['#F9543C', '#23799D', '#8E3C68', '#F9B43C'],
          series: [
            {
              name: '访问222来源',
              type: 'pie',
              radius: '40%',
              center: ['50%', '55%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myLine'))
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.ationLine.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '活跃度：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          series: [{
            data: this.ationLine.y,
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#F9543C',
                borderWidth: 2,
                lineStyle: {
                  color: '#F9543C',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawBar() {
        let myChart = this.$echarts.init(document.getElementById('myBar'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: '{b}数：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            minInterval: 1,
            type: 'value',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 14,
              formatter: function (value) {
                return value
              },
              align: 'right'
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.barData.y,
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          series: [{
            data: this.barData.x,
            type: 'bar',
            showSymbol: false,
            barWidth: 15,
            itemStyle: {
              normal: {
                color: '#F9543C',
                borderWidth: 2,
                lineStyle: {
                  color: '#F9543C',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawSix() {
        let myChart = this.$echarts.init(document.getElementById('six-model'))
        // 绘制图表
        myChart.setOption({
          radar: [
            {
              indicator: this.sixData.data,
              name: {
                textStyle: {
                  color: '#888'
                }
              },
              center: ['50%', '50%'],
              radius: 80
            }
          ],
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            z: 2,
            zlevel: 100,
            style: {
              text: this.sixData.total,
              x: 100,
              y: 100,
              textAlign: 'center',
              fill: '#202020',
              width: 30,
              height: 30,
              fontSize: 18
            }
          },
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default',
                    color: 'rgba(86,186,21,.6)'
                  },
                  lineStyle: {
                    color: 'rgba(86,186,21,.6)',
                    width: 1
                  }
                }
              },
              symbol: 'none',
              data: [
                {
                  value: this.sixData.value,
                  name: '某软件'
                }
              ]
            }
          ]
        })
      },
      drawSuccess() {
        let myChart = this.$echarts.init(document.getElementById('mySuccess'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          series: [{
            name: '漏斗图',
            type: 'funnel',
            left: '15%',
            top: 55,
            bottom: 40,
            width: '70%',
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            color: ['#F9B43C', '#F9543C', '#8E3C68', '#23799D'],
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: this.successData
          }]
        })
        myChart.on('click', this.eConsole)
      },
      switchTab(index) {
        this.$refs.scroll.scrollTo(0, 0)
        this.scroll(0)
        this.menuIdx = index
        if (index * 1 === 1) {
          setTimeout(() => {
            this.drawPie()
            this.drawLine()
            this.drawBar()
            this.drawSuccess()
          }, 200)
        }
        if (index * 1 === 0) {
          setTimeout(() => {
            this.drawSix()
          }, 200)
        }
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 20)
      },
      getAllDataObj(time) {
        Echart.getAllData(time, this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.allDatas = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getClientId(id) {
        ClientDetail.getClientDetail(id).then((res) => {
          if (res.error === ERR_OK) {
            this.clientData = res.data
            this.flow = res.data.flow
            this.mobile = res.data.mobile
          }
        })
      },
      getNewActionList(id) {
        ClientDetail.getActionList(id).then((res) => {
          if (res.error === ERR_OK) {
            this.actionList = res.data
          }
        })
      },
      getMoreActionList(id) {
        if (this.actionMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        // this.actionPage++
        let number = this.actionList.length
        ClientDetail.getActionList(id, number).then((res) => {
          if (res.error === ERR_OK) {
            if (res.data.length * 1 === 0) {
              // this.actionPage--
              this.actionMore = true
            } else {
              this.actionList.push(...res.data)
            }
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
            }, 20)
          }
        })
      },
      toBusinessCard() {
        const id = this.id
        const pageUrl = `/business-card`
        console.log(pageUrl)
        this.$router.push({path: pageUrl, query: {id, pageUrl}})
      },
      onPullingUp() {
        if (this.menuIdx * 1 === 0) {
          this.$refs.scroll.forceUpdate()
        }
        if (this.menuIdx * 1 === 2) {
          this.getMoreActionList(this.id)
        }
        if (this.menuIdx * 1 === 1) {
          this.$refs.scroll.forceUpdate()
        }
        if (this.menuIdx * 1 === 2 && this.noActionMore) {
          this.$refs.scroll.forceUpdate()
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      getPieData() {
        Echart.getPie(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.pieData = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getActionLineData() {
        Echart.getActionLine(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.ationLine = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getBarData() {
        Echart.getBar(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.barData = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getSixData() {
        Echart.getEmployee(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.sixData = res.data
            this.drawSix()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAllTab(item, index) {
        this.getAllDataObj(item.value)
        this.tabNumber = index
      },
      getSuccessData() {
        Echart.getSuccess(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.successData = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getDataRank() {
        Echart.getEmployeeRank(this.userInfo.merchant_id, this.id).then(res => {
          if (res.error === ERR_OK) {
            this.dataRank = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      }
    },
    components: {
      Toast,
      Scroll,
      Exception
    },
    computed: {
      ...mapGetters(['ios']),
      slide () {
        return this.ios ? '' : 'slide'
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      userInfo() {
        return storage.get('info')
      }
    },
    filters: {
      titleCut(val) {
        if (val && val.length > 8) {
          return val.slice(0, 8) + '···'
        } else {
          return val
        }
      },
      timeFormat(val) {
        if (val) {
          let res = utils.radarTimeFormat(val)
          return res.time
        }
        return ''
      }
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
  div
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .exception-box
    padding-top: 70px

  .client-detail
    fill-box()
    z-index: 21
    .scroll-wrapper
      position: absolute
      top: 0px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden

  .tab-padding
    height: 48px

  .container
    fill-box(absolute)

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
        .cliten-con-bg
          position: absolute
          display: block
          width: 100%
          height: 100%
          left: 0px
          top: 0px
          z-index: 0
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
              img
                width: 60px
                height: 60px
                display: block
            .label-right
              margin-left: 10px
              .label-name
                font-size: $font-size-medium-x
                color: $color-text
                font-family: $font-family-meddle
                padding-top: 5px
                margin-bottom: 20px
              .label-box
                layout(row)
                .full-name
                  font-size: $font-size-12
                  color: $color-text-88
                  font-family: $font-family-meddle
          .detail-jump
            height: 45px
            width: 25px
            position: relative
            .jump-img
              width: 6px
              height: 12px
              position: absolute
              right: 0
              top: 0
              bottom: 0
              margin: auto

  .select-tab
    layout(row)
    height: 48px
    line-height: 47px
    border-bottom: 1px solid rgba(0, 0, 0, .1)
    position: fixed
    width: 100%
    top: 0
    left: 0
    z-index: 11
    background: #F0F2F5
    .tab
      flex: 1
      text-align: center
      font-size: $font-size-16
      color: $color-text
      font-family: $font-family-regular
    .line
      position: absolute
      width: 33.33%
      height: 3px
      bottom: 0
      transition: all .3s
      .chilen-line
        height: 3px
        width: 30px
        background: #20202e
        margin: 0 auto

  .select-client
    position: relative

  .visitor-box
    padding: 0 15px 15px
    .box-list
      .time
        font-size: $font-size-medium
        color: $color-text
        font-family: $font-family-meddle
      .item-list
        layout(row)
        margin-top: 15px
        background: #fff
        padding: 7.5px 40px 7.5px 10px
        align-items: center
        .left-img
          width: 40px
          height: 40px
          background: #333
          margin-right: 10px
          .img
            display: block
            width: 40px
            height: 40px
            background: #333
        .left-text
          flex: 1
          font-size: $font-size-medium
          color: $color-text
          font-family: $font-family-meddle
          span
            color: #56BA15

  .ai-box
    padding: 15px
    .pie-box
      position: relative
      background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
      height: 305px
      margin-bottom: 10px
      #myPie
        width: 100%
        height: 305px
        margin: 20px auto
        padding: 20px
      #mySuccess
        width: 100%
        height: 305px
        margin: 20px auto
        padding: 20px
      #myChartfour
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 20px 0
      #six-model
        width: 100%
        height: 305px
        margin: 20px auto
        padding: 20px
      #myLine
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 0px 0
      #myBar
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 20px 0
      .title-box
        position: absolute
        width: 100%
        text-align: center
        top: 30px
        left: 0
        .title
          font-size: $font-size-medium-x
          color: #202020
          font-family: $font-family-meddle
        .sub-title
          margin-top: 5px
          font-size: $font-size-small
          color: $color-text-88
          font-family: $font-family-meddle
      .bottom-des
        position: absolute
        bottom: 10px
        layout(row)
        width: 100%
        .tab
          layout(row)
          justify-content: center
          align-items: center
          width: 25%
          .icon
            background: #F9B43C
            width: 6px
            height: 6px
            border-radius: 50%
            margin-right: 3px
          .two
            background: #F9543C
          .thr
            background: #8E3C68
          .four
            background: #23799D
          .text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-text
      .pie-list
        layout(row)
        position: absolute
        width: 100%
        bottom: 25px
        left: 0
        .list
          flex: 1
          layout(row)
          align-items: center
          justify-content: center
          .icon
            background: #F9543C
            width: 7px
            height: 7px
            margin-right: 4px
            border-radius: 50%
          .two
            background: #23799D
          .thr
            background: #8E3C68
          .four
            background: #F9B43C
          .text
            line-height: 1
            font-size: $font-size-small
            color: #202020
            font-family: $font-family-regular

    .line-box
      height: 270px
      #myLine
        height: 270px

  .six-box
    padding: 15px
    .six-model-box
      position: relative
      background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
      height: 305px
      margin-bottom: 10px
      #six-model
        width: 100%
        height: 305px
        margin: 20px auto
        padding: 20px

  .msgs-item
    margin-top: 18px
    .item-time
      font-family: PingFangSC-Medium
      font-size: $font-size-18
      color: #20202E
      padding: 10px 0 15px
    .msg-item-content
      width: 100%
      height: 70px
      background: $color-white
      border: 0.5px solid rgba(32, 32, 46, 0.10)
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.04)
      border-radius: 5px
      display: flex
      justify-content: space-between
      align-items: center
    .msgs-left
      margin: 0 10px 0 15px
      width: 40px
      height: 40px
      border-radius: 50%
      border: 0.5px solid rgba(32, 32, 46, 0.10)
    .msgs-right
      flex: 1
      overflow: hidden
      margin-right: 13.5px
      height: 100%
      display: flex
      justify-content: space-between
      align-items: center
      .msgs-container
        flex: 1
        overflow: hidden
        height: 100%
        display: flex
        align-items: center
        .msgs-p
          line-height: 18px
          font-family: $font-family-medium
          font-size: $font-size-medium
          .green
            color: $color-text-56
      .msgs-rt
        width: 7.5px
        height: 11.5px
        margin-left: 33px

  .msgs-item:last-child
    margin-bottom: 0

  .six-title
    padding: 0 15px 20px 30px
    .six-top
      layout(row)
      justify-content: space-between
      height: 45px
      line-height: 45px
      border-bottom: 0.5px solid rgba(0, 0, 0, .1)
      padding-right: 5px
      .left
        font-size: $font-size-16
        color: #20202e
        font-family: $font-family-meddle
      .right
        font-size: 25px
        color: #20202e
        font-family: 'DINCondensed-Bold'
    .six-bottom
      layout(row)
      justify-content: space-between
      height: 45px
      line-height: 45px
      border-bottom: 0.5px solid rgba(0, 0, 0, .1)
      padding-right: 5px
      .left
        font-size: $font-size-14
        color: $color-text-88
        font-family: $font-family-meddle
      .right
        font-size: 20px
        color: $color-text-88
        font-family: 'DINCondensed-Bold'

  .data-top
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
      .cliten-con-bg
        position: absolute
        display: block
        width: 100%
        height: 100%
        left: 0px
        top: 0px
        z-index: 0

      .data-number-box
        padding-top: 20px
        position: relative
        background: #fff
        z-index: 11
        .data-tab
          position: relative
          z-index: 11
          layout(row)
          margin: 0 auto
          width: 240px
          border: 0.5px solid rgba(32, 32, 46, 0.1)
          .tab
            border-right: 0.5px solid rgba(32, 32, 46, 0.1)
            height: 30px
            font-size: $font-size-14
            color: #20202E
            font-family: $font-family-meddle
            line-height: 30px
            width: 25%
            text-align: center
          .tab:last-child
            border-right: 0
          .active
            background: #20202e
            color: #fff
        .data-list
          position: relative
          z-index: 11
          layout(row)
          padding: 0 0 24px
          .list-box
            width: 33.33%
            text-align: center
            padding: 18px 0 0
            .number
              font-size: 32px
              color: #20202e
              font-family: 'DINCondensed-Bold'
            .text
              font-size: $font-size-12
              color: #20202e
              font-family: $font-family-meddle
              margin-top: 5px

  .z
    width: 100%
</style>
