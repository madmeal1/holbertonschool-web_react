import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {
    email: '',
    password: '',
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
