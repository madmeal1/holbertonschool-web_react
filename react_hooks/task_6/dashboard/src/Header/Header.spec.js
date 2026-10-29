import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

const loggedInUser = {
  email: 'test@example.com',
  password: 'secret123',
  isLoggedIn: true,
};

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
    it('is not rendered without a user prop', () => {
      const { container } = render(<Header />);

      expect(container.querySelector('#logoutSection')).toBeNull();
    });

    it('is not rendered when the user is logged out', () => {
      const { container } = render(
        <Header user={{ email: '', password: '', isLoggedIn: false }} logOut={() => {}} />
      );

      expect(container.querySelector('#logoutSection')).toBeNull();
    });

    it('is rendered with the user email when the user is logged in', () => {
      const { container } = render(<Header user={loggedInUser} logOut={() => {}} />);
      const logoutSection = container.querySelector('#logoutSection');

      expect(logoutSection).toBeTruthy();
      expect(logoutSection.textContent).toMatch(/welcome test@example\.com \(logout\)/i);
    });

    it('calls the logOut prop when clicking on the logout link', () => {
      const logOut = jest.fn();
      render(<Header user={loggedInUser} logOut={logOut} />);

      fireEvent.click(screen.getByText('logout'));

      expect(logOut).toHaveBeenCalledTimes(1);
    });
  });

  it('is a functional component', () => {
    expect(typeof Header).toBe('function');
    expect(Header.prototype?.render).toBeUndefined();
  });

  it('hides the logoutSection once logOut updates the user prop', () => {
    function Wrapper() {
      const [user, setUser] = useState(loggedInUser);
      const logOut = () => setUser({ email: '', password: '', isLoggedIn: false });

      return <Header user={user} logOut={logOut} />;
    }
    const { container } = render(<Wrapper />);
    expect(container.querySelector('#logoutSection')).toBeTruthy();

    fireEvent.click(screen.getByText('logout'));

    expect(container.querySelector('#logoutSection')).toBeNull();
  });
});
