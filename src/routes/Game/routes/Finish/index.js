import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FirebaseClass from '../../../../service/firebase';

import { getSelectedPokemons } from '../../../../redux/pokemons';
import { selectLocalId } from '../../../../redux/user';
import {
  getPlayer1Cards,
  getPlayer2Cards,
  getWinner,
  setPlayer1Cards,
  setPlayer2Cards,
  setWinner,
} from '../../../../redux/game';

import EndGameBoard from './EndGameBoard';

import styles from './style.module.css';

const FinishPage = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(getSelectedPokemons);
  const player1Cards = useSelector(getPlayer1Cards);
  const player2Cards = useSelector(getPlayer2Cards);
  const winner = useSelector(getWinner);
  const localId = useSelector(selectLocalId);

  if (Object.keys(selectedPokemons).length === 0) history.replace('/');

  useEffect(() => {
    return () => {
      resetData();
    };
  }, []);

  const resetData = () => {
    dispatch(setPlayer1Cards([]));
    dispatch(setPlayer2Cards([]));
    dispatch(setWinner(null));
  };

  const handleEndGame = async () => {
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

      const idToken = localStorage.getItem('idToken');

      await fetch(
        `https://pokemon-game-23b5e-default-rtdb.europe-west1.firebasedatabase.app/${localId}/pokemons.json/?auth=${idToken}`,
        {
          method: 'POST',
          body: JSON.stringify(newData),
        },
      );
    }

    resetData();
    history.push('/');
  };

  const handleCardSelect = id => {
    if (winner !== 1) return;

    setSelectedCardId(id);
    dispatch(setPlayer2Cards(player2Cards.map(item => ({ ...item, isSelected: item.id === id }))));
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
