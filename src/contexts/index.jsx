import { AuthProvider } from './AuthContext'
import { StudentProvider } from './StudentsContext'

export const AppProvider = ({ children }) => (
  <AuthProvider>
    <StudentProvider>{children}</StudentProvider>
  </AuthProvider>
)
