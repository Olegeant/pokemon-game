import { Route, Switch, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import NotFound from './routes/NotFound';

import MenuHeader from './components/MenuHeader/MenuHeader';
import Footer from './components/Footer/Footer';

import database from './service/firebase';

import styles from './styles.module.css';

const App = () => {
  const match = useRouteMatch('/');

  return (
    <>
      <MenuHeader bgActive={!match.isExact} />

      <div className={cn(styles.wrap, { [styles.isHomePage]: match.isExact })}>
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
    </>
  );
};

export default App;
