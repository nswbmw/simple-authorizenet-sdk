const request = require('request-promise')
const HttpsProxyAgent = require('https-proxy-agent')
const { SocksProxyAgent } = require('socks-proxy-agent')

function AuthorizeNet (options = {}) {
  this.environment = options.environment || 'sandbox'

  const proxy = options.proxy
  if (proxy) {
    if (typeof proxy === 'string') {
      if (proxy.startsWith('http://')) {
        this.agent = new HttpsProxyAgent(proxy)
      } else if (proxy.startsWith('socks://')) {
        this.agent = new SocksProxyAgent(proxy)
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

  return this
}

AuthorizeNet.prototype._getURL = function () {
  return (this.environment === 'sandbox')
    ? 'https://apitest.authorize.net/xml/v1/request.api'
    : 'https://api.authorize.net/xml/v1/request.api'
}

AuthorizeNet.prototype.execute = async function (data) {
  let response = await request({
    method: 'POST',
    url: this._getURL(),
    agent: this.agent,
    json: true,
    body: data
  })

  // fix BOM
  try { response = JSON.parse(response.replace(/^\uFEFF/, '').trim()) } catch (e) {}

  return response
}

module.exports = AuthorizeNet
