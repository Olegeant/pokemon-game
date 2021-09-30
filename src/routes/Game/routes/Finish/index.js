import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PokemonContext } from '../../../../context/PokemonContext';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { getSelectedPokemons } from '../../../../redux/pokemons/pokemons';

import EndGameBoard from './EndGameBoard';

import styles from './style.module.css';

const FinishPage = () => {
  const selectedPokemons = useSelector(getSelectedPokemons);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const history = useHistory();
  const { onNewGameStart, player1Cards, player2Cards, savePlayer2Cards, winner } =
    useContext(PokemonContext);
  const { addPokemon } = useContext(FireBaseContext);

  if (Object.keys(selectedPokemons).length === 0) history.replace('/');

  useEffect(() => {
    return () => {
      onNewGameStart();
    };
  }, []);

  useEffect(() => {
    savePlayer2Cards(prevstate => {
      return prevstate.map(item => ({ ...item, isSelected: item.id === selectedCardId }));
    });
  }, [selectedCardId]);

  const handleEndGame = () => {
    if (winner === 1) {
      if (!selectedCardId) return;

      const bonusCard = player2Cards.find(item => item.id === selectedCardId);

      console.log(`I have got a new card!!!`);
      console.log(bonusCard);

      const { abilities, base_experience, height, id, img, name, stats, type, values, weight } =
        bonusCard;

      const newData = {
        abilities,
        base_experience,
        height,
        id,
        img,
        name,
        stats,
        type,
        values,
        weight,
      };

      addPokemon(newData);
    }

    onNewGameStart();
    history.push('/');
  };

  const handleCardSelect = id => {
    if (winner !== 1) return;
    setSelectedCardId(id);
  };

  return (
    <>
      {winner === 1 && (
        <h1 className={styles.header}>
          You have one this round!
          <br /> Please choose one card of your opponent as a reward.
        </h1>
      )}

      {winner === 2 && (
        <h1 className={styles.header}>
          You have lost the game this time. <br />
          Do not despair, try again!
        </h1>
      )}

      {winner === 0 && (
        <h1 className={styles.header}>
          I can't believe, It's a DRAW! <br />
          Try again to find out the stongest one!
        </h1>
      )}

      <div>
        <EndGameBoard cards={player1Cards} onClickCard={() => void 0} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={handleEndGame} disabled={!selectedCardId && winner === 1}>
          END GAME
        </button>
      </div>
      <div>
        <EndGameBoard cards={player2Cards} onClickCard={handleCardSelect} />
      </div>
    </>
  );
};

export default FinishPage;
