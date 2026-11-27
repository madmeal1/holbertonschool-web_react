import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '' } },
  ];

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should fetch notifications data correctly', async () => {
    const store = configureStore({ reducer: { notifications: notificationsReducer } });

    const promise = store.dispatch(fetchNotifications());
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
    mockAxios.mockResponse({ data: { notifications: mockNotifications } });
    await promise;

    const { notifications } = store.getState().notifications;
    expect(notifications).toHaveLength(3);
    expect(notifications[0]).toEqual(mockNotifications[0]);
    expect(notifications[1]).toEqual(mockNotifications[1]);
    expect(notifications[2]).toEqual({
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    });
  });

  test('should remove a notification when markNotificationAsRead is dispatched', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = notificationsReducer(
      { ...initialState, notifications: mockNotifications },
      markNotificationAsRead(2)
    );

    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
  });

  test('should toggle displayDrawer with showDrawer and hideDrawer', () => {
    let state = notificationsReducer(initialState, hideDrawer());
    expect(state.displayDrawer).toBe(false);

    state = notificationsReducer(state, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });
});
