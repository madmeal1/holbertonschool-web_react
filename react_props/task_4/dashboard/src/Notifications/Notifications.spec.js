import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
  },
];

describe('Notifications', () => {
  it('renders the notifications title', () => {
    render(<Notifications notifications={notifications} />);

    expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
  });

  it('renders the close button', () => {
    render(<Notifications notifications={notifications} />);

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders 3 list items with the right text', () => {
    const { container } = render(<Notifications notifications={notifications} />);
    const items = container.querySelectorAll('li');

    expect(items).toHaveLength(3);
    expect(items[0].textContent).toBe('New course available');
    expect(items[1].textContent).toBe('New resume available');
    expect(items[2].textContent).toBe('Urgent requirement - complete by EOD');
  });

  it('renders no list item when no notifications prop is passed', () => {
    const { container } = render(<Notifications />);

    expect(container.querySelectorAll('li')).toHaveLength(0);
  });

  it('logs to the console when the close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications notifications={notifications} />);

    fireEvent.click(screen.getByRole('button'));

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');

    consoleSpy.mockRestore();
  });
});
