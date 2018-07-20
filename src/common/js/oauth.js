const env = process.env

export default class Oauth {
  constructor() {
    const appId = env.NODE_ENV === 'production' ? 'wwa05504832a7488be' : 'ww90eca816eb9b3cf9'
    const uri = location.origin + '/oauth'
    const redirectUri = encodeURIComponent(uri)
    this.oauthUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}
