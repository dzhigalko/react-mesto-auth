import Api from "./Api"

class MestoApi extends Api {
  constructor(options) {
    const { token, ...rest } = options
    super(rest)

    this._token = token
  }

  _makeRequest(url, options) {
    options = options || {}
    const { headers = {}, ...rest } = options
    const headersWithToken = {
      ...headers,
      authorization: this._token,
    }

    return super._makeRequest(url, {
      headers: headersWithToken,
      ...rest
    })
  }

  getInitialCards() {
    return this._makeRequest("/cards")
  }

  getUserProfile() {
    return this._makeRequest("/users/me")
  }

  changeUserProfile(name, about) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: {
        name: name,
        about: about
      }
    })
  }

  addCard(name, link) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: {
        name: name,
        link: link
      }
    })
  }

  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, { method: "DELETE" });
  }

  addCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "PUT" });
  }

  deleteCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "DELETE" });
  }

  changeAvatar(avatar) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: {
        avatar: avatar
      }
    })
  }
}

const mestoApi = new MestoApi({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  token: "31abe394-3f89-489d-9ccd-e96da397bf7c",
  errorHandler: (args) => console.log(args)}
)

export default mestoApi;