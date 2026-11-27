import mockAxios from 'jest-mock-axios';
import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  afterEach(() => {
    mockAxios.reset();
  });

  test('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should update the state correctly when login is dispatched', () => {
    const payload = { email: 'user@example.com', password: 'password123' };
    const state = authReducer(initialState, login(payload));

    expect(state.user.email).toBe('user@example.com');
    expect(state.user.password).toBe('password123');
    expect(state.isLoggedIn).toBe(true);
  });

  test('should reset the state correctly when logout is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'user@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };
    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
