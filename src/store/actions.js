import * as TYPES from './mutation-types'

export const test = function({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

export const saveInfo = function({commit, state}, goodsInfo) {
  commit(TYPES.GOODSINFO, goodsInfo)
}
