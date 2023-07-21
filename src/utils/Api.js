export default class Api {
  constructor(options) {
    const { baseUrl } = options

    this._baseUrl = baseUrl.replace(/\/+$/, '')
  }

  _makeRequest(url, options) {
    options = options || {}
    const { method = "GET", body, headers = {} } = options
    let jsonBody = null;

    if (body) {
      jsonBody = JSON.stringify(body)
    }

    const relativeUrl = url.replace(/^\/+/, '')
    return fetch(`${this._baseUrl}/${relativeUrl}`, {
      method: method,
      body: jsonBody,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({"response": res})
        }

        return res.json()
      });
  }
}