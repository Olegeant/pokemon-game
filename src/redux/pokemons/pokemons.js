import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FirebaseClass from '../../service/firebase';

const initialState = {
  isLoading: false,
  data: {},
  error: null,
};

export const getPokemonsAsync = createAsyncThunk(
  'pokemons/getPokemons',
  async (_, { rejectWithValue }) => {
    try {
      const data = await FirebaseClass.getPokemonsOnce();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const pokemonsSlice = createSlice({
  name: 'pokemons',

  initialState,

  reducers: {
    selectPokemon: (state, { payload: key }) => {
      state.data = {
        ...state.data,
        [key]: { ...state.data[key], selected: !state.data[key].selected },
      };
    },
  },

  extraReducers: {
    [getPokemonsAsync.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getPokemonsAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getPokemonsAsync.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { selectPokemon } = pokemonsSlice.actions;

export const selectedPokemonsLoading = state => state.pokemons.isLoading;
export const getPokemons = state => state.pokemons.data;
export const getSelectedPokemons = state =>
  Object.entries(getPokemons(state)).reduce(
    (acc, [key, value]) => ({ ...acc, ...(value.selected ? { [key]: value } : {}) }),
    {},
  );

export default pokemonsSlice.reducer;
