import { useState } from 'react';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import POKEMONS from '../../data/pokemons-default-db.json';

const GamePage = () => {
  const [pokemons, setPokemons] = useState(() =>
    Object.entries(POKEMONS).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: { ...value, isActive: false } }),
      {},
    ),
  );

  const handleCardClick = id => {
    setPokemons(prevState =>
      Object.entries(prevState).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { ...value, isActive: key === id ? true : value.isActive },
        }),
        {},
      ),
    );
  };

  return (
    <>
      <h1>This is GamePage !!!</h1>;
      <div className="flex">
        {Object.entries(pokemons).map(([key, { name, type, values, img, isActive }]) => (
          <PokemonCard
            key={key}
            name={name}
            id={key}
            type={type}
            values={values}
            img={img}
            isActive={isActive}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
};

export default GamePage;
