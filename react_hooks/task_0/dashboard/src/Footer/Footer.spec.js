import { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

const renderWithUser = (user) =>
  render(
    <newContext.Provider value={{ user, logOut: () => {} }}>
      <Footer />
    </newContext.Provider>
  );

describe('Footer', () => {
  it('renders the copyright with the current year and Holberton School', () => {
    const { container } = render(<Footer />);
    const paragraph = container.querySelector('p');

    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toBe(
      `Copyright ${new Date().getFullYear()} - Holberton School`
    );
  });

  it('does not display the "Contact us" link with the default context', () => {
    render(<Footer />);

    expect(screen.queryByText(/contact us/i)).toBeNull();
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    renderWithUser({ email: '', password: '', isLoggedIn: false });

    expect(screen.queryByText(/contact us/i)).toBeNull();
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    renderWithUser({ email: 'test@example.com', password: 'secret123', isLoggedIn: true });
    const link = screen.getByText(/contact us/i);

    expect(link.tagName).toBe('A');
    expect(link.closest('p')).toBeTruthy();
  });

  it('is a functional component', () => {
    expect(typeof Footer).toBe('function');
    expect(Footer.prototype?.render).toBeUndefined();
  });

  it('shows or hides the "Contact us" link when the context user changes', () => {
    let setUser;
    function Wrapper() {
      const [user, updateUser] = useState({ email: '', password: '', isLoggedIn: false });
      setUser = updateUser;

      return (
        <newContext.Provider value={{ user, logOut: () => {} }}>
          <Footer />
        </newContext.Provider>
      );
    }
    render(<Wrapper />);
    expect(screen.queryByText(/contact us/i)).toBeNull();

    act(() => setUser({ email: 'test@example.com', password: 'secret123', isLoggedIn: true }));
    expect(screen.getByText(/contact us/i)).toBeTruthy();

    act(() => setUser({ email: '', password: '', isLoggedIn: false }));
    expect(screen.queryByText(/contact us/i)).toBeNull();
  });
});
