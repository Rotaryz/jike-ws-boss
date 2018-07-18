import request from 'common/js/request'

export default {
  // 用户标签列表
  getCustomerTagList(data, loading) {
    const url = `/api/employee/label-relation`
    return request.get(url, data, loading)
  }
}
