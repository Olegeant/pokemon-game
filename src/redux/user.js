import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: () => ({
      isLoading: true,
    }),
    updateUser: (state, action) => ({
      isLoading: false,
      data: action.payload,
    }),
    removeUser: () => ({
      isLoading: false,
      data: {},
    }),
  },
});

export const { fetchUser, updateUser, removeUser } = userSlice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLocalId = state => state.user.data?.localId;

export const getUserUpdateAsync = () => async dispatch => {
  const idToken = localStorage.getItem('idToken');

  if (!idToken) return dispatch(removeUser());

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      idToken,
    }),
  };

  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCmvcufTKNxMfDDoXdR7Nn_vkSfNRJr22A',
    requestOptions,
  ).then(res => res.json());

  if (response.hasOwnProperty('error')) {
    localStorage.removeItem('idToken');
    dispatch(removeUser());
    return;
  }

  dispatch(updateUser(response.users[0]));
};

export const getUserAsync = () => dispatch => {
  dispatch(fetchUser());
  dispatch(getUserUpdateAsync());
};

export default userSlice.reducer;
