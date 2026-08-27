import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  it('renders 2 label, 2 input and 1 button elements', () => {
    const { container } = render(<Login />);

    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('button')).toHaveLength(1);
  });

  it('focuses the email input when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(screen.getByText(/email/i));

    expect(document.activeElement).toBe(emailInput);
  });

  it('focuses the password input when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(screen.getByText(/password/i));

    expect(document.activeElement).toBe(passwordInput);
  });
});
