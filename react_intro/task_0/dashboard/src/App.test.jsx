import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard header, body, and footer text', () => {
    render(<App />);

    expect(screen.getByAltText('holberton logo')).toBeInTheDocument();
    expect(screen.getByText('School dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login to access the full dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Copyright \d{4} - holberton School/i)).toBeInTheDocument();
  });
});
