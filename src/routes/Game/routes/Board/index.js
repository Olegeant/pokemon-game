import { useContext, useEffect } from 'react';

import { PokemonContext } from '../../../../context/PokemonContext';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';

import styles from './style.module.css';

const BoardPage = () => {
  const { pokemons, onNewGameStart } = useContext(PokemonContext);

  useEffect(() => {
    return () => {
      onNewGameStart();
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.playerOne}>
        {Object.values(pokemons).map(({ id, name, img, type, values }) => (
          <PokemonCard
            className={styles.card}
            key={id}
            name={name}
            id={id}
            type={type}
            values={values}
            img={img}
            isActive={true}
            minimize
          />
        ))}
      </div>
      <div className={styles.board}>
        <div className={styles.boardPlate}>1</div>
        <div className={styles.boardPlate}>2</div>
        <div className={styles.boardPlate}>3</div>
        <div className={styles.boardPlate}>4</div>
        <div className={styles.boardPlate}>5</div>
        <div className={styles.boardPlate}>6</div>
        <div className={styles.boardPlate}>7</div>
        <div className={styles.boardPlate}>8</div>
        <div className={styles.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
