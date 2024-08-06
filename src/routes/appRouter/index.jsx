import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from '../../views/login'
import Dashboard from '../../views/dashboard'

const AppRouter = () => {
  const token = useSelector((state) => state.auth.token)

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/Dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
