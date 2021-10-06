import { configureStore } from '@reduxjs/toolkit';

import pokemonsReducer from './pokemons';
import gameReducer from './game';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    game: gameReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
