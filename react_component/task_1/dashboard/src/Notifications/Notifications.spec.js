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
  it('always renders the "Your notifications" title', () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);

    expect(screen.getByText(/your notifications/i)).toBeTruthy();
  });

  describe('when displayDrawer is false', () => {
    it('does not render the close button', () => {
      render(<Notifications notifications={notifications} displayDrawer={false} />);

      expect(screen.queryByRole('button')).toBeNull();
    });

    it('does not render the "Here is the list of notifications" text', () => {
      render(<Notifications notifications={notifications} displayDrawer={false} />);

      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    });

    it('does not render the notification items', () => {
      const { container } = render(
        <Notifications notifications={notifications} displayDrawer={false} />
      );

      expect(container.querySelectorAll('li')).toHaveLength(0);
    });

    it('still renders the "Your notifications" title', () => {
      render(<Notifications notifications={notifications} displayDrawer={false} />);

      expect(screen.getByText(/your notifications/i)).toBeTruthy();
    });
  });

  describe('when displayDrawer is true', () => {
    it('renders the close button', () => {
      render(<Notifications notifications={notifications} displayDrawer={true} />);

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('renders the "Here is the list of notifications" text', () => {
      render(<Notifications notifications={notifications} displayDrawer={true} />);

      expect(screen.getByText(/here is the list of notifications/i)).toBeTruthy();
    });

    it('renders 3 list items with the right text', () => {
      const { container } = render(
        <Notifications notifications={notifications} displayDrawer={true} />
      );
      const items = container.querySelectorAll('li');

      expect(items).toHaveLength(3);
      expect(items[0].textContent).toBe('New course available');
      expect(items[1].textContent).toBe('New resume available');
      expect(items[2].textContent).toBe('Urgent requirement - complete by EOD');
    });

    it('logs to the console when the close button is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<Notifications notifications={notifications} displayDrawer={true} />);

      fireEvent.click(screen.getByRole('button'));

      expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');

      consoleSpy.mockRestore();
    });

    it('still renders the "Your notifications" title', () => {
      render(<Notifications notifications={notifications} displayDrawer={true} />);

      expect(screen.getByText(/your notifications/i)).toBeTruthy();
    });

    describe('and the notifications prop is an empty array', () => {
      it('renders the "No new notification for now" text', () => {
        render(<Notifications notifications={[]} displayDrawer={true} />);

        expect(screen.getByText(/no new notification for now/i)).toBeTruthy();
      });

      it('does not render the close button, the list text, or any list item', () => {
        const { container } = render(<Notifications notifications={[]} displayDrawer={true} />);

        expect(screen.queryByRole('button')).toBeNull();
        expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
        expect(container.querySelectorAll('li')).toHaveLength(0);
      });

      it('still renders the "Your notifications" title', () => {
        render(<Notifications notifications={[]} displayDrawer={true} />);

        expect(screen.getByText(/your notifications/i)).toBeTruthy();
      });
    });
  });

  it('renders no list item when no notifications prop is passed and displayDrawer is true', () => {
    const { container } = render(<Notifications displayDrawer={true} />);

    expect(container.querySelectorAll('li')).toHaveLength(0);
    expect(screen.getByText(/no new notification for now/i)).toBeTruthy();
  });
});
