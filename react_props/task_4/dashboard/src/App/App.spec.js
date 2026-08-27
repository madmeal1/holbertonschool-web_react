import { render, screen } from '@testing-library/react';
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
});
