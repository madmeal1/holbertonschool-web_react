import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the copyright with the current year and Holberton School', () => {
    const { container } = render(<Footer />);
    const paragraph = container.querySelector('p');

    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toBe(
      `Copyright ${new Date().getFullYear()} - Holberton School`
    );
  });

  it('does not display the "Contact us" link without a user prop', () => {
    render(<Footer />);

    expect(screen.queryByText(/contact us/i)).toBeNull();
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    render(<Footer user={{ email: '', password: '', isLoggedIn: false }} />);

    expect(screen.queryByText(/contact us/i)).toBeNull();
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    render(<Footer user={{ email: 'test@example.com', password: 'secret123', isLoggedIn: true }} />);
    const link = screen.getByText(/contact us/i);

    expect(link.tagName).toBe('A');
    expect(link.closest('p')).toBeTruthy();
  });

  it('is a functional component', () => {
    expect(typeof Footer).toBe('function');
    expect(Footer.prototype?.render).toBeUndefined();
  });

  it('shows or hides the "Contact us" link when the user prop changes', () => {
    const { rerender } = render(<Footer user={{ email: '', password: '', isLoggedIn: false }} />);
    expect(screen.queryByText(/contact us/i)).toBeNull();

    rerender(<Footer user={{ email: 'test@example.com', password: 'secret123', isLoggedIn: true }} />);
    expect(screen.getByText(/contact us/i)).toBeTruthy();

    rerender(<Footer user={{ email: '', password: '', isLoggedIn: false }} />);
    expect(screen.queryByText(/contact us/i)).toBeNull();
  });
});
