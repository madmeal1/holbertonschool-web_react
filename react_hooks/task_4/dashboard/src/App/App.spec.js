import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const logInThroughForm = async (email = 'test@example.com', password = 'secret123') => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), email);
  await user.type(screen.getByLabelText(/password/i), password);
  await user.click(screen.getByRole('button', { name: /ok/i }));
};

describe('App', () => {
  it('is a function component', () => {
    expect(App.prototype?.render).toBeUndefined();
  });

  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders the Notifications, Header and Footer components', () => {
    render(<App />);

    expect(screen.getByText(/your notifications/i)).toBeTruthy();
    expect(screen.getByAltText(/holberton logo/i)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/school dashboard/i);
    expect(screen.getByText(/copyright \d{4} - holberton school/i)).toBeTruthy();
  });

  it('renders the News from the School section by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeTruthy();
    expect(screen.getByText(/holberton school news goes here/i)).toBeTruthy();
  });

  describe('when the user is logged out (default state)', () => {
    it('renders the Login form, no CourseList, no logoutSection and no Contact us link', () => {
      const { container } = render(<App />);

      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
      expect(container.querySelectorAll('input')).toHaveLength(3);
      expect(container.querySelector('table#CourseList')).toBeNull();
      expect(container.querySelector('#logoutSection')).toBeNull();
      expect(screen.queryByText(/contact us/i)).toBeNull();
    });
  });

  describe('logIn', () => {
    it('updates the user email, password and isLoggedIn after submitting the Login form', async () => {
      const { container } = render(<App />);

      await logInThroughForm();

      // isLoggedIn: the CourseList replaces the Login form
      expect(container.querySelector('table#CourseList')).toBeTruthy();
      expect(container.querySelectorAll('#CourseList tbody tr')).toHaveLength(3);
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
      const { container } = render(<App />);
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
      const { container } = render(<App />);
      await logInThroughForm();
      fireEvent.click(screen.getByText('logout'));

      await logInThroughForm('other@example.com', 'password456');

      expect(container.querySelector('#logoutSection').textContent).toMatch(
        /welcome other@example\.com/i
      );
    });
  });

  describe('displayDrawer state', () => {
    it('displays the drawer by default', () => {
      render(<App />);

      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    });

    it('hides the drawer when handleHideDrawer is triggered by the close button', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<App />);

      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();

      consoleSpy.mockRestore();
    });

    it('displays the drawer again when handleDisplayDrawer is triggered by "Your notifications"', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      fireEvent.click(screen.getByText(/your notifications/i));

      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();

      consoleSpy.mockRestore();
    });
  });

  describe('markNotificationAsRead', () => {
    it('removes the clicked notification from the list and logs its id', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const { container } = render(<App />);
      expect(container.querySelectorAll('.notification-items li')).toHaveLength(3);

      fireEvent.click(screen.getByText('New resume available'));

      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
      expect(container.querySelectorAll('.notification-items li')).toHaveLength(2);
      expect(screen.queryByText('New resume available')).toBeNull();

      consoleSpy.mockRestore();
    });

    it('shows "No new notification for now" once every notification is marked as read', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const { container } = render(<App />);

      container.querySelectorAll('.notification-items li').forEach((item) => fireEvent.click(item));

      expect(container.querySelectorAll('.notification-items li')).toHaveLength(0);
      expect(screen.getByText(/no new notification for now/i)).toBeTruthy();

      consoleSpy.mockRestore();
    });
  });
});
