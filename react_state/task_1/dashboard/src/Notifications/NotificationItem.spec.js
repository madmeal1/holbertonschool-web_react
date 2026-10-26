import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders an li with data-notification-type "default"', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );
    const item = container.querySelector('li');

    expect(item).toBeTruthy();
    expect(item.getAttribute('data-notification-type')).toBe('default');
  });

  it('renders an li with data-notification-type "urgent"', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" />
    );
    const item = container.querySelector('li');

    expect(item).toBeTruthy();
    expect(item.getAttribute('data-notification-type')).toBe('urgent');
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

  it('calls the markAsRead prop when the notification item is clicked', () => {
    const markAsRead = jest.fn();
    const { container } = render(
      <NotificationItem id={1} type="default" value="New course available" markAsRead={markAsRead} />
    );

    fireEvent.click(container.querySelector('li'));

    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});
