import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/api'

const AuthContext = createContext(null)

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
      } else {
        localStorage.removeItem('token')
        setToken(null)
      }
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const jwt = res.data.token
    localStorage.setItem('token', jwt)
    setToken(jwt)
    setUser(decodeToken(jwt))
    return res.data
  }

  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password })
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export default AuthContext