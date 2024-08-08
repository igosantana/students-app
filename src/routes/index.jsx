import { Switch } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../views/dashboard'
import Login from '../views/login'
// import { PageNotFound } from '../pages/PageNotFound'
import { Route } from './Route'

export const Routes = () => {
  const { accessToken } = useAuth()
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}
