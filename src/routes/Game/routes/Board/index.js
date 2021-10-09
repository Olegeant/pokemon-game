import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedPokemons } from '../../../../redux/pokemons';
import { setPlayer1Cards, setPlayer2Cards, setWinner } from '../../../../redux/game';

import request from '../../../../service/request';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import PlayerBoard from './component/PlayerBoard';
import ArrowChoice from '../../../../components/ArrowChoice/ArrowChoice';

import styles from './style.module.css';

const counterWin = (board, player1, player2) => {
  // TODO: move to utils
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    item?.card?.possession === 'blue' && player1Count++;

    item?.card?.possession === 'red' && player2Count++;
  });

  return [player1Count, player2Count];
};

const returnBoard = board => {
  return board.map((item, idx) => {
    let card = null;
    if (typeof item === 'object') {
      card = {
        ...item.poke,
        possession: item.holder === 'p1' ? 'blue' : 'red',
      };
    }

    return {
      position: idx + 1,
      card,
    };
  });
};

const BoardPage = () => {
  const selectedPokemons = useSelector(getSelectedPokemons);
  const dispatch = useDispatch();

  const [startSide, setStartSide] = useState(0);
  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemons).map(item => ({ ...item, possession: 'blue' }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const history = useHistory();
  const match = useRouteMatch();

  if (Object.keys(selectedPokemons).length === 0) history.replace('/game');

  useEffect(() => {
    async function fetchDataOnGameStart() {
      const boardRequest = await request.getBoard();
      setBoard(boardRequest.data);

      setTimeout(() => {
        setStartSide(+(Math.random() < 0.5) + 1);
      }, 2000);

      const player2Request = await request.gameStart({
        pokemons: Object.values(selectedPokemons),
      });
      const player2Cards = player2Request.data.map(item => ({ ...item, possession: 'red' }));
      setPlayer2(player2Cards);

      dispatch(setPlayer1Cards(player1));
      dispatch(setPlayer2Cards(player2Cards));
    }

    fetchDataOnGameStart();
  }, [dispatch]);

  useEffect(() => {
    if (startSide !== 2) return;

    console.log("Hi! It's my turn to make move!!!");
    handleClickBoardPlate();
  }, [startSide]);

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert('WIN');
        dispatch(setWinner(1));
      } else if (count1 < count2) {
        alert('lose');
        dispatch(setWinner(2));
      } else {
        alert('DRAW');
        dispatch(setWinner(0));
      }

      history.push(match.path.replace(/\/[^/]+$/, '/finish'));
    }
  }, [steps]);

  useEffect(() => {
    if (choiceCard?.player !== 1) return;

    setPlayer1(prevState =>
      prevState.map(item => ({ ...item, active: item.id === choiceCard.id })),
    );
  }, [choiceCard]);

  const handleClickBoardPlate = async position => {
    if (startSide !== 2 && (typeof choiceCard !== 'object' || choiceCard === null)) return;

    const params = {
      currentPlayer: 'p1',
      hands: {
        p1: player1,
        p2: player2,
      },
      move: {
        poke: { ...choiceCard },
        position,
      },
      board: serverBoard,
    };

    if (startSide === 2) {
      params.currentPlayer = 'p2';
      params.move = null;
    }

    if (choiceCard?.player === 1) {
      setPlayer1(prevState => prevState.filter(({ id }) => id !== choiceCard.id));
    }

    setBoard(prevState =>
      prevState.map(item => (item.position === position ? { ...item, card: choiceCard } : item)),
    );

    setSteps(prevstate => prevstate + 1);

    const game = await request.game(params);

    setBoard(returnBoard(game.oldBoard || [0, 0, 0, 0, 0, 0, 0, 0, 0]));

    if (game.move !== null) {
      const idAi = game.move.poke.id;

      setTimeout(() => {
        setPlayer2(
          (
            prevState, // TODO: fix
          ) => prevState.map(item => (item.id === idAi ? { ...item, active: true } : item)),
        );
      }, 500);

      setTimeout(() => {
        setPlayer2(prevState => prevState.filter(({ id }) => id !== idAi));
        setServerBoard(game.board);
        setBoard(returnBoard(game.board));
        setSteps(prevstate => prevstate + 1);
        setChoiceCard(null);
        setStartSide(1);
      }, 1500);
    }
  };

  return (
    <div className={styles.root}>
      {steps === 0 && <ArrowChoice side={startSide} />}

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
        <PlayerBoard player={2} cards={player2} />
      </div>
    </div>
  );
};

export default BoardPage;
