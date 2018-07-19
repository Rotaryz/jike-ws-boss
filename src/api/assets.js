import request from 'common/js/request'

export default {
  /**
   * 查询余额
   * @returns {*}
   */
  showMoney () {
    let url = `api/merchant/get-withdrawal-info`
    return request.get(url)
  },
  /**
   * 资产管理
   * @returns {*}
   */
  withdrawList (data) {
    let url = `api/merchant/withdraw-index`
    return request.get(url, data)
  },
  /**
   * 申请提现
   * @returns {*}
   */
  customerWithdrawalMoney (data) {
    let url = `api/merchant/withdrawal-money`
    return request.get(url, data)
  }, /**
   * 银行卡列表
   * @returns {*}
   */
  getBankData () {
    let url = `api/merchant/get-bank-data`
    return request.get(url)
  }, /**
   * 银行卡详情
   * @returns {*}
   */
  bankCardDetail (id) {
    let url = `api/merchant/bank-card-manager/${id}`
    return request.get(url)
  }, /**
   * 新建银行卡
   * @returns {*}
   */
  bankCards (data) {
    let url = `api/merchant/bank-card-manager`
    return request.post(url, data)
  }, /**
   * 银行卡详情
   * @returns {*}
   */
  putBankCards (id, data) {
    let url = `api/merchant/bank-card-manager/${id}`
    return request.put(url, data)
  }, /**
   * 销售明细
   * @returns {*}
   */
  employeeOrder (data) {
    let url = `/api/merchant/merchant-order`
    return request.get(url, data)
  }, /**
   * 收入明细
   * @returns {*}
   */
  employeeBillIndex (data) {
    let url = `api/merchant/merchant-bill-index`
    return request.get(url, data)
  }
}