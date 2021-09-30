import { configureStore } from '@reduxjs/toolkit';

import pokemonsReducer from './pokemons';
import gameReducer from './game';

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    game: gameReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
