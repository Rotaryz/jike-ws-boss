const env = process.env

export default class Oauth {
  constructor() {
    const appId = env.NODE_ENV === 'production' ? 'ww65ff1d66710fd8c5' : 'wwc1da73fa86deeb72'
    const uri = location.origin + '/oauth'
    const redirectUri = encodeURIComponent(uri)
    this.oauthUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}
