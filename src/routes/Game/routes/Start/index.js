import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';

import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/PokemonContext';

import styles from './style.module.css';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    firebase.getPokemonSoket(pokemons => {
      setPokemons(pokemons);
    });

    return () => firebase.offPokemonSoket;
  }, []);

  const handleChangeSelected = key => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemons(key, pokemon);
    setPokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handleStartGameClick = () => {
    history.push('/game/board');
  };

  return (
    <>
      <h1>This is GamePage !!!</h1>

      <div className={styles.buttonWrap}>
        <button
          onClick={handleStartGameClick}
          disabled={Object.keys(pokemonsContext.pokemons).length < 5}
        >
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
              if (Object.keys(pokemonsContext.pokemons).length < 5 || selected)
                handleChangeSelected(key);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default StartPage;
