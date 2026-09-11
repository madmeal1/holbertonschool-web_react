import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders the Notifications, Header and Footer components', () => {
    render(<App />);

    expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    expect(screen.getByAltText(/holberton logo/i)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/school dashboard/i);
    expect(screen.getByText(/copyright \d{4} - holberton school/i)).toBeTruthy();
  });

  describe('when isLoggedIn is false', () => {
    it('renders the Login form and no CourseList', () => {
      const { container } = render(<App isLoggedIn={false} />);

      expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
      expect(container.querySelectorAll('input')).toHaveLength(2);
      expect(container.querySelector('table#CourseList')).toBeNull();
    });
  });

  describe('when isLoggedIn is true', () => {
    it('renders the CourseList table and no Login form', () => {
      const { container } = render(<App isLoggedIn={true} />);

      expect(container.querySelector('table#CourseList')).toBeTruthy();
      expect(container.querySelectorAll('#CourseList tbody tr')).toHaveLength(3);
      expect(screen.queryByText(/login to access the full dashboard/i)).toBeNull();
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

    it('calls the logOut prop once', () => {
      const logOut = jest.fn();
      render(<App logOut={logOut} />);

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(logOut).toHaveBeenCalledTimes(1);
    });

    it('calls window.alert with "Logging you out"', () => {
      render(<App />);

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    });

    it('does not trigger logOut for other key combinations', () => {
      const logOut = jest.fn();
      render(<App logOut={logOut} />);

      fireEvent.keyDown(document, { key: 'h', ctrlKey: false });
      fireEvent.keyDown(document, { key: 'a', ctrlKey: true });

      expect(logOut).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();
    });

    it('removes the keydown listener when unmounted', () => {
      const logOut = jest.fn();
      const { unmount } = render(<App logOut={logOut} />);

      unmount();
      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(logOut).not.toHaveBeenCalled();
    });
  });
});
