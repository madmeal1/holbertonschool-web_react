import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard header, body, and footer text', () => {
    render(<App />);

    expect(screen.getByAltText('holberton logo')).toBeTruthy();
    expect(screen.getByText('School dashboard')).toBeTruthy();
    expect(screen.getByText('Login to access the full dashboard')).toBeTruthy();
    expect(screen.getByText(/Copyright \d{4} - Holberton School main dashboard/i)).toBeTruthy();
  });

  it('renders 2 input elements for email and password', () => {
    render(<App />);

    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
  });

  it('renders 2 label elements with the text Email and Password', () => {
    render(<App />);

    expect(screen.getByText(/email/i).tagName).toBe('LABEL');
    expect(screen.getByText(/password/i).tagName).toBe('LABEL');
  });

  it("renders a button with the text 'OK'", () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /^ok$/i })).toBeTruthy();
  });
});
