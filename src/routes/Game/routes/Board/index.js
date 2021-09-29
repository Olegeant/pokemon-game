import { useState, useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PokemonContext } from '../../../../context/PokemonContext';
import { getSelectedPokemons } from '../../../../redux/pokemons/pokemons';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import PlayerBoard from './component/PlayerBoard';

import styles from './style.module.css';

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    item?.card.possession === 'blue' && player1Count++;

    item?.card.possession === 'red' && player2Count++;
  });

  return [player1Count, player2Count];
};

const BoardPage = () => {
  const selectedPokemons = useSelector(getSelectedPokemons);
  const { savePlayer1Cards, savePlayer2Cards, saveWinner } = useContext(PokemonContext);

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemons).map(item => ({ ...item, possession: 'blue' }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);

  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    async function fetchDataOnGameStart() {
      const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
      const boardRequest = await boardResponse.json();

      setBoard(boardRequest.data);

      const player2Response = await fetch(
        'https://reactmarathon-api.netlify.app/api/create-player',
      );
      const player2Request = await player2Response.json();
      const player2Cards = player2Request.data.map(item => ({ ...item, possession: 'red' }));

      setPlayer2(player2Cards);

      savePlayer1Cards(player1);
      savePlayer2Cards(player2Cards);
    }

    fetchDataOnGameStart();
  }, []);

  if (Object.keys(selectedPokemons).length === 0) history.replace('/game');

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert('WIN');
        saveWinner(1);
      } else if (count1 < count2) {
        alert('lose');
        saveWinner(2);
      } else {
        alert('DRAW');
        saveWinner(0);
      }

      history.push(match.path.replace(/\/[^/]+$/, '/finish'));
    }
  }, [steps]);

  const handleClickBoardPlate = async position => {
    if (choiceCard) {
      const params = { position, card: choiceCard, board };

      const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const request = await res.json();

      if (choiceCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
      }

      if (choiceCard.player === 2) {
        setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
      }

      setBoard(request.data);
      setSteps(prevstate => prevstate + 1);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.playerOne}>
        <PlayerBoard player={1} cards={player1} onClickCard={card => setChoiceCard(card)} />
      </div>

      <div className={styles.board}>
        {board.map(item => (
          <div
            key={item.position}
            className={styles.boardPlate}
            onClick={() => !item.card && handleClickBoardPlate(item.position)}
          >
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>

      <div className={styles.playerTwo}>
        <PlayerBoard player={2} cards={player2} onClickCard={card => setChoiceCard(card)} />
      </div>
    </div>
  );
};

export default BoardPage;
