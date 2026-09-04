import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders a blue li with data-notification-type "default"', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );
    const item = container.querySelector('li');

    expect(item).toBeTruthy();
    expect(item.getAttribute('data-notification-type')).toBe('default');
    expect(item.style.color).toBe('blue');
  });

  it('renders a red li with data-notification-type "urgent"', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" />
    );
    const item = container.querySelector('li');

    expect(item).toBeTruthy();
    expect(item.getAttribute('data-notification-type')).toBe('urgent');
    expect(item.style.color).toBe('red');
  });

  it('renders the value as text', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );

    expect(container.querySelector('li').textContent).toBe('New course available');
  });

  it('renders the html prop with dangerouslySetInnerHTML', () => {
    const { container } = render(
      <NotificationItem
        type="urgent"
        html={{ __html: '<strong>Urgent requirement</strong> - complete by EOD' }}
      />
    );
    const item = container.querySelector('li');

    expect(item.querySelector('strong')).toBeTruthy();
    expect(item.textContent).toBe('Urgent requirement - complete by EOD');
  });
});
