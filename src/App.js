import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import cn from 'classnames';

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import NotFound from './routes/NotFound';

import MenuHeader from './components/MenuHeader/MenuHeader';
import Footer from './components/Footer/Footer';

import { FireBaseContext } from './context/firebaseContext';
import Firebase from './service/firebase';

import styles from './styles.module.css';

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <MenuHeader bgActive={!isPadding} />

      <div className={cn(styles.wrap, { [styles.isHomePage]: isPadding })}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/game">
            <GamePage />
          </Route>

          <Route path="/about">
            <AboutPage />
          </Route>

          <Route path="/contact">
            <ContactPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>

      <Footer />
    </FireBaseContext.Provider>
  );
};

export default App;
