import { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch, getToken, setToken as saveToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    // /me is a bare JsonResource, so Laravel auto-wraps it in { data: ... }.
    // login/register manually wrap their own response, so they don't.
    apiFetch('/me')
      .then((res) => setUser(res.data))
      .catch(() => saveToken(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await apiFetch('/login', { method: 'POST', body: { email, password } })
    saveToken(res.token)
    setUser(res.user)
    return res.user
  }

  const register = async ({ name, email, password, passwordConfirmation, country }) => {
    const res = await apiFetch('/register', {
      method: 'POST',
      body: { name, email, password, password_confirmation: passwordConfirmation, country },
    })
    saveToken(res.token)
    setUser(res.user)
    return res.user
  }

  const logout = async () => {
    try {
      await apiFetch('/logout', { method: 'POST' })
    } catch {
      // Token may already be invalid server-side — clear local state regardless.
    }
    saveToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
