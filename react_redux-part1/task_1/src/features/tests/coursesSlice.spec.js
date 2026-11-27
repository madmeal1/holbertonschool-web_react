import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import coursesReducer, { initialState, fetchCourses } from '../courses/coursesSlice';
import authReducer, { login, logout } from '../auth/authSlice';

const COURSES_URL = 'http://localhost:5173/courses.json';

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const createStore = () =>
  configureStore({
    reducer: { auth: authReducer, courses: coursesReducer },
  });

describe('coursesSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('returns the correct initial state by default', () => {
    const state = coursesReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({ courses: [] });
    expect(state).toEqual(initialState);
  });

  describe('fetchCourses', () => {
    it('uses the courses/fetchCourses action type', () => {
      expect(fetchCourses.typePrefix).toBe('courses/fetchCourses');
    });

    it('fetches the courses and stores them', async () => {
      const store = createStore();

      const promise = store.dispatch(fetchCourses());
      expect(mockAxios.get).toHaveBeenCalledWith(COURSES_URL);
      mockAxios.mockResponse({ data: coursesData });
      await promise;

      expect(store.getState().courses.courses).toEqual(coursesData);
    });

    it('keeps the current courses when the request fails', async () => {
      const store = createStore();
      const firstFetch = store.dispatch(fetchCourses());
      mockAxios.mockResponse({ data: coursesData });
      await firstFetch;

      const promise = store.dispatch(fetchCourses());
      mockAxios.mockError(new Error('Network Error'));
      const result = await promise;

      expect(result.type).toBe('courses/fetchCourses/rejected');
      expect(store.getState().courses.courses).toEqual(coursesData);
    });
  });

  describe('logout', () => {
    it('resets the courses array to empty when logout is dispatched', () => {
      const state = coursesReducer({ courses: coursesData }, logout());

      expect(state.courses).toEqual([]);
      expect(state).toEqual(initialState);
    });

    it('resets the fetched courses when the user logs out through the store', async () => {
      const store = createStore();
      store.dispatch(login({ email: 'test@example.com', password: 'secret123' }));
      const promise = store.dispatch(fetchCourses());
      mockAxios.mockResponse({ data: coursesData });
      await promise;
      expect(store.getState().courses.courses).toHaveLength(3);

      store.dispatch(logout());

      expect(store.getState().courses.courses).toEqual([]);
      expect(store.getState().auth.isLoggedIn).toBe(false);
    });

    it('is not affected by the login action', () => {
      const state = coursesReducer(
        { courses: coursesData },
        login({ email: 'test@example.com', password: 'secret123' })
      );

      expect(state.courses).toEqual(coursesData);
    });
  });
});
