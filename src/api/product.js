import request from 'common/js/request'

export default {
  // 获取商品列表
  getProductList(status, page, limit = 10, loading) {
    const url = `/api/merchant/goods`
    let data = {
      status,
      page,
      limit
    }
    return request.get(url, data, loading)
  },
  // 上传图片
  upLoadImage (data) {
    let url = 'api/employee/images'
    return request.post(url, data)
  },
  // 商品删除
  delProduct (id, data) {
    let url = `api/merchant/goods/${id}`
    return request.delete(url, data)
  },
  // 商品修改
  changeProduct (id, data) {
    let url = `api/merchant/goods/${id}`
    return request.put(url, data)
  },
  // 商品新建
  newProduct (id, data) {
    let url = `api/merchant/goods`
    return request.post(url, data)
  },
  // 商品上下架修改
  upDownProduct (id, is_online = 0) {
    let url = `api/merchant/goods-baseinfo/${id}`
    let data = {
      is_online
    }
    return request.post(url, data)
  }
}
