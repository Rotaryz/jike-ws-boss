import request from 'common/js/request'

export default {
  /**
   * 订单列表
   * @returns {*}
   */
  customerOrder (data) {
    let url = `/api/merchant/merchant-success-order`
    return request.get(url, data)
  },
  /**
   * 订单详情
   * @returns {*}
   */
  orderDetail (id) {
    let url = `/api/minimerchant/customer-order/${id}`
    return request.get(url)
  }, /**
   *  收货地址
   * @returns {*}
   */
  customerDddresses () {
    let url = `/api/minimerchant/customer-addresses`
    return request.get(url)
  }, /**
   *  增加或修改收货地址
   * @returns {*}
   */
  changeAddress (data) {
    let url = `/api/minimerchant/customer-addresses`
    return request.post(url, data)
  }
}