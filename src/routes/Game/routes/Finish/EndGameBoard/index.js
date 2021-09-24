import styles from './style.module.css';

import PokemonCard from '../../../../../components/PokemonCard/PokemonCard';

const EndGameBoard = ({ cards, onClickCard }) => {
  return (
    <div className={styles.board}>
      {cards.map(item => (
        <PokemonCard
          {...item}
          key={item.id}
          className={styles.card}
          isActive
          possession={null}
          onClickCard={() => onClickCard(item.id)}
        />
      ))}
    </div>
  );
};

export default EndGameBoard;
