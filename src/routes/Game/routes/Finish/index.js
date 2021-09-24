import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { PokemonContext } from '../../../../context/PokemonContext';
import { FireBaseContext } from '../../../../context/firebaseContext';

import EndGameBoard from './EndGameBoard';

import styles from './style.module.css';

const FinishPage = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const history = useHistory();
  const { pokemons, onNewGameStart, player1Cards, player2Cards, savePlayer2Cards, winner } =
    useContext(PokemonContext);
  const { addPokemon } = useContext(FireBaseContext);

  if (Object.keys(pokemons).length === 0) history.replace('/');

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
    if (selectedCardId) {
      const bonusCard = player2Cards.find(item => item.id === selectedCardId);
      if (!bonusCard) return;

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
      <div>
        <EndGameBoard cards={player1Cards} onClickCard={() => void 0} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={handleEndGame}>
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
