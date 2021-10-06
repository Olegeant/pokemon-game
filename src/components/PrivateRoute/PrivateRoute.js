import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo = '/', ...routeProps }) => {
  return (
    <Route {...routeProps}>
      {localStorage.getItem('idToken') ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};

export default PrivateRoute;
