import AuthContext from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import authApi from "../../utils/authApi";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '')
  const [user, setUser] = useState()
  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      authApi.getCurrentUser(token)
        .then((user) => setUser(user))
        .catch(() => logout())
    }
  }, [token])

  function logout() {
    localStorage.setItem('userToken', '')
    setToken('')
    setUser(undefined)
  }

  function login(token) {
    localStorage.setItem('userToken', token)
    setToken(token)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}