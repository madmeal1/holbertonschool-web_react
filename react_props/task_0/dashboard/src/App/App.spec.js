import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders the Notifications, Header, Login and Footer components', () => {
    render(<App />);

    expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    expect(screen.getByAltText(/holberton logo/i)).toBeTruthy();
    expect(screen.getByText(/school dashboard/i)).toBeTruthy();
    expect(screen.getByText(/login to access the full dashboard/i)).toBeTruthy();
    expect(screen.getByText(/copyright \d{4} - holberton school main dashboard/i)).toBeTruthy();
  });
});
