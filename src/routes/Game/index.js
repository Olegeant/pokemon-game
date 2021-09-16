import { useState } from 'react';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import POKEMONS from '../../data/pokemon.json';

const GamePage = () => {
  const [pokemons, setPokemons] = useState(() =>
    POKEMONS.map(item => ({ ...item, isActive: false })),
  );

  const handleCardClick = id => {
    setPokemons(prevState =>
      prevState.map(item => (item.id === id ? { ...item, isActive: !item.isActive } : item)),
    );
  };

  return (
    <>
      <h1>This is GamePage !!!</h1>;
      <div className="flex">
        {pokemons.map(({ name, id, type, values, img, isActive }) => (
          <PokemonCard
            key={id}
            name={name}
            id={id}
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
