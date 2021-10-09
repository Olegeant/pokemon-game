import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import Loader from '../../../../components/Loader/Loader';

import {
  getPokemons,
  getSelectedPokemons,
  getPokemonsAsync,
  selectedPokemonsLoading,
  selectPokemon,
} from '../../../../redux/pokemons';

import { setPlayer1Cards, setPlayer2Cards, setWinner } from '../../../../redux/game';

import styles from './style.module.css';

const StartPage = () => {
  const isLoading = useSelector(selectedPokemonsLoading);
  const pokemons = useSelector(getPokemons);
  const selectedPokemons = useSelector(getSelectedPokemons);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonsAsync());
    dispatch(setPlayer1Cards([]));
    dispatch(setPlayer2Cards([]));
    dispatch(setWinner(null));
  }, [dispatch]);

  const handleChangeSelected = key => {
    dispatch(selectPokemon(key));
  };

  const handleStartGameClick = () => {
    history.push('/game/board');
  };

  return (
    <>
      <h1>This is GamePage !!!</h1>

      <div className={styles.buttonWrap}>
        <button onClick={handleStartGameClick} disabled={Object.keys(selectedPokemons).length < 5}>
          Start Game
        </button>
      </div>

      <div className={styles.flex}>
        {Object.entries(pokemons).map(([key, { id, name, type, values, img, selected }]) => (
          <PokemonCard
            className={styles.card}
            key={key}
            name={name}
            id={id}
            type={type}
            values={values}
            img={img}
            isActive={true}
            isSelected={selected}
            onClickCard={() => {
              if (Object.keys(selectedPokemons).length < 5 || selected) handleChangeSelected(key);
            }}
          />
        ))}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default StartPage;
