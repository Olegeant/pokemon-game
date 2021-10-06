import { Route, Switch, useRouteMatch } from 'react-router-dom';

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';

const GamePage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact>
        <StartPage />
      </Route>
      <Route path={`${match.path}/board`}>
        <BoardPage />
      </Route>
      <Route path={`${match.path}/finish`}>
        <FinishPage />
      </Route>
    </Switch>
  );
};

export default GamePage;
