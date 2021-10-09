import { useState } from 'react';
import cn from 'classnames';

import PokemonCard from '../../../../../../components/PokemonCard/PokemonCard';

import styles from './style.module.css';

const PlayerBoard = ({ player, cards, onClickCard }) => {
  // const [selectedCardId, setSelectedCardId] = useState(null);

  return (
    <>
      {cards.map(item => (
        <div
          key={item.id}
          className={cn(styles.cardBoard, { [styles.selected]: item.active })}
          onClick={() => {
            // onClickCard && setSelectedCardId(item.id);
            onClickCard && onClickCard({ player, ...item });
          }}
        >
          <PokemonCard
            name={item.name}
            id={item.id}
            type={item.type}
            values={item.values}
            img={item.img}
            isActive={true}
            minimize
          />
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
