import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders 2 input elements for email and password', () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

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

  it("renders a button with the text 'OK'", () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /^ok$/i });
    expect(button).toBeInTheDocument();
  });
});
