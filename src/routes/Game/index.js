import { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';

import { PokemonContext } from '../../context/PokemonContext';

const GamePage = () => {
  // const [selectedPokemons, setSelectedPokemons] = useState({});
  const [player1Cards, setPlayer1Cards] = useState({});
  const [player2Cards, setPlayer2Cards] = useState({});
  const [winner, setWinner] = useState(0);
  const match = useRouteMatch();

  // const handleSelectedPokemons = (key, pokemon) => {
  //   setSelectedPokemons(prevState => {
  //     if (prevState[key]) {
  //       const copyState = { ...prevState };
  //       delete copyState[key];

  //       return copyState;
  //     }

  //     return { ...prevState, [key]: pokemon };
  //   });
  // };

  const handleNewGameStart = () => {
    // setSelectedPokemons({});
    setPlayer1Cards({});
    setPlayer2Cards({});
    setWinner(0);
  };

  return (
    <PokemonContext.Provider
      value={{
        // pokemons: selectedPokemons,
        // onSelectedPokemons: handleSelectedPokemons,
        player1Cards,
        player2Cards,
        savePlayer1Cards: setPlayer1Cards,
        savePlayer2Cards: setPlayer2Cards,
        winner,
        saveWinner: setWinner,
        onNewGameStart: handleNewGameStart,
      }}
    >
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
    </PokemonContext.Provider>
  );
};

export default GamePage;
