import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the School Dashboard heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the expected body and footer text', () => {
    render(<App />);

    const bodyText = screen.getByText(/login to access the full dashboard/i);
    const footerText = screen.getByText(/copyright \d{4} - holberton school/i);

    expect(bodyText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  it('renders an image element', () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });
});
