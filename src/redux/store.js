import { configureStore } from '@reduxjs/toolkit';

import pokemonsReducer from './pokemons/pokemons';

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
