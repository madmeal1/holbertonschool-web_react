import { render } from '@testing-library/react';
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
});
