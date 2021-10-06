import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1Cards: [],
  player2Cards: [],
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',

  initialState,

  reducers: {
    setPlayer1Cards: (state, { payload }) => {
      state.player1Cards = payload;
    },
    setPlayer2Cards: (state, { payload }) => {
      state.player2Cards = payload;
    },
    setWinner: (state, { payload }) => {
      state.winner = payload;
    },
  },

  extraReducers: {},
});

export const { setPlayer1Cards, setPlayer2Cards, setWinner } = gameSlice.actions;

export const getPlayer1Cards = state => state.game.player1Cards;
export const getPlayer2Cards = state => state.game.player2Cards;
export const getWinner = state => state.game.winner;

export default gameSlice.reducer;
