import { useState, useEffect } from 'react';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import database from '../../service/firebase';

const GamePage = () => {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', snapshot => {
      const pokemonsList = Object.entries(snapshot.val()).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: { ...value, isActive: value.isActive || false } }),
        {},
      );
      setPokemons(pokemonsList);
    });
  }, []);

  const handleCardClick = id => {
    const clickedObjID = Object.entries(pokemons).find(([, value]) => value.id === id)[0];

    database.ref('pokemons/' + clickedObjID).set({
      ...pokemons[clickedObjID],
      isActive: !pokemons[clickedObjID].isActive,
    });

    setPokemons(prevState =>
      Object.entries(prevState).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { ...value, isActive: value.id === id ? !value.isActive : value.isActive },
        }),
        {},
      ),
    );
  };

  const addPokemon = () => {
    const newKey = database.ref().child('pokemons').push().key;
    const newID = Math.max(...Object.values(pokemons).map(({ id }) => id)) + 1;
    const newPokemonData = { ...pokemons[Object.keys(pokemons)[0]], id: newID };

    database.ref('pokemons/' + newKey).set(newPokemonData);

    setPokemons(prevstate => ({ ...prevstate, [newKey]: newPokemonData }));
  };

  return (
    <>
      <h1>This is GamePage !!!</h1>

      <div className="flex">
        <button style={{ marginBottom: '20px' }} onClick={addPokemon}>
          Add Pokemon
        </button>
      </div>

      <div className="flex">
        {Object.entries(pokemons).map(([key, { id, name, type, values, img, isActive }]) => (
          <PokemonCard
            key={key}
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
