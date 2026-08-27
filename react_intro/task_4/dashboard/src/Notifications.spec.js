import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('renders the notifications title', () => {
    render(<Notifications />);

    expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
  });

  it('renders the close button', () => {
    render(<Notifications />);

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders 3 list items', () => {
    const { container } = render(<Notifications />);

    expect(container.querySelectorAll('li')).toHaveLength(3);
  });

  it('logs to the console when the close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);

    fireEvent.click(screen.getByRole('button'));

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');

    consoleSpy.mockRestore();
  });
});
