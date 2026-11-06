import mockAxios from 'jest-mock-axios';
import authReducer, { initialState, login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('returns the correct initial state by default', () => {
    const state = authReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      user: { email: '', password: '' },
      isLoggedIn: false,
    });
    expect(state).toEqual(initialState);
  });

  it('exposes login and logout actions under the auth slice name', () => {
    expect(login.type).toBe('auth/login');
    expect(logout.type).toBe('auth/logout');
  });

  it('updates the user and sets isLoggedIn to true when login is dispatched', () => {
    const state = authReducer(
      undefined,
      login({ email: 'test@example.com', password: 'secret123' })
    );

    expect(state.user.email).toBe('test@example.com');
    expect(state.user.password).toBe('secret123');
    expect(state.isLoggedIn).toBe(true);
  });

  it('resets the user and sets isLoggedIn to false when logout is dispatched', () => {
    const loggedInState = authReducer(
      undefined,
      login({ email: 'test@example.com', password: 'secret123' })
    );

    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
    expect(state).toEqual(initialState);
  });

  it('does not mutate the previous state', () => {
    const previousState = authReducer(undefined, { type: 'unknown' });

    authReducer(previousState, login({ email: 'test@example.com', password: 'secret123' }));

    expect(previousState).toEqual(initialState);
  });

  it('returns the current state for unknown actions', () => {
    const loggedInState = authReducer(
      undefined,
      login({ email: 'test@example.com', password: 'secret123' })
    );

    expect(authReducer(loggedInState, { type: 'unknown' })).toBe(loggedInState);
  });
});
