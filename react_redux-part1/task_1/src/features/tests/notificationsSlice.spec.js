import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  initialState,
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

const NOTIFICATIONS_URL = 'http://localhost:5173/notifications.json';

const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const createStore = (preloadedState) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: preloadedState && { notifications: preloadedState },
  });

describe('notificationsSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('returns the correct initial state by default', () => {
    const state = notificationsReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({ notifications: [], displayDrawer: true });
    expect(state).toEqual(initialState);
  });

  describe('fetchNotifications', () => {
    it('uses the notifications/fetchNotifications action type', () => {
      expect(fetchNotifications.typePrefix).toBe('notifications/fetchNotifications');
    });

    it('fetches the notifications and stores them with the latest notification', async () => {
      const store = createStore();

      const promise = store.dispatch(fetchNotifications());
      expect(mockAxios.get).toHaveBeenCalledWith(NOTIFICATIONS_URL);
      mockAxios.mockResponse({ data: notificationsData });
      await promise;

      const { notifications } = store.getState().notifications;
      expect(notifications).toHaveLength(3);
      expect(notifications[0]).toEqual(notificationsData[0]);
      expect(notifications[1]).toEqual(notificationsData[1]);
      expect(notifications[2].html).toEqual({ __html: getLatestNotification() });
    });

    it('keeps the current notifications when the request fails', async () => {
      const store = createStore({ notifications: notificationsData, displayDrawer: true });

      const promise = store.dispatch(fetchNotifications());
      mockAxios.mockError(new Error('Network Error'));
      const result = await promise;

      expect(result.type).toBe('notifications/fetchNotifications/rejected');
      expect(store.getState().notifications.notifications).toEqual(notificationsData);
    });
  });

  describe('markNotificationAsRead', () => {
    it('removes the notification with the given id and logs it', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const previousState = { notifications: notificationsData, displayDrawer: true };

      const state = notificationsReducer(previousState, markNotificationAsRead(2));

      expect(state.notifications.map(({ id }) => id)).toEqual([1, 3]);
      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
      // the previous state is left untouched
      expect(previousState.notifications).toHaveLength(3);

      consoleSpy.mockRestore();
    });
  });

  describe('showDrawer and hideDrawer', () => {
    it('sets displayDrawer to false when hideDrawer is dispatched', () => {
      const state = notificationsReducer(initialState, hideDrawer());

      expect(state.displayDrawer).toBe(false);
    });

    it('sets displayDrawer to true when showDrawer is dispatched', () => {
      const state = notificationsReducer({ ...initialState, displayDrawer: false }, showDrawer());

      expect(state.displayDrawer).toBe(true);
    });

    it('toggles displayDrawer back and forth', () => {
      let state = notificationsReducer(undefined, hideDrawer());
      expect(state.displayDrawer).toBe(false);

      state = notificationsReducer(state, showDrawer());
      expect(state.displayDrawer).toBe(true);
    });
  });
});
