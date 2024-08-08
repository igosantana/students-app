import { AuthProvider } from './AuthContext'

export const AppProvider = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)
