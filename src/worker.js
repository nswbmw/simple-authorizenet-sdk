class AuthorizeNet {
  constructor (options = {}) {
    this.environment = options.environment || 'sandbox'
  }

  _getURL () {
    return (this.environment === 'sandbox')
      ? 'https://apitest.authorize.net/xml/v1/request.api'
      : 'https://api.authorize.net/xml/v1/request.api'
  }

  async execute (data) {
    const res = await fetch(this._getURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let resData = (await res.text()).replace(/^\uFEFF/, '').trim()
    try { resData = JSON.parse(resData) } catch (e) {}

    return resData
  }
}

export default AuthorizeNet
