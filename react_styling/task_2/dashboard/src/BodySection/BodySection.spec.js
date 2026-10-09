import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  it('renders a heading with the title prop value', () => {
    render(
      <BodySection title="test">
        <p>content</p>
      </BodySection>
    );

    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('test');
  });

  it('renders any number of children passed to it', () => {
    const { container } = render(
      <BodySection title="test">
        <p>first child</p>
        <p>second child</p>
        <p>third child</p>
      </BodySection>
    );

    expect(container.querySelectorAll('p')).toHaveLength(3);
    expect(screen.getByText('first child')).toBeTruthy();
    expect(screen.getByText('second child')).toBeTruthy();
    expect(screen.getByText('third child')).toBeTruthy();
  });
});
