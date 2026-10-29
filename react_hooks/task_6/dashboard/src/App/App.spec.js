import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './App';
import { getLatestNotification } from '../utils/utils';

const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const NOTIFICATIONS_URL = 'http://localhost:5173/notifications.json';
const COURSES_URL = 'http://localhost:5173/courses.json';

const respondTo = async (url, data) => {
  await act(async () => {
    mockAxios.mockResponseFor({ url }, { data });
  });
};

// Renders the App and resolves the requests fired on mount
const renderApp = async () => {
  const utils = render(<App />);
  await respondTo(NOTIFICATIONS_URL, notificationsData);
  return utils;
};

const logInThroughForm = async (email = 'test@example.com', password = 'secret123') => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), email);
  await user.type(screen.getByLabelText(/password/i), password);
  await user.click(screen.getByRole('button', { name: /ok/i }));
  await respondTo(COURSES_URL, coursesData);
};

const countRequests = (url) => mockAxios.get.mock.calls.filter(([calledUrl]) => calledUrl === url).length;

describe('App', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('is a function component', () => {
    expect(App.prototype?.render).toBeUndefined();
  });

  it('renders without crashing', async () => {
    await expect(renderApp()).resolves.toBeTruthy();
  });

  it('renders the Notifications, Header and Footer components', async () => {
    await renderApp();

    expect(screen.getByText(/your notifications/i)).toBeTruthy();
    expect(screen.getByAltText(/holberton logo/i)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/school dashboard/i);
    expect(screen.getByText(/copyright \d{4} - holberton school/i)).toBeTruthy();
  });

  it('renders the News from the School section by default', async () => {
    await renderApp();

    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeTruthy();
    expect(screen.getByText(/holberton school news goes here/i)).toBeTruthy();
  });

  describe('fetching notifications', () => {
    it('fetches notifications.json once when the App initially renders', () => {
      render(<App />);

      expect(mockAxios.get).toHaveBeenCalledWith(NOTIFICATIONS_URL);
      expect(countRequests(NOTIFICATIONS_URL)).toBe(1);
    });

    it('displays no notification before the response is received', () => {
      render(<App />);

      expect(screen.getByText(/no new notification for now/i)).toBeTruthy();
    });

    it('displays the retrieved notifications', async () => {
      const { container } = await renderApp();
      const items = container.querySelectorAll('.notification-items li');

      expect(items).toHaveLength(3);
      expect(items[0].textContent).toBe('New course available');
      expect(items[1].textContent).toBe('New resume available');
    });

    it('uses getLatestNotification for the latest notification', async () => {
      const { container } = await renderApp();
      const latest = container.querySelectorAll('.notification-items li')[2];

      expect(latest.innerHTML).toBe(getLatestNotification());
    });

    it('does not fetch the notifications again when the user state changes', async () => {
      await renderApp();

      await logInThroughForm();
      fireEvent.click(screen.getByText('logout'));

      expect(countRequests(NOTIFICATIONS_URL)).toBe(1);
    });

    it('keeps rendering the App when the request fails', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(<App />);

      await act(async () => {
        mockAxios.mockError(new Error('Network Error'), mockAxios.getReqByUrl(NOTIFICATIONS_URL));
      });

      expect(screen.getByText(/no new notification for now/i)).toBeTruthy();
      // errors are only logged in development mode
      expect(errorSpy).not.toHaveBeenCalled();

      errorSpy.mockRestore();
    });
  });

  describe('fetching courses', () => {
    it('only fetches notifications.json when the App initially renders (user logged out)', () => {
      render(<App />);

      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(countRequests(COURSES_URL)).toBe(0);
    });

    it('fetches courses.json and displays the courses when the user logs in', async () => {
      const { container } = await renderApp();

      await logInThroughForm();

      expect(mockAxios.get).toHaveBeenCalledWith(COURSES_URL);
      expect(countRequests(COURSES_URL)).toBe(1);
      expect(container.querySelector('table#CourseList')).toBeTruthy();
      const rows = container.querySelectorAll('#CourseList tbody tr');
      expect(rows).toHaveLength(3);
      expect(rows[0].textContent).toMatch(/ES6/);
      expect(rows[2].textContent).toMatch(/React/);
    });

    it('fetches courses.json again each time the user logs in', async () => {
      await renderApp();
      await logInThroughForm();
      fireEvent.click(screen.getByText('logout'));

      await logInThroughForm('other@example.com', 'password456');

      expect(countRequests(COURSES_URL)).toBe(2);
    });

    it('does not fetch courses.json when the user logs out', async () => {
      await renderApp();
      await logInThroughForm();

      fireEvent.click(screen.getByText('logout'));

      expect(countRequests(COURSES_URL)).toBe(1);
    });

    it('does not fetch courses again when an unrelated state changes', async () => {
      await renderApp();

      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      fireEvent.click(screen.getByText(/your notifications/i));

      expect(countRequests(COURSES_URL)).toBe(0);
    });
  });

  describe('when the user is logged out (default state)', () => {
    it('renders the Login form, no CourseList, no logoutSection and no Contact us link', async () => {
      const { container } = await renderApp();

      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
      expect(container.querySelectorAll('input')).toHaveLength(3);
      expect(container.querySelector('table#CourseList')).toBeNull();
      expect(container.querySelector('#logoutSection')).toBeNull();
      expect(screen.queryByText(/contact us/i)).toBeNull();
    });
  });

  describe('logIn', () => {
    it('updates the user email, password and isLoggedIn after submitting the Login form', async () => {
      const { container } = await renderApp();

      await logInThroughForm();

      // isLoggedIn: the CourseList replaces the Login form
      expect(container.querySelector('table#CourseList')).toBeTruthy();
      expect(screen.queryByText(/login to access the full dashboard/i)).toBeNull();
      // email: shared with the Header through the context
      expect(container.querySelector('#logoutSection').textContent).toMatch(
        /welcome test@example\.com \(logout\)/i
      );
      // the Footer reads the logged in user from the context too
      expect(screen.getByText(/contact us/i)).toBeTruthy();
    });
  });

  describe('logOut', () => {
    it('sets isLoggedIn to false and clears email and password when clicking on logout', async () => {
      const { container } = await renderApp();
      await logInThroughForm();

      fireEvent.click(screen.getByText('logout'));

      // isLoggedIn: false
      expect(container.querySelector('#logoutSection')).toBeNull();
      expect(container.querySelector('table#CourseList')).toBeNull();
      expect(screen.queryByText(/contact us/i)).toBeNull();
      // email and password: the remounted Login form starts empty
      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
      expect(screen.getByLabelText(/email/i).value).toBe('');
      expect(screen.getByLabelText(/password/i).value).toBe('');
    });

    it('lets the user log in again with new credentials after logging out', async () => {
      const { container } = await renderApp();
      await logInThroughForm();
      fireEvent.click(screen.getByText('logout'));

      await logInThroughForm('other@example.com', 'password456');

      expect(container.querySelector('#logoutSection').textContent).toMatch(
        /welcome other@example\.com/i
      );
    });
  });

  describe('displayDrawer state', () => {
    it('displays the drawer by default', async () => {
      await renderApp();

      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    });

    it('hides the drawer when handleHideDrawer is triggered by the close button', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      await renderApp();

      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();

      consoleSpy.mockRestore();
    });

    it('displays the drawer again when handleDisplayDrawer is triggered by "Your notifications"', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      await renderApp();
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      fireEvent.click(screen.getByText(/your notifications/i));

      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();

      consoleSpy.mockRestore();
    });

    it('toggles the drawer each time "Your notifications" is clicked', async () => {
      await renderApp();

      fireEvent.click(screen.getByText(/your notifications/i));
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();

      fireEvent.click(screen.getByText(/your notifications/i));
      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    });

    it('keeps the notifications when the drawer is toggled', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const { container } = await renderApp();
      fireEvent.click(screen.getByText('New course available'));

      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      fireEvent.click(screen.getByText(/your notifications/i));

      expect(container.querySelectorAll('.notification-items li')).toHaveLength(2);
      expect(screen.queryByText('New course available')).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('markNotificationAsRead', () => {
    it('removes the clicked notification from the list and logs its id', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const { container } = await renderApp();
      expect(container.querySelectorAll('.notification-items li')).toHaveLength(3);

      fireEvent.click(screen.getByText('New resume available'));

      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
      expect(container.querySelectorAll('.notification-items li')).toHaveLength(2);
      expect(screen.queryByText('New resume available')).toBeNull();

      consoleSpy.mockRestore();
    });

    it('shows "No new notification for now" once every notification is marked as read', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const { container } = await renderApp();

      container.querySelectorAll('.notification-items li').forEach((item) => fireEvent.click(item));

      expect(container.querySelectorAll('.notification-items li')).toHaveLength(0);
      expect(screen.getByText(/no new notification for now/i)).toBeTruthy();

      consoleSpy.mockRestore();
    });
  });
});
