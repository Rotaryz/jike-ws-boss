import request from 'common/js/request'

export default {
  // 获取成员列表
  getMemberList(page, limit = 10, loading) {
    const url = `/api/merchant/boss-user-list`
    let data = {
      page,
      limit
    }
    return request.get(url, data, loading)
  },
  // 开启boss雷达权限
  openRarar(user_id = 0, is_open = 0, loading) {
    const url = `/api/merchant/boss-boss-radar-change`
    let data = {
      user_id,
      is_open
    }
    return request.get(url, data, loading)
  },
  // 新建成员
  newMember(name, mobile, loading) {
    const url = `/api/merchant/boss-create-user`
    let data = {
      name,
      mobile
    }
    return request.get(url, data, loading)
  },
  // 成员删除
  delMember(user_id = 0, loading) {
    const url = `/api/merchant/boss-delete-user`
    let data = {
      user_id
    }
    return request.get(url, data, loading)
  },
  // 订单资产
  getMine(data, loading) {
    const url = `/api/merchant/merchant-order-property`
    return request.get(url, data, loading)
  }
}
