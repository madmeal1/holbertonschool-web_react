import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  it('renders 2 labels, 2 text inputs and 1 submit input inside a form', () => {
    const { container } = render(<Login />);

    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(3);
    expect(container.querySelectorAll('input[type="submit"]')).toHaveLength(1);
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

  it('updates the email and password inputs as the user types', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'secret123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('secret123');
  });

  it('has the submit button disabled by default', () => {
    render(<Login />);

    expect(screen.getByRole('button', { name: /ok/i }).disabled).toBe(true);
  });

  it('enables the submit button only when the email is valid and the password has at least 8 characters', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'secret123');
    expect(submitButton.disabled).toBe(true);

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(submitButton.disabled).toBe(false);

    await user.clear(passwordInput);
    await user.type(passwordInput, 'short');
    expect(submitButton.disabled).toBe(true);

    await user.type(passwordInput, '123');
    expect(submitButton.disabled).toBe(false);
  });

  it('does not reload the page when the form is submitted', () => {
    const { container } = render(<Login />);
    const form = container.querySelector('form');
    const submitEvent = createEvent.submit(form);

    fireEvent(form, submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
