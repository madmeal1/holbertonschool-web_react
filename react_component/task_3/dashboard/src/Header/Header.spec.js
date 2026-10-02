import { render, screen } from '@testing-library/react';
import Header from './Header';

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
});
