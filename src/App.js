import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { NotificationContainer } from 'react-notifications';

import { getUserAsync, selectUserLoading } from './redux/user';

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import UserPage from './routes/UserPage';
import NotFound from './routes/NotFound';

import MenuHeader from './components/MenuHeader/MenuHeader';
import Footer from './components/Footer/Footer';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import styles from './styles.module.css';
import 'react-notifications/lib/notifications.css';

const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  if (isUserLoading) return 'is loading...';

  return (
    <>
      <MenuHeader bgActive={!isPadding} />

      <div className={cn(styles.wrap, { [styles.isHomePage]: isPadding })}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <PrivateRoute path="/game">
            <GamePage />
          </PrivateRoute>

          <PrivateRoute path="/about">
            <AboutPage />
          </PrivateRoute>

          <PrivateRoute path="/contact">
            <ContactPage />
          </PrivateRoute>

          <PrivateRoute path="/user">
            <UserPage />
          </PrivateRoute>

          <Route>
            <NotFound />
          </Route>
        </Switch>

        <NotificationContainer />
      </div>

      <Footer />
    </>
  );
};

export default App;
