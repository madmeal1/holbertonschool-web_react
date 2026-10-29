import { render, screen, fireEvent, createEvent, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import useLogin from '../hooks/useLogin';

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

  it('calls the logIn prop with the email and password when the form is submitted', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();
    render(<Login logIn={logIn} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    expect(logIn).toHaveBeenCalledTimes(1);
    expect(logIn).toHaveBeenCalledWith('test@example.com', 'secret123');
  });

  it('does not reload the page when the form is submitted', () => {
    const { container } = render(<Login />);
    const form = container.querySelector('form');
    const submitEvent = createEvent.submit(form);

    fireEvent(form, submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it('is still wrapped with the WithLogging HOC', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { unmount } = render(<Login />);

    expect(Login.displayName).toBe('WithLogging(Login)');
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');

    unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');

    consoleSpy.mockRestore();
  });

  it('keeps the submit button disabled while only one field is valid', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    expect(submitButton.disabled).toBe(true);

    await user.type(screen.getByLabelText(/password/i), 'secret12');
    expect(submitButton.disabled).toBe(false);
  });
});

describe('useLogin', () => {
  const changeEvent = (value) => ({ target: { value } });

  it('starts with empty fields and the submit disabled', () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.enableSubmit).toBe(false);
  });

  it('updates email and password through the change handlers', () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => result.current.handleChangeEmail(changeEvent('test@example.com')));
    act(() => result.current.handleChangePassword(changeEvent('secret123')));

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('secret123');
  });

  it('only enables the submit with a valid email and a password of at least 8 characters', () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => result.current.handleChangeEmail(changeEvent('invalid-email')));
    act(() => result.current.handleChangePassword(changeEvent('secret123')));
    expect(result.current.enableSubmit).toBe(false);

    act(() => result.current.handleChangeEmail(changeEvent('test@example.com')));
    expect(result.current.enableSubmit).toBe(true);

    act(() => result.current.handleChangePassword(changeEvent('short')));
    expect(result.current.enableSubmit).toBe(false);
  });

  it('prevents the default submit and calls onLogin with the email and password', () => {
    const onLogin = jest.fn();
    const preventDefault = jest.fn();
    const { result } = renderHook(() => useLogin(onLogin));

    act(() => result.current.handleChangeEmail(changeEvent('test@example.com')));
    act(() => result.current.handleChangePassword(changeEvent('secret123')));
    act(() => result.current.handleLoginSubmit({ preventDefault }));

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'secret123');
  });
});
