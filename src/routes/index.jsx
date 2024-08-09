import { Switch } from 'react-router-dom'
import Dashboard from '../views/dashboard'
import Login from '../views/login'
import Route from './Route'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}

export default Routes
