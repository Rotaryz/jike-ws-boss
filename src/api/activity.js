import request from 'common/js/request'

export default {
  // 获取活动列表
  getActivityList(status, page, limit = 10, loading) {
    const url = `/api/merchant/activity`
    let data = {
      status,
      page,
      limit
    }
    return request.get(url, data, loading)
  },
  // 下线团购活动
  grouponOffline(id, data) {
    const url = `/api/merchant/groupon-offline/${id}`
    return request.get(url, data)
  },
  // 上线团购活动
  grouponOnline(id, data) {
    const url = `/api/merchant/groupon-online/${id}`
    return request.get(url, data)
  },
  // 删除团购活动
  deleteGrouponOnline(id, data) {
    const url = `/api/merchant/groupon/${id}`
    return request.delete(url, data)
  },
  // 下线团砍价活动
  bargainOffline(id, data) {
    const url = `/api/merchant/bargain-offline/${id}`
    return request.get(url, data)
  },
  // 上线砍价活动
  bargainOnline(id, data) {
    const url = `/api/merchant/bargain-online/${id}`
    return request.get(url, data)
  },
  // 删除砍价活动
  deleteBargainOnline(id, data) {
    const url = `/api/merchant/bargain/${id}`
    return request.delete(url, data)
  },
  // 获取团购服务列表
  getGrouponServeList(page) {
    const url = `/api/merchant/groupon-search-goods`
    let data = {
      page
    }
    return request.get(url, data)
  },
  // 获取砍价服务列表
  getBargainServeList(page) {
    const url = `/api/merchant/bargain-search-goods`
    let data = {
      page
    }
    return request.get(url, data)
  },
  // 获取当前服务器日期
  getCurData(data) {
    const url = `/api/merchant/get-date`
    return request.get(url, data)
  },
  // 创建团购活动
  createNewGroupon(data) {
    const url = `/api/merchant/groupon`
    return request.post(url, data)
  },
  // 创建砍价活动
  createNewBargain(data) {
    const url = `/api/merchant/bargain`
    return request.post(url, data)
  },
  // 编辑团购活动
  editNewGroupon(id, data) {
    const url = `/api/merchant/groupon/${id}`
    return request.put(url, data)
  },
  // 编辑砍价活动
  editNewBargain(id, data) {
    const url = `/api/merchant/bargain/${id}`
    return request.put(url, data)
  },
  // 获得团购活动
  editGetNewGroupon(id, data) {
    const url = `/api/merchant/groupon/${id}`
    return request.get(url, data)
  },
  // 获得砍价活动
  editGetNewBargain(id, data) {
    const url = `/api/merchant/bargain/${id}`
    return request.get(url, data)
  }
}
