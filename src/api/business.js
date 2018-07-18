import request from 'common/js/request'

export default {
  /**
   * 我的名片-个性签名编辑
   * @returns {*}
   */
  Myqrcode (data) {
    let url = 'api/employee/my-qrcode'
    return request.get(url, data)
  }
}
