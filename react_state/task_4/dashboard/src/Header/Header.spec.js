import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

describe('Header', () => {
  it('renders the Holberton logo', () => {
    const { container } = render(<Header />);
    const logo = container.querySelector('img');

    expect(logo).toBeTruthy();
    expect(logo.getAttribute('alt')).toMatch(/holberton/i);
  });

  it('renders an h1 element with the correct text', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading.tagName).toBe('H1');
    expect(heading.textContent).toMatch(/school dashboard/i);
  });

  describe('logoutSection', () => {
    const loggedInUser = {
      email: 'test@example.com',
      password: 'secret123',
      isLoggedIn: true,
    };

    it('is not rendered with the default context value', () => {
      const { container } = render(<Header />);

      expect(container.querySelector('#logoutSection')).toBeNull();
    });

    it('is rendered with the user email when the user is logged in', () => {
      const { container } = render(
        <newContext.Provider value={{ user: loggedInUser, logOut: () => {} }}>
          <Header />
        </newContext.Provider>
      );
      const logoutSection = container.querySelector('#logoutSection');

      expect(logoutSection).toBeTruthy();
      expect(logoutSection.textContent).toMatch(/welcome test@example\.com \(logout\)/i);
    });

    it('calls the logOut function from the context when clicking on the logout link', () => {
      const logOut = jest.fn();
      render(
        <newContext.Provider value={{ user: loggedInUser, logOut }}>
          <Header />
        </newContext.Provider>
      );

      fireEvent.click(screen.getByText('logout'));

      expect(logOut).toHaveBeenCalledTimes(1);
    });
  });
});
