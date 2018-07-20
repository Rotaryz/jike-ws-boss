import request from 'common/js/request'

export default {
  /**
   * 订单列表
   * @returns {*}
   */
  customerOrder (data) {
    let url = `/api/merchant/merchant-success-order`
    return request.get(url, data)
  }
}