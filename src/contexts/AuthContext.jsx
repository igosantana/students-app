import { createContext, useCallback, useContext, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext({})

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const accessToken = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (accessToken && user) {
      return { accessToken: accessToken, user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login', { username, password })

    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    setData({ accessToken: token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setData({})
  }, [])
  return (
    <AuthContext.Provider
      value={{
        signIn,
        accessToken: data.accessToken,
        user: data.user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
