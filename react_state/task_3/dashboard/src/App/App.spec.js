import { createRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
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
    it('has a default user in its state', () => {
      const ref = createRef();
      render(<App ref={ref} />);

      expect(ref.current.state.user).toEqual({ email: '', password: '', isLoggedIn: false });
    });

    it('renders the Login form and no CourseList', () => {
      const { container } = render(<App />);

      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
      expect(container.querySelectorAll('input')).toHaveLength(3);
      expect(container.querySelector('table#CourseList')).toBeNull();
    });
  });

  describe('logIn and logOut', () => {
    it('logs the user in and renders the CourseList after submitting the Login form', async () => {
      const user = userEvent.setup();
      const ref = createRef();
      const { container } = render(<App ref={ref} />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'secret123');
      await user.click(screen.getByRole('button', { name: /ok/i }));

      expect(ref.current.state.user).toEqual({
        email: 'test@example.com',
        password: 'secret123',
        isLoggedIn: true,
      });
      expect(container.querySelector('table#CourseList')).toBeTruthy();
      expect(container.querySelectorAll('#CourseList tbody tr')).toHaveLength(3);
      expect(screen.queryByText(/login to access the full dashboard/i)).toBeNull();
    });

    it('shows the logoutSection with the user email once logged in', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      expect(container.querySelector('#logoutSection')).toBeNull();

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'secret123');
      await user.click(screen.getByRole('button', { name: /ok/i }));

      const logoutSection = container.querySelector('#logoutSection');
      expect(logoutSection).toBeTruthy();
      expect(logoutSection.textContent).toMatch(/welcome test@example\.com \(logout\)/i);
    });

    it('logs the user out and renders the Login form again when clicking on the logout link', () => {
      const ref = createRef();
      const { container } = render(<App ref={ref} />);
      act(() => ref.current.logIn('test@example.com', 'secret123'));

      fireEvent.click(screen.getByText('logout'));

      expect(ref.current.state.user).toEqual({ email: '', password: '', isLoggedIn: false });
      expect(container.querySelector('#logoutSection')).toBeNull();
      expect(container.querySelector('table#CourseList')).toBeNull();
      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
    });

    it('resets the user when logOut is called', () => {
      const ref = createRef();
      const { container } = render(<App ref={ref} />);

      act(() => ref.current.logIn('test@example.com', 'secret123'));
      expect(container.querySelector('table#CourseList')).toBeTruthy();

      act(() => ref.current.logOut());
      expect(ref.current.state.user).toEqual({ email: '', password: '', isLoggedIn: false });
      expect(container.querySelector('table#CourseList')).toBeNull();
    });
  });

  describe('displayDrawer state', () => {
    it('has displayDrawer set to false by default', () => {
      const ref = createRef();
      render(<App ref={ref} />);

      expect(ref.current.state.displayDrawer).toBe(false);
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    });

    it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
      const ref = createRef();
      render(<App ref={ref} />);

      act(() => ref.current.handleDisplayDrawer());

      expect(ref.current.state.displayDrawer).toBe(true);
      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    });

    it('sets displayDrawer to false when handleHideDrawer is called', () => {
      const ref = createRef();
      render(<App ref={ref} />);

      act(() => ref.current.handleDisplayDrawer());
      act(() => ref.current.handleHideDrawer());

      expect(ref.current.state.displayDrawer).toBe(false);
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    });

    it('opens the drawer on "Your notifications" click and closes it with the close button', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<App />);

      fireEvent.click(screen.getByText(/your notifications/i));
      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();

      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('keyboard shortcut: ctrl + h', () => {
    let alertSpy;

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      alertSpy.mockRestore();
    });

    it('calls the logOut function from the state once', () => {
      const ref = createRef();
      render(<App ref={ref} />);
      const logOut = jest.fn();
      act(() => ref.current.setState({ logOut }));

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(logOut).toHaveBeenCalledTimes(1);
    });

    it('logs the user out', () => {
      const ref = createRef();
      render(<App ref={ref} />);
      act(() => ref.current.logIn('test@example.com', 'secret123'));

      act(() => {
        fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
      });

      expect(ref.current.state.user.isLoggedIn).toBe(false);
    });

    it('calls window.alert with "Logging you out"', () => {
      render(<App />);

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    });

    it('does not trigger logOut for other key combinations', () => {
      const ref = createRef();
      render(<App ref={ref} />);
      const logOut = jest.fn();
      act(() => ref.current.setState({ logOut }));

      fireEvent.keyDown(document, { key: 'h', ctrlKey: false });
      fireEvent.keyDown(document, { key: 'a', ctrlKey: true });

      expect(logOut).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();
    });

    it('removes the keydown listener when unmounted', () => {
      const { unmount } = render(<App />);

      unmount();
      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(alertSpy).not.toHaveBeenCalled();
    });
  });
});
