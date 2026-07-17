import request from 'lite-request'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { SocksProxyAgent } from 'socks-proxy-agent'

class AuthorizeNet {
  constructor (options = {}) {
    this.environment = options.environment || 'sandbox'

    const proxy = options.proxy
    if (proxy) {
      if (typeof proxy === 'string') {
        if (proxy.startsWith('http://')) {
          this.agent = new HttpsProxyAgent(proxy)
        } else if (proxy.startsWith('socks://')) {
          this.agent = new SocksProxyAgent(proxy)
        } else {
          throw new Error(`Invalid proxy string: "${proxy}". Expected "http://..." or "socks://..."`)
        }
      } else if (typeof proxy === 'object') {
        if (!['http', 'socks'].includes(proxy.protocol)) {
          throw new Error('proxy.protocol must be one of ["http", "socks"]')
        }
        this.agent = (proxy.protocol === 'http')
          ? new HttpsProxyAgent((proxy.username && proxy.password)
            ? `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
            : `http://${proxy.host}:${proxy.port}`
          )
          : new SocksProxyAgent((proxy.username && proxy.password)
            ? `socks://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
            : `socks://${proxy.host}:${proxy.port}`
          )
      }
    }
  }

  _getURL () {
    return (this.environment === 'sandbox')
      ? 'https://apitest.authorize.net/xml/v1/request.api'
      : 'https://api.authorize.net/xml/v1/request.api'
  }

  async execute (data) {
    const res = await request({
      method: 'POST',
      url: this._getURL(),
      headers: {
        'Content-Type': 'application/json'
      },
      agent: this.agent,
      body: JSON.stringify(data)
    })

    // fix BOM
    let resData = res.data.toString().replace(/^\uFEFF/, '').trim()
    try { resData = JSON.parse(resData) } catch (e) {}

    return resData
  }
}

export default AuthorizeNet
