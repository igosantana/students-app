import { Redirect, Route as ReactRoute } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { accessToken } = useAuth()

  return (
    <ReactRoute
      {...rest}
      render={(props) => {
        if (isPrivate && !accessToken) {
          return <Redirect to="/" />
        }

        if (!isPrivate && accessToken) {
          return props.location.pathname === '/dashboard' ? null : (
            <Redirect to="/dashboard" />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}

export default Route
