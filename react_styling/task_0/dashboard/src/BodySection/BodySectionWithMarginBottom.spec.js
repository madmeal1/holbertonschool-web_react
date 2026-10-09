import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  it('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test">
        <p>test</p>
      </BodySectionWithMarginBottom>
    );

    expect(container.querySelector('div.bodySectionWithMargin')).toBeTruthy();
  });

  it('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test">
        <p>test</p>
      </BodySectionWithMarginBottom>
    );

    expect(container.querySelector('div.bodySectionWithMargin div.bodySection')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('test');
  });
});
