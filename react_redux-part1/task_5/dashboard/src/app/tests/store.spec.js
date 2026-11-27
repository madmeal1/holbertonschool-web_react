import store from '../store';
import { initialState as authInitialState } from '../../features/auth/authSlice';
import { initialState as notificationsInitialState } from '../../features/notifications/notificationsSlice';
import { initialState as coursesInitialState } from '../../features/courses/coursesSlice';

describe('store', () => {
  it('combines the auth, notifications and courses slices', () => {
    expect(store.getState()).toEqual({
      auth: authInitialState,
      notifications: notificationsInitialState,
      courses: coursesInitialState,
    });
  });
});
