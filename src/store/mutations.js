import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.GOODSINFO](state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}

export default mutations
