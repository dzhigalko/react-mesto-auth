import Api from "./Api"

class AuthApi extends Api {
  signup(email, password) {
    return this._makeRequest("/signup", {
      method: "POST",
      body: {
        password: password,
        email: email
      }
    })
  }

  signin(email, password) {
    return this._makeRequest("/signin", {
      method: "POST",
      body: {
        password: password,
        email: email
      }
    })
  }

  getCurrentUser(token) {
    return this._makeRequest("/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

const authApi = new AuthApi({
  baseUrl: "https://auth.nomoreparties.co"
})
export default authApi