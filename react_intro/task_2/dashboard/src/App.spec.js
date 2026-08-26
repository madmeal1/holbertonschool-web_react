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

  it('renders 2 input elements for email and password', () => {
    const { container } = render(<App />);

    const inputs = container.querySelectorAll('input');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(inputs).toHaveLength(2);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders 2 label elements with the text Email and Password', () => {
    render(<App />);

    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel.tagName).toBe('LABEL');
    expect(passwordLabel.tagName).toBe('LABEL');
  });

  it('renders a button with the text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
